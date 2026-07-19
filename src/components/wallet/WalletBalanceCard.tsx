import React from 'react';
import { Edit2, X, Check, Wallet } from 'lucide-react';
import { formatCurrency } from '../../lib/currency';

interface WalletBalanceCardProps {
  balance: number;
  totalWealth: number;
  isEditingWallet: boolean;
  setIsEditingWallet: (val: boolean) => void;
  newWalletBalance: string;
  setNewWalletBalance: (val: string) => void;
  handleUpdateWalletBalance: () => void;
  depositAmount: string;
  setDepositAmount: (val: string) => void;
  handleDeposit: () => void;
}

export function WalletBalanceCard({
  balance,
  totalWealth,
  isEditingWallet,
  setIsEditingWallet,
  newWalletBalance,
  setNewWalletBalance,
  handleUpdateWalletBalance,
  depositAmount,
  setDepositAmount,
  handleDeposit
}: WalletBalanceCardProps) {
  return (
    <div className="bg-brand-secondary text-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl relative overflow-hidden h-full flex flex-col">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <div className="text-stone-300 font-bold mb-1 uppercase tracking-wider text-xs">Total Wealth</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">{formatCurrency(totalWealth)}</h2>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
          <Wallet className="text-[#D4A373]" size={24} />
        </div>
      </div>

      <div className="mt-8 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-stone-300 font-bold uppercase tracking-wider text-xs">Available Balance</div>
          {!isEditingWallet && (
            <button onClick={() => { setIsEditingWallet(true); setNewWalletBalance(balance.toString()); }} className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1">
              <Edit2 size={12} />
            </button>
          )}
        </div>

        {isEditingWallet ? (
          <div className="flex items-center gap-2 max-w-[200px]">
            <input 
              type="number" 
              value={newWalletBalance}
              onChange={(e) => setNewWalletBalance(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-2 outline-none focus:border-brand-accent text-white font-bold"
              placeholder="New Balance"
            />
            <button onClick={handleUpdateWalletBalance} className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center hover:bg-[#5a781c] cursor-pointer transition-colors shrink-0">
              <Check size={16} />
            </button>
            <button onClick={() => setIsEditingWallet(false)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors shrink-0">
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="text-2xl md:text-3xl font-bold text-[#D4A373]">{formatCurrency(balance)}</div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Quick Deposit</div>
        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder="Amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-stone-400 outline-none focus:border-brand-accent focus:ring-2 focus:ring-[#6B8E23]/20 transition-all font-medium"
          />
          <button 
            onClick={handleDeposit}
            disabled={!depositAmount}
            className="bg-brand-accent disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#5a781c] transition-colors cursor-pointer shadow-lg shadow-[#6B8E23]/20"
          >
            Deposit
          </button>
        </div>
        <p className="text-xs text-stone-400 mt-2">Deposits are auto-allocated by Smart Rules</p>
      </div>
    </div>
  );
}
