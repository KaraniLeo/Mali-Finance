import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Task, ChatMessage, View, Module, Tier, Wallet, WealthJar, Transaction, Debt } from '../types';

interface AppState {
  user: User | null;
  balance: number;
  chatHistory: ChatMessage[];
  activeView: View;
  selectedModule: Module | null;
  selectedSubtopic: any | null;
  tasks: Task[];
  completedLessons: string[]; // Tracks which lesson IDs are completed
  
  // Wallet State
  wallet: Wallet | null;
  jars: WealthJar[];
  transactions: Transaction[];
  debts: Debt[];
  
  // Actions
  setUser: (user: User | null) => void;
  setBalance: (balance: number | ((prev: number) => number)) => void;
  setChatHistory: (history: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  setActiveView: (view: View) => void;
  setSelectedModule: (module: Module | null) => void;
  setSelectedSubtopic: (subtopic: any | null) => void;
  setTasks: (tasks: Task[] | ((prev: Task[]) => Task[])) => void;
  markLessonComplete: (lessonId: string) => void;
  
  // Wallet Actions
  setWallet: (wallet: Wallet | null) => void;
  setJars: (jars: WealthJar[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setDebts: (debts: Debt[]) => void;
  updateJarBalance: (jarId: string, balance: number) => void;
  addTransaction: (tx: Transaction) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      balance: 0.0,
      chatHistory: [],
      activeView: 'dashboard',
      selectedModule: null,
      selectedSubtopic: null,
      tasks: [],
      completedLessons: [],
      wallet: null,
      jars: [],
      transactions: [],
      debts: [],

      setUser: (user) => set({ user }),
      setBalance: (balance) => set((state) => ({ 
        balance: typeof balance === 'function' ? balance(state.balance) : balance 
      })),
      setChatHistory: (history) => set((state) => ({ 
        chatHistory: typeof history === 'function' ? history(state.chatHistory) : history 
      })),
      setActiveView: (activeView) => set({ activeView }),
      setSelectedModule: (selectedModule) => set({ selectedModule }),
      setSelectedSubtopic: (selectedSubtopic) => set({ selectedSubtopic }),
      setTasks: (tasks) => set((state) => ({ 
        tasks: typeof tasks === 'function' ? tasks(state.tasks) : tasks 
      })),
      markLessonComplete: (lessonId) => set((state) => {
        if (!state.completedLessons.includes(lessonId)) {
          return { completedLessons: [...state.completedLessons, lessonId] };
        }
        return state;
      }),
      setWallet: (wallet) => set({ wallet }),
      setJars: (jars) => set({ jars }),
      setTransactions: (transactions) => set({ transactions }),
      setDebts: (debts) => set({ debts }),
      updateJarBalance: (jarId, balance) => set((state) => ({
        jars: state.jars.map(j => j.id === jarId ? { ...j, balance } : j)
      })),
      addTransaction: (tx) => set((state) => ({
        transactions: [tx, ...state.transactions]
      })),
    }),
    {
      name: 'finterns-storage',
      partialize: (state) => ({ 
        tasks: state.tasks, 
        completedLessons: state.completedLessons,
        wallet: state.wallet,
        jars: state.jars,
        transactions: state.transactions,
        debts: state.debts
      }), 
    }
  )
);
