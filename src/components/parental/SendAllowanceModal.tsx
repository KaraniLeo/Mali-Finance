import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Wallet, ArrowRight } from 'lucide-react';
import { User } from '../../types';
import { supabase } from '../../lib/supabase';
import { formatCurrency } from '../../lib/currency';
import { toast } from '../../state/toastStore';
import { useAppStore } from '../../state/store';

interface SendAllowanceModalProps {
  child: User;
  onClose: () => void;
  onSuccess: () => void;
}

export function SendAllowanceModal({ child, onClose, onSuccess }: SendAllowanceModalProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('Weekly Allowance');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return toast.error('Please enter a valid amount');
    }

    setIsSubmitting(true);
    try {
      // Find the child's wallet
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('id')
        .eq('user_id', child.id)
        .single();

      if (walletError || !walletData) throw new Error('Could not locate child wallet');

      // Distribute the deposit using the backend RPC
      const { error: rpcError } = await supabase.rpc('rpc_distribute_deposit', {
        p_wallet_id: walletData.id,
        p_amount: Number(amount),
        p_source_desc: description
      });

      if (rpcError) throw rpcError;

      toast.success(`Successfully sent ${formatCurrency(Number(amount))} to ${child.name}!`);
      onSuccess();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to send allowance');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-stone-200"
      >
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="text-xl font-black text-stone-800 flex items-center gap-2">
            <Wallet className="text-brand-accent" /> Send Allowance
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors p-2 rounded-full hover:bg-stone-200">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Sending To</label>
            <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl shadow-inner">👦</div>
              <div>
                <p className="font-bold text-stone-800">{child.name}</p>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">{child.tier} Account</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-stone-400 text-sm">
                {useAppStore.getState().regionMode === 'kenya' ? 'KES' : 'Cash'}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                required
                className="w-full pl-16 text-xl p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl focus:border-brand-accent focus:ring-0 font-bold transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Weekly Allowance"
              required
              className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl focus:border-brand-accent focus:ring-0 font-bold transition-colors"
            />
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold text-stone-500 bg-stone-100 hover:bg-stone-200 rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 font-bold text-white bg-brand-accent hover:bg-[#5a781d] rounded-2xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Funds'} <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
