import { useState, useCallback } from 'react';
import { Wallet, WealthJar, Transaction, Debt } from '../types';
import { supabase } from '../lib/supabase';

export function useFinanceAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = useCallback(async (userId: string): Promise<Wallet | null> => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJars = useCallback(async (walletId: string): Promise<WealthJar[]> => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('wealth_jars')
        .select('*')
        .eq('wallet_id', walletId);
        
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (transactionData: Partial<Transaction>): Promise<Transaction | null> => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('transactions')
        .insert([transactionData])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDebts = useCallback(async (walletId: string): Promise<Debt[]> => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('debts')
        .select('*')
        .eq('wallet_id', walletId);
        
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const updateWalletBalance = useCallback(async (walletId: string, newBalance: number): Promise<boolean> => {
    try {
      const { error } = await supabase.from('wallets').update({ balance: newBalance }).eq('id', walletId);
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }, []);

  const createJar = useCallback(async (jarData: Partial<WealthJar>): Promise<boolean> => {
    try {
      const { error } = await supabase.from('wealth_jars').insert([jarData]);
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }, []);

  const updateJarBalance = useCallback(async (jarId: string, newBalance: number): Promise<boolean> => {
    try {
      const { error } = await supabase.from('wealth_jars').update({ balance: newBalance }).eq('id', jarId);
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }, []);

  const deleteJar = useCallback(async (jarId: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from('wealth_jars').delete().eq('id', jarId);
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }, []);

  const createDebt = useCallback(async (debtData: Partial<Debt>): Promise<boolean> => {
    try {
      const { error } = await supabase.from('debts').insert([debtData]);
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }, []);

  const updateDebtRemaining = useCallback(async (debtId: string, remaining: number): Promise<boolean> => {
    try {
      const { error } = await supabase.from('debts').update({ remaining_amount: remaining }).eq('id', debtId);
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }, []);

  const generateImage = useCallback(async (card: any): Promise<string | null> => {
    // Note: Kept as REST call if generation happens on a custom Edge Function/Server.
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return data.imageUrl;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const completeTask = useCallback(async (taskId: string, userId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      // Actual implementation would update task in DB, then add to wallet
      const { error } = await supabase
        .from('tasks')
        .update({ completed: true })
        .eq('id', taskId)
        .eq('user_id', userId);
        
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchWallet,
    fetchJars,
    createTransaction,
    fetchDebts,
    updateWalletBalance,
    createJar,
    updateJarBalance,
    deleteJar,
    createDebt,
    updateDebtRemaining,
    generateImage,
    completeTask,
  };
}
