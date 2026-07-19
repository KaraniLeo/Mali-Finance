import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Smartphone, Check, Loader2, ArrowRight } from 'lucide-react';
import { toast } from '../state/toastStore';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userPhone?: string;
  onPaymentSuccess: () => void;
}

export function PaymentModal({ isOpen, onClose, userId, userPhone = '', onPaymentSuccess }: PaymentModalProps) {
  const [phone, setPhone] = useState(userPhone || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [countdown, setCountdown] = useState(4);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean and validate Kenyan phone number
    let cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!cleanPhone) {
      toast.error('Please enter your M-Pesa phone number');
      return;
    }

    // Format to 254...
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '254' + cleanPhone.substring(1);
    } else if (cleanPhone.startsWith('+254')) {
      cleanPhone = cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('254') && cleanPhone.length === 9) {
      cleanPhone = '254' + cleanPhone;
    }

    const phoneRegex = /^(?:254|\+254|0)?(7|1)\d{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      toast.error('Please enter a valid Kenyan Safaricom phone number (e.g. 07XXXXXXXX or 01XXXXXXXX)');
      return;
    }

    setIsProcessing(true);
    setCountdown(4);

    // Start a visual countdown representing STK PIN entry latency
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    try {
      const response = await fetch('/api/payment/confirm-mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          phoneNumber: cleanPhone,
          amount: 300,
        }),
      });

      const result = await response.json();
      clearInterval(interval);

      if (response.ok && result.success) {
        setIsDone(true);
        toast.success('M-Pesa Payment of KES 300 verified successfully! 🚀');
        setTimeout(() => {
          onPaymentSuccess();
          onClose();
        }, 2200);
      } else {
        toast.error(result.error || 'M-Pesa payment validation failed.');
        setIsProcessing(false);
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      toast.error('Unable to reach the payment server. Try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 25 }}
        className="relative w-full max-w-md overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-[36px] shadow-2xl p-8"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 dark:bg-brand-accent/20 flex items-center justify-center text-2xl shadow-inner animate-pulse">
                🤖
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] font-extrabold text-brand-accent uppercase">MaliBot Premium</span>
                <h3 className="text-xl font-black text-stone-900 dark:text-white leading-tight">Unlock Unlimited AI</h3>
              </div>
            </div>

            {!isProcessing ? (
              <form onSubmit={handlePay} className="space-y-6">
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  You have exhausted your <strong className="text-stone-900 dark:text-white font-bold">5 free chatbot requests</strong>. 
                  Unlock unlimited access to your personal wealth mentor for a one-time fee of:
                </p>

                {/* Price Display */}
                <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800 flex items-center justify-between shadow-inner">
                  <div>
                    <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">One-Time Access</p>
                    <p className="text-sm text-stone-600 dark:text-stone-400">Unlimited chatbot conversations</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-brand-secondary dark:text-brand-primary">KES 300</span>
                  </div>
                </div>

                {/* Phone input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    M-Pesa Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <Smartphone className="absolute left-4 text-stone-400 dark:text-stone-500" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 0712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-4 focus:ring-brand-accent/15 focus:border-brand-accent focus:outline-none transition-all placeholder:text-stone-400 dark:placeholder:text-stone-600"
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 block leading-tight">
                    An M-Pesa STK Push prompt will be sent to this phone number to complete the payment safely.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-brand-accent text-white font-extrabold hover:bg-brand-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/25 hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  Pay KES 300 with M-Pesa <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
                <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
                <div>
                  <h4 className="font-extrabold text-stone-900 dark:text-white text-base">Sending Lipa na M-Pesa Prompt...</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs">
                    We sent an STK prompt to your phone. Enter your M-Pesa PIN to authorize KES 300 to MALI.
                  </p>
                </div>

                {/* Countdown representation */}
                <div className="w-full bg-stone-100 dark:bg-stone-950 rounded-full h-1.5 max-w-xs relative overflow-hidden mt-4">
                  <motion.div 
                    className="bg-brand-accent h-full absolute left-0 top-0"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, ease: 'linear' }}
                  />
                </div>
                <span className="text-xs font-bold text-brand-secondary dark:text-stone-400 tabular-nums">
                  Waiting for response... {countdown}s
                </span>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-12 flex flex-col items-center justify-center text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 text-3xl">
              <Check size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white">Payment Confirmed!</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                Thank you! Your account has been upgraded. Enjoy unlimited access to MaliBot AI! 🚀
              </p>
            </div>
            <div className="flex gap-1.5 p-1 bg-emerald-100/50 dark:bg-emerald-950/30 rounded-xl px-4 py-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-extrabold uppercase tracking-widest">
              <Sparkles size={14} /> UNLIMITED ACCESS UNLOCKED
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
