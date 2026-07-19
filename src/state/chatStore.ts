import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { ChatConversation, ChatMessage } from '../types';

interface ChatState {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  activeMessages: ChatMessage[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setActiveConversation: (conversationId: string | null) => Promise<void>;
  loadConversations: (userId: string) => Promise<void>;
  loadConversationMessages: (conversationId: string) => Promise<void>;
  createConversation: (userId: string, title?: string) => Promise<ChatConversation | null>;
  renameConversation: (conversationId: string, title: string) => Promise<void>;
  archiveConversation: (conversationId: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  addMessage: (conversationId: string, message: Omit<ChatMessage, 'id' | 'created_at'>) => Promise<ChatMessage | null>;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  conversations: [],
  activeConversationId: null,
  activeMessages: [],
  isLoading: false,
  isSaving: false,
  error: null,
  searchQuery: '',

  setSearchQuery: (value) => set({ searchQuery: value }),

  loadConversations: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('id,user_id,title,archived,created_at,updated_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      set({ conversations: data ?? [] });
    } catch (err: any) {
      console.error('Failed to load conversations', err);
      set({ error: err.message || 'Unable to load conversations' });
    } finally {
      set({ isLoading: false });
    }
  },

  loadConversationMessages: async (conversationId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('id,conversation_id,role,content,created_at')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      set({ activeMessages: (data ?? []).map((message) => ({
        ...message,
        text: message.content,
      })) });
    } catch (err: any) {
      console.error('Failed to load messages', err);
      set({ error: err.message || 'Unable to load messages' });
    } finally {
      set({ isLoading: false });
    }
  },

  setActiveConversation: async (conversationId) => {
    set({ activeConversationId: conversationId });
    if (conversationId) {
      await get().loadConversationMessages(conversationId);
    } else {
      set({ activeMessages: [] });
    }
  },

  createConversation: async (userId, title = 'New conversation') => {
    set({ isSaving: true, error: null });
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert([{ user_id: userId, title }])
        .select('id,user_id,title,archived,created_at,updated_at')
        .single();

      if (error) throw error;
      const conversation = data as ChatConversation;
      set((state) => ({ conversations: [conversation, ...state.conversations], activeConversationId: conversation.id, activeMessages: [] }));
      return conversation;
    } catch (err: any) {
      console.error('Failed to create conversation', err);
      set({ error: err.message || 'Unable to create conversation' });
      return null;
    } finally {
      set({ isSaving: false });
    }
  },

  renameConversation: async (conversationId, title) => {
    set({ isSaving: true, error: null });
    try {
      const { error } = await supabase
        .from('conversations')
        .update({ title, updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      if (error) throw error;
      set((state) => ({
        conversations: state.conversations.map((conversation) =>
          conversation.id === conversationId ? { ...conversation, title, updated_at: new Date().toISOString() } : conversation
        ),
      }));
    } catch (err: any) {
      console.error('Failed to rename conversation', err);
      set({ error: err.message || 'Unable to rename conversation' });
    } finally {
      set({ isSaving: false });
    }
  },

  archiveConversation: async (conversationId) => {
    set({ isSaving: true, error: null });
    try {
      const { error } = await supabase
        .from('conversations')
        .update({ archived: true, updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      if (error) throw error;
      set((state) => ({
        conversations: state.conversations.map((conversation) =>
          conversation.id === conversationId ? { ...conversation, archived: true, updated_at: new Date().toISOString() } : conversation
        ),
      }));
      if (get().activeConversationId === conversationId) {
        set({ activeConversationId: null, activeMessages: [] });
      }
    } catch (err: any) {
      console.error('Failed to archive conversation', err);
      set({ error: err.message || 'Unable to archive conversation' });
    } finally {
      set({ isSaving: false });
    }
  },

  deleteConversation: async (conversationId) => {
    set({ isSaving: true, error: null });
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', conversationId);

      if (error) throw error;
      set((state) => ({
        conversations: state.conversations.filter((conversation) => conversation.id !== conversationId),
      }));
      if (get().activeConversationId === conversationId) {
        set({ activeConversationId: null, activeMessages: [] });
      }
    } catch (err: any) {
      console.error('Failed to delete conversation', err);
      set({ error: err.message || 'Unable to delete conversation' });
    } finally {
      set({ isSaving: false });
    }
  },

  addMessage: async (conversationId, message) => {
    set({ isSaving: true, error: null });
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{ conversation_id: conversationId, role: message.role, content: message.text }])
        .select('id,conversation_id,role,content,created_at')
        .single();

      if (error) throw error;
      const savedMessage = { ...data, text: data.content } as ChatMessage;
      set((state) => ({ activeMessages: [...state.activeMessages, savedMessage] }));
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);
      return savedMessage;
    } catch (err: any) {
      console.error('Failed to add message', err);
      set({ error: err.message || 'Unable to save message' });
      return null;
    } finally {
      set({ isSaving: false });
    }
  },
}));
