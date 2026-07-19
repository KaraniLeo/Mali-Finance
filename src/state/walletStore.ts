import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Transaction, BudgetRule } from '../types';
import { useWealthJarStore } from './wealthJarStore';

interface WalletState {
  walletId: string | null;
  balance: number;
  transactions: Transaction[];
  budgetRules: Record<string, BudgetRule>; // map jarId to its Rule
  
  // Actions
  fetchWalletData: (userId: string) => Promise<string | null>;
  setBalance: (balance: number | ((prev: number) => number)) => void;
  updateWalletBalance: (newBalance: number) => Promise<void>;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (tx: Transaction) => Promise<void>;
  setBudgetRules: (rules: Record<string, BudgetRule>) => Promise<void>;
  setBudgetRule: (jarId: string, rule: BudgetRule) => Promise<void>;
  removeBudgetRule: (jarId: string) => Promise<void>;
  distributeDeposit: (amount: number, sourceDesc?: string) => Promise<void>;
  reverseDeposit: (amount: number, sourceDesc?: string) => Promise<void>;
  reverseTaskReward: (task: { title: string, reward: number }) => Promise<void>;
  depositToWallet: (amount: number, sourceDesc: string) => Promise<void>;
  withdrawFromWallet: (amount: number, sourceDesc: string) => Promise<void>;
  clearHistory: (timeframe?: 'all' | '7days' | '30days') => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
      walletId: null,
      balance: 0.0,
      transactions: [],
      budgetRules: {},
      
      fetchWalletData: async (userId: string) => {
        try {
          // 1. Fetch or create Wallet
          let { data: wallet } = await supabase.from('wallets').select('*').eq('user_id', userId).single();
          if (!wallet) {
            const { data: newWallet } = await supabase.from('wallets').insert({ user_id: userId, balance: 0 }).select().single();
            wallet = newWallet;
          }
          if (wallet) {
            set({ balance: wallet.balance });
            
            // 2. Fetch Transactions
            const { data: txs } = await supabase.from('transactions').select('*').eq('wallet_id', wallet.id).order('created_at', { ascending: false });
            if (txs) set({ transactions: txs });
            
            // 3. Fetch Budget Rules
            const { data: rules } = await supabase.from('budget_rules').select('*').eq('wallet_id', wallet.id);
            if (rules) {
              const rulesMap: Record<string, BudgetRule> = {};
              rules.forEach(r => rulesMap[r.jar_id] = { jarId: r.jar_id, type: r.type as any, value: r.value });
              set({ budgetRules: rulesMap });
            }
            
            set({ walletId: wallet.id });
            return wallet.id;
          }
        } catch (err) {
          console.error("Failed to fetch wallet data", err);
        }
        return null;
      },

      setBalance: (update) => {
        const newBalance = typeof update === 'function' ? update(get().balance) : update;
        set({ balance: newBalance });
      },

      updateWalletBalance: async (newBalance) => {
        set({ balance: newBalance });
        const walletId = get().walletId;
        if (walletId) {
          await supabase.from('wallets').update({ balance: newBalance }).eq('id', walletId);
          
          // Get the user_id associated with this wallet and update their profile balance to sync them
          const { data: walletData } = await supabase
            .from('wallets')
            .select('user_id')
            .eq('id', walletId)
            .single();
            
          if (walletData?.user_id) {
            await supabase
              .from('profiles')
              .update({ balance: newBalance })
              .eq('id', walletData.user_id);
          }
        }
      },
      
      setTransactions: (transactions) => set({ transactions }),
      
      addTransaction: async (tx) => {
        // Ensure valid UUID
        const realId = tx.id && tx.id.includes('-') ? tx.id : crypto.randomUUID();
        const txToInsert = { ...tx, id: realId };
        
        set((state) => ({ transactions: [txToInsert, ...state.transactions] }));
        
        if (txToInsert.wallet_id && txToInsert.wallet_id !== 'local') {
          const { error } = await supabase.from('transactions').insert(txToInsert);
          if (error) console.error('Failed to save transaction:', error);
        }
      },
      
      setBudgetRules: async (rules) => {
        set({ budgetRules: rules });
        const walletId = get().walletId;
        if (walletId) {
          const upserts = Object.values(rules).map(rule => ({
            wallet_id: walletId,
            jar_id: rule.jarId,
            type: rule.type,
            value: rule.value
          }));
          if (upserts.length > 0) {
            await supabase.from('budget_rules').upsert(upserts, { onConflict: 'jar_id' });
          }
        }
      },
      
