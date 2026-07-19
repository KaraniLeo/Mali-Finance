import React, { useState } from 'react';
import { formatCurrency } from '../../lib/currency';
import { motion } from 'motion/react';

export function BudgetPuzzle({ onComplete }: { onComplete?: () => void }) {
  const TOTAL = 1000;
  const [needs, setNeeds] = useState(0);
  const [wants, setWants] = useState(0);
  const [savings, setSavings] = useState(0);

  const remaining = TOTAL - (needs + wants + savings);
  const isCorrect = needs === 500 && wants === 300 && savings === 200;

  const handleComplete = () => {
    if (isCorrect && onComplete) onComplete();
  };

  const adjust = (setter: React.Dispatch<React.SetStateAction<number>>, current: number, amount: number) => {
    if (amount > 0 && remaining < amount) return;
    if (amount < 0 && current < Math.abs(amount)) return;
    setter(current + amount);
  };

  return (
    <div className="w-full bg-[#E3F2FD] p-6 md:p-8 rounded-3xl border-4 border-blue-200">
      <h3 className="text-xl font-black text-blue-900 mb-2">The 50/30/20 Budget Challenge</h3>
      <p className="text-blue-700 font-bold mb-6">Allocate your {formatCurrency(1000)} salary correctly using the 50/30/20 rule.</p>
      
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-blue-100 flex justify-between items-center">
        <span className="font-bold text-stone-500 uppercase tracking-widest text-xs">Unallocated Cash</span>
        <span className={`text-2xl font-black ${remaining === 0 ? 'text-green-500' : 'text-stone-800'}`}>{formatCurrency(remaining)}</span>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { label: 'Needs (50%)', val: needs, set: setNeeds, color: 'bg-red-100 text-red-800 border-red-200' },
          { label: 'Wants (30%)', val: wants, set: setWants, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
          { label: 'Savings (20%)', val: savings, set: setSavings, color: 'bg-green-100 text-green-800 border-green-200' }
        ].map((item, idx) => (
          <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl border-2 ${item.color}`}>
            <span className="font-bold">{item.label}</span>
            <div className="flex items-center gap-4">
              <button onClick={() => adjust(item.set, item.val, -100)} className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center font-bold hover:bg-stone-50">-</button>
              <span className="font-black w-16 text-center">{item.val}</span>
              <button onClick={() => adjust(item.set, item.val, 100)} className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center font-bold hover:bg-stone-50">+</button>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleComplete}
        disabled={!isCorrect}
        className={`w-full py-4 rounded-xl font-black text-lg transition-all ${isCorrect ? 'bg-blue-600 text-white shadow-xl hover:bg-blue-500' : 'bg-stone-200 text-stone-400'}`}
      >
        {isCorrect ? 'Perfect Budget! Continue' : 'Allocate correctly to continue'}
      </button>
    </div>
  );
}
