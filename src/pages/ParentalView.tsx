import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Link, CheckCircle2, AlertTriangle, Sparkles, Calendar, Clock, RefreshCw } from 'lucide-react';
import { User } from '../types';
import { supabase } from '../lib/supabase';
import { toast } from '../state/toastStore';

interface ParentalViewProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

export function AccountabilityPartnerView({ user, onUpdateUser }: ParentalViewProps) {
  const [linkingCode, setLinkingCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Live messages state
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // Load parent messages from DB
  const fetchMessages = async () => {
    if (!user.parentId) return;
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('coaching_messages')
        .select('*')
        .eq('child_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setMessages(data);
    } catch (err: any) {
      console.warn('Failed to load parent messages from DB, using local storage fallback:', err);
      const localMsgs = JSON.parse(localStorage.getItem('mali_local_coaching_messages') || '[]');
      const filtered = localMsgs.filter((m: any) => m.child_id === user.id);
      setMessages(filtered);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (!user.parentId) return;

    fetchMessages();

    // Set up real-time subscription for coaching messages (if DB is active)
    const channel = supabase
      .channel('coaching_messages_realtime_student')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'coaching_messages', filter: `child_id=eq.${user.id}` },
        (payload) => {
          setMessages(prev => [payload.new, ...prev]);
          toast.success('New coaching message received from your Accountability Partner!');
        }
      )
      .subscribe();

    // Cross-tab LocalStorage listener fallback
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'mali_local_coaching_messages') {
        const localMsgs = JSON.parse(e.newValue || '[]');
        const filtered = localMsgs.filter((m: any) => m.child_id === user.id);
        setMessages(filtered);
        toast.success('New coaching message received from your Accountability Partner!');
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user.parentId, user.id]);

  const handleLink = async () => {
    if (linkingCode.length !== 6) {
      setErrorMsg('Linking code must be 6 characters.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      // 1. Find parent with this linking code
      const { data: parentData, error: parentError } = await supabase
        .from('profiles')
        .select('id, name')
        .eq('linking_code', linkingCode)
        .eq('tier', 'parent')
        .single();

      if (parentError || !parentData) {
        throw new Error('Invalid linking code. Please check and try again.');
      }

      // 2. Update child profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ parent_id: parentData.id })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // 3. Update parent profile to know about child (for simple 1:1 mapping in prototype)
      await supabase
        .from('profiles')
        .update({ linked_child_id: user.id })
        .eq('id', parentData.id);

      onUpdateUser({ parentId: parentData.id });
      setStatus('success');
      toast.success(`Successfully connected with Accountability Partner: ${parentData.name}`);
    } catch (e: any) {
      setErrorMsg(e.message || 'Failed to link account. Please check the code.');
      setStatus('error');
    }
  };

  // If already linked, render the dynamic feed page
  if (user.parentId) {
    return (
      <div className="flex flex-col gap-8 h-full overflow-hidden text-stone-900 dark:text-white">
        
        {/* Header summary */}
        <header className="flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-3xl font-black brand text-brand-secondary dark:text-brand-primary uppercase tracking-tight">
              Coaching & Alerts Feed
            </h2>
            <p className="text-stone-600 dark:text-stone-300 font-semibold text-xs mt-1">
              Live feedback and coaching instructions from your Accountability Partner.
            </p>
          </div>
          <button 
            onClick={fetchMessages}
            disabled={loadingMessages}
            className="p-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-900 dark:text-white rounded-2xl cursor-pointer transition-colors border border-stone-200 dark:border-stone-700"
            title="Refresh feed messages"
          >
            <RefreshCw size={16} className={loadingMessages ? 'animate-spin' : ''} />
          </button>
        </header>

        {/* Accountability status header panel */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 rounded-[32px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-900 dark:text-white">Account Linked Securely</h3>
              <p className="text-stone-750 dark:text-stone-300 font-semibold text-xs mt-0.5">
                Coaching reports and active balance synchronization are fully active.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 text-stone-900 dark:text-white rounded-xl text-xs font-bold shrink-0 shadow-inner">
            <span>Streak Multiplier:</span>
            <span className="font-black text-amber-500">{user.streak} Days 🔥</span>
          </div>
        </div>

        {/* Dynamic messages feed */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 rounded-[32px] shadow-sm custom-scrollbar">
          <h3 className="text-xs font-black uppercase text-stone-900 dark:text-white tracking-widest flex items-center gap-2 mb-6">
            <Clock size={16} /> Partner Instructions Timeline
          </h3>

          {loadingMessages ? (
            <div className="py-12 text-center text-xs text-stone-600 dark:text-stone-400 italic">
              Loading timeline events...
            </div>
          ) : messages.length === 0 ? (
            <div className="py-16 text-center text-stone-700 dark:text-stone-350 max-w-sm mx-auto space-y-4">
              <span className="text-4xl">📬</span>
              <h4 className="text-sm font-black uppercase text-stone-900 dark:text-white">Your mailbox is empty</h4>
              <p className="text-xs leading-relaxed font-semibold">
                Your Accountability Partner hasn't sent any warnings, check-ins, or praise notifications to this feed yet.
              </p>
            </div>
          ) : (
            <div className="relative border-l border-stone-200 dark:border-stone-800 ml-4 pl-6 space-y-6 py-2">
              {messages.map((msg) => {
                let alertColor = 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-850';
                let icon = '💬';
                let typeLabel = 'Notice';

                if (msg.type === 'warning') {
                  alertColor = 'bg-rose-50/70 dark:bg-rose-950/10 border-rose-250 dark:border-rose-900/30';
                  icon = '⚠️';
                  typeLabel = 'Alert Warning';
                } else if (msg.type === 'encouragement') {
                  alertColor = 'bg-emerald-50/70 dark:bg-emerald-950/10 border-emerald-250 dark:border-emerald-900/30';
                  icon = '🏆';
                  typeLabel = 'Praise Encouragement';
                } else if (msg.type === 'checkin') {
                  alertColor = 'bg-blue-50/70 dark:bg-blue-950/10 border-blue-250 dark:border-blue-900/30';
                  icon = '📅';
                  typeLabel = 'Review Check-In';
                }

                return (
                  <div key={msg.id} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[35px] top-1 w-6 h-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full flex items-center justify-center text-xs shadow-sm">
                      {icon}
                    </span>
                    <div className={`p-4 border rounded-2xl ${alertColor} space-y-2 max-w-2xl`}>
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-[9px] uppercase tracking-wider text-stone-900 dark:text-white px-2 py-0.5 bg-stone-100 dark:bg-stone-900 rounded-md">
                          {typeLabel}
                        </span>
                        <span className="text-[9px] font-black uppercase text-stone-550 dark:text-stone-400">
                          {new Date(msg.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs font-semibold leading-relaxed text-stone-900 dark:text-white">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Not linked: Render Enter Code screen
  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto pr-2 custom-scrollbar text-stone-900 dark:text-white">
      <div>
        <h2 className="text-3xl font-bold text-brand-secondary dark:text-brand-primary brand flex items-center gap-3">
          <Link size={28} /> Connect to Accountability Partner
        </h2>
        <p className="text-stone-600 dark:text-stone-300 font-semibold text-xs mt-1">Link your account to your accountability partner's portal.</p>
      </div>

      <div className="max-w-xl bg-white dark:bg-stone-900 rounded-[32px] p-8 border border-stone-200 dark:border-stone-850 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-5 text-stone-900 dark:text-white">
           <ShieldCheck size={120} />
         </div>
         
         <div className="relative z-10 space-y-6">
           <div>
             <h3 className="text-2xl font-black text-stone-900 dark:text-white mb-2 leading-none uppercase">Enter Linking Code</h3>
             <p className="text-stone-700 dark:text-stone-300 font-semibold text-xs mt-2 leading-relaxed">
               Ask your accountability partner for their 6-character linking code, which they can find on their dashboard.
             </p>
           </div>

           <div className="flex flex-col sm:flex-row gap-4">
             <input 
               type="text" 
               value={linkingCode}
               onChange={(e) => setLinkingCode(e.target.value.toUpperCase())}
               placeholder="e.g. A72K9M"
               maxLength={6}
               className="flex-1 bg-stone-50 dark:bg-stone-950 border-2 border-stone-200 dark:border-stone-800 rounded-2xl py-4 px-6 text-xl font-mono tracking-[0.25em] focus:border-brand-accent/30 dark:focus:border-brand-accent/50 outline-none transition-all text-stone-900 dark:text-white placeholder-stone-600 font-bold"
             />
             <button 
               onClick={handleLink}
               disabled={status === 'loading'}
               className="px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-brand-accent text-white dark:text-brand-accent-text rounded-2xl font-black transition-colors disabled:opacity-50 cursor-pointer shadow-md text-xs uppercase tracking-wider"
             >
               {status === 'loading' ? 'Linking...' : 'Connect'}
             </button>
           </div>
           
           {status === 'error' && (
             <p className="text-red-650 dark:text-red-400 font-bold text-xs">{errorMsg}</p>
           )}
         </div>
      </div>
    </div>
  );
}