      setBudgetRule: async (jarId, rule) => {
        set((state) => ({ budgetRules: { ...state.budgetRules, [jarId]: rule } }));
        const walletRes = await supabase.from('wallets').select('id').single();
        if (walletRes.data) {
          await supabase.from('budget_rules').upsert({
            wallet_id: walletRes.data.id,
            jar_id: jarId,
            type: rule.type,
            value: rule.value
          }, { onConflict: 'jar_id' });
        }
      },
      
      removeBudgetRule: async (jarId) => {
        set((state) => {
          const newRules = { ...state.budgetRules };
          delete newRules[jarId];
          return { budgetRules: newRules };
        });
        await supabase.from('budget_rules').delete().eq('jar_id', jarId);
      },
      
      distributeDeposit: async (amount, sourceDesc) => {
        const { walletId } = get();
        if (!walletId) {
          console.error('distributeDeposit: walletId is missing!');
          return;
        }

        try {
          const { error } = await supabase.rpc('rpc_distribute_deposit', {
            p_wallet_id: walletId,
            p_amount: amount,
            p_source_desc: sourceDesc || 'Wallet Deposit'
          });

          if (error) {
            console.error('Failed to distribute deposit via RPC:', error);
            return;
          }

          // Re-fetch data to sync with backend as the single source of truth
          const userId = (await supabase.auth.getUser()).data.user?.id;
          if (userId) {
            await get().fetchWalletData(userId);
            await useWealthJarStore.getState().fetchJars(walletId);
          }
        } catch (err) {
          console.error('Failed to distribute deposit:', err);
        }
      },
      
      reverseDeposit: async (amount, sourceDesc) => {
        const { walletId, budgetRules } = get();
        if (!walletId) return;

        let remaining = amount;
        const jarDeductions = [];

        // 1. Calculate and deduct from jars based on current rules
        const rules = Object.values(budgetRules).filter(r => r.type === 'percentage' && r.value > 0);
        
        for (const rule of rules) {
          if (remaining <= 0) break;
          const allocation = Math.round(((amount * rule.value) / 100) * 100) / 100;
          const actualDeduction = Math.min(allocation, remaining);
          
          if (actualDeduction > 0) {
            jarDeductions.push({ jarId: rule.jarId, amount: actualDeduction });
            remaining = Math.round((remaining - actualDeduction) * 100) / 100;
          }
        }

        // 2. Execute DB updates sequentially
        try {
          // Record the main debit transaction
          await get().addTransaction({
            id: crypto.randomUUID(),
            wallet_id: walletId,
            amount: amount,
            type: 'debit',
            description: sourceDesc || 'Reversed Deposit',
            created_at: new Date().toISOString()
          });

          // Deduct from jars
          for (const deduction of jarDeductions) {
            // Get current jar balance first to avoid going negative
            const { data: jarData } = await supabase.from('wealth_jars').select('balance, name').eq('id', deduction.jarId).single();
            if (jarData) {
              const newJarBalance = Math.max(0, jarData.balance - deduction.amount);
              await supabase.from('wealth_jars').update({ balance: newJarBalance }).eq('id', deduction.jarId);
              
              // Record jar debit transaction
              await get().addTransaction({
                id: crypto.randomUUID(),
                wallet_id: walletId,
                jar_id: deduction.jarId,
                amount: deduction.amount,
                type: 'debit',
                description: `Reversed Allocation from ${jarData.name}`,
                created_at: new Date().toISOString()
              });
            }
          }

          // Deduct remainder from main wallet
          if (remaining > 0) {
            const { data: walletData } = await supabase.from('wallets').select('balance').eq('id', walletId).single();
            if (walletData) {
              const newWalletBalance = Math.max(0, walletData.balance - remaining);
              await supabase.from('wallets').update({ balance: newWalletBalance }).eq('id', walletId);
              get().setBalance(newWalletBalance);
            }
          }

          // Refresh data
          const userId = (await supabase.auth.getUser()).data.user?.id;
          if (userId) {
            await get().fetchWalletData(userId);
            await useWealthJarStore.getState().fetchJars(walletId);
          }
        } catch (err) {
          console.error('Failed to reverse deposit:', err);
        }
      },
      
