import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, PiggyBank, Heart, TrendingUp, HandCoins, Trash2, Edit2, AlertCircle, Minus } from 'lucide-react';
import { useAppStore } from '../state/store';
import { WealthJar, Transaction, Debt } from '../types';

export function WalletView() {
  const { 
    balance, setBalance, 
    jars, setJars, updateJarBalance, 
    transactions, addTransaction, 
    debts, setDebts 
  } = useAppStore();

  // Modals & Forms
  const [isAddingJar, setIsAddingJar] = useState(false);
  const [newJar, setNewJar] = useState({ name: '', target: '', category: 'save' });

  const [isAddingDebt, setIsAddingDebt] = useState(false);
  const [newDebt, setNewDebt] = useState({ name: '', total_amount: '' });

  // Inline Inputs
  const [depositAmount, setDepositAmount] = useState('');
  const [jarInputs, setJarInputs] = useState<Record<string, string>>({});
  const [debtInputs, setDebtInputs] = useState<Record<string, string>>({});

  // Initialize default jars if none exist
  useEffect(() => {
    if (jars.length === 0) {
      setJars([
        { id: 'j-spend', wallet_id: 'local', name: 'Spend', category: 'spend', target: 5000, balance: 0, created_at: new Date().toISOString() },
        { id: 'j-save', wallet_id: 'local', name: 'Save', category: 'save', target: 2000, balance: 0, created_at: new Date().toISOString() },
        { id: 'j-invest', wallet_id: 'local', name: 'Invest', category: 'invest', target: 2000, balance: 0, created_at: new Date().toISOString() },
        { id: 'j-give', wallet_id: 'local', name: 'Give', category: 'give', target: 1000, balance: 0, created_at: new Date().toISOString() }
      ]);
    }
  }, [jars.length, setJars]);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return alert('Invalid deposit amount');
    
    setBalance(balance + amount);
    setDepositAmount('');
    
    addTransaction({
      id: Date.now().toString(),
      wallet_id: 'local',
      amount: amount,
      type: 'credit',
      description: 'Manual Deposit',
      created_at: new Date().toISOString()
    });
  };

  const handleAllocate = (jar: WealthJar) => {
    const amountStr = jarInputs[jar.id];
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return alert('Invalid allocation amount');
    if (amount > balance) return alert('Insufficient funds in Main Wallet!');

    setJarInputs({ ...jarInputs, [jar.id]: '' });
    
    setBalance(balance - amount);
    updateJarBalance(jar.id, jar.balance + amount);
    
    addTransaction({
      id: Date.now().toString(),
      wallet_id: 'local',
      jar_id: jar.id,
      amount: amount,
      type: 'debit',
      description: `Allocated to ${jar.name}`,
      created_at: new Date().toISOString()
    });
  };

  const handleWithdrawFromJar = (jar: WealthJar) => {
    const amountStr = jarInputs[jar.id];
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return alert('Invalid withdrawal amount');
    if (amount > jar.balance) return alert(`Insufficient funds in ${jar.name}!`);

    setJarInputs({ ...jarInputs, [jar.id]: '' });

    setBalance(balance + amount);
    updateJarBalance(jar.id, jar.balance - amount);
    
    addTransaction({
      id: Date.now().toString(),
      wallet_id: 'local',
      jar_id: jar.id,
      amount: amount,
      type: 'credit',
      description: `Withdrawn from ${jar.name}`,
      created_at: new Date().toISOString()
    });
  };

  const handleAddJar = () => {
    if (!newJar.name || !newJar.target) return alert('Fill all jar fields');
    setIsAddingJar(false);
    
    setJars([...jars, {
      id: Date.now().toString(),
      wallet_id: 'local',
      name: newJar.name,
      target: parseFloat(newJar.target),
      balance: 0,
      category: newJar.category as any,
      created_at: new Date().toISOString()
    }]);
    
    setNewJar({ name: '', target: '', category: 'save' });
  };

  const handleDeleteJar = (id: string) => {
    if (confirm('Are you sure you want to delete this jar? Any funds will be returned to the wallet.')) {
      const jar = jars.find(j => j.id === id);
      if (jar && jar.balance > 0) {
        setBalance(balance + jar.balance);
        addTransaction({
          id: Date.now().toString(),
          wallet_id: 'local',
          jar_id: jar.id,
          amount: jar.balance,
          type: 'credit',
          description: `Refunded from deleted jar: ${jar.name}`,
          created_at: new Date().toISOString()
        });
      }
      setJars(jars.filter(j => j.id !== id));
    }
  };

  const handleAddDebt = () => {
    if (!newDebt.name || !newDebt.total_amount) return alert('Fill all debt fields');
    setIsAddingDebt(false);
    
    setDebts([...debts, {
      id: Date.now().toString(),
      wallet_id: 'local',
      name: newDebt.name,
      total_amount: parseFloat(newDebt.total_amount),
      remaining_amount: parseFloat(newDebt.total_amount),
      created_at: new Date().toISOString()
    }]);
    
    setNewDebt({ name: '', total_amount: '' });
  };

  const handleRepayDebt = (debt: Debt) => {
    const amountStr = debtInputs[debt.id];
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return alert('Invalid repayment amount');
    if (amount > balance) return alert('Insufficient funds in Wallet to repay this much!');
    if (amount > debt.remaining_amount) return alert('Amount exceeds remaining debt!');

    setDebtInputs({ ...debtInputs, [debt.id]: '' });

    setBalance(balance - amount);
    setDebts(debts.map(d => d.id === debt.id ? { ...d, remaining_amount: d.remaining_amount - amount } : d));
    
    addTransaction({
      id: Date.now().toString(),
      wallet_id: 'local',
      amount: amount,
      type: 'debit',
      description: `Debt Repayment: ${debt.name}`,
      created_at: new Date().toISOString()
    });
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'spend': return <HandCoins size={20} className="text-blue-500" />;
      case 'save': return <PiggyBank size={20} className="text-emerald-500" />;
      case 'invest': return <TrendingUp size={20} className="text-purple-500" />;
      case 'give': return <Heart size={20} className="text-rose-500" />;
      default: return <Wallet size={20} className="text-stone-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto custom-scrollbar pr-2 pb-8">
      {/* HEADER & WALLET */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-[#2D3911] rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-xl">
          <div className="absolute top-0 right-0 p-8">
            <Wallet size={48} className="text-white/10" />
          </div>
          <div>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Main Wallet Balance</p>
            <h3 className="text-4xl font-black tabular-nums">{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xl">KES</span></h3>
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
                onClick={handleDeposit}
                className="bg-white text-[#2D3911] px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-1 hover:bg-[#D4A373] hover:text-white transition-all shadow-md cursor-pointer flex-shrink-0 text-sm"
              >
                <Plus size={16} /> Cash In
              </button>
            </div>
          </div>
        </div>

        {/* WEALTH JARS */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-[#2D3911] brand">Wealth Jars</h2>
              <p className="text-stone-500 text-sm font-medium">Allocate your money to specific goals.</p>
            </div>
            <button 
              onClick={() => setIsAddingJar(!isAddingJar)}
              className="bg-[#2D3911]/10 text-[#2D3911] px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#2D3911] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
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
                    <input type="text" value={newJar.name} onChange={e => setNewJar({...newJar, name: e.target.value})} placeholder="e.g. PS5, Tithing" className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-[#6B8E23]" />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Target (KES)</label>
                    <input type="number" value={newJar.target} onChange={e => setNewJar({...newJar, target: e.target.value})} placeholder="0.00" className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-[#6B8E23]" />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Category</label>
                    <select value={newJar.category} onChange={e => setNewJar({...newJar, category: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-[#6B8E23]">
                      <option value="spend">Spend</option>
                      <option value="save">Save</option>
                      <option value="invest">Invest</option>
                      <option value="give">Give</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <button onClick={handleAddJar} className="bg-[#6B8E23] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#5a781c] cursor-pointer">Create</button>
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
            {jars.map((jar) => (
              <motion.div whileHover={{ scale: 1.02 }} key={jar.id} className={`p-5 rounded-[24px] border border-stone-200 bg-white flex flex-col justify-between shadow-sm relative overflow-hidden group`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center border border-stone-100">
                    {getCategoryIcon(jar.category)}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDeleteJar(jar.id)} className="w-8 h-8 rounded-lg text-red-400 hover:bg-red-50 flex items-center justify-center cursor-pointer"><Trash2 size={16} /></button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-stone-800 font-bold text-lg leading-none">{jar.name}</p>
                    <span className="text-[10px] font-black uppercase text-stone-400">{jar.category}</span>
                  </div>
                  <h4 className="text-2xl font-black text-[#2D3911] tabular-nums mb-2">{jar.balance.toLocaleString()} <span className="text-sm font-bold text-stone-400">/ {jar.target.toLocaleString()}</span></h4>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-4">
                    <div className="bg-[#6B8E23] h-full" style={{ width: `${Math.min((jar.balance / jar.target) * 100, 100)}%` }} />
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
                      <button onClick={() => handleAllocate(jar)} className="px-2 py-1 rounded bg-[#6B8E23] hover:bg-[#5a781c] text-white cursor-pointer transition-colors"><Plus size={14}/></button>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* DEBT MANAGEMENT & TRANSACTIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
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
                  <input type="text" value={newDebt.name} onChange={e => setNewDebt({...newDebt, name: e.target.value})} placeholder="Who/What do you owe?" className="w-full bg-white border border-rose-200 rounded-lg p-2 outline-none text-sm" />
                  <input type="number" value={newDebt.total_amount} onChange={e => setNewDebt({...newDebt, total_amount: e.target.value})} placeholder="Total Amount (KES)" className="w-full bg-white border border-rose-200 rounded-lg p-2 outline-none text-sm" />
                  <button onClick={handleAddDebt} className="bg-rose-500 text-white py-2 rounded-lg font-bold text-sm hover:bg-rose-600 cursor-pointer">Add Debt</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 space-y-3">
            {debts.length === 0 && !isAddingDebt && (
              <div className="text-center text-stone-400 py-8 text-sm">You are debt-free! Awesome!</div>
            )}
            {debts.map((debt) => (
              <div key={debt.id} className="p-4 bg-white border border-stone-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500" />
                <div className="flex justify-between items-start mb-2 pl-2">
                  <h5 className="font-bold text-stone-800">{debt.name}</h5>
                  <div className="text-right">
                    <p className="font-black text-rose-600 tabular-nums">{debt.remaining_amount.toLocaleString()} KES</p>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest">Remaining</p>
                  </div>
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

        {/* TRANSACTION HISTORY */}
        <div className="flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
          <h3 className="text-xl font-bold text-[#2D3911] mb-4">Transaction History</h3>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center text-stone-400 py-8 text-sm">No transactions yet. Start transacting!</div>
            ) : (
              transactions.map((t) => (
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
    </div>
  );
}
