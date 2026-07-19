import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL?.trim();
const rawSupabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY?.trim();

const supabaseUrl = rawSupabaseUrl || 'https://placeholder.supabase.co';
const supabaseAnonKey = rawSupabaseAnonKey || 'placeholder-anon-key';

if (!rawSupabaseUrl || !rawSupabaseAnonKey) {
  console.warn('Supabase environment variables are not configured. The app will run in a degraded mode without backend access.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
