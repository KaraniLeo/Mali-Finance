import React, { useState } from 'react';
import { motion } from 'motion/react';

interface AuthProps {
  onLogin: (name: string, dob: string) => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob) return;
    onLogin(name, dob);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F2] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-stone-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#6B8E23] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-xl mb-6 ring-8 ring-[#6B8E23]/10">M</div>
          <h1 className="text-3xl font-black text-[#2D3911] brand">Welcome to MALI</h1>
          <p className="text-stone-500 font-medium mt-2 text-center text-sm">Where Gen Alpha builds real-world wealth skills.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">What's your name?</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Future Millionaire"
              className="w-full bg-stone-100/50 border-2 border-stone-100 rounded-2xl py-4 px-5 text-sm focus:border-[#6B8E23]/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">When were you born?</label>
            <input 
              type="date" 
              required
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full bg-stone-100/50 border-2 border-stone-100 rounded-2xl py-4 px-5 text-sm focus:border-[#6B8E23]/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#6B8E23] text-white py-4 rounded-2xl font-black shadow-xl shadow-[#6B8E23]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Start My Wealth Journey
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-stone-100 text-center">
           <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] leading-relaxed">
             Secure and Private • Parent Approved
           </p>
        </div>
      </motion.div>
    </div>
  );
}
