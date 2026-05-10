import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Activity, Users, Settings, Wallet, ArrowUpRight } from 'lucide-react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface ParentDashboardProps {
  user: User;
  onLogout: () => void;
}

export function ParentDashboard({ user, onLogout }: ParentDashboardProps) {
  const [childData, setChildData] = useState<User | null>(null);

  useEffect(() => {
    if (user.linkedChildId) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.linkedChildId)
        .single()
        .then(({ data }) => {
          if (data) setChildData(data as User);
        });
    }
  }, [user.linkedChildId]);

  return (
    <div className="flex flex-col h-screen bg-[#F7F7F2] text-stone-800 antialiased overflow-hidden">
      {/* Parent Header */}
      <header className="bg-white border-b border-stone-200 p-6 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2D3911] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">M</div>
          <div>
            <h1 className="text-2xl font-black text-[#2D3911] brand">MALI Parent Portal</h1>
            <p className="text-stone-500 font-medium text-sm">Welcome back, {user.name}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl font-bold transition-all cursor-pointer"
        >
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-[#2D3911]">Family Overview</h2>
            {!user.linkedChildId && (
               <div className="px-5 py-2.5 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                 <Users size={18} /> Linking Code: <span className="font-mono text-xl tracking-widest">{user.linkingCode || 'N/A'}</span>
               </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Child Card or Empty State */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-stone-200 shadow-sm relative overflow-hidden flex flex-col justify-center"
            >
              {!user.linkedChildId ? (
                 <div className="text-center py-12">
                   <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🔗</div>
                   <h3 className="text-2xl font-black text-stone-800 mb-2">No Child Account Linked</h3>
                   <p className="text-stone-500 font-medium max-w-md mx-auto mb-8">
                     To connect your account, ask your child to enter the linking code <strong>{user.linkingCode}</strong> in their Parental Guard settings.
                   </p>
                 </div>
              ) : (
                <>
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Users size={100} />
                  </div>
                  <div className="flex items-center gap-6 mb-8 relative z-10">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl shadow-inner">
                      👦
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-stone-800">Linked Account</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-widest">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                    <div className="p-6 bg-stone-50 rounded-[24px] border border-stone-100">
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Current Wallet Balance</p>
                      <h4 className="text-3xl font-black text-[#2D3911] tabular-nums">
                        {childData ? `${childData.balance.toLocaleString()} KES` : 'Loading...'}
                      </h4>
                    </div>
                    <div className="p-6 bg-stone-50 rounded-[24px] border border-stone-100">
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Learning Progress</p>
                      <h4 className="text-3xl font-black text-[#6B8E23]">
                        {childData ? `${childData.streak} Days` : 'Loading...'}
                      </h4>
                    </div>
                  </div>

                  <div className="flex gap-4 relative z-10">
                    <button className="flex-1 py-4 bg-[#2D3911] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#3f4f18] transition-all">
                      <Wallet size={18} /> Send Allowance
                    </button>
                    <button className="flex-1 py-4 bg-stone-100 text-stone-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-stone-200 transition-all">
                      <Activity size={18} /> View Full Report
                    </button>
                  </div>
                </>
              )}
            </motion.div>

            {/* Quick Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="bg-[#6B8E23] rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl">
                 <ShieldCheck size={80} className="absolute -right-4 -bottom-4 opacity-20" />
                 <h3 className="text-xl font-black mb-2">Guardian Mode</h3>
                 <p className="text-white/80 font-medium text-sm mb-6">Manage spending limits and app restrictions.</p>
                 
                 <div className="space-y-4">
                   <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                     <span className="font-bold text-sm">Spent Alerts</span>
                     <div className="w-10 h-5 bg-white rounded-full relative p-0.5 cursor-pointer">
                        <div className="w-4 h-4 bg-[#6B8E23] rounded-full ml-auto shadow-sm"></div>
                     </div>
                   </div>
                   <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                     <span className="font-bold text-sm">Auto-Allowance</span>
                     <span className="font-black">500 KES/wk</span>
                   </div>
                 </div>
              </div>

              <div className="bg-white rounded-[32px] p-6 border border-stone-200 shadow-sm">
                <h3 className="font-black text-stone-800 mb-4 flex items-center gap-2">
                  <Settings size={18} className="text-stone-400" /> Account Settings
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 hover:bg-stone-50 rounded-xl font-bold text-stone-600 text-sm transition-colors">Payment Methods</button>
                  <button className="w-full text-left p-3 hover:bg-stone-50 rounded-xl font-bold text-stone-600 text-sm transition-colors">Family Sharing</button>
                  <button className="w-full text-left p-3 hover:bg-stone-50 rounded-xl font-bold text-stone-600 text-sm transition-colors">Notification Preferences</button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
