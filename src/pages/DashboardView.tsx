import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Gem, X, Play } from 'lucide-react';
import { User, Tier, Module, Task, View } from '../types';
import { ModuleCard } from '../components/ModuleCard';
import { SavingsGoalCard } from '../components/SavingsGoalCard';
import { TaskBoard } from '../components/TaskBoard';
import { MaliBot } from '../components/MaliBot';
import { useWalletStore } from '../state/walletStore';
import { useWealthJarStore } from '../state/wealthJarStore';
import { useTaskStore } from '../state/taskStore';
import { useAppStore } from '../state/store';
import { ActiveModuleProgress } from '../components/dashboard/ActiveModuleProgress';
import { supabase } from '../lib/supabase';
import { toast } from '../state/toastStore';
import { formatCurrency } from '../lib/currency';

export interface DashboardViewProps {
  user: User;
  modules: Module[];
  chatHistory: any[];
  onSendMessage: (text: string) => void;
  onNavigate?: (view: View) => void;
  onSelectModule?: (module: Module) => void;
  onUpgradeClick?: () => void;
  isThinking?: boolean;
}

export function DashboardView({ user, modules, chatHistory, onSendMessage, onNavigate, onSelectModule, onUpgradeClick, isThinking }: DashboardViewProps) {
  const { tier } = user;
  const activeModule = modules.find(m => m.progress < 100 && !m.locked) || modules[0];
  
  const { jars } = useWealthJarStore();
  const { balance } = useWalletStore();
  const { tasks, addTask, toggleTaskComplete } = useTaskStore();

  const [childChallenges, setChildChallenges] = useState<any[]>([]);

  // Fetch active/pending challenges from DB (with LocalStorage fallback)
  const fetchChildChallenges = async () => {
    if (!user?.id || user.tier === 'parent') return;
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('child_id', user.id)
        .in('status', ['active', 'pending_approval']);
      if (error) throw error;
      if (data) {
        setChildChallenges(data);
      }
    } catch (err) {
      console.warn('Failed to fetch challenges on student dashboard, using local storage fallback:', err);
      const localChs = JSON.parse(localStorage.getItem('mali_local_challenges') || '[]');
      const filtered = localChs.filter((c: any) => c.child_id === user.id && ['active', 'pending_approval'].includes(c.status));
      setChildChallenges(filtered);
    }
  };

  useEffect(() => {
    fetchChildChallenges();
  }, [user?.id]);

  const totalAvailableReward = tasks.reduce((acc, t) => acc + t.reward, 0);
  const earnedReward = tasks.filter(t => t.completed).reduce((acc, t) => acc + t.reward, 0);
  const earnProgress = totalAvailableReward > 0 ? (earnedReward / totalAvailableReward) * 100 : 0;
  
  const saveJar = jars.find(j => j.category === 'save');
  const totalWealth = balance + jars.reduce((acc, jar) => acc + jar.balance, 0);
  const saveProgress = totalWealth > 0 && saveJar ? (saveJar.balance / totalWealth) * 100 : 0;

  const handleCompleteTask = (task: Task) => {
    if (task.reward > 0) {
      useAppStore.getState().setPendingTaskReward({
        taskId: task.id,
        reward: task.reward,
        title: task.title
      });
    } else {
      toggleTaskComplete(task.id, user.id, () => {});
    }
  };

  const handleAddTask = (title: string, reward: number) => {
    addTask(user.id, title, 'chore', reward);
  };

  const getJarColor = (cat: string) => {
    switch(cat) {
      case 'spend': return 'bg-blue-500';
      case 'save': return 'bg-emerald-500';
      case 'invest': return 'bg-purple-500';
      case 'give': return 'bg-rose-500';
      default: return 'bg-brand-accent';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0 overflow-y-auto lg:overflow-y-auto relative">
      
      <div className="lg:col-span-8 flex flex-col gap-8 overflow-y-auto lg:pr-2 custom-scrollbar lg:h-full">
        
        {activeModule && (
          <ActiveModuleProgress 
            activeModule={activeModule}
            earnProgress={earnProgress}
            saveProgress={saveProgress}
            onNavigate={onNavigate}
            onSelectModule={onSelectModule}
          />
        )}

        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-brand-secondary">Learn Modules</h3>
            <button 
              onClick={() => onNavigate?.('learn')}
              className="text-[10px] font-black text-brand-accent uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity"
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
             <h3 className="text-xl md:text-2xl font-bold text-brand-secondary">Wealth Jars</h3>
             <button 
               onClick={() => onNavigate?.('wallet')}
               className="text-[10px] font-black text-brand-accent uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity"
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
        <MaliBot user={user} chatHistory={chatHistory} onSendMessage={onSendMessage} onUpgradeClick={onUpgradeClick} isThinking={isThinking} />
        
        {/* Active Challenges */}
        {childChallenges.length > 0 && (
          <div className="bg-white dark:bg-[#121212] rounded-[32px] p-6 shadow-sm border border-stone-100 dark:border-stone-800/50 relative overflow-hidden mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">Active Challenges</h3>
            </div>
            <div className="space-y-3">
              {childChallenges.map((challenge) => (
                <div key={challenge.id} className="flex flex-col p-4 bg-brand-primary/10 dark:bg-brand-primary/5 rounded-2xl border border-brand-primary/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{challenge.title}</span>
                    <span className="text-xs font-black text-brand-primary">+{formatCurrency(challenge.reward_amount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {challenge.status === 'pending_approval' ? 'Pending Approval' : `Duration: ${challenge.duration_days} Days`}
                    </span>
                    {challenge.status === 'active' ? (
                      <button 
                        onClick={async () => {
                          try {
                            const { error } = await supabase.from('challenges').update({ status: 'pending_approval' }).eq('id', challenge.id);
                            if (error) throw error;
                            setChildChallenges(prev => prev.map(c => c.id === challenge.id ? { ...c, status: 'pending_approval' } : c));
                            toast.success('Challenge logged as completed! Pending parent approval.');
                          } catch (err) {
                            console.warn('Failed to update challenge status on DB, using local storage fallback:', err);
                            const localChs = JSON.parse(localStorage.getItem('mali_local_challenges') || '[]');
                            const updated = localChs.map((c: any) => c.id === challenge.id ? { ...c, status: 'pending_approval' } : c);
                            localStorage.setItem('mali_local_challenges', JSON.stringify(updated));
                            setChildChallenges(prev => prev.map(c => c.id === challenge.id ? { ...c, status: 'pending_approval' } : c));
                            toast.success('Challenge logged as completed (local fallback)! Pending parent approval.');
                          }
                        }}
                        className="px-3 py-1.5 bg-brand-primary text-white rounded-full text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                      >
                        Log Completion
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-500 rounded-full text-xs font-bold">
                        Logged
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <TaskBoard tasks={tasks} onCompleteTask={handleCompleteTask} onAddTask={handleAddTask} />
  
      </div>
    </div>
  );
}
