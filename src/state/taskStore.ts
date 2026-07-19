import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Task } from '../types';
import { useWalletStore } from './walletStore';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;

  fetchTasks: (userId: string) => Promise<void>;
  addTask: (userId: string, title: string, category: 'chore' | 'hustle', reward: number) => Promise<void>;
  toggleTaskComplete: (taskId: string, userId: string, trackFn: (achievementId: string) => void) => Promise<void>;
  deleteTask: (taskId: string, userId: string) => Promise<void>;
  clearCompletedTasks: (userId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        set({ tasks: data, isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  addTask: async (userId, title, category, reward) => {
    try {
      const { data, error } = await supabase
        .from('user_tasks')
        .insert({ user_id: userId, title, category, reward, completed: false })
        .select()
        .single();
        
      if (error) throw error;
      if (data) {
        set(state => ({ tasks: [data, ...state.tasks] }));
      }
    } catch (err: any) {
      console.error('Failed to add task:', err);
    }
  },

  toggleTaskComplete: async (taskId, userId, trackFn) => {
    try {
      const task = get().tasks.find(t => t.id === taskId);
      if (!task) return;
      
      const newStatus = !task.completed;
      if (newStatus) trackFn('TASK_COMPLETED');

      const { error } = await supabase
        .from('user_tasks')
        .update({ completed: newStatus })
        .eq('id', taskId)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }
      
      // If task was successfully marked completed, deposit the reward!
      if (newStatus && task.reward && task.reward > 0) {
        await useWalletStore.getState().depositToWallet(task.reward, `Task Reward: ${task.title}`);
      }
      
      // Re-sync with database as source of truth
      await get().fetchTasks(userId);
    } catch (err: any) {
      console.error('Failed to toggle task:', err);
    }
  },

  deleteTask: async (taskId, userId) => {
    try {
      const { error } = await supabase
        .from('user_tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }
      
      // Re-sync with backend
      await get().fetchTasks(userId);
    } catch (err: any) {
      console.error('Failed to delete task:', err);
    }
  },

  clearCompletedTasks: async (userId) => {
    try {
      const { error } = await supabase
        .from('user_tasks')
        .delete()
        .eq('completed', true)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }
      
      // Re-sync with backend
      await get().fetchTasks(userId);
    } catch (err: any) {
      console.error('Failed to clear completed tasks:', err);
    }
  }
}));
