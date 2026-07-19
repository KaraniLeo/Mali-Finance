import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import { User, Task, ChatMessage, View, Module, Tier, Wallet, WealthJar, Transaction, Debt } from '../types';

interface AppState {
  user: User | null;
  chatHistory: ChatMessage[];
  activeView: View;
  selectedModule: Module | null;
  selectedSubtopic: any | null;
  tasks: Task[];
  completedLessons: string[]; // Tracks which lesson IDs are completed
  debts: Debt[];
  
  pendingTaskReward: { taskId: string; reward: number; title: string } | null;
  
  regionMode: 'international' | 'kenya';
  
  // Actions
  setUser: (user: User | null) => void;
  setRegionMode: (mode: 'international' | 'kenya') => void;
  setChatHistory: (history: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  setActiveView: (view: View) => void;
  setSelectedModule: (module: Module | null) => void;
  setSelectedSubtopic: (subtopic: any | null) => void;
  setTasks: (tasks: Task[] | ((prev: Task[]) => Task[])) => void;
  markLessonComplete: (lessonId: string) => void;
  setDebts: (debts: Debt[]) => void;
  
  setPendingTaskReward: (reward: { taskId: string; reward: number; title: string } | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      chatHistory: [],
      activeView: 'dashboard',
      selectedModule: null,
      selectedSubtopic: null,
      tasks: [],
      completedLessons: [],
      debts: [],
      pendingTaskReward: null,
      regionMode: 'international',

      setUser: (user) => set({ user }),
      setRegionMode: (regionMode) => set({ regionMode }),
      setChatHistory: (history) => set((state) => ({ 
        chatHistory: typeof history === 'function' ? history(state.chatHistory) : history 
      })),
      setActiveView: (activeView) => set({ activeView }),
      setSelectedModule: (selectedModule) => set({ selectedModule }),
      setSelectedSubtopic: (selectedSubtopic) => set({ selectedSubtopic }),
      setTasks: (tasks) => set((state) => ({ 
        tasks: typeof tasks === 'function' ? tasks(state.tasks) : tasks 
      })),
      markLessonComplete: async (lessonId) => {
        const state = get();
        if (!state.completedLessons.includes(lessonId)) {
          set({ completedLessons: [...state.completedLessons, lessonId] });
          
          if (state.user) {
            try {
              await supabase.from('lesson_progress').upsert({
                user_id: state.user.id,
                lesson_id: lessonId,
                completed: true,
                total_cards: 0 // Simplification since cards are tracked separately
              }, { onConflict: 'user_id, lesson_id' });
            } catch (err) {
              console.error('Failed to sync lesson progress', err);
            }
          }
        }
      },
      setDebts: (debts) => set({ debts }),
      
      setPendingTaskReward: (pendingTaskReward) => set({ pendingTaskReward })
    }),
    {
      name: 'finterns-storage',
      partialize: (state) => ({ 
        tasks: state.tasks, 
        completedLessons: state.completedLessons,
        regionMode: state.regionMode
      }), 
    }
  )
);
