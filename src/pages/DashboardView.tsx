import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Gem, X, Play } from 'lucide-react';
import { User, Tier, Module, Task, View } from '../types';
import { ModuleCard } from '../components/ModuleCard';
import { SavingsGoalCard } from '../components/SavingsGoalCard';
import { TaskBoard } from '../components/TaskBoard';
import { MaliBot } from '../components/MaliBot';
import { useFinanceAPI } from '../hooks/useFinanceAPI';
import { useAppStore } from '../state/store';
import { useWalletStore } from '../state/walletStore';

interface DashboardViewProps {
  user: User;
  modules: Module[];
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  chatHistory: any[];
  onSendMessage: (text: string) => void;
  onNavigate?: (view: View) => void;
  onSelectModule?: (module: Module) => void;
}

export function DashboardView({ user, modules, tasks, setTasks, chatHistory, onSendMessage, onNavigate, onSelectModule }: DashboardViewProps) {
  const { tier } = user;
  const activeModule = modules.find(m => m.progress < 100 && !m.locked) || modules[0];
  
  const { completeTask, createTransaction } = useFinanceAPI();
  const { jars } = useAppStore();
  const { balance } = useWalletStore();

  const earnProgress = tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0;
  
  const saveJar = jars.find(j => j.category === 'save');
  const totalWealth = balance + jars.reduce((acc, jar) => acc + jar.balance, 0);
  const saveProgress = totalWealth > 0 && saveJar ? (saveJar.balance / totalWealth) * 100 : 0;

  const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000';
  const DEMO_WALLET_ID = '00000000-0000-0000-0000-000000000000';

  const handleCompleteTask = async (task: Task) => {
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true } : t));
    
    const success = await completeTask(task.id, DEMO_USER_ID);
    if (success || true) {
      await createTransaction({
        id: Date.now().toString(),
        wallet_id: DEMO_WALLET_ID,
        amount: task.reward,
        type: 'credit',
        description: `Task Reward: ${task.title}`,
        created_at: new Date().toISOString()
      });
      alert(`Awesome! You earned ${task.reward} KES. Check your wallet!`);
    }
  };

  const handleAddTask = (title: string, reward: number) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      reward,
      category: 'chore',
      completed: false
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const getJarColor = (cat: string) => {
    switch(cat) {
      case 'spend': return 'bg-blue-500';
      case 'save': return 'bg-emerald-500';
      case 'invest': return 'bg-purple-500';
      case 'give': return 'bg-rose-500';
      default: return 'bg-[#6B8E23]';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0 overflow-y-auto lg:overflow-y-auto relative">
      
      <div className="lg:col-span-8 flex flex-col gap-8 overflow-y-auto lg:pr-2 custom-scrollbar lg:h-full">
        
        {activeModule && (
          <motion.div 
            layout
            className="p-6 md:p-10 rounded-[32px] md:rounded-[40px] bg-[#6B8E23] text-white relative overflow-hidden flex flex-col min-h-[280px] shadow-2xl flex-shrink-0 cursor-pointer hover:scale-[1.01] transition-transform"
            onClick={() => onSelectModule?.(activeModule)}
          >
            <div className="absolute -top-12 -right-12 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-3xl"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative z-10 flex flex-col h-full"
              >
                <div className="self-start bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-auto">
                  TODAY'S CHALLENGE
                </div>
                
                <div className="flex items-center gap-4 mb-4 mt-8">
                  {activeModule.icon}
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                    {activeModule.title}
                  </h2>
                </div>
                <p className="text-[#F7F7F2]/90 max-w-lg text-sm md:text-lg font-medium leading-relaxed mb-6">
                  {activeModule.description}
                </p>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate?.('learn'); }}
                    className="flex-1 bg-black/20 hover:bg-black/30 transition-colors rounded-xl p-3 flex flex-col justify-between text-left cursor-pointer group"
                  >
                    <div className="text-[10px] font-black tracking-widest uppercase mb-2 group-hover:text-white transition-colors">Learn</div>
                    <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-[#D4A373] h-1.5 rounded-full transition-all" style={{ width: `${activeModule.progress}%` }} /></div>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate?.('tasks'); }}
                    className="flex-1 bg-black/20 hover:bg-black/30 transition-colors rounded-xl p-3 flex flex-col justify-between text-left cursor-pointer group"
                  >
                    <div className="text-[10px] font-black tracking-widest uppercase mb-2 group-hover:text-white transition-colors">Earn</div>
                    <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-yellow-400 h-1.5 rounded-full transition-all" style={{ width: `${earnProgress}%` }} /></div>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate?.('wallet'); }}
                    className="flex-1 bg-black/20 hover:bg-black/30 transition-colors rounded-xl p-3 flex flex-col justify-between text-left cursor-pointer group"
                  >
                    <div className="text-[10px] font-black tracking-widest uppercase mb-2 group-hover:text-white transition-colors">Save</div>
                    <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-[#A3B18A] h-1.5 rounded-full transition-all" style={{ width: `${saveProgress}%` }} /></div>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#2D3911]">Learn Modules</h3>
            <button 
              onClick={() => onNavigate?.('learn')}
              className="text-[10px] font-black text-[#6B8E23] uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {modules.slice(0, 3).map((m) => (
              <ModuleCard key={m.id} module={m} onClick={() => onSelectModule?.(m)} />
            ))}
          </div>
        </div>

        <div className="mb-8">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl md:text-2xl font-bold text-[#2D3911]">Wealth Jars</h3>
             <button 
               onClick={() => onNavigate?.('wallet')}
               className="text-[10px] font-black text-[#6B8E23] uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity"
             >
               Manage
             </button>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
             {jars.length > 0 ? jars.slice(0, 2).map(jar => (
               <SavingsGoalCard 
                 key={jar.id}
                 title={jar.name} 
                 target={jar.target} 
                 current={jar.balance} 
                 category={jar.category}
                 color={getJarColor(jar.category)}
                 onClick={() => onNavigate?.('wallet')}
               />
             )) : (
               <div className="col-span-2 text-stone-400 p-4 border-2 border-dashed border-stone-200 rounded-2xl text-center cursor-pointer" onClick={() => onNavigate?.('wallet')}>
                 No wealth jars configured yet. Click to setup your goals!
               </div>
             )}
           </div>
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8 pb-10 lg:pb-0 h-full">
        <MaliBot user={user} chatHistory={chatHistory} onSendMessage={onSendMessage} />
        <TaskBoard tasks={tasks} onCompleteTask={handleCompleteTask} onAddTask={handleAddTask} />
      </div>
    </div>
  );
}
