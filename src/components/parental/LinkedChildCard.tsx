import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Wallet, Activity, CheckCircle2, Circle } from 'lucide-react';
import { User, Task, Transaction } from '../../types';
import { supabase } from '../../lib/supabase';
import { formatCurrency } from '../../lib/currency';
import { toast } from '../../state/toastStore';
import { SendAllowanceModal } from './SendAllowanceModal';

interface LinkedChildCardProps {
  child: User;
}

export function LinkedChildCard({ child }: LinkedChildCardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Fetch Tasks
    supabase
      .from('user_tasks')
      .select('*')
      .eq('user_id', child.id)
      .limit(5)
      .then(({ data }) => {
        if (data) setTasks(data as Task[]);
      });
      
    // Fetch Transactions and Balance via Wallet
    supabase
      .from('wallets')
      .select('id, balance')
      .eq('user_id', child.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setWalletBalance(Number(data.balance || 0));
          if (data.id) {
            supabase
              .from('transactions')
              .select('*')
              .eq('wallet_id', data.id)
              .order('created_at', { ascending: false })
              .limit(5)
              .then(({ data: txData }) => {
                if (txData) setTransactions(txData as Transaction[]);
              });
          }
        }
      });
  }, [child.id, refreshTrigger]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] p-8 border border-stone-200 shadow-sm relative overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Users size={120} />
        </div>
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl shadow-inner border-4 border-white">
              👦
            </div>
            <div>
              <h3 className="text-2xl font-black text-stone-800">{child.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{child.tier} Account</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Active
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
          <div className="p-6 bg-stone-50 rounded-[24px] border border-stone-100">
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Current Wallet Balance</p>
            <h4 className="text-3xl font-black text-brand-secondary tabular-nums">
              {walletBalance !== null ? formatCurrency(walletBalance) : formatCurrency(child.balance || 0)}
            </h4>
          </div>
          <div className="p-6 bg-stone-50 rounded-[24px] border border-stone-100">
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Learning Streak</p>
            <h4 className="text-3xl font-black text-brand-accent">
              {child.streak || 0} Days
            </h4>
          </div>
        </div>

        {/* 
        <div className="flex gap-4 relative z-10 mb-8">
          <button 
            onClick={() => setShowSendModal(true)}
            className="flex-1 py-4 bg-brand-secondary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#3f4f18] transition-all shadow-md hover:shadow-xl cursor-pointer"
          >
            <Wallet size={18} /> Send Allowance
          </button>
          <button 
            onClick={() => toast.info(`Generating learning & financial report for ${child.name}...`)}
            className="flex-1 py-4 bg-stone-100 text-stone-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-stone-200 transition-all cursor-pointer"
          >
            <Activity size={18} /> View Full Report
          </button>
        </div>
        */}
        <div className="flex gap-4 relative z-10 mb-8">
          <button 
            onClick={() => toast.info(`Generating learning & financial report for ${child.name}...`)}
            className="w-full py-4 bg-stone-100 text-stone-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-stone-200 transition-all cursor-pointer"
          >
            <Activity size={18} /> View Full Report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 border-t border-stone-100 pt-8 mt-auto">
          {/* Recent Tasks */}
          <div>
            <h3 className="text-sm font-black text-stone-800 mb-4 uppercase tracking-widest">Recent Tasks</h3>
            {tasks.length === 0 ? (
              <p className="text-stone-400 font-medium text-sm italic">No tasks found.</p>
            ) : (
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <div className="flex items-center gap-3">
                      {task.completed ? <CheckCircle2 className="text-emerald-500" size={16} /> : <Circle className="text-stone-300" size={16} />}
                      <div>
                        <p className={`font-bold text-sm ${task.completed ? 'text-stone-500 line-through' : 'text-stone-800'}`}>{task.title}</p>
                      </div>
                    </div>
                    <span className="font-black text-brand-accent text-sm">{formatCurrency(task.reward)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Recent Transactions */}
          <div>
            <h3 className="text-sm font-black text-stone-800 mb-4 uppercase tracking-widest">Wallet History</h3>
            {transactions.length === 0 ? (
              <p className="text-stone-400 font-medium text-sm italic">No transactions found.</p>
            ) : (
              <div className="space-y-3">
                {transactions.map(tx => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <div className="truncate pr-2">
                      <p className="font-bold text-stone-800 text-sm truncate">{tx.description || 'Transaction'}</p>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{new Date(tx.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`font-black whitespace-nowrap text-sm ${tx.type === 'credit' ? 'text-emerald-600' : 'text-stone-800'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 
      <AnimatePresence>
        {showSendModal && (
          <SendAllowanceModal 
            child={child} 
            onClose={() => setShowSendModal(false)} 
            onSuccess={() => {
              setShowSendModal(false);
              setRefreshTrigger(prev => prev + 1);
            }} 
          />
        )}
      </AnimatePresence>
      */}
    </>
  );
}
