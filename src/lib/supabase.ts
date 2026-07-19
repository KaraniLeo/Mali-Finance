import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase config check:', {
  hasUrl: !!rawSupabaseUrl,
  hasAnonKey: !!rawSupabaseAnonKey,
  url: rawSupabaseUrl ? rawSupabaseUrl.substring(0, 30) + '...' : 'undefined',
});

if (!rawSupabaseUrl || !rawSupabaseAnonKey) {
  const missing = [];
  if (!rawSupabaseUrl) missing.push('VITE_SUPABASE_URL');
  if (!rawSupabaseAnonKey) missing.push('VITE_SUPABASE_ANON_KEY');
  throw new Error(`Missing Supabase environment variables: ${missing.join(', ')}. Set these in Vercel Settings > Environment Variables.`);
}

export const supabase = createClient(rawSupabaseUrl, rawSupabaseAnonKey);
