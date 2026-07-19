import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { AchievementTrigger } from '../types/curriculum';

interface AchievementContextType {
  achievements: string[];
  track: (trigger: AchievementTrigger) => void;
  setInitialAchievements: (achievements: string[]) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [achievements, setAchievements] = useState<string[]>([]);

  const track = async (trigger: AchievementTrigger) => {
    if (!achievements.includes(trigger)) {
      console.log(`[Achievement Unlocked]: ${trigger}`);
      const newAchievements = [...achievements, trigger];
      setAchievements(newAchievements);
      
      // Attempt to save to Supabase if authenticated
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile, error: fetchErr } = await supabase
            .from('profiles')
            .select('achievements')
            .eq('id', session.user.id)
            .single();

          if (!fetchErr && profile) {
            const currentAchievements = profile.achievements || [];
            if (!currentAchievements.includes(trigger)) {
              const updated = [...currentAchievements, trigger];
              await supabase
                .from('profiles')
                .update({ achievements: updated })
                .eq('id', session.user.id);
            }
          }
        }
      } catch (err) {
        console.error('Failed to save achievement to DB', err);
      }
    }
  };

  const setInitialAchievements = (initial: string[]) => {
    setAchievements(initial);
  };

  return (
    <AchievementContext.Provider value={{ achievements, track, setInitialAchievements }}>
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievement() {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievement must be used within an AchievementProvider');
  }
  return context;
}
