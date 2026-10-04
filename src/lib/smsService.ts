import crypto from 'crypto';
import type { CarrierType } from '../types.js';

export interface NormalizedPhone {
  raw: string;
  e164: string;
  carrier: CarrierType;
  isValid: boolean;
  nationalFormat: string;
}

/**
 * Normalizes phone numbers to standard E.164 format and detects network carrier.
 * Accurately supports Safaricom, Airtel, Telkom, Equitel, and global international lines.
 */
export function normalizePhoneNumber(rawPhone: string): NormalizedPhone {
  if (!rawPhone) {
    return { raw: '', e164: '', carrier: 'unknown', isValid: false, nationalFormat: '' };
  }

  // Strip whitespace, hyphens, and parentheses
  const cleaned = rawPhone.replace(/[\s\-\(\)]/g, '').trim();

  let e164 = '';
  let national = '';

  if (cleaned.startsWith('+')) {
    e164 = cleaned;
  } else if (cleaned.startsWith('0') && (cleaned.length === 10)) {
    // Standard Kenyan 10-digit format: 07XXXXXXXX or 01XXXXXXXX
    e164 = `+254${cleaned.substring(1)}`;
    national = cleaned;
  } else if (cleaned.startsWith('254') && (cleaned.length === 12)) {
    e164 = `+${cleaned}`;
    national = `0${cleaned.substring(3)}`;
  } else if (!cleaned.startsWith('+') && cleaned.length === 9 && (cleaned.startsWith('7') || cleaned.startsWith('1'))) {
    e164 = `+254${cleaned}`;
    national = `0${cleaned}`;
  } else {
    e164 = cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
  }

  // Carrier identification for Kenyan numbers (+254)
  let carrier: CarrierType = 'unknown';
  let isValid = false;

  if (e164.startsWith('+254')) {
    const localPart = e164.substring(4); // e.g. 712345678 or 110123456
    if (localPart.length === 9) {
      const prefix2 = localPart.substring(0, 2);
      const prefix3 = localPart.substring(0, 3);
      const prefix4 = localPart.substring(0, 4);

      // Safaricom prefixes: 070X, 071X, 072X, 0740-0743, 0745-0746, 0748, 079X, 0110-0115
      const safaricomPrefixes = ['70', '71', '72', '79'];
      const safaricom4 = ['740', '741', '742', '743', '745', '746', '748', '110', '111', '112', '113', '114', '115'];

      // Airtel prefixes: 073X, 0750-0756, 0780-0789, 0100-0106
      const airtelPrefixes = ['73'];
      const airtel3 = ['750', '751', '752', '753', '754', '755', '756', '780', '781', '782', '783', '784', '785', '786', '787', '788', '789', '100', '101', '102', '103', '104', '105', '106'];

      // Telkom Kenya prefixes: 0770-0779
      const telkom3 = ['770', '771', '772', '773', '774', '775', '776', '777', '778', '779'];

      // Equitel prefixes: 0763-0766
      const equitel3 = ['763', '764', '765', '766'];

      if (safaricomPrefixes.includes(prefix2) || safaricom4.some(p => localPart.startsWith(p))) {
        carrier = 'safaricom';
        isValid = true;
      } else if (airtelPrefixes.includes(prefix2) || airtel3.some(p => localPart.startsWith(p))) {
        carrier = 'airtel';
        isValid = true;
      } else if (telkom3.some(p => localPart.startsWith(p))) {
        carrier = 'telkom';
        isValid = true;
      } else if (equitel3.some(p => localPart.startsWith(p))) {
        carrier = 'equitel';
        isValid = true;
      } else {
        carrier = 'unknown';
        isValid = /^[17]\d{8}$/.test(localPart);
      }
    }
  } else {
    // International number (E.164 pattern)
    isValid = /^\+[1-9]\d{7,14}$/.test(e164);
    if (isValid) {
      carrier = 'international';
    }
  }

  return {
    raw: rawPhone,
    e164,
    carrier,
    isValid,
    nationalFormat: national || e164,
  };
}

/**
 * Generates a cryptographically secure 6-digit numeric OTP code.
 */
