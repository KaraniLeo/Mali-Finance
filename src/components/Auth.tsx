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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState<'kenya'|'international'>('international');
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

        const mappedUser = {
          id: profile.id,
          name: profile.name,
          email: email || '',
          dob: profile.dob,
          tier: profile.tier,
          country: profile.country,
          balance: Number(profile.balance || 0),
          streak: Number(profile.streak || 0),
          parentId: profile.parent_id,
          linkingCode: profile.linking_code,
          linkedChildId: profile.linked_child_id,
          spentAlerts: profile.spent_alerts !== undefined ? profile.spent_alerts : true,
          autoAllowance: Number(profile.auto_allowance || 0),
          spendingLimit: Number(profile.spending_limit || 0),
          achievements: profile.achievements || []
        };

        onLogin(mappedUser as User);
      } else {
        if (!name || (!isParentAccount && !dob)) {
          throw new Error('Name and Date of Birth are required for Child Sign Up.');
        }
        
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match. Please try again.');
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
              country,
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
            country,
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
      <div className="min-h-screen bg-[#F7F7F2] dark:bg-stone-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white dark:bg-stone-900 rounded-[40px] shadow-2xl p-10 border border-stone-100 dark:border-stone-800 text-center"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
            ✉️
          </div>
          <h2 className="text-2xl font-black text-brand-secondary dark:text-white mb-4">Check Your Email</h2>
          <p className="text-stone-600 dark:text-stone-400 font-medium leading-relaxed mb-8">
            We sent a verification link to <span className="font-bold text-stone-800 dark:text-stone-200">{email}</span>. 
            Please click the link to verify your account and start your wealth journey.
          </p>
          <button 
            onClick={() => { setNeedsVerification(false); setIsLogin(true); }}
            className="w-full bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 py-4 rounded-2xl font-bold hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Return to Log In
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F2] dark:bg-stone-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-[40px] shadow-2xl p-10 border border-stone-100 dark:border-stone-800"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-xl mb-6 ring-8 ring-[#6B8E23]/10 dark:ring-white/5">M</div>
          <h1 className="text-3xl font-black text-brand-secondary dark:text-white brand">Welcome to MALI</h1>
          <p className="text-stone-500 dark:text-stone-400 font-medium mt-2 text-center text-sm">Where Gen Alpha builds real-world wealth skills.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="flex items-center gap-2 mb-4 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-800">
                <input 
                  type="checkbox" 
                  id="parentToggle" 
                  checked={isParentAccount}
                  onChange={(e) => setIsParentAccount(e.target.checked)}
                  className="w-4 h-4 text-brand-accent rounded focus:ring-[#6B8E23]"
                />
                <label htmlFor="parentToggle" className="text-sm font-bold text-stone-600 dark:text-stone-300">I am registering as a Parent/Guardian</label>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-widest px-1">What's your name?</label>
                <input 
                  type="text" 
                  required={!isLogin}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={isParentAccount ? "Parent Name" : "Future Millionaire"}
                  className="w-full bg-stone-100/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-2 border-stone-100 dark:border-stone-800 rounded-2xl py-3 px-4 text-sm focus:border-brand-accent/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
                />
              </div>
              
              {!isParentAccount && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-widest px-1">When were you born?</label>
                  <input 
                    type="date" 
                    required={!isLogin && !isParentAccount}
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full bg-stone-100/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-2 border-stone-100 dark:border-stone-800 rounded-2xl py-3 px-4 text-sm focus:border-brand-accent/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
                  />
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-widest px-1">Region</label>
                <select 
                  value={country}
                  onChange={e => setCountry(e.target.value as 'kenya'|'international')}
                  className="w-full bg-stone-100/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-2 border-stone-100 dark:border-stone-800 rounded-2xl py-3 px-4 text-sm focus:border-brand-accent/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
                >
                  <option value="international">🌍 International</option>
                  <option value="kenya">🇰🇪 Kenya</option>
                </select>
              </div>
            </>
          )}
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-widest px-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-stone-100/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-2 border-stone-100 dark:border-stone-800 rounded-2xl py-3 px-4 text-sm focus:border-brand-accent/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-widest px-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-stone-100/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-2 border-stone-100 dark:border-stone-800 rounded-2xl py-3 px-4 text-sm focus:border-brand-accent/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
            />
          </div>

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-widest px-1">Confirm Password</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-100/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-2 border-stone-100 dark:border-stone-800 rounded-2xl py-3 px-4 text-sm focus:border-brand-accent/30 focus:ring-4 focus:ring-[#6B8E23]/5 focus:outline-none transition-all"
              />
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-accent text-white py-4 rounded-2xl font-black shadow-xl shadow-[#6B8E23]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer mt-4"
          >
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Start My Wealth Journey')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-brand-accent transition-colors cursor-pointer bg-transparent border-none"
          >
            {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-stone-100 dark:border-stone-800 text-center">
           <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em] leading-relaxed">
             Secure and Private • Parent Approved
           </p>
        </div>
      </motion.div>
    </div>
  );
}
