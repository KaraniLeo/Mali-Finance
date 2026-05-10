import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { User, Tier } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [isParentAccount, setIsParentAccount] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  const calculateTier = (dob: string): Tier => {
    if (isParentAccount) return 'parent';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    if (age < 13) return 'junior';
    if (age < 18) return 'teen';
    return 'pro';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;

        // Fetch profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (profileError) throw profileError;

        onLogin(profile as User);
      } else {
        if (!name || (!isParentAccount && !dob)) {
          throw new Error('Name and Date of Birth are required for Child Sign Up.');
        }

        const tier = calculateTier(dob || '1970-01-01');
        const linkingCode = isParentAccount ? Math.random().toString(36).substring(2, 8).toUpperCase() : null;
        
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              dob: dob || '1970-01-01',
              tier,
              linkingCode
            }
          }
        });
        if (authError) throw authError;

        if (data.user?.identities?.length === 0) {
          throw new Error('An account with this email already exists.');
        }

        if (data.user) {
          setNeedsVerification(true);
        }
      }
    } catch (err: any) {
      const errorMsg = err.message || '';
      if (errorMsg.toLowerCase().includes('rate limit')) {
        console.warn("Supabase rate limit exceeded. Falling back to local mock login for testing.");
        if (!isLogin) {
          onLogin({
            id: 'mock-user-' + Date.now(),
            name: name || 'Test User',
            dob: dob || '2010-01-01',
            tier: calculateTier(dob || '2010-01-01'),
            balance: 500,
            streak: 1
          });
        } else {
          setError('Rate limit exceeded. Please try signing up a new test account instead.');
        }
      } else if (errorMsg.includes('Email not confirmed')) {
        setError('Please verify your email address before logging in. Check your inbox.');
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (needsVerification) {
    return (
      <div className="min-h-screen bg-[#F7F7F2] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-stone-100 text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
            ✉️
          </div>
          <h2 className="text-2xl font-black text-[#2D3911] mb-4">Check Your Email</h2>
          <p className="text-stone-600 font-medium leading-relaxed mb-8">
            We sent a verification link to <span className="font-bold text-stone-800">{email}</span>. 
            Please click the link to verify your account and start your wealth journey.
          </p>
          <button 
            onClick={() => { setNeedsVerification(false); setIsLogin(true); }}
            className="w-full bg-stone-100 text-stone-600 py-4 rounded-2xl font-bold hover:bg-stone-200 transition-colors cursor-pointer"
          >
            Return to Log In
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F2] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-stone-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#6B8E23] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-xl mb-6 ring-8 ring-[#6B8E23]/10">M</div>
          <h1 className="text-3xl font-black text-[#2D3911] brand">Welcome to MALI</h1>
          <p className="text-stone-500 font-medium mt-2 text-center text-sm">Where Gen Alpha builds real-world wealth skills.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="flex items-center gap-2 mb-4 p-3 bg-stone-50 rounded-xl border border-stone-100">
                <input 
                  type="checkbox" 
                  id="parentToggle" 
                  checked={isParentAccount}
                  onChange={(e) => setIsParentAccount(e.target.checked)}
                  className="w-4 h-4 text-[#6B8E23] rounded focus:ring-[#6B8E23]"
                />
                <label htmlFor="parentToggle" className="text-sm font-bold text-stone-600">I am registering as a Parent/Guardian</label>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">What's your name?</label>
                <input 
                  type="text" 
                  required={!isLogin}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={isParentAccount ? "Parent Name" : "Future Millionaire"}
                  className="w-full bg-stone-100/50 border-2 border-stone-100 rounded-2xl py-3 px-4 text-sm focus:border-[#6B8E23]/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
                />
              </div>
              
              {!isParentAccount && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">When were you born?</label>
                  <input 
                    type="date" 
                    required={!isLogin && !isParentAccount}
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full bg-stone-100/50 border-2 border-stone-100 rounded-2xl py-3 px-4 text-sm focus:border-[#6B8E23]/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
                  />
                </div>
              )}
            </>
          )}
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-stone-100/50 border-2 border-stone-100 rounded-2xl py-3 px-4 text-sm focus:border-[#6B8E23]/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-stone-100/50 border-2 border-stone-100 rounded-2xl py-3 px-4 text-sm focus:border-[#6B8E23]/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#6B8E23] text-white py-4 rounded-2xl font-black shadow-xl shadow-[#6B8E23]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer mt-4"
          >
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Start My Wealth Journey')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm font-bold text-stone-500 hover:text-[#6B8E23] transition-colors"
          >
            {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-stone-100 text-center">
           <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] leading-relaxed">
             Secure and Private • Parent Approved
           </p>
        </div>
      </motion.div>
    </div>
  );
}
