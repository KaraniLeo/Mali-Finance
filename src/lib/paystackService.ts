import crypto from 'crypto';

export interface PaystackInitParams {
  email: string;
  amount: number; // in KES (e.g. 300)
  currency?: string; // default KES
  reference?: string;
  callbackUrl?: string;
  channels?: string[]; // ['card', 'mobile_money', 'bank_transfer']
  metadata?: Record<string, any>;
}

export interface PaystackInitResponse {
  success: boolean;
  authorizationUrl?: string;
  accessCode?: string;
  reference: string;
  error?: string;
}

export interface PaystackVerifyResponse {
  success: boolean;
  status: 'success' | 'failed' | 'abandoned' | 'pending';
  amount: number;
  currency: string;
  reference: string;
  channel?: string;
  customerPhone?: string;
  customerEmail?: string;
  mpesaReceiptNumber?: string;
  paidAt?: string;
  error?: string;
}

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

/**
 * Initializes a universal payment transaction via Paystack.
 * Paystack in Kenya supports M-Pesa, Airtel Money, Visa, Mastercard, and Bank Transfers.
 * Payouts from Paystack automatically settle directly into your Safaricom M-Pesa Paybill.
 */
export async function initializePaystackTransaction(params: PaystackInitParams): Promise<PaystackInitResponse> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const reference = params.reference || `utajiri_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  
  // Paystack expects amount in smallest currency unit (cents): KES 300 = 30000
  const amountInCents = Math.round(params.amount * 100);

  if (!secretKey || secretKey.startsWith('mock_') || secretKey.startsWith('pk_mock')) {
    console.log(`\n======================================================`);
    console.log(`💳 [PAYSTACK DEV SANDBOX] TRANSACTION INITIALIZED`);
    console.log(`Reference:       ${reference}`);
    console.log(`Amount:          KES ${params.amount} (${amountInCents} cents)`);
    console.log(`Email:           ${params.email}`);
    console.log(`Settlement Goal: M-Pesa Paybill`);
    console.log(`======================================================\n`);

    return {
      success: true,
      reference,
      accessCode: `mock_code_${reference}`,
      authorizationUrl: `https://checkout.paystack.com/mock_${reference}`,
    };
  }

  try {
    const payload = {
      email: params.email,
      amount: amountInCents,
      currency: params.currency || 'KES',
      reference,
      callback_url: params.callbackUrl,
      channels: params.channels || ['mobile_money', 'card', 'bank_transfer'],
      metadata: {
        ...params.metadata,
        settlement_destination: 'M-Pesa Paybill',
        platform: 'Mali Utajiri Finance',
      },
    };

    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok && data.status && data.data) {
      return {
        success: true,
        reference: data.data.reference,
        accessCode: data.data.access_code,
        authorizationUrl: data.data.authorization_url,
      };
    }

    return {
      success: false,
      reference,
      error: data.message || 'Paystack initialization failed',
    };
  } catch (err: any) {
    console.error('[Paystack Init Error]:', err);
    return {
      success: false,
      reference,
      error: err.message || 'Network error communicating with Paystack',
    };
  }
}

/**
 * Directly initiates an M-Pesa STK Push charge through Paystack Mobile Money API.
 * Triggers the customer's phone prompt directly without external redirect.
 */
export async function chargeMpesaDirect(params: {
  phone: string;
  email: string;
  amount: number;
  reference?: string;
}): Promise<{ success: boolean; reference: string; displayText?: string; error?: string }> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const reference = params.reference || `mpesa_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const amountInCents = Math.round(params.amount * 100);

  if (!secretKey || secretKey.startsWith('mock_')) {
    console.log(`[Paystack M-Pesa Mock] Direct STK Push simulated for ${params.phone} (KES ${params.amount})`);
    return {
      success: true,
      reference,
      displayText: `STK Push prompt sent to ${params.phone}. Please enter your M-Pesa PIN.`,
    };
  }

  try {
    const payload = {
      email: params.email,
      amount: amountInCents,
      currency: 'KES',
      reference,
      mobile_money: {
        phone: params.phone,
        provider: 'mpesa',
      },
    };

    const response = await fetch(`${PAYSTACK_BASE_URL}/charge`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok && data.status) {
      return {
        success: true,
        reference,
        displayText: data.data?.display_text || 'Please complete the M-Pesa prompt on your phone.',
      };
    }

    return {
      success: false,
      reference,
      error: data.message || 'M-Pesa STK Push initiation failed',
    };
  } catch (err: any) {
    return {
      success: false,
      reference,
      error: err.message,
    };
  }
}

/**
 * Queries Paystack API to verify transaction settlement status.
 */
export async function verifyPaystackTransaction(reference: string): Promise<PaystackVerifyResponse> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey || secretKey.startsWith('mock_')) {
    // In mock mode, treat as successful
    return {
      success: true,
      status: 'success',
      amount: 300,
      currency: 'KES',
      reference,
      channel: 'mobile_money',
      customerPhone: '+254700000000',
      mpesaReceiptNumber: `QA${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      paidAt: new Date().toISOString(),
    };
  }

  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok && data.status && data.data) {
      const d = data.data;
      return {
        success: d.status === 'success',
        status: d.status,
        amount: d.amount / 100, // convert cents back to KES
        currency: d.currency,
        reference: d.reference,
        channel: d.channel,
        customerPhone: d.customer?.phone || d.authorization?.mobile_money_number,
        customerEmail: d.customer?.email,
        mpesaReceiptNumber: d.gateway_response || d.authorization?.last4,
        paidAt: d.paid_at,
      };
    }

    return {
      success: false,
      status: 'failed',
      amount: 0,
      currency: 'KES',
      reference,
      error: data.message || 'Verification failed',
    };
  } catch (err: any) {
    return {
      success: false,
      status: 'failed',
      amount: 0,
      currency: 'KES',
      reference,
      error: err.message,
    };
  }
}

/**
 * Validates HMAC-SHA512 webhook signature from Paystack.
 * Defends against spoofed payment completion notifications.
 */
export function verifyPaystackWebhookSignature(rawBody: string | Buffer, signature: string): boolean {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey || secretKey.startsWith('mock_')) return true;
  if (!signature) return false;

  try {
    const hash = crypto
      .createHmac('sha512', secretKey)
      .update(typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8'))
      .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(hash, 'utf8'), Buffer.from(signature, 'utf8'));
  } catch {
    return false;
  }
}