export function generateOtpCode(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Creates a salted HMAC-SHA256 hash of an OTP code to ensure zero plaintext storage.
 */
export function hashOtp(code: string, salt = process.env.OTP_SALT || 'utajiri-secure-salt-2026'): string {
  return crypto.createHmac('sha256', salt).update(code.trim()).digest('hex');
}

/**
 * Timing-safe cryptographic comparison between submitted code and stored hash.
 */
export function verifyOtpHash(inputCode: string, storedHash: string, salt = process.env.OTP_SALT || 'utajiri-secure-salt-2026'): boolean {
  try {
    const inputHash = hashOtp(inputCode, salt);
    const inputBuffer = Buffer.from(inputHash, 'utf8');
    const storedBuffer = Buffer.from(storedHash, 'utf8');
    if (inputBuffer.length !== storedBuffer.length) return false;
    return crypto.timingSafeEqual(inputBuffer, storedBuffer);
  } catch {
    return false;
  }
}

/**
 * Multi-carrier SMS Dispatch Service.
 * Delivers SMS OTPs to Safaricom, Airtel, Telkom, and international numbers.
 * Supports Africa's Talking (recommended for Kenya), Twilio, or sandbox development mode.
 */
export async function sendOtpSms(recipientPhone: string, otpCode: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const message = `Your Mali Utajiri verification code is: ${otpCode}. Valid for 5 minutes. Do not share this code with anyone.`;
  const atApiKey = process.env.AFRICASTALKING_API_KEY;
  const atUsername = process.env.AFRICASTALKING_USERNAME;
  const atSenderId = process.env.AFRICASTALKING_SENDER_ID || '';

  // 1. Africa's Talking Provider (Kenya & Pan-Africa Gold Standard)
  if (atApiKey && atUsername) {
    try {
      const isSandbox = atUsername.toLowerCase() === 'sandbox';
      const endpoint = isSandbox 
        ? 'https://api.sandbox.africastalking.com/version1/messaging' 
        : 'https://api.africastalking.com/version1/messaging';

      const bodyParams = new URLSearchParams();
      bodyParams.append('username', atUsername);
      bodyParams.append('to', recipientPhone);
      bodyParams.append('message', message);
      if (atSenderId && !isSandbox) {
        bodyParams.append('from', atSenderId);
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'apiKey': atApiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: bodyParams.toString(),
      });

      const data = await response.json();
      const recipients = data?.SMSMessageData?.Recipients || [];
      const primary = recipients[0];

      if (primary && (primary.status === 'Success' || primary.statusCode === 101 || primary.statusCode === 100)) {
        console.log(`[SMS Gateway: Africa's Talking] Sent OTP to ${recipientPhone} (MessageId: ${primary.messageId})`);
        return { success: true, messageId: primary.messageId };
      }

      console.warn(`[SMS Gateway: Africa's Talking Warning]`, data);
      return { success: false, error: primary?.status || 'Failed to deliver SMS via Africa\'s Talking' };
    } catch (err: any) {
      console.error(`[SMS Gateway Error] Africa's Talking error:`, err);
      return { success: false, error: err.message };
    }
  }

  // 2. Twilio Fallback (Optional)
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_FROM_PHONE;

  if (twilioSid && twilioAuth && twilioPhone) {
    try {
      const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const authHeader = `Basic ${Buffer.from(`${twilioSid}:${twilioAuth}`).toString('base64')}`;

      const params = new URLSearchParams();
      params.append('To', recipientPhone);
      params.append('From', twilioPhone);
      params.append('Body', message);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(`[SMS Gateway: Twilio] Sent OTP to ${recipientPhone} (SID: ${result.sid})`);
        return { success: true, messageId: result.sid };
      }
      return { success: false, error: result.message || 'Twilio SMS failed' };
    } catch (err: any) {
      console.error(`[SMS Gateway: Twilio Error]`, err);
      return { success: false, error: err.message };
    }
  }

  // 3. Development / Sandbox Fallback
  // If third-party credentials are not configured yet in local development,
  // log the OTP with a high-visibility banner so onboarding and testing work seamlessly.
  console.log(`\n======================================================`);
  console.log(`📱 [SMS SERVICE DEV SANDBOX] OTP CODE DISPATCHED`);
  console.log(`Recipient Phone: ${recipientPhone}`);
  console.log(`OTP Code:        >>>>>  ${otpCode}  <<<<<`);
  console.log(`Message Content: "${message}"`);
  console.log(`Configure AFRICASTALKING_API_KEY & USERNAME in .env for live carrier SMS`);
  console.log(`======================================================\n`);

  return { success: true, messageId: `mock-${Date.now()}` };
}
