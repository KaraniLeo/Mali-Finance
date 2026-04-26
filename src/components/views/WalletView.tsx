import React from 'react';
import { motion } from 'motion/react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, CreditCard } from 'lucide-react';

export function WalletView() {
  const transactions = [
    { id: 1, title: 'Allowance from Dad', amount: 500, type: 'in', date: 'Yesterday' },
    { id: 2, title: 'Mountain Bike Fund', amount: -200, type: 'out', date: '2 days ago' },
    { id: 3, title: 'Chores: Car Wash', amount: 50, type: 'in', date: '3 days ago' },
  ];

  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div>
        <h2 className="text-3xl font-bold text-[#2D3911] brand">My Wallet</h2>
        <p className="text-stone-500 font-medium">Manage your wealth and track your growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Card */}
        <div className="bg-[#2D3911] rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-0 right-0 p-8">
            <CreditCard size={32} className="text-white/20" />
          </div>
          <div>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Available Funds</p>
            <h3 className="text-4xl font-black tabular-nums">1,450.00 <span className="text-xl">KES</span></h3>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 bg-white text-[#2D3911] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#D4A373] hover:text-white transition-all">
              <Plus size={18} /> Transfer
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md py-3 rounded-xl font-bold border border-white/10 transition-all">
              Save Up
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[24px] border border-stone-100 flex flex-col justify-between">
            <div className="w-10 h-10 bg-emerald-50 text-[#6B8E23] rounded-lg flex items-center justify-center mb-4">
              <ArrowUpRight size={20} />
            </div>
            <div>
              <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">Weekly Income</p>
              <h4 className="text-xl font-bold text-stone-800">+550 KES</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[24px] border border-stone-100 flex flex-col justify-between">
            <div className="w-10 h-10 bg-amber-50 text-[#D4A373] rounded-lg flex items-center justify-center mb-4">
              <ArrowDownLeft size={20} />
            </div>
            <div>
              <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">Weekly Savings</p>
              <h4 className="text-xl font-bold text-stone-800">200 KES</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-xl font-bold text-[#2D3911] mb-4">Recent Activity</h3>
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="p-4 bg-white border border-stone-50 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-50 text-stone-400'}`}>
                  {t.type === 'in' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                </div>
                <div>
                  <h5 className="font-bold text-stone-800 text-sm">{t.title}</h5>
                  <p className="text-[10px] text-stone-400 font-medium">{t.date}</p>
                </div>
              </div>
              <div className={`font-bold tabular-nums ${t.type === 'in' ? 'text-emerald-600' : 'text-stone-800'}`}>
                {t.type === 'in' ? '+' : ''}{t.amount} KES
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
