import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Shield, Zap } from 'lucide-react';

export function AchievementsView() {
  const achievements = [
    { title: 'First Save', description: 'Saved your first 100 KES', icon: <Trophy className="text-amber-500" />, unlocked: true, level: 1 },
    { title: 'Task Master', description: 'Completed 10 tasks in a week', icon: <Zap className="text-blue-500" />, unlocked: true, level: 3 },
    { title: 'Wealth Guide', description: 'Finished all Junior modules', icon: <Shield className="text-[#6B8E23]" />, unlocked: false, level: 5 },
    { title: 'Investor', description: 'Started your first virtual sim', icon: <Star className="text-purple-500" />, unlocked: false, level: 10 },
  ];

  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div>
        <h2 className="text-3xl font-bold text-[#2D3911] brand">Hall of Fame</h2>
        <p className="text-stone-500 font-medium">Your achievements and collections of honor.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`p-8 rounded-[32px] border-2 flex flex-col items-center text-center transition-all ${
                a.unlocked 
                  ? 'bg-white border-stone-100 shadow-xl' 
                  : 'bg-stone-50/50 border-stone-100 opacity-60 grayscale'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${
                a.unlocked ? 'bg-stone-50' : 'bg-stone-100'
              }`}>
                {React.cloneElement(a.icon as React.ReactElement, { size: 32 })}
              </div>
              <h4 className="font-extrabold text-[#2D3911] text-lg mb-2">{a.title}</h4>
              <p className="text-xs text-stone-500 font-medium leading-relaxed mb-6">{a.description}</p>
              
              {!a.unlocked && (
                <div className="mt-auto px-4 py-1.5 bg-stone-100 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-400">
                  Lvl {a.level} Required
                </div>
              )}
              {a.unlocked && (
                <div className="mt-auto px-4 py-1.5 bg-[#6B8E23]/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#6B8E23]">
                  Unlocked
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
