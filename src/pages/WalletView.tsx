import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, PiggyBank, Heart, TrendingUp, HandCoins, Trash2, Edit2, AlertCircle, Minus, X, Gem, ArrowUp, ArrowDown, Check } from 'lucide-react';

const AVAILABLE_ICONS = [
  { name: 'PiggyBank', component: PiggyBank },
  { name: 'Wallet', component: Wallet },
  { name: 'Heart', component: Heart },
  { name: 'TrendingUp', component: TrendingUp },
  { name: 'HandCoins', component: HandCoins },
  { name: 'Gem', component: Gem },
];
const AVAILABLE_COLORS = [
  'bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-rose-500', 'bg-amber-500', 'bg-stone-500'
];
import { useAppStore } from '../state/store';
import { useWalletStore } from '../state/walletStore';
import { useWealthJarStore } from '../state/wealthJarStore';
import { toast } from '../state/toastStore';
import { WealthJar, Transaction, Debt, BudgetRule } from '../types';
import { formatCurrency } from '../lib/currency';

export function WalletView() {
  const { 
    debts, setDebts
  } = useAppStore();

  const {
    jars, setJars, addJar, updateJarBalance, renameJar, removeJar
  } = useWealthJarStore();

  const {
    walletId, balance, setBalance,
    transactions, addTransaction, clearHistory,
    budgetRules, setBudgetRules, setBudgetRule, removeBudgetRule
  } = useWalletStore();

  // Modals & Forms
  const [isAddingJar, setIsAddingJar] = useState(false);
  const [jarToDelete, setJarToDelete] = useState<string | null>(null);
  const [newJar, setNewJar] = useState({ name: '', category: 'Needs', color: 'bg-emerald-500', icon: 'PiggyBank' });

  const [isEditingWallet, setIsEditingWallet] = useState(false);
  const [newWalletBalance, setNewWalletBalance] = useState('');
  
  const [editingJarId, setEditingJarId] = useState<string | null>(null);
  const [editingJarBalance, setEditingJarBalance] = useState<string>('');

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempRules, setTempRules] = useState<Record<string, BudgetRule>>({});

  const [isAddingDebt, setIsAddingDebt] = useState(false);
  const [newDebt, setNewDebt] = useState({ name: '', total_amount: '' });

  // Inline Inputs
  const [depositAmount, setDepositAmount] = useState('');
  const [jarInputs, setJarInputs] = useState<Record<string, string>>({});
  const [debtInputs, setDebtInputs] = useState<Record<string, string>>({});
  
  // Withdrawal Options Prompt
  const [activeWithdrawal, setActiveWithdrawal] = useState<{ jar: WealthJar, amount: number } | null>(null);
  const [transferTargetId, setTransferTargetId] = useState<string>('');

  const [pendingWalletUpdate, setPendingWalletUpdate] = useState<number | null>(null);

  const [sessionDebtRepaid, setSessionDebtRepaid] = useState<number>(() => {
    const saved = localStorage.getItem(`debtRepaid_${walletId || 'local'}`);
    return saved ? parseFloat(saved) : 0;
  });

  const [editingDebtId, setEditingDebtId] = useState<string | null>(null);
  const [editingDebtBalance, setEditingDebtBalance] = useState<string>('');

  const [isClearingHistory, setIsClearingHistory] = useState(false);
  const [clearTimeframe, setClearTimeframe] = useState<'all' | '7days' | '30days'>('all');
  const [historySearchQuery, setHistorySearchQuery] = useState('');

  const logActivity = (desc: string, type: 'credit' | 'debit' = 'credit', amt: number = 0) => {
    addTransaction({
      id: Date.now().toString() + Math.random().toString(),
      wallet_id: walletId || 'local',
      amount: amt,
      type,
      description: desc,
      created_at: new Date().toISOString()
    });
  };

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return toast.error('Invalid deposit amount');
    
    setDepositAmount('');
    setPendingWalletUpdate(balance + amount);
  };

  const handleSaveBudgetRules = async () => {
    // Validate that percentages do not exceed 100%
    const totalPct = jars.reduce((acc, jar) => {
      const rule = tempRules[jar.id];
      if (rule && rule.type === 'percentage') return acc + rule.value;
      return acc;
    }, 0);

    if (totalPct > 100) {
      return toast.error(`Total percentage allocation cannot exceed 100%. Currently at ${totalPct}%.`);
    }
    
    const newRules: Record<string, BudgetRule> = {};
    jars.forEach(jar => {
      if (tempRules[jar.id]) {
        newRules[jar.id] = tempRules[jar.id];
      }
    });
    
    // Store as baseline for fresh cycle reset
    if (walletId) {
      localStorage.setItem(`baseline_rules_${walletId}`, JSON.stringify(newRules));
    }
    
    await setBudgetRules(newRules);
    logActivity(`Updated Budget Rules`, 'credit', 0);
    setIsEditingBudget(false);
    toast.success('Smart Budget rules saved!');
  };

  const handleResetRules = async () => {
    const emptyRules: Record<string, BudgetRule> = {};

    jars.forEach(jar => {
      emptyRules[jar.id] = { jarId: jar.id, type: 'percentage', value: 0 };
      if (jar.balance > 0) {
        updateJarBalance(jar.id, 0);
      }
    });

    setTempRules(emptyRules);
    await setBudgetRules(emptyRules);
    logActivity(`Cleared Budget Rules & Jars`, 'debit', 0);

    toast.success('Rules cleared and jars reset to 0!');
  };

  const handleAllocate = (jar: WealthJar) => {
    const amountStr = jarInputs[jar.id];
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return toast.error('Invalid allocation amount');
    if (amount > balance) return toast.error('Insufficient funds in Wallet to allocate!');

    const rule = budgetRules[jar.id];
    if (!rule || rule.value <= 0) {
      return toast.error('Cannot route money to a jar without a Budget Rule percentage!');
    }

    const refBalance = balance;
    const allocatedLimit = (refBalance * rule.value) / 100;
    
    if (jar.balance + amount > allocatedLimit + 0.01) {
      return toast.error(`Amount exceeds the budgeted limit of ${formatCurrency(Math.round(allocatedLimit))} for ${jar.name}!`);
    }

    setJarInputs({ ...jarInputs, [jar.id]: '' });
    
    updateJarBalance(jar.id, jar.balance + amount);

    // Subtract from main wallet balance
    const newBalance = balance - amount;
    useWalletStore.getState().updateWalletBalance(newBalance);

    // Adjust specific budget category and all other category percentages
    // to keep other categories' KES limits unchanged, and subtract allocation from this category
    if (newBalance > 0) {
      jars.forEach((j) => {
        const jRule = budgetRules[j.id];
        if (!jRule) return;
        if (j.id === jar.id) {
          const newPctJ = ((balance * jRule.value) - (amount * 100)) / newBalance;
          setBudgetRule(j.id, { ...jRule, value: Math.max(0, newPctJ) });
        } else {
          const newPctI = (jRule.value * balance) / newBalance;
          setBudgetRule(j.id, { ...jRule, value: newPctI });
        }
      });
    } else {
      // If balance is 0, reset all rules
      jars.forEach((j) => {
        const jRule = budgetRules[j.id];
        if (jRule) {
          setBudgetRule(j.id, { ...jRule, value: 0 });
        }
      });
    }
    
    addTransaction({
      id: Date.now().toString(),
      wallet_id: walletId || 'local',
      jar_id: jar.id,
      amount: amount,
      type: 'debit',
      description: `Allocated to ${jar.name}`,
      created_at: new Date().toISOString()
    });

    toast.success(`Allocated ${formatCurrency(amount)} to ${jar.name}!`);
  };

  const handleWithdrawFromJar = (jar: WealthJar) => {
    const amountStr = jarInputs[jar.id];
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return toast.error('Invalid withdrawal amount');
    if (amount > jar.balance) return toast.error(`Insufficient funds in ${jar.name}!`);

    setJarInputs({ ...jarInputs, [jar.id]: '' });
    setActiveWithdrawal({ jar, amount });
  };

  const confirmWithdrawal = (action: 'transfer' | 'spend' | 'transfer-jar') => {
    if (!activeWithdrawal) return;
    const { jar, amount } = activeWithdrawal;

    const currentRule = budgetRules[jar.id];
    const amountPct = balance > 0 ? (amount / balance) * 100 : 0;

    if (action === 'transfer') {
      updateJarBalance(jar.id, jar.balance - amount);
      
      // Update main wallet balance
      const newBalance = balance + amount;
      useWalletStore.getState().updateWalletBalance(newBalance);

      // Adjust percentages so other category KES values remain constant, and transfer target increases
      jars.forEach((j) => {
        const jRule = budgetRules[j.id];
        if (!jRule) return;
        if (j.id === jar.id) {
          const newPctJ = ((balance * jRule.value) + (amount * 100)) / newBalance;
          setBudgetRule(j.id, { ...jRule, value: Math.max(0, newPctJ) });
        } else {
          const newPctI = (jRule.value * balance) / newBalance;
          setBudgetRule(j.id, { ...jRule, value: newPctI });
        }
      });

      addTransaction({
        id: Date.now().toString(),
        wallet_id: walletId || 'local',
        jar_id: jar.id,
        amount: amount,
        type: 'credit',
        description: `Un-allocated from ${jar.name}`,
        created_at: new Date().toISOString()
      });
      toast.success(`Transferred ${formatCurrency(amount)} from ${jar.name} back to Main Wallet!`);
    } else if (action === 'spend') {
      updateJarBalance(jar.id, jar.balance - amount);
      if (currentRule) {
        setBudgetRule(jar.id, { ...currentRule, value: Math.max(0, currentRule.value - amountPct) });
      }
      addTransaction({
        id: Date.now().toString(),
        wallet_id: walletId || 'local',
        jar_id: jar.id,
        amount: amount,
        type: 'debit',
        description: `Spent from ${jar.name}`,
        created_at: new Date().toISOString()
      });
      toast.success(`Recorded spending of ${formatCurrency(amount)} from ${jar.name}!`);
    } else if (action === 'transfer-jar' && transferTargetId) {
      const targetJar = jars.find(j => j.id === transferTargetId);
      if (!targetJar) return;
      
      updateJarBalance(jar.id, jar.balance - amount);
      updateJarBalance(targetJar.id, targetJar.balance + amount);

      if (currentRule) {
        setBudgetRule(jar.id, { ...currentRule, value: Math.max(0, currentRule.value - amountPct) });
      }
      
      const targetRule = budgetRules[targetJar.id] || { jarId: targetJar.id, type: 'percentage', value: 0 };
      setBudgetRule(targetJar.id, { ...targetRule, value: targetRule.value + amountPct });
      
      addTransaction({
        id: Date.now().toString(),
        wallet_id: 'local',
        jar_id: jar.id,
        amount: amount,
        type: 'debit',
        description: `Transferred to ${targetJar.name}`,
        created_at: new Date().toISOString()
      });
      addTransaction({
        id: Date.now().toString() + '1',
        wallet_id: walletId || 'local',
        jar_id: targetJar.id,
        amount: amount,
        type: 'credit',
        description: `Received from ${jar.name}`,
        created_at: new Date().toISOString()
      });
    }

    setActiveWithdrawal(null);
    setTransferTargetId('');
  };

  const handleAddJar = async () => {
    if (!newJar.name) return toast.error('Fill jar name');
    if (!walletId) return toast.error('Wallet not found');
    setIsAddingJar(false);
    
    try {
      await addJar({
        wallet_id: walletId,
        name: newJar.name,
        target: 0,
        balance: 0,
        category: newJar.category || 'custom',
        color: newJar.color,
        icon: newJar.icon,
      } as any);
      logActivity(`Created Goal: ${newJar.name}`, 'credit', 0);
      setNewJar({ name: '', category: 'Needs', color: 'bg-emerald-500', icon: 'PiggyBank' });
    } catch (err) {
      console.error('Failed to add jar', err);
      toast.error('Failed to save goal.');
    }
  };

  const handleMoveJar = (index: number, direction: 'up' | 'down') => {
    const newJars = [...jars];
    if (direction === 'up' && index > 0) {
      [newJars[index - 1], newJars[index]] = [newJars[index], newJars[index - 1]];
      setJars(newJars);
    } else if (direction === 'down' && index < newJars.length - 1) {
      [newJars[index + 1], newJars[index]] = [newJars[index], newJars[index + 1]];
      setJars(newJars);
    }
  };

  const renderIcon = (iconName?: string, cat?: string) => {
    const found = AVAILABLE_ICONS.find(i => i.name === iconName);
    if (found) {
      const IconComp = found.component;
      return <IconComp size={20} />;
    }
    switch(cat) {
      case 'spend': return <HandCoins size={20} />;
      case 'save': return <PiggyBank size={20} />;
      case 'invest': return <TrendingUp size={20} />;
      case 'give': return <Heart size={20} />;
      default: return <Wallet size={20} />;
    }
  };

  const handleDeleteJar = async (id: string) => {
    const jar = jars.find(j => j.id === id);
    if (!jar) return;

    if (jar && jar.balance > 0) {
      addTransaction({
        id: Date.now().toString(),
        wallet_id: walletId || 'local',
        jar_id: jar.id,
        amount: jar.balance,
        type: 'credit',
        description: `Cleared from deleted jar: ${jar.name}`,
        created_at: new Date().toISOString()
      });
    }
    logActivity(`Deleted Goal: ${jar.name}`, 'debit', 0);
    removeJar(jar.id);
    removeBudgetRule(jar.id);
    setJarToDelete(null);
  };

  const handleAddDebt = () => {
    if (!newDebt.name || !newDebt.total_amount) return toast.error('Fill all debt fields');
    setIsAddingDebt(false);
    
    setDebts([...debts, {
      id: Date.now().toString(),
      wallet_id: walletId || 'local',
      name: newDebt.name,
      total_amount: parseFloat(newDebt.total_amount),
      remaining_amount: parseFloat(newDebt.total_amount),
      created_at: new Date().toISOString()
    }]);
    logActivity(`Added Debt Tracker: ${newDebt.name}`, 'debit', parseFloat(newDebt.total_amount));
    
    setNewDebt({ name: '', total_amount: '' });
  };

  const handleRepayDebt = (debt: Debt) => {
    const amountStr = debtInputs[debt.id];
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return toast.error('Invalid repayment amount');
    if (amount > balance) return toast.error('Insufficient funds in Wallet to repay this much!');
    if (amount > debt.remaining_amount) return toast.error('Amount exceeds remaining debt!');

    const totalPct = (Object.values(budgetRules) as any[]).reduce((sum, r) => sum + (r?.value || 0), 0) as number;
    const debtRepaidPct = balance > 0 ? (sessionDebtRepaid / balance) * 100 : 0;
    const remPct = Math.max(0, 100 - totalPct - debtRepaidPct);
    const unallocatedCash = (balance * remPct) / 100;

    if (amount > unallocatedCash) {
      return toast.error(`Insufficient unallocated funds! You only have ${formatCurrency(Math.round(unallocatedCash))} available.`);
    }

    setDebtInputs({ ...debtInputs, [debt.id]: '' });

    const newSessionRepaid = sessionDebtRepaid + amount;
    setSessionDebtRepaid(newSessionRepaid);
    localStorage.setItem(`debtRepaid_${walletId || 'local'}`, newSessionRepaid.toString());

    setDebts(debts.map(d => d.id === debt.id ? { ...d, remaining_amount: d.remaining_amount - amount } : d));
    
    addTransaction({
      id: Date.now().toString(),
      wallet_id: walletId || 'local',
      amount: amount,
      type: 'debit',
      description: `Debt Repayment: ${debt.name}`,
      created_at: new Date().toISOString()
    });
  };

  const handleDeleteDebt = (debtId: string) => {
    const debt = debts.find(d => d.id === debtId);
    if (debt) logActivity(`Deleted Debt Tracker: ${debt.name}`, 'credit', 0);
    setDebts(debts.filter(d => d.id !== debtId));
  };


  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto custom-scrollbar pr-2 pb-8">
      {/* HEADER & WALLET */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-brand-secondary rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-xl">
          <div className="absolute top-0 right-0 p-8">
            <Wallet size={48} className="text-white/10" />
          </div>
          <div>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Main Wallet Balance</p>
            {isEditingWallet ? (
              <div className="flex items-center gap-2 mt-1">
                <input 
                  type="number" 
                  value={newWalletBalance} 
                  onChange={e => setNewWalletBalance(e.target.value)} 
                  className="bg-white/20 text-white font-black text-4xl p-1 px-2 rounded outline-none w-48 border border-white/30 tabular-nums" 
                  autoFocus
                />
                <button 
                  onClick={() => { 
                    const nb = parseFloat(newWalletBalance);
                    if (!isNaN(nb) && nb >= 0) {
                      setPendingWalletUpdate(nb);
                    }
                    setIsEditingWallet(false); 
                  }} 
                  className="bg-brand-accent text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#5a781c] cursor-pointer shadow-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <h3 className="text-4xl font-black tabular-nums">{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xl">KES</span></h3>
                <button onClick={() => { setIsEditingWallet(true); setNewWalletBalance(balance.toString()); }} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors" title="Edit Wallet Balance">
                  <Edit2 size={14} />
                </button>
              </div>
            )}
          </div>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex bg-white/10 rounded-xl overflow-hidden p-1 backdrop-blur-sm border border-white/20">
                <input 
                  type="number" 
                  value={depositAmount} 
                  onChange={(e) => setDepositAmount(e.target.value)} 
                  placeholder="Amount (KES)" 
                  className="w-full bg-transparent text-white px-3 py-2 outline-none placeholder:text-white/50 text-sm font-bold" 
                />
                <button 
                  onClick={() => {
                    const amount = parseFloat(depositAmount);
                    if (isNaN(amount) || amount <= 0) return toast.error('Invalid amount');
                    const nb = balance - amount;
                    if (nb < 0) return toast.error('Insufficient funds in Wallet!');
                    setDepositAmount('');
                    setPendingWalletUpdate(nb);
                  }}
                  className="bg-rose-500/80 text-white px-3 py-2 rounded-lg font-bold flex items-center justify-center gap-1 hover:bg-rose-500 transition-all shadow-md cursor-pointer flex-shrink-0 text-sm mr-1"
                >
                  <Minus size={16} /> Subtract
                </button>
                <button 
                  onClick={handleDeposit}
                  className="bg-brand-primary text-brand-secondary px-3 py-2 rounded-lg font-bold flex items-center justify-center gap-1 hover:bg-brand-primary/80 transition-all shadow-md cursor-pointer flex-shrink-0 text-sm"
                >
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>
          
          <div className="bg-white/10 rounded-2xl p-4 mt-4 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Smart Budget Rules</h4>
              <button 
                onClick={() => {
                  setTempRules({ ...budgetRules });
                  setIsEditingBudget(!isEditingBudget);
                }} 
                className="text-white hover:text-[#D4A373] cursor-pointer"
              >
                <Edit2 size={16} />
              </button>
            </div>
            
            {isEditingBudget ? (
              <div className="flex flex-col gap-3">
                {jars.map((jar) => {
                  const rule = tempRules[jar.id] || { jarId: jar.id, type: 'percentage', value: 0 };
                  
                  // Calculate dynamic values based on balance + deposit preview (or {formatCurrency(1000)} baseline if empty)
                  const totalPreviewBalance = balance + (parseFloat(depositAmount) || 0);
                  const refBalance = totalPreviewBalance > 0 ? totalPreviewBalance : 1000;
                  
                  const pctVal = rule.value;
                  const cashVal = (refBalance * pctVal) / 100;
                  
                  return (
                    <div key={jar.id} className="flex items-center justify-between text-sm gap-2">
                      <span className="capitalize font-bold truncate pr-2 w-20 text-white/90">{jar.name}</span>
                      
                      <div className="flex items-center rounded px-2 w-24 transition-colors bg-white/20 border border-white/40 ring-1 ring-white/20">
                        <input 
                          type="number" 
                          value={cashVal === 0 ? '' : Math.round(cashVal)} 
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            const newPct = (val / refBalance) * 100;
                            setTempRules({...tempRules, [jar.id]: { jarId: jar.id, type: 'percentage', value: newPct }});
                          }}
                          className="w-full bg-transparent py-1 text-right outline-none placeholder-white/30 text-white font-bold"
                          placeholder="0"
                        />
                        <span className="text-[10px] ml-1 text-white/80">KES</span>
                      </div>

                      <div className="flex items-center rounded px-2 w-16 transition-colors bg-white/20 border border-white/40 ring-1 ring-white/20">
                        <input 
                          type="number" 
                          value={pctVal === 0 ? '' : pctVal} 
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setTempRules({...tempRules, [jar.id]: { jarId: jar.id, type: 'percentage', value: val }});
                          }}
                          className="w-full bg-transparent py-1 text-right outline-none placeholder-white/30 text-white font-bold"
                          placeholder="0"
                        />
                        <span className="text-xs ml-1 text-white font-bold">%</span>
                      </div>
                    </div>
                  );
                })}
                
                {(() => {
                  const totalTempPct = (Object.values(tempRules) as any[]).reduce((sum, r) => sum + (r?.value || 0), 0) as number;
                  const totalPreviewBalance = balance + (parseFloat(depositAmount) || 0);
                  const refBalance = totalPreviewBalance > 0 ? totalPreviewBalance : 1000;
                  const debtRepaidPct = refBalance > 0 ? (sessionDebtRepaid / refBalance) * 100 : 0;
                  const remTempPct = Math.max(0, 100 - totalTempPct - debtRepaidPct);
                  return (
                    <div className="mt-2 pt-2 border-t border-white/20 flex flex-col gap-1">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Total Budgeted:</span>
                        <span className="font-bold text-white">{totalTempPct.toFixed(1)}% ({formatCurrency(Math.round((refBalance * totalTempPct)/100))})</span>
                      </div>
                      <div className={`flex justify-between text-xs font-medium ${remTempPct > 0 ? 'text-rose-300/80' : 'text-emerald-300/80'}`}>
                        <span>Unallocated:</span>
                        <span>{remTempPct.toFixed(1)}% ({formatCurrency(Math.round((refBalance * remTempPct)/100))})</span>
                      </div>
                    </div>
                  );
                })()}
                <button 
                  onClick={() => setIsAddingJar(true)}
                  className="w-full mt-2 py-2 border border-dashed border-white/30 rounded-xl text-white/70 hover:text-white hover:border-white/60 hover:bg-white/5 transition-all text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus size={16} /> Add Custom Rule
                </button>
                <div className="flex gap-2">
                  <button onClick={handleResetRules} className="flex-1 mt-2 bg-stone-500/20 text-stone-300 py-2 rounded-xl text-sm font-bold hover:bg-rose-500 hover:text-white transition-colors cursor-pointer">
                    Clear Rules
                  </button>
                  <button onClick={handleSaveBudgetRules} className="flex-1 mt-2 bg-[#D4A373] text-white py-2 rounded-xl text-sm font-bold hover:bg-[#b58b62] cursor-pointer">
                    Save Rules
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {jars.map((jar) => {
                  const rule = budgetRules[jar.id];
                  if (!rule || rule.value <= 0) return null;
                  const totalPreviewBalance = balance + (parseFloat(depositAmount) || 0);
                  const refBalance = totalPreviewBalance;
                  const cashVal = (refBalance * rule.value) / 100;
                  return (
                    <div key={jar.id} className="flex items-center justify-between text-sm">
                      <span className="capitalize font-medium text-white/70">{jar.name}</span>
                      <div className="flex gap-2 items-center">
                        <span className="text-white/50 text-xs">{formatCurrency(Math.round(cashVal))}</span>
                        <span className="font-bold w-12 text-right">
                          {`${rule.value.toFixed(1)}%`}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {(() => {
                  const totalPct = (Object.values(budgetRules) as any[]).reduce((sum, r) => sum + (r?.value || 0), 0) as number;
                  const totalPreviewBalance = balance + (parseFloat(depositAmount) || 0);
                  const refBalance = totalPreviewBalance;
                  const debtRepaidPct = refBalance > 0 ? (sessionDebtRepaid / refBalance) * 100 : 0;
                  const remPct = Math.max(0, 100 - totalPct - debtRepaidPct);
                  return (
                    <div className="mt-2 pt-2 border-t border-white/20 flex flex-col gap-1">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Total Budgeted:</span>
                        <span className="font-bold text-white">{totalPct.toFixed(1)}% ({formatCurrency(Math.round((refBalance * totalPct)/100))})</span>
                      </div>
                      {remPct > 0 && (
                        <div className="flex justify-between text-xs text-rose-300/80 font-medium">
                          <span>Unallocated:</span>
                          <span>{remPct.toFixed(1)}% ({formatCurrency(Math.round((refBalance * remPct)/100))})</span>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
            <p className="text-[10px] text-white/50 mt-4 leading-tight">Cash ins are automatically routed to your jars based on these rules.</p>
          </div>
        </div>

        {/* WEALTH JARS */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-brand-primary brand tracking-wide">Wealth Jars</h2>
              <p className="text-stone-500 text-sm font-medium">Allocate your money to specific goals.</p>
            </div>
            <button 
              onClick={() => setIsAddingJar(!isAddingJar)}
              className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-xl font-bold text-sm hover:bg-brand-primary hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isAddingJar ? 'Cancel' : <><Plus size={16}/> Add Goal</>}
            </button>
          </div>

          <AnimatePresence>
            {isAddingJar && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-wrap gap-4 items-end mb-2">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Goal Name</label>
                    <input type="text" value={newJar.name} onChange={e => setNewJar({...newJar, name: e.target.value})} placeholder="e.g. PS5, Tithing" className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-brand-accent text-stone-900" />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Category</label>
                    <select value={newJar.category} onChange={e => setNewJar({...newJar, category: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-brand-accent text-stone-900">
                      <option value="Needs">Needs</option>
                      <option value="Wants">Wants</option>
                      <option value="Savings">Savings</option>
                      <option value="Investments">Investments</option>
                      <option value="Culture">Culture & Giving</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Color</label>
                    <div className="flex gap-1">
                      {AVAILABLE_COLORS.map(c => (
                        <div key={c} onClick={() => setNewJar({...newJar, color: c})} className={`w-6 h-6 rounded-full cursor-pointer ${c} ${newJar.color === c ? 'ring-2 ring-offset-1 ring-stone-800' : ''}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Icon</label>
                    <div className="flex gap-1">
                      {AVAILABLE_ICONS.map(i => {
                        const IconComp = i.component;
                        return (
                          <div key={i.name} onClick={() => setNewJar({...newJar, icon: i.name})} className={`p-1 rounded cursor-pointer ${newJar.icon === i.name ? 'bg-stone-200' : 'hover:bg-stone-100'}`}>
                            <IconComp size={16} className="text-stone-600" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <button onClick={handleAddJar} className="bg-brand-accent text-white px-6 py-2 rounded-lg font-bold hover:bg-[#5a781c] cursor-pointer">Create</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-4">
            {jars.length === 0 && !isAddingJar && (
              <div className="col-span-2 text-center p-8 border-2 border-dashed border-stone-200 rounded-2xl text-stone-400 font-medium">
                No jars created yet. Set a financial goal to start budgeting!
              </div>
            )}
            {jars.map((jar, index) => (
              <motion.div whileHover={{ scale: 1.02 }} key={jar.id} className={`p-5 rounded-[24px] border border-stone-200 bg-white flex flex-col justify-between shadow-sm relative overflow-hidden group`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${
                    jar.color || (
                      jar.category === 'spend' ? 'bg-amber-500' :
                      jar.category === 'save' ? 'bg-emerald-500' :
                      jar.category === 'invest' ? 'bg-purple-500' :
                      jar.category === 'give' ? 'bg-rose-500' : 'bg-stone-500'
                    )
                  }`}>
                    {renderIcon(jar.icon, jar.category)}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleMoveJar(index, 'up')} disabled={index === 0} className="w-8 h-8 rounded-lg text-stone-400 hover:bg-stone-100 flex items-center justify-center cursor-pointer disabled:opacity-30">
                      <ArrowUp size={16} />
                    </button>
                    <button onClick={() => handleMoveJar(index, 'down')} disabled={index === jars.length - 1} className="w-8 h-8 rounded-lg text-stone-400 hover:bg-stone-100 flex items-center justify-center cursor-pointer disabled:opacity-30">
                      <ArrowDown size={16} />
                    </button>
                    <button 
                      onClick={() => setJarToDelete(jar.id)} 
                      className="w-8 h-8 rounded-lg text-red-400 hover:bg-red-50 flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <input 
                      type="text" 
                      defaultValue={jar.name}
                      onBlur={(e) => {
                        if (e.target.value && e.target.value !== jar.name) {
                          renameJar(jar.id, e.target.value);
                        }
                      }}
                      className="text-stone-800 font-bold text-lg leading-none bg-transparent outline-none w-3/4 border-b border-transparent focus:border-stone-300"
                    />
                    <span className="text-[10px] font-black uppercase text-stone-400">{jar.category}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    {editingJarId === jar.id ? (
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          value={editingJarBalance} 
                          onChange={e => setEditingJarBalance(e.target.value)} 
                          className="bg-stone-100 text-brand-secondary font-black text-2xl p-1 px-2 rounded outline-none w-32 border border-stone-200 tabular-nums" 
                          autoFocus
                        />
                        <button 
                          onClick={() => { 
                            const nb = parseFloat(editingJarBalance);
                            if (!isNaN(nb) && nb >= 0) {
                              const rule = budgetRules[jar.id];
                              if (!rule || rule.value <= 0) {
                                return toast.error('Cannot route money to a jar without a Budget Rule percentage!');
                              }
                              const refBalance = balance;
                              const allocatedLimit = (refBalance * rule.value) / 100;
                              
                              if (nb > allocatedLimit + 0.01) {
                                return toast.error(`Amount exceeds the budgeted limit of ${formatCurrency(Math.round(allocatedLimit))}!`);
                              }

                              updateJarBalance(jar.id, nb);
                            }
                            setEditingJarId(null); 
                          }} 
                          className="bg-brand-accent text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-[#5a781c] cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <h4 className="text-2xl font-black text-brand-secondary tabular-nums">{jar.balance.toLocaleString()} <span className="text-sm font-bold text-stone-600">KES</span></h4>
                        <button onClick={() => { setEditingJarId(jar.id); setEditingJarBalance(jar.balance.toString()); }} className="w-6 h-6 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700 cursor-pointer transition-colors" title="Edit Goal Balance">
                          <Edit2 size={12} />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center bg-stone-50 border border-stone-200 rounded-lg p-1">
                    <input 
                      type="number" 
                      placeholder="Amount" 
                      value={jarInputs[jar.id] || ''}
                      onChange={(e) => setJarInputs({ ...jarInputs, [jar.id]: e.target.value })}
                      className="w-full bg-transparent px-2 text-sm outline-none font-bold text-stone-700 placeholder:font-normal"
                    />
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => handleWithdrawFromJar(jar)} className="px-2 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer transition-colors"><Minus size={14}/></button>
                      <button onClick={() => handleAllocate(jar)} className="px-2 py-1 rounded bg-brand-accent hover:bg-[#5a781c] text-white cursor-pointer transition-colors"><Plus size={14}/></button>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* WITHDRAWAL OPTIONS MODAL */}
      <AnimatePresence>
        {activeWithdrawal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-stone-900 rounded-[32px] p-8 max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-800"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-brand-secondary dark:text-[#D4A373] brand">Withdraw Funds</h3>
                  <p className="text-stone-500 font-medium mt-1">
                    How do you want to process this {formatCurrency(activeWithdrawal.amount)} from {activeWithdrawal.jar.name}?
                  </p>
                </div>
                <button onClick={() => setActiveWithdrawal(null)} className="text-stone-400 hover:text-stone-600 bg-stone-100 p-2 rounded-full cursor-pointer"><X size={20} /></button>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => confirmWithdrawal('transfer')}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-brand-accent/20 hover:border-brand-accent hover:bg-brand-accent/5 transition-all text-left cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 dark:text-stone-200">Transfer to Wallet</h4>
                    <p className="text-xs text-stone-500 mt-1">Move the funds back to your Main Wallet balance to be re-allocated.</p>
                  </div>
                </button>

                <button 
                  onClick={() => confirmWithdrawal('spend')}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-amber-500/20 hover:border-amber-500 hover:bg-amber-500/5 transition-all text-left cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    <Minus size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 dark:text-stone-200">Record as Spent</h4>
                    <p className="text-xs text-stone-500 mt-1">Deduct the money entirely. It will leave your digital wallet system.</p>
                  </div>
                </button>

                <div className="flex flex-col gap-2 p-4 rounded-2xl border-2 border-purple-500/20 bg-purple-500/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <TrendingUp size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-stone-800 dark:text-stone-200">Transfer to Category</h4>
                      <p className="text-xs text-stone-500 mt-1">Move the funds directly to another active jar.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <select 
                      value={transferTargetId} 
                      onChange={(e) => setTransferTargetId(e.target.value)}
                      className="flex-1 bg-white border border-stone-200 rounded-lg px-2 py-2 text-sm outline-none text-stone-900 font-medium"
                    >
                      <option value="">Select target...</option>
                      {jars.filter(j => j.id !== activeWithdrawal.jar.id).map(j => (
                        <option key={j.id} value={j.id}>{j.name}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => confirmWithdrawal('transfer-jar')}
                      disabled={!transferTargetId}
                      className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 cursor-pointer"
                    >
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WALLET UPDATE CONFIRMATION MODAL */}
      <AnimatePresence>
        {pendingWalletUpdate !== null && (
          <div className="fixed inset-0 bg-stone-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-brand-secondary">Update Budget Cycle?</h3>
                <button onClick={() => setPendingWalletUpdate(null)} className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 hover:bg-stone-200 cursor-pointer">
                  <X size={16} />
                </button>
              </div>
              
              <p className="text-stone-600 mb-6 text-sm">
                You are setting your Main Wallet Balance to <strong className="text-brand-secondary">{formatCurrency(pendingWalletUpdate)}</strong>. Do you want to start a completely fresh budget cycle, or just update the balance while keeping current jar allocations?
              </p>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    jars.forEach(jar => {
                      if (jar.balance > 0) updateJarBalance(jar.id, 0);
                    });
                    setSessionDebtRepaid(0);
                    localStorage.setItem(`debtRepaid_${walletId || 'local'}`, '0');
                    
                    // Log adjustment transaction
                    const diff = pendingWalletUpdate - balance;
                    if (diff > 0) {
                      addTransaction({
                        id: Date.now().toString(),
                        wallet_id: walletId || 'local',
                        amount: diff,
                        type: 'credit',
                        description: 'Manual Wallet Deposit',
                        created_at: new Date().toISOString()
                      });
                    } else if (diff < 0) {
                      addTransaction({
                        id: Date.now().toString(),
                        wallet_id: walletId || 'local',
                        amount: Math.abs(diff),
                        type: 'debit',
                        description: 'Manual Subtraction',
                        created_at: new Date().toISOString()
                      });
                    }

                    useWalletStore.getState().updateWalletBalance(pendingWalletUpdate);
                    
                    const userId = useAppStore.getState().user?.id;
                    if (userId) {
                      import('../state/taskStore').then(({ useTaskStore }) => {
                        useTaskStore.getState().clearCompletedTasks(userId);
                      });
                    }

                    if (walletId) {
                      const baselineRulesStr = localStorage.getItem(`baseline_rules_${walletId}`);
                      if (baselineRulesStr) {
                        try {
                          const baselineRules = JSON.parse(baselineRulesStr);
                          useWalletStore.getState().setBudgetRules(baselineRules);
                          setTempRules(baselineRules);
                        } catch (err) {
                          console.error('Failed to restore baseline rules', err);
                        }
                      }
                    }

                    setPendingWalletUpdate(null);
                    toast.success('Wallet updated, jars reset, tasks cleared, and baseline rules restored!');
                  }}
                  className="w-full bg-brand-secondary text-white p-4 rounded-2xl font-bold hover:bg-[#1a220a] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="text-left">
                    <div className="text-base">Start Fresh Cycle</div>
                    <div className="text-xs text-white/60 font-normal">Reset jars & unallocated spent to 0</div>
                  </div>
                  <ArrowUpRight size={20} className="opacity-50" />
                </button>

                <button 
                  onClick={() => {
                    // Log adjustment transaction
                    const diff = pendingWalletUpdate - balance;
                    if (diff > 0) {
                      addTransaction({
                        id: Date.now().toString(),
                        wallet_id: walletId || 'local',
                        amount: diff,
                        type: 'credit',
                        description: 'Manual Wallet Deposit',
                        created_at: new Date().toISOString()
                      });
                    } else if (diff < 0) {
                      addTransaction({
                        id: Date.now().toString(),
                        wallet_id: walletId || 'local',
                        amount: Math.abs(diff),
                        type: 'debit',
                        description: 'Manual Subtraction',
                        created_at: new Date().toISOString()
                      });
                    }

                    useWalletStore.getState().updateWalletBalance(pendingWalletUpdate);
                    setPendingWalletUpdate(null);
                    toast.success('Wallet balance updated. Current cycle preserved!');
                  }}
                  className="w-full bg-stone-100 text-stone-800 p-4 rounded-2xl font-bold hover:bg-stone-200 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="text-left">
                    <div className="text-base">Continue Current Cycle</div>
                    <div className="text-xs text-stone-500 font-normal">Keep current jar balances & spent funds</div>
                  </div>
                  <TrendingUp size={20} className="text-stone-400" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DEBT MANAGEMENT & TRANSACTIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        
        {/* DEBT MANAGEMENT */}
        <div className="flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-rose-600 flex items-center gap-2"><AlertCircle size={20}/> Debt Tracker</h3>
              <p className="text-stone-500 text-xs font-medium">Take accountability and clear your liabilities.</p>
            </div>
            <button onClick={() => setIsAddingDebt(!isAddingDebt)} className="bg-rose-50 text-rose-600 p-2 rounded-lg hover:bg-rose-100 cursor-pointer">
              <Plus size={18} />
            </button>
          </div>

          <AnimatePresence>
            {isAddingDebt && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
                <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex flex-col gap-3">
                  <input type="text" value={newDebt.name} onChange={e => setNewDebt({...newDebt, name: e.target.value})} placeholder="Who/What do you owe?" className="w-full bg-white border border-rose-200 rounded-lg p-2 outline-none text-sm text-stone-900" />
                  <input type="number" value={newDebt.total_amount} onChange={e => setNewDebt({...newDebt, total_amount: e.target.value})} placeholder="Total Amount (KES)" className="w-full bg-white border border-rose-200 rounded-lg p-2 outline-none text-sm text-stone-900" />
                  <button onClick={handleAddDebt} className="bg-rose-500 text-white py-2 rounded-lg font-bold text-sm hover:bg-rose-600 cursor-pointer">Add Debt</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 space-y-3">
            {debts.length === 0 && !isAddingDebt && (
              <div className="text-center text-stone-600 font-bold py-8 text-sm">You are debt-free! Awesome!</div>
            )}
            {debts.map((debt) => (
              <div key={debt.id} className="p-4 bg-white border border-stone-200 rounded-2xl shadow-sm relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500" />
                <div className="flex justify-between items-start mb-2 pl-2 pr-16">
                  <input 
                    type="text" 
                    defaultValue={debt.name}
                    onBlur={(e) => {
                      if (e.target.value && e.target.value !== debt.name) {
                        setDebts(debts.map(d => d.id === debt.id ? { ...d, name: e.target.value } : d));
                      }
                    }}
                    className="font-bold text-stone-800 bg-transparent outline-none w-1/2 border-b border-transparent focus:border-stone-300 transition-colors"
                  />
                  <div className="text-right flex items-center gap-2">
                    {editingDebtId === debt.id ? (
                      <div className="flex items-center gap-1">
                        <input 
                          type="number" 
                          value={editingDebtBalance}
                          onChange={(e) => setEditingDebtBalance(e.target.value)}
                          className="w-20 text-right bg-stone-100 border border-stone-200 rounded px-1 font-black text-rose-600 outline-none"
                          autoFocus
                        />
                        <button 
                          onClick={() => {
                            const nb = parseFloat(editingDebtBalance);
                            if (!isNaN(nb) && nb >= 0) {
                              setDebts(debts.map(d => d.id === debt.id ? { ...d, remaining_amount: nb, total_amount: nb } : d));
                            }
                            setEditingDebtId(null);
                          }}
                          className="bg-emerald-500 text-white rounded p-1 hover:bg-emerald-600"
                        >
                          <Check size={14} />
                        </button>
                        <button 
                          onClick={() => setEditingDebtId(null)}
                          className="bg-stone-200 text-stone-600 rounded p-1 hover:bg-stone-300"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="font-black text-rose-600 tabular-nums mt-1">
                          {formatCurrency(debt.remaining_amount)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="absolute top-4 right-2 flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setEditingDebtId(debt.id);
                      setEditingDebtBalance(debt.remaining_amount.toString());
                    }}
                    className="text-stone-600 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Edit Debt Amount"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDeleteDebt(debt.id)}
                    className="text-stone-600 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Delete Debt"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-3 ml-2">
                  <div className="bg-rose-400 h-full transition-all" style={{ width: `${Math.max(100 - (debt.remaining_amount / debt.total_amount) * 100, 0)}%` }} />
                </div>
                {debt.remaining_amount > 0 ? (
                  <div className="flex items-center gap-2 ml-2 mt-2">
                    <input 
                      type="number" 
                      placeholder="Amount" 
                      value={debtInputs[debt.id] || ''}
                      onChange={(e) => setDebtInputs({ ...debtInputs, [debt.id]: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 px-2 py-1.5 rounded-lg text-sm outline-none font-bold text-stone-700"
                    />
                    <button onClick={() => handleRepayDebt(debt)} className="px-4 py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-sm font-bold hover:bg-rose-100 transition-colors cursor-pointer whitespace-nowrap">
                      Repay
                    </button>
                  </div>
                ) : (
                  <div className="w-full text-center text-emerald-600 font-black text-sm uppercase tracking-widest py-2 ml-2">Fully Repaid! 🎉</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* WALLET HISTORY */}
        <div className="flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-brand-secondary">Wallet History</h3>
              {transactions.length > 0 && (
                <button 
                  onClick={() => setIsClearingHistory(true)}
                  className="text-xs font-bold text-rose-500 hover:text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>
            {transactions.length > 0 && (
              <input 
                type="text" 
                placeholder="Search history..." 
                value={historySearchQuery}
                onChange={(e) => setHistorySearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-sm outline-none text-stone-700"
              />
            )}
          </div>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
            {transactions.filter(t => 
              historySearchQuery === '' || 
              (t.description?.toLowerCase().includes(historySearchQuery.toLowerCase())) || 
              (t.amount.toString().includes(historySearchQuery))
            ).length === 0 ? (
              <div className="text-center text-stone-600 font-bold py-8 text-sm">No activity yet. Start interacting with your wallet!</div>
            ) : (
              transactions.filter(t => 
                historySearchQuery === '' || 
                (t.description?.toLowerCase().includes(historySearchQuery.toLowerCase())) || 
                (t.amount.toString().includes(historySearchQuery))
              ).map((t) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={t.id} className="p-3 bg-stone-50 border border-stone-100 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${t.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {t.type === 'credit' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-800 text-xs">{t.description}</h5>
                      <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">{new Date(t.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className={`font-black text-sm tabular-nums ${t.type === 'credit' ? 'text-emerald-600' : 'text-stone-800'}`}>
                    {t.type === 'credit' ? '+' : '-'}{Math.abs(t.amount)}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </div>

      {jarToDelete && (
        <div className="fixed inset-0 bg-stone-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-stone-800 mb-2">Delete Goal?</h3>
            <p className="text-stone-600 mb-6">Are you sure you want to delete this goal? Any funds currently in it will be returned to your main wallet.</p>
            <div className="flex gap-3">
              <button onClick={() => setJarToDelete(null)} className="flex-1 py-2 bg-stone-100 text-stone-700 font-bold rounded-xl hover:bg-stone-200 cursor-pointer">Cancel</button>
              <button onClick={() => handleDeleteJar(jarToDelete)} className="flex-1 py-2 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

      {isClearingHistory && (
        <div className="fixed inset-0 bg-stone-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-stone-800 mb-2">Clear History</h3>
            <p className="text-stone-600 mb-4 text-sm">Select the timeframe of history you want to permanently delete from your wallet.</p>
            
            <div className="flex flex-col gap-2 mb-6">
              <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer p-2 hover:bg-stone-50 rounded">
                <input type="radio" name="clearTimeframe" value="7days" checked={clearTimeframe === '7days'} onChange={() => setClearTimeframe('7days')} />
                Last 7 Days
              </label>
              <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer p-2 hover:bg-stone-50 rounded">
                <input type="radio" name="clearTimeframe" value="30days" checked={clearTimeframe === '30days'} onChange={() => setClearTimeframe('30days')} />
                Last 30 Days
              </label>
              <label className="flex items-center gap-2 text-sm text-rose-600 font-bold cursor-pointer p-2 hover:bg-rose-50 rounded">
                <input type="radio" name="clearTimeframe" value="all" checked={clearTimeframe === 'all'} onChange={() => setClearTimeframe('all')} />
                All History
              </label>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsClearingHistory(false)} className="flex-1 py-2 bg-stone-100 text-stone-700 font-bold rounded-xl hover:bg-stone-200 cursor-pointer">Cancel</button>
              <button 
                onClick={async () => {
                  await clearHistory(clearTimeframe);
                  setIsClearingHistory(false);
                  toast.success('History cleared successfully!');
                }} 
                className="flex-1 py-2 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
