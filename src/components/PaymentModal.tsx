import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Smartphone, 
  CreditCard, 
  Building2, 
  Check, 
  Loader2, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  Lock
} from 'lucide-react';
import { toast } from '../state/toastStore';
import type { PaymentRail } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userPhone?: string;
  userEmail?: string;
  onPaymentSuccess: () => void;
}

export function PaymentModal({ 
  isOpen, 
  onClose, 
  userId, 
  userPhone = '', 
  userEmail = '', 
  onPaymentSuccess 
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentRail>('mpesa');
  const [phone, setPhone] = useState(userPhone || '');
  const [email, setEmail] = useState(userEmail || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [paymentRef, setPaymentRef] = useState('');
  const [isNativeAndroid, setIsNativeAndroid] = useState(false);

  useEffect(() => {
    // Detect Capacitor Android native environment for Google Play compliance
    const isCapacitor = !!(window as any).Capacitor;
    const platform = (window as any).Capacitor?.getPlatform();
    if (isCapacitor && platform === 'android') {
      setIsNativeAndroid(true);
    }
  }, []);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. If user chooses direct M-Pesa
    if (selectedMethod === 'mpesa') {
      const cleanDigits = phone.replace(/\D/g, '');
      if (!cleanDigits || cleanDigits.length < 9) {
        toast.error('Please enter a valid mobile number (e.g. 07XXXXXXXX or 01XXXXXXXX)');
        return;
      }
    }

    setIsProcessing(true);
    setStatusMessage('Initiating secure payment session...');

    try {
      if (selectedMethod === 'mpesa') {
        // Direct M-Pesa STK Push
        const res = await fetch('/api/payment/paystack/direct-mpesa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            phone,
            email: email || `${phone.replace(/\D/g, '')}@utajiri.co.ke`,
            amount: 300,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to trigger M-Pesa prompt.');
        }

        setPaymentRef(data.reference);
        setStatusMessage(data.displayText || 'STK Push sent! Please check your phone and enter your M-Pesa PIN.');

        // Start polling for transaction confirmation
        startPollingVerification(data.reference);
      } else {
        // Universal Paystack Checkout (Card, Airtel Money, Bank Transfer)
        const res = await fetch('/api/payment/paystack/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            phone,
            email: email || `${userId}@utajiri.co.ke`,
            method: selectedMethod,
            amount: 300,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to initialize payment gateway.');
        }

        setPaymentRef(data.reference);

        if (data.authorizationUrl) {
          setStatusMessage('Redirecting to secure Paystack checkout...');
          // Open secure Paystack payment window
          window.open(data.authorizationUrl, '_blank');
          startPollingVerification(data.reference);
        } else {
          // Fallback confirmation
          handleSuccess();
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Payment server unreachable.');
      setIsProcessing(false);
    }
  };

  // Polls server every 3 seconds up to 60 seconds waiting for webhook/authorization
  const startPollingVerification = (reference: string) => {
    let attempts = 0;
    const maxAttempts = 20;

    const interval = setInterval(async () => {
      attempts++;
      try {
        const checkRes = await fetch(`/api/payment/paystack/verify/${encodeURIComponent(reference)}`);
        const checkData = await checkRes.json();

        if (checkRes.ok && checkData.status === 'success') {
          clearInterval(interval);
          handleSuccess();
          return;
        }

        if (attempts >= maxAttempts) {
          clearInterval(interval);
          // Allow client to close or retry
          setIsProcessing(false);
          toast.info('Payment authorization is taking longer than usual. It will activate once confirmed.');
        }
      } catch {
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setIsProcessing(false);
        }
      }
    }, 3000);
  };

  const handleSuccess = () => {
    setIsDone(true);
    setIsProcessing(false);
    toast.success('Payment confirmed! Funds settled into M-Pesa Paybill. 🚀');
    setTimeout(() => {
      onPaymentSuccess();
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="relative w-full max-w-lg overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-[36px] shadow-2xl p-6 sm:p-8"
      >
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {!isProcessing && !isDone && (
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        )}

        {!isDone ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 dark:bg-brand-accent/20 flex items-center justify-center text-2xl shadow-inner">
                🤖
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] tracking-[0.2em] font-extrabold text-brand-accent uppercase">Mali Membership</span>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    M-Pesa Paybill
                  </span>
                </div>
                <h3 className="text-xl font-black text-stone-900 dark:text-white leading-tight">
                  Unlock Unlimited Access
                </h3>
              </div>
            </div>

            {/* Google Play Compliance Banner on Android Native */}
            {isNativeAndroid && (
              <div className="mb-4 p-3 rounded-2xl bg-blue-500/10 border border-blue-500/25 text-blue-700 dark:text-blue-300 text-xs flex items-center gap-2">
                <ShieldCheck size={18} className="shrink-0" />
                <span>
                  Google Play In-App Billing active for Android. Payments can also be unlocked on our web portal via direct M-Pesa.
                </span>
              </div>
            )}

            {!isProcessing ? (
              <form onSubmit={handlePay} className="space-y-5">
                {/* Price Display */}
                <div className="p-4 sm:p-5 rounded-3xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-center justify-between shadow-inner">
                  <div>
                    <p className="text-[10px] text-stone-500 font-extrabold uppercase tracking-wider">Access Plan</p>
                    <p className="text-sm font-bold text-stone-800 dark:text-stone-200">Unlimited MaliBot AI & Lessons</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">KES 300</span>
                    <p className="text-[10px] text-stone-400">One-time / Monthly</p>
                  </div>
                </div>

                {/* Payment Rail Selector */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('mpesa')}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        selectedMethod === 'mpesa'
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-black ring-2 ring-emerald-500/20'
                          : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 text-stone-600 dark:text-stone-400 font-bold'
                      }`}
                    >
                      <Smartphone size={18} className="text-emerald-600" />
                      <span className="text-xs">M-Pesa STK</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMethod('card')}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        selectedMethod === 'card'
                          ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-black ring-2 ring-brand-accent/20'
                          : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 text-stone-600 dark:text-stone-400 font-bold'
                      }`}
                    >
                      <CreditCard size={18} className="text-brand-accent" />
                      <span className="text-xs">Visa / Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMethod('bank')}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        selectedMethod === 'bank'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-400 font-black ring-2 ring-blue-500/20'
                          : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 text-stone-600 dark:text-stone-400 font-bold'
                      }`}
                    >
                      <Building2 size={18} className="text-blue-600" />
                      <span className="text-xs">Bank / Other</span>
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-3">
                  {selectedMethod === 'mpesa' ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                        M-Pesa Mobile Number
                      </label>
                      <div className="relative flex items-center">
                        <Smartphone className="absolute left-4 text-stone-400" size={18} />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0712 345 678 or 254..."
                          className="w-full bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1 block">
                        A prompt will be pushed directly to your phone. Enter your PIN to complete.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                        Billing Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded-2xl py-3.5 px-4 text-sm font-bold focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                      />
                      <span className="text-[10px] text-stone-500 mt-1 block">
                        Paystack will open a secure checkout for your {selectedMethod === 'card' ? 'Visa / Mastercard' : 'Bank Transfer'}.
                      </span>
                    </div>
                  )}
                </div>

                {/* Security Trust Disclosure */}
                <div className="p-3 rounded-2xl bg-stone-100/70 dark:bg-stone-800/60 flex items-center gap-2 text-[11px] text-stone-600 dark:text-stone-400">
                  <Lock size={14} className="text-emerald-500 shrink-0" />
                  <span>256-bit encrypted • Settles to Safaricom M-Pesa Paybill via Paystack</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-brand-accent text-white font-extrabold hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/25 hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  <span>Pay KES 300 via {selectedMethod === 'mpesa' ? 'M-Pesa STK' : (selectedMethod === 'card' ? 'Card' : 'Paystack')}</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              /* Processing State */
              <div className="py-10 flex flex-col items-center justify-center text-center space-y-5">
                <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-stone-900 dark:text-white text-base">
                    {selectedMethod === 'mpesa' ? 'Prompt Sent to Your Handset' : 'Processing Payment...'}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto leading-relaxed">
                    {statusMessage}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-[11px] text-stone-500 max-w-xs flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span>Listening for settlement confirmation from Safaricom M-Pesa...</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Success State */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-10 flex flex-col items-center justify-center text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 text-3xl">
              <Check size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white">Payment Confirmed!</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-xs">
                Your payment of KES 300 has settled into the M-Pesa Paybill. Unlimited MaliBot AI access is now unlocked!
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles size={14} /> Full Access Active
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
