import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { WealthJar } from '../types';

interface WealthJarState {
  jars: WealthJar[];
  
  // Actions
  fetchJars: (walletId: string) => Promise<void>;
  setJars: (jars: WealthJar[]) => void;
  addJar: (jar: Omit<WealthJar, 'id' | 'created_at'>) => Promise<void>;
  updateJarBalance: (jarId: string, balance: number) => Promise<void>;
  renameJar: (jarId: string, newName: string) => Promise<void>;
  updateJarAppearance: (jarId: string, icon: string, color: string) => Promise<void>;
  reorderJars: (jars: WealthJar[]) => void;
  removeJar: (jarId: string) => Promise<void>;
}

export const useWealthJarStore = create<WealthJarState>((set, get) => ({
      jars: [],
      
      fetchJars: async (walletId: string) => {
        try {
          const { data } = await supabase.from('wealth_jars').select('*').eq('wallet_id', walletId);
          if (data) {
            set({ jars: data });
          }
        } catch (err) {
          console.error("Failed to fetch jars", err);
        }
      },

      setJars: (jars) => set({ jars }),
      
      addJar: async (jar) => {
        const { data } = await supabase.from('wealth_jars').insert(jar).select().single();
        if (data) {
          set((state) => ({ jars: [...state.jars, data] }));
        }
      },
      
      updateJarBalance: async (jarId, balance) => {
        const { data, error } = await supabase.from('wealth_jars').update({ balance }).eq('id', jarId).select().single();
        if (data) {
          set((state) => ({ jars: state.jars.map(j => j.id === jarId ? data : j) }));
        }
      },
      
      renameJar: async (jarId, newName) => {
        const { data, error } = await supabase.from('wealth_jars').update({ name: newName }).eq('id', jarId).select().single();
        if (data) {
          set((state) => ({ jars: state.jars.map(j => j.id === jarId ? data : j) }));
        }
      },
      
      updateJarAppearance: async (jarId, icon, color) => {
        const { data, error } = await supabase.from('wealth_jars').update({ icon, color }).eq('id', jarId).select().single();
        if (data) {
          set((state) => ({ jars: state.jars.map(j => j.id === jarId ? data : j) }));
        }
      },

      reorderJars: (jars) => set({ jars }),
      
      removeJar: async (jarId) => {
        const { error } = await supabase.from('wealth_jars').delete().eq('id', jarId);
        if (!error) {
          set((state) => ({ jars: state.jars.filter(j => j.id !== jarId) }));
        }
      }
    }));
