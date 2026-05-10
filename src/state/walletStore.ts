import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, BudgetRule } from '../types';

interface WalletState {
  balance: number;
  transactions: Transaction[];
  budgetRules: Record<string, BudgetRule>; // map jarId to its Rule
  
  // Actions
  setBalance: (balance: number | ((prev: number) => number)) => void;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (tx: Transaction) => void;
  setBudgetRules: (rules: Record<string, BudgetRule>) => void;
  setBudgetRule: (jarId: string, rule: BudgetRule) => void;
  removeBudgetRule: (jarId: string) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      balance: 0.0,
      transactions: [],
      budgetRules: {
        'j-spend': { jarId: 'j-spend', type: 'percentage', value: 50 },
        'j-save': { jarId: 'j-save', type: 'percentage', value: 20 },
        'j-invest': { jarId: 'j-invest', type: 'percentage', value: 20 },
        'j-give': { jarId: 'j-give', type: 'percentage', value: 10 },
      },
      
      setBalance: (update) => set((state) => ({
        balance: typeof update === 'function' ? update(state.balance) : update
      })),
      
      setTransactions: (transactions) => set({ transactions }),
      
      addTransaction: (tx) => set((state) => ({
        transactions: [tx, ...state.transactions]
      })),
      
      setBudgetRules: (rules) => set({ budgetRules: rules }),
      
      setBudgetRule: (jarId, rule) => set((state) => ({
        budgetRules: { ...state.budgetRules, [jarId]: rule }
      })),
      
      removeBudgetRule: (jarId) => set((state) => {
        const newRules = { ...state.budgetRules };
        delete newRules[jarId];
        return { budgetRules: newRules };
      })
    }),
    { name: 'mali-wallet-store' }
  )
);
