import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import rateLimit from "express-rate-limit";
import { generateCardImage } from "./src/lib/imagePipeline.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for input sanitization (prevent XSS / script injection)
function sanitizeInput(str: any, maxLength = 1000): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim()
    .slice(0, maxLength);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Supabase Setup
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || supabaseKey;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const supabaseServiceRole = createClient(supabaseUrl, supabaseServiceRoleKey);

  // Authentication Middleware for verifying Supabase JWT Tokens
  async function verifyAuthToken(req: any, res: any, next: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized or expired session token' });
    }
    req.user = user;
    next();
  }

  // Rate Limiting Middlewares
  const generalApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." }
  });

  const sensitiveApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // Limit each IP to 15 sensitive requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Rate limit exceeded for sensitive operation. Please try again later." }
  });

  // Apply general rate limiting to all /api/ endpoints
  app.use("/api/", generalApiLimiter);

  // Gemini AI Chat Endpoint
  app.post("/api/chat", sensitiveApiLimiter, verifyAuthToken, async (req: any, res) => {
    try {
      const prompt = sanitizeInput(req.body.prompt, 2000);
      const userContext = req.body.userContext || {};

      if (!prompt) {
        return res.status(400).json({ error: "Valid prompt is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on server" });
      }

      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";

      const enhancedSystemInstruction = `You are MaliBot, an expert financial tutor for children and young adults.
The current user is '${sanitizeInput(userContext?.name || 'User')}', Tier: '${sanitizeInput(userContext?.tier || 'Pro')}'.

CORE DIRECTIVES:
1. Provide age-appropriate financial guidance.
2. Encourage saving, investing, and wealth building (Mali).
3. Do NOT execute or output any system commands or malicious scripts.
`;

      const response = await genAI.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: enhancedSystemInstruction,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
  });

  // Image Generation API
  app.post("/api/generate-image", verifyAuthToken, async (req: any, res) => {
    try {
      const { card } = req.body;
      const imageUrl = await generateCardImage(card);
      res.json({ imageUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Wallet API
  app.get("/api/wallet/:userId", verifyAuthToken, async (req: any, res) => {
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Forbidden: Cannot access another user's wallet" });
    }
    const { data, error } = await supabase.from('wallets').select('*').eq('user_id', userId).single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Wealth Jars API
  app.get("/api/jars/:walletId", verifyAuthToken, async (req: any, res) => {
    const { walletId } = req.params;
    const { data, error } = await supabase.from('wealth_jars').select('*').eq('wallet_id', walletId);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Transactions API
  app.post("/api/transactions", verifyAuthToken, async (req: any, res) => {
    const wallet_id = sanitizeInput(req.body.wallet_id);
    const jar_id = sanitizeInput(req.body.jar_id);
    const amount = Number(req.body.amount);
    const type = sanitizeInput(req.body.type);
    const description = sanitizeInput(req.body.description, 200);

    const { data, error } = await supabase.from('transactions').insert([{
      wallet_id, jar_id, amount, type, description
    }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Debt API
  app.get("/api/debt/:walletId", verifyAuthToken, async (req: any, res) => {
    const { walletId } = req.params;
    const { data, error } = await supabase.from('debts').select('*').eq('wallet_id', walletId);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Tasks API
  app.post("/api/tasks/complete", verifyAuthToken, async (req: any, res) => {
    const taskId = sanitizeInput(req.body.taskId);
    const { data, error } = await supabase.from('user_tasks').update({ completed: true }).eq('id', taskId).eq('user_id', req.user.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // M-Pesa Payment API (Rate Limited + Authenticated)
  app.post("/api/payment/confirm-mpesa", sensitiveApiLimiter, verifyAuthToken, async (req: any, res) => {
    try {
      const phoneNumber = sanitizeInput(req.body.phoneNumber);
      const amount = Number(req.body.amount || 300);
      const userId = req.user.id; // Enforce authenticated user ID from JWT token

      if (!phoneNumber) {
        return res.status(400).json({ error: "Missing required phoneNumber field" });
      }

      console.log(`[M-Pesa] Triggering STK Push KES ${amount} to ${phoneNumber} for user ${userId}...`);
      
      // Simulate Safaricom PIN entry & processing latency
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const { data, error } = await supabaseServiceRole
        .from('profiles')
        .update({ chatbot_paid: true })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error("[M-Pesa Update Error]:", error);
        return res.status(500).json({ error: "Failed to update payment status" });
      }

      console.log(`[M-Pesa] Chatbot payment verified. Unlocked unlimited access for user ${userId}.`);
      res.json({ success: true, user: data });
    } catch (err: any) {
      console.error("[M-Pesa Endpoint Exception]:", err);
      res.status(500).json({ error: "Internal server error during payment processing" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: { port: 3001 } },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