      reverseTaskReward: async (task) => {
        const { walletId, transactions, budgetRules, balance, setBalance, setBudgetRules, addTransaction } = get();
        if (!walletId) return;

        // Find the exact transaction that deposited this reward
        const originalTx = transactions.find(t => 
          t.type === 'credit' && 
          t.amount === task.reward && 
          t.description === `Task Reward: ${task.title}`
        );

        if (!originalTx) {
          // If we can't find it (e.g., history cleared), fallback to basic withdrawal
          await get().withdrawFromWallet(task.reward, `Reversed Task Reward: ${task.title}`);
          return;
        }

        const newBalance = Math.max(0, balance - task.reward);

        // Deduct from the specific jar if it was allocated to one
        if (originalTx.jar_id) {
          const { data: jarData } = await supabase.from('wealth_jars').select('balance, name').eq('id', originalTx.jar_id).single();
          if (jarData) {
            const newJarBalance = Math.max(0, jarData.balance - task.reward);
            await supabase.from('wealth_jars').update({ balance: newJarBalance }).eq('id', originalTx.jar_id);
            
            // Record jar debit transaction
            await addTransaction({
              id: crypto.randomUUID(),
              wallet_id: walletId,
              jar_id: originalTx.jar_id,
              amount: task.reward,
              type: 'debit',
              description: `Reversed Allocation from ${jarData.name}`,
              created_at: new Date().toISOString()
            });

            // Revert the budget rules perfectly
            const newRules: Record<string, BudgetRule> = {};
            const safeOldBalance = newBalance > 0 ? newBalance : task.reward;
            
            Object.values(budgetRules).forEach(rule => {
              if (rule && rule.type === 'percentage') {
                const currentCashVal = (balance * rule.value) / 100;
                
                if (rule.jarId === originalTx.jar_id) {
                  const revertedCashVal = currentCashVal - task.reward;
                  const revertedPct = (revertedCashVal / safeOldBalance) * 100;
                  newRules[rule.jarId] = { ...rule, value: Math.max(0, revertedPct) };
                } else {
                  const revertedPct = (currentCashVal / safeOldBalance) * 100;
                  newRules[rule.jarId] = { ...rule, value: Math.max(0, revertedPct) };
                }
              } else {
                newRules[rule.jarId] = rule;
              }
            });
            await setBudgetRules(newRules);
          }
        }

        // Deduct from main wallet
        await supabase.from('wallets').update({ balance: newBalance }).eq('id', walletId);
        setBalance(newBalance);

        // Record main wallet debit
        await addTransaction({
          id: crypto.randomUUID(),
          wallet_id: walletId,
          amount: task.reward,
          type: 'debit',
          description: `Reversed Task Reward: ${task.title}`,
          created_at: new Date().toISOString()
        });

        // Refresh jars
        const userId = (await supabase.auth.getUser()).data.user?.id;
        if (userId) {
          await get().fetchWalletData(userId);
          await useWealthJarStore.getState().fetchJars(walletId);
        }
      },
      
      depositToWallet: async (amount, sourceDesc) => {
        const { walletId, balance, setBalance, addTransaction } = get();
        if (!walletId) return;
        
        const newBalance = balance + amount;
        setBalance(newBalance);
        
        await supabase.from('wallets').update({ balance: newBalance }).eq('id', walletId);
        
        await addTransaction({
          id: crypto.randomUUID(),
          wallet_id: walletId,
          amount: amount,
          type: 'credit',
          description: sourceDesc,
          created_at: new Date().toISOString()
        });
      },

      withdrawFromWallet: async (amount, sourceDesc) => {
        const { walletId, balance, setBalance, addTransaction } = get();
        if (!walletId) return;
        
        const newBalance = Math.max(0, balance - amount);
        setBalance(newBalance);
        
        await supabase.from('wallets').update({ balance: newBalance }).eq('id', walletId);
        
        await addTransaction({
          id: crypto.randomUUID(),
          wallet_id: walletId,
          amount: amount,
          type: 'debit',
          description: sourceDesc,
          created_at: new Date().toISOString()
        });
      },
      
      clearHistory: async (timeframe = 'all') => {
        const walletId = get().walletId;
        if (!walletId) return;
        
        let olderThanHours = -1; // -1 means all
        if (timeframe === '7days') {
          olderThanHours = 7 * 24;
        } else if (timeframe === '30days') {
          olderThanHours = 30 * 24;
        }
        
        const { error } = await supabase.rpc('rpc_clear_history', {
          p_wallet_id: walletId,
          p_older_than_hours: olderThanHours
        });
        
        if (error) {
          console.error('Error clearing history:', error);
        } else {
          // Refresh local state
          const { data: txs } = await supabase.from('transactions').select('*').eq('wallet_id', walletId).order('created_at', { ascending: false });
          set({ transactions: txs || [] });
        }
      }
    }));
