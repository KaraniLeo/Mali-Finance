import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Shield, Zap, TrendingUp, AlertTriangle, Briefcase, Anchor } from 'lucide-react';
import { useAchievement } from '../context/AchievementContext';

import { useCurriculumStore } from '../state/curriculumStore';

const ICONS: Record<string, React.ReactElement> = {
  'Trophy': <Trophy className="text-amber-500" />,
  'Zap': <Zap className="text-blue-500" />,
  'Shield': <Shield className="text-brand-accent" />,
  'Star': <Star className="text-purple-500" />,
  'Anchor': <Anchor className="text-rose-500" />,
  'Briefcase': <Briefcase className="text-emerald-500" />,
  'TrendingUp': <TrendingUp className="text-blue-500" />,
  'AlertTriangle': <AlertTriangle className="text-amber-600" />
};

export function AchievementsView() {
  const { achievements: unlockedAchievements } = useAchievement();
  const allAchievements = useCurriculumStore(state => state.achievements);

  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div>
        <h2 className="text-3xl font-bold text-brand-secondary brand">Hall of Fame</h2>
        <p className="text-stone-500 font-medium">Your achievements and collections of honor automatically unlock as you progress.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allAchievements.map((a) => {
            const isUnlocked = unlockedAchievements.includes(a.id);
            const iconComponent = ICONS[a.icon_url] || <Trophy className="text-stone-400" />;
            return (
              <motion.div 
                key={a.id}
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-[32px] border-2 flex flex-col items-center text-center transition-all ${
                  isUnlocked 
                    ? 'bg-white border-stone-100 shadow-xl' 
                    : 'bg-stone-50/50 border-stone-100 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:border-brand-accent/50'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors ${
                  isUnlocked ? 'bg-stone-50' : 'bg-stone-100'
                }`}>
                  {React.cloneElement(iconComponent, { size: 32 })}
                </div>
                <h4 className="font-extrabold text-brand-secondary text-lg mb-2">{a.title}</h4>
                <p className="text-xs text-stone-500 font-medium leading-relaxed mb-6">{a.description}</p>
                
                {!isUnlocked && (
                  <div className="mt-auto px-4 py-1.5 bg-stone-100 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-400">
                    Locked
                  </div>
                )}
                {isUnlocked && (
                  <div className="mt-auto px-4 py-1.5 bg-brand-accent/10 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-accent">
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
