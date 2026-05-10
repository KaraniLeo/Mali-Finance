import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Link, CheckCircle2 } from 'lucide-react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface ParentalViewProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

export function ParentalView({ user, onUpdateUser }: ParentalViewProps) {
  const [linkingCode, setLinkingCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

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
        .select('id')
        .eq('linkingCode', linkingCode)
        .eq('tier', 'parent')
        .single();

      if (parentError || !parentData) {
        throw new Error('Invalid linking code. Please check and try again.');
      }

      // 2. Update child profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ parentId: parentData.id })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // 3. Update parent profile to know about child (for simple 1:1 mapping in prototype)
      await supabase
        .from('profiles')
        .update({ linkedChildId: user.id })
        .eq('id', parentData.id);

      onUpdateUser({ parentId: parentData.id });
      setStatus('success');
    } catch (e: any) {
      setErrorMsg(e.message || 'Failed to link account. Please check the code.');
      setStatus('error');
    }
  };

  if (user.parentId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-3xl font-black text-stone-800 dark:text-white mb-4">Account Linked Successfully</h2>
        <p className="text-stone-500 dark:text-stone-400 font-medium max-w-md">
          Your account is now securely connected to your Parent/Guardian. They can view your progress and manage your automated allowance.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto pr-2 custom-scrollbar dark:text-white">
      <div>
        <h2 className="text-3xl font-bold text-[#2D3911] dark:text-[#A7C957] brand flex items-center gap-3">
          <Link size={28} /> Connect to Parent
        </h2>
        <p className="text-stone-500 dark:text-stone-400 font-medium">Link your account to your guardian's portal.</p>
      </div>

      <div className="max-w-xl bg-white dark:bg-stone-800 rounded-[32px] p-8 border border-stone-200 dark:border-stone-700 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-5">
           <ShieldCheck size={120} />
         </div>
         
         <div className="relative z-10">
           <h3 className="text-2xl font-black text-stone-800 dark:text-white mb-2">Enter Linking Code</h3>
           <p className="text-stone-500 dark:text-stone-400 font-medium mb-8">
             Ask your parent or guardian for their 6-character linking code, which they can find on their dashboard.
           </p>

           <div className="flex gap-4">
             <input 
               type="text" 
               value={linkingCode}
               onChange={(e) => setLinkingCode(e.target.value.toUpperCase())}
               placeholder="e.g. A72K9M"
               maxLength={6}
               className="flex-1 bg-stone-100/50 dark:bg-stone-700/50 border-2 border-stone-100 dark:border-stone-600 rounded-2xl py-4 px-6 text-xl font-mono tracking-[0.25em] focus:border-[#6B8E23]/30 dark:focus:border-[#6B8E23]/50 focus:ring-4 focus:ring-[#6B8E23]/5 outline-none transition-all dark:text-white"
             />
             <button 
               onClick={handleLink}
               disabled={status === 'loading'}
               className="px-8 bg-[#2D3911] hover:bg-[#3f4f18] text-white rounded-2xl font-bold transition-colors disabled:opacity-50"
             >
               {status === 'loading' ? 'Linking...' : 'Connect'}
             </button>
           </div>
           
           {status === 'error' && (
             <p className="text-red-500 font-bold mt-4 text-sm">{errorMsg}</p>
           )}
         </div>
      </div>
    </div>
  );
}
