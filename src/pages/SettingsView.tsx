import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Moon, Sun, Bell, Shield, CircleUser, ChevronRight, LogOut, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

import { User } from '../types';

interface SettingsViewProps {
  user: User;
  onLogout: () => void;
}

type SettingsRoute = 'main' | 'profile' | 'notifications' | 'privacy';

export function SettingsView({ user, onLogout }: SettingsViewProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeRoute, setActiveRoute] = useState<SettingsRoute>('main');
  const [notifications, setNotifications] = useState(true);

  if (activeRoute === 'profile') {
    return (
      <div className="flex flex-col gap-6 h-full overflow-hidden dark:text-white">
        <button onClick={() => setActiveRoute('main')} className="flex items-center gap-2 text-stone-500 font-bold hover:text-stone-800 dark:hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Settings
        </button>
        <div>
          <h2 className="text-3xl font-bold text-[#2D3911] dark:text-[#A7C957] brand">Profile Information</h2>
          <p className="text-stone-500 dark:text-stone-400 font-medium">Manage your personal details.</p>
        </div>
        <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl border border-stone-100 dark:border-stone-700 shadow-sm max-w-2xl">
          <div className="space-y-6">
             <div>
               <label className="text-xs font-black uppercase text-stone-400 tracking-widest">Username</label>
               <input type="text" value={user.name} disabled className="mt-1 w-full p-4 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-stone-900 dark:text-white" />
             </div>
             <div>
               <label className="text-xs font-black uppercase text-stone-400 tracking-widest">Email</label>
               <input type="email" value="student@finterns.app" disabled className="mt-1 w-full p-4 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-stone-900 dark:text-white" />
             </div>
             <button className="px-6 py-3 bg-[#6B8E23] hover:bg-[#5A7A1B] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#6B8E23]/20">Save Changes</button>
           </div>
        </div>
      </div>
    );
  }

  if (activeRoute === 'notifications') {
    return (
      <div className="flex flex-col gap-6 h-full overflow-hidden dark:text-white">
        <button onClick={() => setActiveRoute('main')} className="flex items-center gap-2 text-stone-500 font-bold hover:text-stone-800 dark:hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Settings
        </button>
        <div>
          <h2 className="text-3xl font-bold text-[#2D3911] dark:text-[#A7C957] brand">Notifications</h2>
          <p className="text-stone-500 dark:text-stone-400 font-medium">Control your alert preferences.</p>
        </div>
        <div className="bg-white dark:bg-stone-800 p-6 rounded-3xl border border-stone-100 dark:border-stone-700 shadow-sm max-w-2xl space-y-4">
           <div className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-700/50 rounded-2xl">
             <div>
               <h4 className="font-bold">Push Notifications</h4>
               <p className="text-xs text-stone-500 dark:text-stone-400">Receive alerts on your device</p>
             </div>
             <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full relative p-1 transition-colors ${notifications ? 'bg-[#6B8E23]' : 'bg-stone-300 dark:bg-stone-600'}`}>
               <motion.div animate={{ x: notifications ? 24 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-sm" />
             </button>
           </div>
        </div>
      </div>
    );
  }

  if (activeRoute === 'privacy') {
    return (
      <div className="flex flex-col gap-6 h-full overflow-hidden dark:text-white">
        <button onClick={() => setActiveRoute('main')} className="flex items-center gap-2 text-stone-500 font-bold hover:text-stone-800 dark:hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Settings
        </button>
        <div>
          <h2 className="text-3xl font-bold text-[#2D3911] dark:text-[#A7C957] brand">Privacy & Terms</h2>
          <p className="text-stone-500 dark:text-stone-400 font-medium">Your data is safe.</p>
        </div>
        <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl border border-stone-100 dark:border-stone-700 shadow-sm max-w-2xl overflow-y-auto">
           <div className="prose dark:prose-invert prose-stone max-w-none text-stone-700 dark:text-stone-300">
             <h3 className="text-xl font-bold text-[#2D3911] dark:text-[#A7C957] mb-2">1. Data Collection</h3>
             <p className="mb-6">We only collect data necessary to provide you with a world-class financial education experience. Your portfolio data is not sold to third parties. Learning progress and achievements are stored securely.</p>
             <h3 className="text-xl font-bold text-[#2D3911] dark:text-[#A7C957] mb-2">2. Guardian Access</h3>
             <p>If your account is linked to a Guardian, they have read-only access to your learning progress and wallet balance. They can also manage tasks and send you your allowance.</p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden dark:text-white">
      <div>
        <h2 className="text-3xl font-bold text-[#2D3911] dark:text-[#A7C957] brand">Settings</h2>
        <p className="text-stone-500 dark:text-stone-400 font-medium">Personalize your MALI experience.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="max-w-2xl space-y-6">
          <section>
            <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4">Account</h3>
            <div className="bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-3xl overflow-hidden shadow-sm">
              <div onClick={() => setActiveRoute('profile')} className="p-6 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-700 cursor-pointer transition-all">
                <div className="flex items-center gap-4">
                  <CircleUser className="text-stone-400" />
                  <span className="font-bold text-stone-700 dark:text-stone-200">Profile Information</span>
                </div>
                <div className="text-stone-300">→</div>
              </div>
              <div onClick={() => setActiveRoute('notifications')} className="p-6 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-700 cursor-pointer border-t border-stone-50 dark:border-stone-700 transition-all">
                <div className="flex items-center gap-4">
                  <Bell className="text-stone-400" />
                  <span className="font-bold text-stone-700 dark:text-stone-200">Notifications</span>
                </div>
                <div className="text-stone-300">→</div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4">Preference</h3>
            <div className="bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-3xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between p-6 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all">
                <div className="flex items-center gap-4">
                  {theme === 'dark' ? <Moon className="text-stone-400" /> : <Sun className="text-stone-400" />}
                  <span className="font-bold text-stone-700 dark:text-stone-200">Dark Mode</span>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-12 h-6 rounded-full relative p-1 transition-colors ${theme === 'dark' ? 'bg-[#6B8E23]' : 'bg-stone-300 dark:bg-stone-600'}`}
                >
                  <motion.div 
                    className="w-4 h-4 bg-white rounded-full shadow-md"
                    animate={{ x: theme === 'dark' ? 24 : 0 }}
                  />
                </button>
              </div>
              <div onClick={() => setActiveRoute('privacy')} className="p-6 flex items-center justify-between border-t border-stone-50 dark:border-stone-700 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-700 transition-all">
                <div className="flex items-center gap-4">
                  <Shield className="text-stone-400" />
                  <span className="font-bold text-stone-700 dark:text-stone-200">Privacy & Terms</span>
                </div>
                <div className="text-stone-300">→</div>
              </div>
            </div>
          </section>

          <section className="pt-6">
            <button 
              onClick={onLogout}
              className="w-full p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-3xl font-black flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
            >
              <LogOut size={20} /> Logout
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
