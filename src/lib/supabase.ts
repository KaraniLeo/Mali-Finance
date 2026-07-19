import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL?.trim();
const rawSupabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY?.trim();

function createFallbackSupabaseClient() {
  const noOp = async () => ({ data: null, error: null });
  const stubQuery = () => ({ select: noOp, order: () => stubQuery(), eq: () => stubQuery(), maybeSingle: noOp, single: noOp, limit: () => stubQuery(), insert: noOp, update: noOp, delete: noOp, upsert: noOp, rpc: noOp });
  const stubFrom = () => stubQuery();

  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (_event: string, callback: Function) => {
        callback('SIGNED_OUT', null);
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
      signInWithPassword: async () => ({ data: { user: null }, error: null }),
      signUp: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
    },
    from: stubFrom,
    functions: {
      invoke: async () => ({ text: 'This deployment has missing Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.' }),
    },
    storage: {
      from: () => ({ upload: async () => ({ error: new Error('Supabase storage unavailable in degraded mode.'), data: null }) }),
    },
  };
}

const supabaseClient: any = rawSupabaseUrl && rawSupabaseAnonKey
  ? createClient(rawSupabaseUrl, rawSupabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : createFallbackSupabaseClient();

if (!rawSupabaseUrl || !rawSupabaseAnonKey) {
  console.warn('Supabase environment variables are not configured. The app will run in a degraded mode without backend access.');
}

export const supabase = supabaseClient;
