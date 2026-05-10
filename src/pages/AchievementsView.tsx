import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Shield, Zap, TrendingUp, AlertTriangle, Briefcase, Anchor } from 'lucide-react';
import { useAchievement } from '../context/AchievementContext';

export function AchievementsView() {
  const { achievements } = useAchievement();

  // Define all possible achievements in the system
  const allAchievements = [
    { id: 'FIRST_SAVE', title: 'First Save', description: 'Saved your first 100 KES', icon: <Trophy className="text-amber-500" /> },
    { id: 'TASK_MASTER', title: 'Task Master', description: 'Completed 10 tasks in a week', icon: <Zap className="text-blue-500" /> },
    { id: 'WEALTH_GUIDE_CHAT', title: 'Wealth Guide', description: 'Chatted with MaliBot', icon: <Shield className="text-[#6B8E23]" /> },
    { id: 'MARKET_SIM_SURVIVOR', title: 'Investor', description: 'Started your first virtual sim', icon: <Star className="text-purple-500" /> },
    { id: 'SURVIVED_LIQUIDITY_CRISIS', title: 'Liquidity Survivor', description: 'Survived an inverted yield curve scenario', icon: <Anchor className="text-rose-500" /> },
    { id: 'NAVIGATED_COMMERCIAL_CLIFF', title: 'Real Estate Mogul', description: 'Managed a commercial balloon loan', icon: <Briefcase className="text-emerald-500" /> },
    { id: 'FINAL_EXIT_ACHIEVED', title: 'The Ultimate Exit', description: 'Successfully sold your private equity firm', icon: <TrendingUp className="text-blue-500" /> },
    { id: 'DODGED_VALUE_TRAP', title: 'Value Trap Dodger', description: 'Avoided a dead company in the simulator', icon: <AlertTriangle className="text-amber-600" /> }
  ];

  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div>
        <h2 className="text-3xl font-bold text-[#2D3911] brand">Hall of Fame</h2>
        <p className="text-stone-500 font-medium">Your achievements and collections of honor automatically unlock as you progress.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allAchievements.map((a) => {
            const isUnlocked = achievements.includes(a.id);
            return (
              <motion.div 
                key={a.id}
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-[32px] border-2 flex flex-col items-center text-center transition-all ${
                  isUnlocked 
                    ? 'bg-white border-stone-100 shadow-xl' 
                    : 'bg-stone-50/50 border-stone-100 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:border-[#6B8E23]/50'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors ${
                  isUnlocked ? 'bg-stone-50' : 'bg-stone-100'
                }`}>
                  {React.cloneElement(a.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="font-extrabold text-[#2D3911] text-lg mb-2">{a.title}</h4>
                <p className="text-xs text-stone-500 font-medium leading-relaxed mb-6">{a.description}</p>
                
                {!isUnlocked && (
                  <div className="mt-auto px-4 py-1.5 bg-stone-100 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-400">
                    Locked
                  </div>
                )}
                {isUnlocked && (
                  <div className="mt-auto px-4 py-1.5 bg-[#6B8E23]/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#6B8E23]">
                    Unlocked
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
