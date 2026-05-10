import React from 'react';
import { motion } from 'motion/react';
import { Target } from 'lucide-react';

interface SavingsGoalCardProps {
  key?: React.Key;
  title: string;
  target: number;
  current: number;
  category: string;
  color: string;
  onClick?: () => void;
}

export function SavingsGoalCard({ title, target, current, category, color, onClick }: SavingsGoalCardProps) {
  const percent = Math.round((current / target) * 100);
  return (
    <div 
      onClick={onClick}
      className={`p-8 rounded-[40px] bg-white border border-stone-100 shadow-xl flex flex-col ${onClick ? 'cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all' : ''}`}
    >
       <div className="flex justify-between items-start mb-6">
          <div className="bg-stone-100 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-stone-500">{category}</div>
          <Target size={20} className="text-stone-300" />
       </div>
       <h4 className="text-lg font-extrabold text-[#2D3911] mb-2">{title}</h4>
       <div className="text-3xl font-black text-stone-800 mb-1">
         KES {current.toLocaleString()} <span className="text-sm font-bold text-stone-400">/ {target.toLocaleString()}</span>
       </div>
       <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden shadow-inner">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${percent}%` }}
               className={`h-full ${color} shadow-lg`}
             />
          </div>
          <span className="text-xs font-black text-stone-500">{percent}%</span>
       </div>
       <p className="mt-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
         Keep going! You're almost there. 🚲
       </p>
    </div>
  );
}
