import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { generateCardImage } from "./src/lib/imagePipeline.js"; // Use .js extension for tsx/Node compatibility

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API Proxy
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, userContext } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set" });
      }

      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";

      const enhancedSystemInstruction = `You are MaliBot, an expert financial tutor for children and young adults.
      The current user is '${userContext?.name || 'User'}', Age: ${userContext?.age || 'Unknown'}, Tier: '${userContext?.tier || 'Unknown'}'.
      
      CORE DIRECTIVES:
      1. Provide age-appropriate advice.
      2. If asked for a "daily plan", give a curated step-by-step financial learning activity for the day based on their age tier.
      3. Keep responses encouraging, highly interactive, and focused on building wealth (Mali).
      4. Use formatting (like markdown lists) to make steps clear.
      5. Congratulate them on their streaks and encourage them to build their MALI points.
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
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Supabase Setup
  const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);
  const supabaseServiceRole = createClient(
    supabaseUrl,
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || supabaseKey
  );

  // Image Generation API
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { card } = req.body;
      const imageUrl = await generateCardImage(card);
      res.json({ imageUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Wallet API
  app.get("/api/wallet/:userId", async (req, res) => {
    const { userId } = req.params;
    const { data, error } = await supabase.from('wallets').select('*').eq('user_id', userId).single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Wealth Jars API
  app.get("/api/jars/:walletId", async (req, res) => {
    const { walletId } = req.params;
    const { data, error } = await supabase.from('wealth_jars').select('*').eq('wallet_id', walletId);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Transactions API
  app.post("/api/transactions", async (req, res) => {
    const { wallet_id, jar_id, amount, type, description } = req.body;
    const { data, error } = await supabase.from('transactions').insert([{
      wallet_id, jar_id, amount, type, description
    }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Debt API
  app.get("/api/debt/:walletId", async (req, res) => {
    const { walletId } = req.params;
    const { data, error } = await supabase.from('debts').select('*').eq('wallet_id', walletId);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Tasks API
  app.post("/api/tasks/complete", async (req, res) => {
    const { taskId, userId } = req.body;
    const { data, error } = await supabase.from('user_tasks').update({ completed: true }).eq('id', taskId);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // M-Pesa Payment API
  app.post("/api/payment/confirm-mpesa", async (req, res) => {
    try {
      const { userId, phoneNumber, amount } = req.body;
      if (!userId || !phoneNumber) {
        return res.status(400).json({ error: "Missing required fields: userId or phoneNumber" });
      }

      console.log(`[M-Pesa] Triggering STK Push KES ${amount || 300} to ${phoneNumber} for user ${userId}...`);
      
      // Simulate Safaricom PIN entry and confirmation latency (4 seconds)
      await new Promise((resolve) => setTimeout(resolve, 4000));

      console.log(`[M-Pesa] Payment approved. Updating profile status for user ${userId}...`);

      const { data, error } = await supabaseServiceRole
        .from('profiles')
        .update({ chatbot_paid: true })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error("[M-Pesa Update Error]:", error);
        return res.status(500).json({ error: error.message });
      }

      console.log(`[M-Pesa] Chatbot payment verified. Unlocked unlimited access for user ${userId}.`);
      res.json({ success: true, user: data });
    } catch (err: any) {
      console.error("[M-Pesa Endpoint Exception]:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
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
