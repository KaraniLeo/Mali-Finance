import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import { toast } from './toastStore';

interface AdminState {
  users: User[];
  isLoading: boolean;
  
  fetchUsers: () => Promise<void>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<void>;
  assignAchievement: (userId: string, achievementId: string) => Promise<void>;
  removeAchievement: (userId: string, achievementId: string) => Promise<void>;
  forcePasswordReset: (email: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  users: [],
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      set({ users: data as User[], isLoading: false });
    } catch (err: any) {
      toast.error('Failed to fetch users: ' + err.message);
      set({ isLoading: false });
    }
  },

  updateUser: async (userId: string, updates: Partial<User>) => {
    try {
      const { error } = await supabase.from('profiles').update(updates).eq('id', userId);
      if (error) throw error;
      
      toast.success('User updated successfully');
      get().fetchUsers();
    } catch (err: any) {
      toast.error('Failed to update user: ' + err.message);
    }
  },

  assignAchievement: async (userId: string, achievementId: string) => {
    try {
      // Fetch current user
      const { data, error: fetchErr } = await supabase.from('profiles').select('achievements').eq('id', userId).single();
      if (fetchErr) throw fetchErr;

      const current = data.achievements || [];
      if (!current.includes(achievementId)) {
        const { error } = await supabase.from('profiles').update({ achievements: [...current, achievementId] }).eq('id', userId);
        if (error) throw error;
        toast.success('Achievement assigned!');
        get().fetchUsers();
      } else {
        toast.error('User already has this achievement.');
      }
    } catch (err: any) {
      toast.error('Failed to assign achievement: ' + err.message);
    }
  },

  removeAchievement: async (userId: string, achievementId: string) => {
    try {
      const { data, error: fetchErr } = await supabase.from('profiles').select('achievements').eq('id', userId).single();
      if (fetchErr) throw fetchErr;

      const current = data.achievements || [];
      const updated = current.filter((id: string) => id !== achievementId);
      
      const { error } = await supabase.from('profiles').update({ achievements: updated }).eq('id', userId);
      if (error) throw error;
      
      toast.success('Achievement removed!');
      get().fetchUsers();
    } catch (err: any) {
      toast.error('Failed to remove achievement: ' + err.message);
    }
  },

  forcePasswordReset: async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast.success(`Password reset email sent to ${email}`);
    } catch (err: any) {
      toast.error('Failed to send reset email: ' + err.message);
    }
  }
}));
