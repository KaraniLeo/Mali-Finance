import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WealthJar } from '../types';

interface WealthJarState {
  jars: WealthJar[];
  
  // Actions
  setJars: (jars: WealthJar[]) => void;
  addJar: (jar: WealthJar) => void;
  updateJarBalance: (jarId: string, balance: number) => void;
  renameJar: (jarId: string, newName: string) => void;
  removeJar: (jarId: string) => void;
}

export const useWealthJarStore = create<WealthJarState>()(
  persist(
    (set, get) => ({
      jars: [
        { id: 'j-spend', wallet_id: 'local', name: 'Spend', category: 'spend', target: 0, balance: 0, created_at: new Date().toISOString() },
        { id: 'j-save', wallet_id: 'local', name: 'Save', category: 'save', target: 0, balance: 0, created_at: new Date().toISOString() },
        { id: 'j-invest', wallet_id: 'local', name: 'Invest', category: 'invest', target: 0, balance: 0, created_at: new Date().toISOString() },
        { id: 'j-give', wallet_id: 'local', name: 'Give', category: 'give', target: 0, balance: 0, created_at: new Date().toISOString() }
      ],
      
      setJars: (jars) => set({ jars }),
      
      addJar: (jar) => set((state) => ({
        jars: [...state.jars, jar]
      })),
      
      updateJarBalance: (jarId, balance) => set((state) => ({
        jars: state.jars.map(j => j.id === jarId ? { ...j, balance } : j)
      })),
      
      renameJar: (jarId, newName) => set((state) => ({
        jars: state.jars.map(j => j.id === jarId ? { ...j, name: newName } : j)
      })),
      
      removeJar: (jarId) => set((state) => ({
        jars: state.jars.filter(j => j.id !== jarId)
      }))
    }),
    { name: 'mali-wealthjar-store' }
  )
);
