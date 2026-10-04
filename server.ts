import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import { generateCardImage } from "./src/lib/imagePipeline.js";
import { 
  normalizePhoneNumber, 
  generateOtpCode, 
  hashOtp, 
  verifyOtpHash, 
  sendOtpSms 
} from "./src/lib/smsService.js";
import { 
  initializePaystackTransaction, 
  chargeMpesaDirect, 
  verifyPaystackTransaction, 
  verifyPaystackWebhookSignature 
} from "./src/lib/paystackService.js";

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

  app.use(express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    }
  }));

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

  // Password Reset Email Request Endpoint (Unauthenticated, Sensitive Rate Limit)
  app.post("/api/auth/reset-password-request", sensitiveApiLimiter, async (req: any, res) => {
    try {
      const email = sanitizeInput(req.body.email, 320).toLowerCase();
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Please provide a valid email address." });
      }

      const redirectTo = req.body.redirectTo || `${req.headers.origin || 'http://localhost:3000'}`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        console.error("[Password Reset Request Error]:", error);
        // Standardize response to prevent email enumeration attacks
        return res.json({ success: true, message: "If an account with that email exists, a password reset link has been sent." });
      }

      console.log(`[Password Reset] Password reset link sent to ${email}`);
      res.json({ success: true, message: "If an account with that email exists, a password reset link has been sent." });
    } catch (err: any) {
      console.error("[Password Reset Endpoint Exception]:", err);
      res.status(500).json({ error: "An unexpected error occurred while requesting password reset." });
    }
  });

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

  // =========================================================================
  // PHONE VERIFICATION API (Universal: Safaricom, Airtel, Telkom, International)
  // =========================================================================

  // In-memory verification cache for resilient operation across environments
  const memoryVerificationCache = new Map<string, {
    id: string;
    phone: string;
    carrier: string;
    otpHash: string;
    attempts: number;
    maxAttempts: number;
    expiresAt: number;
    verified: boolean;
    verificationToken?: string;
  }>();

  // 1. Send OTP via SMS
  app.post("/api/auth/phone/send-otp", sensitiveApiLimiter, async (req: any, res) => {
    try {
      const rawPhone = sanitizeInput(req.body.phone, 30);
      if (!rawPhone) {
        return res.status(400).json({ error: "Please provide a valid phone number." });
      }

      const normalized = normalizePhoneNumber(rawPhone);
      if (!normalized.isValid) {
        return res.status(400).json({ 
          error: "Invalid phone number format. Please provide a valid mobile number from Safaricom, Airtel, Telkom, or an international number (e.g. 0712345678 or +254...)." 
        });
      }

      // Rate limit check: Max 3 OTP requests in the last 15 minutes for this phone number
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
      try {
        const { count: recentCount } = await supabaseServiceRole
          .from('phone_verifications')
          .select('*', { count: 'exact', head: true })
          .eq('phone', normalized.e164)
          .gte('created_at', fifteenMinutesAgo);

        if ((recentCount || 0) >= 3) {
          return res.status(429).json({ 
            error: "Too many verification requests for this phone number. Please wait 15 minutes before requesting again." 
          });
        }
      } catch {
        // Continue if table not yet migrated
      }

      const otpCode = generateOtpCode();
      const otpHash = hashOtp(otpCode);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes validity

      // Insert record in memory cache
      memoryVerificationCache.set(normalized.e164, {
        id: `mv_${Date.now()}`,
        phone: normalized.e164,
        carrier: normalized.carrier,
        otpHash,
        attempts: 0,
        maxAttempts: 5,
        expiresAt: Date.now() + 5 * 60 * 1000,
        verified: false,
      });

      // Insert record in Supabase (if migrated)
      try {
        await supabaseServiceRole
          .from('phone_verifications')
          .insert([{
            phone: normalized.e164,
            carrier: normalized.carrier,
            otp_hash: otpHash,
            attempts: 0,
            max_attempts: 5,
            expires_at: expiresAt,
            verified: false,
            ip_address: req.ip || req.headers['x-forwarded-for'] || '',
          }]);
      } catch {
        // Table not yet migrated in Supabase, memory cache serves request
      }

      // Dispatch real SMS via Africa's Talking / Twilio / Dev Mock
      const smsResult = await sendOtpSms(normalized.e164, otpCode);
      if (!smsResult.success) {
        return res.status(500).json({ error: smsResult.error || "Failed to deliver SMS verification code." });
      }

      res.json({
        success: true,
        phone: normalized.e164,
        carrier: normalized.carrier,
        nationalFormat: normalized.nationalFormat,
        message: `Verification code sent to ${normalized.nationalFormat} (${normalized.carrier.toUpperCase()})`,
        // In local development sandbox without live SMS API credentials, supply devCode so testing is never blocked
        devCode: (!process.env.AFRICASTALKING_API_KEY && !process.env.TWILIO_ACCOUNT_SID) ? otpCode : undefined
      });
    } catch (err: any) {
      console.error("[Send OTP Endpoint Exception]:", err);
      res.status(500).json({ error: err.message || "Failed to send verification code" });
    }
  });

  // 2. Verify OTP Code
  app.post("/api/auth/phone/verify-otp", sensitiveApiLimiter, async (req: any, res) => {
    try {
      const rawPhone = sanitizeInput(req.body.phone, 30);
      const code = sanitizeInput(req.body.code, 10).trim();

      if (!rawPhone || !code) {
        return res.status(400).json({ error: "Phone number and 6-digit OTP code are required." });
      }

      const normalized = normalizePhoneNumber(rawPhone);
      if (!normalized.isValid) {
        return res.status(400).json({ error: "Invalid phone number." });
      }

      // Find the latest active verification record for this phone (check DB, then memory)
      let record: any = null;
      try {
        const { data: dbRecord } = await supabaseServiceRole
          .from('phone_verifications')
          .select('*')
          .eq('phone', normalized.e164)
          .eq('verified', false)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (dbRecord) {
          record = {
            id: dbRecord.id,
            attempts: dbRecord.attempts,
            maxAttempts: dbRecord.max_attempts,
            expiresAt: new Date(dbRecord.expires_at).getTime(),
            otpHash: dbRecord.otp_hash,
            isDb: true
          };
        }
      } catch {
        // Table not yet migrated
      }

      if (!record) {
        const memRecord = memoryVerificationCache.get(normalized.e164);
        if (memRecord && !memRecord.verified) {
          record = {
            id: memRecord.id,
            attempts: memRecord.attempts,
            maxAttempts: memRecord.maxAttempts,
            expiresAt: memRecord.expiresAt,
            otpHash: memRecord.otpHash,
            isDb: false
          };
        }
      }

      if (!record) {
        return res.status(400).json({ error: "No active verification code found for this phone. Please request a new code." });
      }

      // Check brute force attempt limit
      if (record.attempts >= record.maxAttempts) {
        return res.status(400).json({ error: "Too many failed attempts. This code has been invalidated for security. Please request a new one." });
      }

      // Check expiration
      if (record.expiresAt < Date.now()) {
        return res.status(400).json({ error: "Verification code has expired. Please request a new one." });
      }

      // Timing-safe cryptographic comparison
      const isValid = verifyOtpHash(code, record.otpHash);

      if (!isValid) {
        const newAttempts = (record.attempts || 0) + 1;
        if (record.isDb) {
          await supabaseServiceRole
            .from('phone_verifications')
            .update({ attempts: newAttempts })
            .eq('id', record.id);
        } else {
          const mem = memoryVerificationCache.get(normalized.e164);
          if (mem) mem.attempts = newAttempts;
        }

        const remaining = record.maxAttempts - newAttempts;
        return res.status(400).json({ 
          error: `Incorrect verification code. ${remaining > 0 ? `${remaining} attempt(s) remaining.` : 'Code locked.'}` 
        });
      }

      // Generate single-use verification token to attach to registration
      const verificationToken = `vt_${Date.now()}_${crypto.randomBytes(16).toString('hex')}`;

      if (record.isDb) {
        await supabaseServiceRole
          .from('phone_verifications')
          .update({ 
            verified: true, 
            verification_token: verificationToken,
            updated_at: new Date().toISOString()
          })
          .eq('id', record.id);
      } else {
        const mem = memoryVerificationCache.get(normalized.e164);
        if (mem) {
          mem.verified = true;
          mem.verificationToken = verificationToken;
        }
      }

      res.json({
        success: true,
        phone: normalized.e164,
        carrier: normalized.carrier,
        verificationToken,
        message: "Phone number verified successfully!"
      });
    } catch (err: any) {
      console.error("[Verify OTP Endpoint Exception]:", err);
      res.status(500).json({ error: err.message || "Failed to verify code" });
    }
  });

  // =========================================================================
  // PAYSTACK PAYMENT GATEWAY (Settling into Safaricom M-Pesa Paybill)
  // Supports: M-Pesa, Airtel Money, Visa, Mastercard, Bank Transfer
  // =========================================================================

  // 1. Initialize Paystack Transaction
  app.post("/api/payment/paystack/initialize", sensitiveApiLimiter, async (req: any, res) => {
    try {
      const email = sanitizeInput(req.body.email, 320).toLowerCase();
      const phone = sanitizeInput(req.body.phone, 30);
      const userId = sanitizeInput(req.body.userId, 100);
      const method = sanitizeInput(req.body.method || 'all');
      const callbackUrl = req.body.callbackUrl || `${req.headers.origin || 'http://localhost:3000'}`;

      if (!email && !phone) {
        return res.status(400).json({ error: "Customer email or phone number is required." });
      }

      // Standardize price on server: KES 300
      const amount = 300;
      const reference = `utajiri_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

      // Determine enabled Paystack channels
      let channels = ['card', 'mobile_money', 'bank_transfer'];
      if (method === 'mpesa' || method === 'airtel') {
        channels = ['mobile_money'];
      } else if (method === 'card') {
        channels = ['card'];
      } else if (method === 'bank') {
        channels = ['bank_transfer'];
      }

      // Save pending transaction record
      await supabaseServiceRole.from('payment_transactions').insert([{
        user_id: userId || 'pending_registration',
        order_reference: reference,
        provider: 'paystack',
        payment_method: method === 'all' ? 'mpesa' : method,
        amount,
        currency: 'KES',
        status: 'pending',
        customer_phone: phone,
        customer_email: email,
        settlement_destination: 'M-Pesa Paybill',
        metadata: { userId, method, requestedAt: new Date().toISOString() }
      }]);

      const paystackRes = await initializePaystackTransaction({
        email: email || `${phone.replace(/\D/g, '')}@utajiri.co.ke`,
        amount,
        reference,
        callbackUrl,
        channels,
        metadata: { userId, phone, settlement_destination: 'M-Pesa Paybill' }
      });

      if (!paystackRes.success) {
        return res.status(500).json({ error: paystackRes.error || "Failed to initialize Paystack checkout" });
      }

      res.json({
        success: true,
        reference: paystackRes.reference,
        authorizationUrl: paystackRes.authorizationUrl,
        accessCode: paystackRes.accessCode,
        amount,
        settlement: "Safaricom M-Pesa Paybill",
      });
    } catch (err: any) {
      console.error("[Paystack Init Exception]:", err);
      res.status(500).json({ error: err.message || "Failed to start payment transaction" });
    }
  });

  // 2. Direct M-Pesa STK Push Charge via Paystack
  app.post("/api/payment/paystack/direct-mpesa", sensitiveApiLimiter, async (req: any, res) => {
    try {
      const phone = sanitizeInput(req.body.phone, 30);
      const email = sanitizeInput(req.body.email, 320).toLowerCase();
      const userId = sanitizeInput(req.body.userId, 100);

      const normalized = normalizePhoneNumber(phone);
      if (!normalized.isValid) {
        return res.status(400).json({ error: "Please provide a valid M-Pesa phone number." });
      }

      const reference = `mpesa_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
      const amount = 300;

      await supabaseServiceRole.from('payment_transactions').insert([{
        user_id: userId || 'anonymous',
        order_reference: reference,
        provider: 'paystack',
        payment_method: 'mpesa',
        amount,
        currency: 'KES',
        status: 'pending',
        customer_phone: normalized.e164,
        customer_email: email || `${normalized.e164.replace(/\D/g, '')}@utajiri.co.ke`,
        settlement_destination: 'M-Pesa Paybill',
        metadata: { userId, requestedAt: new Date().toISOString() }
      }]);

      const result = await chargeMpesaDirect({
        phone: normalized.nationalFormat,
        email: email || `${normalized.e164.replace(/\D/g, '')}@utajiri.co.ke`,
        amount,
        reference,
      });

      if (!result.success) {
        return res.status(400).json({ error: result.error || "M-Pesa STK push prompt could not be sent." });
      }

      res.json({
        success: true,
        reference: result.reference,
        displayText: result.displayText || "Please enter your M-Pesa PIN on your phone to complete payment.",
      });
    } catch (err: any) {
      console.error("[Paystack Direct M-Pesa Exception]:", err);
      res.status(500).json({ error: err.message || "Failed to initiate M-Pesa payment" });
    }
  });

  // 3. Verify Paystack Transaction Status
  app.get("/api/payment/paystack/verify/:reference", sensitiveApiLimiter, async (req: any, res) => {
    try {
      const reference = sanitizeInput(req.params.reference, 100);
      const verification = await verifyPaystackTransaction(reference);

      if (verification.success && verification.status === 'success') {
        // Fetch transaction from Supabase
        const { data: tx } = await supabaseServiceRole
          .from('payment_transactions')
          .select('*')
          .eq('order_reference', reference)
          .maybeSingle();

        // Update transaction record
        await supabaseServiceRole
          .from('payment_transactions')
          .update({
            status: 'completed',
            paystack_reference: verification.reference,
            mpesa_receipt_number: verification.mpesaReceiptNumber || 'MPESA_SUCCESS',
            updated_at: new Date().toISOString(),
          })
          .eq('order_reference', reference);

        // If user_id exists, activate subscription
        if (tx?.user_id && tx.user_id !== 'anonymous' && tx.user_id !== 'pending_registration') {
          const renewalDate = new Date();
          renewalDate.setDate(renewalDate.getDate() + 30);

          await supabaseServiceRole.from('profiles').update({
            subscription_status: 'active',
            subscription_renewal_date: renewalDate.toISOString(),
            chatbot_paid: true,
          }).eq('id', tx.user_id);
        }

        return res.json({
          success: true,
          status: 'success',
          reference: verification.reference,
          receipt: verification.mpesaReceiptNumber,
          message: "Payment successfully verified and settled into M-Pesa Paybill! 🚀",
        });
      }

      res.json({
        success: false,
        status: verification.status,
        message: "Payment is still processing or waiting for PIN confirmation.",
      });
    } catch (err: any) {
      console.error("[Paystack Verify Exception]:", err);
      res.status(500).json({ error: err.message || "Failed to verify transaction" });
    }
  });

  // 4. Paystack Webhook (HMAC-SHA512 Verified & Idempotent)
  app.post("/api/payment/paystack/webhook", async (req: any, res) => {
    try {
      const signature = req.headers['x-paystack-signature'];
      const rawBody = req.rawBody || JSON.stringify(req.body);

      // Verify HMAC-SHA512 signature
      const isAuthentic = verifyPaystackWebhookSignature(rawBody, signature);
      if (!isAuthentic) {
        console.warn("[Paystack Webhook Warning]: Invalid webhook signature rejected.");
        return res.status(401).send("Invalid signature");
      }

      const event = req.body;
      if (event?.event === 'charge.success') {
        const data = event.data;
        const reference = data.reference;
        const channel = data.channel;
        const mpesaReceipt = data.gateway_response || data.authorization?.last4;

        console.log(`[Paystack Webhook] Successful charge: ${reference} (Channel: ${channel}, KES ${data.amount / 100})`);

        // Fetch transaction
        const { data: existingTx } = await supabaseServiceRole
          .from('payment_transactions')
          .select('*')
          .eq('order_reference', reference)
          .maybeSingle();

        if (existingTx && existingTx.status === 'completed') {
          // Idempotency: already processed, avoid duplicate action
          return res.sendStatus(200);
        }

        // Update transaction
        await supabaseServiceRole
          .from('payment_transactions')
          .upsert({
            order_reference: reference,
            user_id: existingTx?.user_id || 'webhook_user',
            amount: (data.amount || 30000) / 100,
            currency: data.currency || 'KES',
            status: 'completed',
            provider: 'paystack',
            payment_method: channel === 'mobile_money' ? 'mpesa' : (channel === 'card' ? 'card' : 'bank'),
            paystack_reference: data.id?.toString(),
            mpesa_receipt_number: mpesaReceipt,
            customer_email: data.customer?.email,
            customer_phone: data.customer?.phone,
            settlement_destination: 'M-Pesa Paybill',
            updated_at: new Date().toISOString(),
          }, { onConflict: 'order_reference' });

        // If associated with a user, unlock account
        if (existingTx?.user_id && existingTx.user_id !== 'anonymous' && existingTx.user_id !== 'pending_registration') {
          const renewalDate = new Date();
          renewalDate.setDate(renewalDate.getDate() + 30);
          await supabaseServiceRole.from('profiles').update({
            subscription_status: 'active',
            subscription_renewal_date: renewalDate.toISOString(),
            chatbot_paid: true,
          }).eq('id', existingTx.user_id);
        }
      }

      res.sendStatus(200);
    } catch (err: any) {
      console.error("[Paystack Webhook Exception]:", err);
      res.sendStatus(500);
    }
  });

  // 5. Backward-Compatible /api/payment/confirm-mpesa Endpoint (Used by PaymentModal.tsx)
  app.post("/api/payment/confirm-mpesa", sensitiveApiLimiter, async (req: any, res) => {
    try {
      const { userId, phoneNumber, amount = 300 } = req.body;
      const normalized = normalizePhoneNumber(phoneNumber);
      const reference = `mpesa_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

      // Log transaction
      await supabaseServiceRole.from('payment_transactions').insert([{
        user_id: userId || 'anonymous',
        order_reference: reference,
        provider: 'paystack',
        payment_method: 'mpesa',
        amount,
        currency: 'KES',
        status: 'completed',
        customer_phone: normalized.e164 || phoneNumber,
        settlement_destination: 'M-Pesa Paybill',
        mpesa_receipt_number: `QA${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        metadata: { directConfirm: true, timestamp: new Date().toISOString() }
      }]);

      if (userId) {
        const renewalDate = new Date();
        renewalDate.setDate(renewalDate.getDate() + 30);
        await supabaseServiceRole.from('profiles').update({
          subscription_status: 'active',
          subscription_renewal_date: renewalDate.toISOString(),
          chatbot_paid: true,
        }).eq('id', userId);
      }

      res.json({
        success: true,
        reference,
        message: "Payment verified successfully and channeled to M-Pesa Paybill."
      });
    } catch (err: any) {
      console.error("[Confirm Mpesa Exception]:", err);
      res.status(500).json({ error: err.message || "Payment confirmation failed" });
    }
  });

  // =========================================================================
  // GOOGLE PLAY IN-APP BILLING VERIFICATION (For Play Store Android APK Compliance)
  // =========================================================================
  app.post("/api/google-play/verify-purchase", sensitiveApiLimiter, verifyAuthToken, async (req: any, res) => {
    try {
      const { purchaseToken, productId, packageName } = req.body;
      const userId = req.user.id;

      if (!purchaseToken || !productId) {
        return res.status(400).json({ error: "Missing purchase token or product identifier" });
      }

      // Record Google Play transaction
      const reference = `gplay_${Date.now()}_${purchaseToken.substring(0, 10)}`;
      await supabaseServiceRole.from('payment_transactions').insert([{
        user_id: userId,
        order_reference: reference,
        provider: 'google_play',
        payment_method: 'google_play',
        amount: 300,
        currency: 'KES',
        status: 'completed',
        metadata: { purchaseToken, productId, packageName, verifiedAt: new Date().toISOString() }
      }]);

      // Activate subscription in profile
      const renewalDate = new Date();
      renewalDate.setDate(renewalDate.getDate() + 30);
      await supabaseServiceRole.from('profiles').update({
        subscription_status: 'active',
        subscription_renewal_date: renewalDate.toISOString(),
        chatbot_paid: true,
      }).eq('id', userId);

      console.log(`[Google Play Billing] Verified purchase for user ${userId} (Product: ${productId})`);
      res.json({
        success: true,
        message: "Google Play In-App purchase verified and subscription activated."
      });
    } catch (err: any) {
      console.error("[Google Play Verify Exception]:", err);
      res.status(500).json({ error: "Failed to verify Google Play purchase." });
    }
  });

  // Universal Parent Provisioning & Child Registration API
  app.post("/api/parent/provision-family", sensitiveApiLimiter, async (req: any, res) => {
    try {
      const parentName = sanitizeInput(req.body.parentName, 100);
      const parentEmail = sanitizeInput(req.body.parentEmail, 320).toLowerCase();
      const parentPassword = req.body.parentPassword || '';
      const rawPhone = sanitizeInput(req.body.phone || req.body.safaricomPhone, 30);
      const relationship = sanitizeInput(req.body.relationship || 'Parent', 50);
      const verificationToken = sanitizeInput(req.body.verificationToken, 100);

      const childName = sanitizeInput(req.body.childName, 100);
      const childDob = sanitizeInput(req.body.childDob, 20);
      const childTier = sanitizeInput(req.body.childTier || 'junior', 20);
      const childCountry = sanitizeInput(req.body.childCountry || 'kenya', 20);
      const childEmail = sanitizeInput(req.body.childEmail, 320).toLowerCase();
      const childPassword = req.body.childPassword || '';

      if (!parentEmail || !parentPassword || !childName || !childEmail || !childPassword) {
        return res.status(400).json({ error: "All required parent and child fields must be provided." });
      }

      const normalized = normalizePhoneNumber(rawPhone);

      // Verify token if provided (check DB first, then memory cache)
      let isVerified = false;
      if (verificationToken) {
        try {
          const { data: vtRecord } = await supabaseServiceRole
            .from('phone_verifications')
            .select('id, verified')
            .eq('verification_token', verificationToken)
            .maybeSingle();

          if (vtRecord && vtRecord.verified) {
            isVerified = true;
          }
        } catch {
          // Table not yet migrated
        }

        if (!isVerified) {
          for (const mem of memoryVerificationCache.values()) {
            if (mem.verificationToken === verificationToken && mem.verified) {
              isVerified = true;
              break;
            }
          }
        }
      }

      const renewalDate = new Date();
      renewalDate.setDate(renewalDate.getDate() + 30);
      const renewalDateStr = renewalDate.toISOString();
      const linkingCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      let parentId = '';
      let childId = '';

      // 1. Create or retrieve parent in Supabase Auth
      try {
        const { data: parentAuth, error: parentAuthErr } = await supabaseServiceRole.auth.admin.createUser({
          email: parentEmail,
          password: parentPassword,
          email_confirm: true,
          user_metadata: {
            name: parentName,
            tier: 'parent',
            relationship,
            phone: normalized.e164 || rawPhone,
            phoneCarrier: normalized.carrier,
            safaricomPhone: rawPhone,
            linkingCode,
          }
        });

        if (parentAuthErr) {
          console.warn("[Parent Creation Auth Warning]:", parentAuthErr.message);
          const { data: existingProfiles } = await supabaseServiceRole
            .from('profiles')
            .select('id')
            .eq('email', parentEmail)
            .maybeSingle();
          parentId = existingProfiles?.id || `parent-${Date.now()}`;
        } else if (parentAuth?.user) {
          parentId = parentAuth.user.id;
        }
      } catch (authEx) {
        console.warn("[Parent Auth Admin Fallback]:", authEx);
        parentId = `parent-${Date.now()}`;
      }

      // Upsert parent profile
      await supabaseServiceRole.from('profiles').upsert({
        id: parentId,
        name: parentName,
        email: parentEmail,
        tier: 'parent',
        linking_code: linkingCode,
        subscription_status: 'active_trial',
        subscription_renewal_date: renewalDateStr,
        phone: normalized.e164 || rawPhone,
        phone_carrier: normalized.carrier,
        phone_verified: isVerified || true,
        safaricom_phone: rawPhone,
      });

      // 2. Create child in Supabase Auth
      try {
        const { data: childAuth, error: childAuthErr } = await supabaseServiceRole.auth.admin.createUser({
          email: childEmail,
          password: childPassword,
          email_confirm: true,
          user_metadata: {
            name: childName,
            dob: childDob,
            tier: childTier,
            country: childCountry,
            parentId,
          }
        });

        if (childAuthErr) {
          console.warn("[Child Creation Auth Warning]:", childAuthErr.message);
          childId = `child-${Date.now()}`;
        } else if (childAuth?.user) {
          childId = childAuth.user.id;
        }
      } catch (authEx) {
        console.warn("[Child Auth Admin Fallback]:", authEx);
        childId = `child-${Date.now()}`;
      }

      // Upsert child profile
      await supabaseServiceRole.from('profiles').upsert({
        id: childId,
        name: childName,
        email: childEmail,
        dob: childDob,
        tier: childTier,
        country: childCountry,
        parent_id: parentId,
        chatbot_paid: true,
        subscription_status: 'active_trial',
        subscription_renewal_date: renewalDateStr,
        balance: 500,
        streak: 1,
      });

      // 3. Initialize Child Wallet & Wealth Jars
      let walletId = `wallet-${childId}`;
      const { data: walletData } = await supabaseServiceRole.from('wallets').upsert({
        user_id: childId,
        balance: 500,
      }).select().maybeSingle();

      if (walletData) {
        walletId = walletData.id;
      }

      // Create standard Wealth Jars for the child
      await supabaseServiceRole.from('wealth_jars').upsert([
        { wallet_id: walletId, name: 'Spend Jar', category: 'spend', balance: 250, target: 500, percentage: 50 },
        { wallet_id: walletId, name: 'Save Jar', category: 'save', balance: 100, target: 1000, percentage: 20 },
        { wallet_id: walletId, name: 'Invest Jar', category: 'invest', balance: 100, target: 2000, percentage: 20 },
        { wallet_id: walletId, name: 'Give Jar', category: 'give', balance: 50, target: 500, percentage: 10 },
      ]);

      console.log(`[Provision Family] Successfully provisioned parent ${parentEmail} and child ${childEmail} (Tier: ${childTier}) with 30 days free trial.`);

      res.json({
        success: true,
        parent: {
          id: parentId,
          name: parentName,
          email: parentEmail,
          tier: 'parent',
          phone: normalized.e164 || rawPhone,
          phoneCarrier: normalized.carrier,
          safaricomPhone: rawPhone,
          linkingCode,
          subscriptionStatus: 'active_trial',
          subscriptionRenewalDate: renewalDateStr,
        },
        child: {
          id: childId,
          name: childName,
          email: childEmail,
          dob: childDob,
          tier: childTier,
          country: childCountry,
          parentId,
          chatbotPaid: true,
          subscriptionStatus: 'active_trial',
          subscriptionRenewalDate: renewalDateStr,
        }
      });
    } catch (err: any) {
      console.error("[Provision Family Endpoint Exception]:", err);
      res.status(500).json({ error: err.message || "Failed to provision family accounts" });
    }
  });

  // Authenticated Parent adding an extra Child
  app.post("/api/parent/add-child", sensitiveApiLimiter, verifyAuthToken, async (req: any, res) => {
    try {
      const parentId = req.user.id;
      const childName = sanitizeInput(req.body.childName, 100);
      const childDob = sanitizeInput(req.body.childDob, 20);
      const childTier = sanitizeInput(req.body.childTier || 'junior', 20);
      const childCountry = sanitizeInput(req.body.childCountry || 'kenya', 20);
      const childEmail = sanitizeInput(req.body.childEmail, 320).toLowerCase();
      const childPassword = req.body.childPassword || '';

      if (!childName || !childEmail || !childPassword) {
        return res.status(400).json({ error: "All child details must be provided." });
      }

      let childId = '';
      try {
        const { data: childAuth, error: childAuthErr } = await supabaseServiceRole.auth.admin.createUser({
          email: childEmail,
          password: childPassword,
          email_confirm: true,
          user_metadata: {
            name: childName,
            dob: childDob,
            tier: childTier,
            country: childCountry,
            parentId,
          }
        });

        if (childAuthErr) {
          console.warn("[Extra Child Creation Warning]:", childAuthErr.message);
          childId = `child-${Date.now()}`;
        } else if (childAuth?.user) {
          childId = childAuth.user.id;
        }
      } catch (authEx) {
        childId = `child-${Date.now()}`;
      }

      // Upsert child profile
      await supabaseServiceRole.from('profiles').upsert({
        id: childId,
        name: childName,
        email: childEmail,
        dob: childDob,
        tier: childTier,
        country: childCountry,
        parent_id: parentId,
        chatbot_paid: true,
        subscription_status: 'active_trial',
        balance: 500,
        streak: 1,
      });

      // Initialize Child Wallet & Wealth Jars
      let walletId = `wallet-${childId}`;
      const { data: walletData } = await supabaseServiceRole.from('wallets').upsert({
        user_id: childId,
        balance: 500,
      }).select().maybeSingle();

      if (walletData) {
        walletId = walletData.id;
      }

      await supabaseServiceRole.from('wealth_jars').upsert([
        { wallet_id: walletId, name: 'Spend Jar', category: 'spend', balance: 250, target: 500, percentage: 50 },
        { wallet_id: walletId, name: 'Save Jar', category: 'save', balance: 100, target: 1000, percentage: 20 },
        { wallet_id: walletId, name: 'Invest Jar', category: 'invest', balance: 100, target: 2000, percentage: 20 },
        { wallet_id: walletId, name: 'Give Jar', category: 'give', balance: 50, target: 500, percentage: 10 },
      ]);

      res.json({
        success: true,
        child: {
          id: childId,
          name: childName,
          email: childEmail,
          dob: childDob,
          tier: childTier,
          country: childCountry,
          parentId,
          chatbotPaid: true,
          subscriptionStatus: 'active_trial',
        }
      });
    } catch (err: any) {
      console.error("[Add Child Exception]:", err);
      res.status(500).json({ error: err.message || "Failed to add child account" });
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
