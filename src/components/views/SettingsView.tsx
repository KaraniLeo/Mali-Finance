import React from 'react';
import { motion } from 'motion/react';
import { User, Bell, Shield, Moon, LogOut } from 'lucide-react';

interface SettingsViewProps {
  onLogout: () => void;
}

export function SettingsView({ onLogout }: SettingsViewProps) {
  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div>
        <h2 className="text-3xl font-bold text-[#2D3911] brand">Settings</h2>
        <p className="text-stone-500 font-medium">Personalize your MALI experience.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="max-w-2xl space-y-6">
          <section>
            <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4">Account</h3>
            <div className="bg-white border border-stone-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-all">
                <div className="flex items-center gap-4">
                  <User className="text-stone-400" />
                  <span className="font-bold text-stone-700">Profile Information</span>
                </div>
                <div className="text-stone-300">→</div>
              </div>
              <div className="p-6 flex items-center justify-between hover:bg-stone-50 cursor-pointer border-t border-stone-50 transition-all">
                <div className="flex items-center gap-4">
                  <Bell className="text-stone-400" />
                  <span className="font-bold text-stone-700">Notifications</span>
                </div>
                <div className="text-stone-300">→</div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4">Preference</h3>
            <div className="bg-white border border-stone-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 flex items-center justify-between border-t border-stone-50">
                <div className="flex items-center gap-4">
                  <Moon className="text-stone-400" />
                  <span className="font-bold text-stone-700">Dark Mode</span>
                </div>
                <div className="w-10 h-5 bg-stone-200 rounded-full relative p-0.5 pointer-events-none opacity-50">
                   <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="p-6 flex items-center justify-between border-t border-stone-50">
                <div className="flex items-center gap-4">
                  <Shield className="text-stone-400" />
                  <span className="font-bold text-stone-700">Privacy & Terms</span>
                </div>
                <div className="text-stone-300">→</div>
              </div>
            </div>
          </section>

          <section className="pt-6">
            <button 
              onClick={onLogout}
              className="w-full p-6 bg-red-50 text-red-600 rounded-3xl font-black flex items-center justify-center gap-2 hover:bg-red-100 transition-all"
            >
              <LogOut size={20} /> Logout
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
