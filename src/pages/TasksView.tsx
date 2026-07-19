import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../lib/currency';
import { supabase } from '../lib/supabase';
import { toast } from '../state/toastStore';
import { Target, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, Plus, Filter, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { useAchievement } from '../context/AchievementContext';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';

import { useTaskStore } from '../state/taskStore';
import { useAppStore } from '../state/store';

export function TasksView() {
  const [filter, setFilter] = useState<'all' | 'chore' | 'hustle' | 'completed'>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', category: 'chore', reward: '' });
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { tasks, addTask, toggleTaskComplete, deleteTask } = useTaskStore();
  const user = useAppStore(state => state.user);
  
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(false);

  const fetchChallenges = async () => {
    if (!user || user.tier === 'parent') return;
    setLoadingChallenges(true);
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('child_id', user.id)
        .in('status', ['active', 'pending_approval'])
        .order('created_at', { ascending: false });
      if (error) throw error;
      setChallenges(data || []);
    } catch (err) {
      console.warn('Failed to fetch challenges in TasksView, using local storage fallback:', err);
      const localChs = JSON.parse(localStorage.getItem('mali_local_challenges') || '[]');
      const filtered = localChs.filter((c: any) => c.child_id === user.id && ['active', 'pending_approval'].includes(c.status));
      setChallenges(filtered);
    } finally {
      setLoadingChallenges(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, [user?.id]);

  const handleLogChallengeCompletion = async (challengeId: string) => {
    try {
      const { error } = await supabase
        .from('challenges')
        .update({ status: 'pending_approval' })
        .eq('id', challengeId);
      if (error) throw error;
      
      setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, status: 'pending_approval' } : c));
      toast.success('Challenge logged as completed! Pending parent approval.');
    } catch (err) {
      console.warn('Failed to update challenge in DB, using local storage fallback:', err);
      const localChs = JSON.parse(localStorage.getItem('mali_local_challenges') || '[]');
      const updated = localChs.map((c: any) => c.id === challengeId ? { ...c, status: 'pending_approval' } : c);
      localStorage.setItem('mali_local_challenges', JSON.stringify(updated));
      setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, status: 'pending_approval' } : c));
      toast.success('Challenge logged as completed (local fallback)! Pending parent approval.');
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'completed') return t.completed;
    return t.category === filter;
  });

  const { track } = useAchievement();

  const toggleTask = (id: string) => {
    if (!user) return;
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    if (task.reward > 0 && !task.completed) {
      useAppStore.getState().setPendingTaskReward({
        taskId: task.id,
        reward: task.reward,
        title: task.title
      });
    } else {
      toggleTaskComplete(id, user.id, track);
    }
  };

  const handleDeleteTaskClick = (task: Task) => {
    if (task.completed) {
      setTaskToDelete(task);
    } else {
      if (!user) return;
      deleteTask(task.id, user.id);
    }
  };

  const confirmDeleteTask = async () => {
    if (!user || !taskToDelete || isDeleting) return;
    setIsDeleting(true);
    try {
      // Reverse the exact reward from wallet and specific budget jar it was placed in
      if (taskToDelete.reward > 0) {
        const { useWalletStore } = await import('../state/walletStore');
        await useWalletStore.getState().reverseTaskReward(taskToDelete);
      }
      
      await deleteTask(taskToDelete.id, user.id);
      setTaskToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.reward) return;
    const reward = parseInt(newTask.reward);
    if (isNaN(reward) || reward <= 0) return;
    
    if (!user) return;
    
    addTask(user.id, newTask.title, newTask.category as 'chore' | 'hustle', reward);
    setIsAddingTask(false);
    setNewTask({ title: '', category: 'chore', reward: '' });
  };

  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-brand-secondary brand">Side-Hustle Simulator</h2>
          <p className="text-stone-500 font-medium">Choose virtual gigs, complete real-world chores, and build your hustle!</p>
        </div>
        <button 
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="bg-brand-accent text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#6B8E23]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          {isAddingTask ? 'Cancel' : <><Plus size={20} /> Add New Task</>}
        </button>
      </div>

      <TaskForm 
        isAddingTask={isAddingTask}
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
      />

      {/* Parent Challenges Section */}
      {challenges.length > 0 && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-4">
          <h3 className="text-lg font-black text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Target className="text-brand-primary" size={22} /> Active Challenges from Accountability Partner
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map(c => {
              const isPending = c.status === 'pending_approval';
              return (
                <div 
                  key={c.id} 
                  className={`p-5 border rounded-2xl flex flex-col justify-between gap-4 transition-all ${
                    isPending 
                      ? 'bg-amber-50/40 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/30' 
                      : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-white text-sm">{c.title}</h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold mt-1 flex items-center gap-1">
                        <Clock size={12} /> Duration: {c.duration_days} Days
                      </p>
                    </div>
                    <span className="text-xs font-black text-brand-primary">+{formatCurrency(c.reward_amount)}</span>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isPending ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {isPending ? 'Pending Parent Approval' : 'Active'}
                    </span>

                    {!isPending && (
                      <button
                        onClick={() => handleLogChallengeCompletion(c.id)}
                        className="px-4 py-2 bg-brand-primary hover:opacity-90 active:scale-95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                      >
                        Log Completion
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${filter === 'all' ? 'bg-brand-accent text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>All Tasks</button>
        <button onClick={() => setFilter('chore')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${filter === 'chore' ? 'bg-brand-accent text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>Chores</button>
        <button onClick={() => setFilter('hustle')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${filter === 'hustle' ? 'bg-brand-accent text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>Virtual Gigs</button>
        <button onClick={() => setFilter('completed')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${filter === 'completed' ? 'bg-brand-accent text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>Completed</button>
      </div>

      <TaskList 
        filteredTasks={filteredTasks}
        toggleTask={toggleTask}
        handleDeleteTaskClick={handleDeleteTaskClick}
      />

      <AnimatePresence>
        {taskToDelete && (
          <div className="fixed inset-0 bg-stone-900/50 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-xl font-bold text-stone-800 mb-2">Reverse Task Reward?</h3>
              <p className="text-stone-600 mb-6 text-sm">
                This task is completed. Deleting it will reverse the <strong>{formatCurrency(taskToDelete.reward)}</strong> reward from your main wallet balance.
              </p>
              <div className="flex gap-3">
                <button disabled={isDeleting} onClick={() => setTaskToDelete(null)} className="flex-1 py-2 bg-stone-100 text-stone-700 font-bold rounded-xl hover:bg-stone-200 cursor-pointer disabled:opacity-50">Cancel</button>
                <button disabled={isDeleting} onClick={confirmDeleteTask} className="flex-1 py-2 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 cursor-pointer disabled:opacity-50">
                  {isDeleting ? 'Reversing...' : 'Reverse & Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
