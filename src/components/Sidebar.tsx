import React from 'react';
import { 
  Home, 
  BookOpen, 
  ClipboardList, 
  Wallet, 
  Trophy, 
  ShieldCheck, 
  Settings,
  Gamepad2
} from 'lucide-react';
import { User, View } from '../types';

interface SidebarProps {
  user: User;
  activeView: View;
  onViewChange: (view: View) => void;
  mobileMenuOpen: boolean;
  onLogout: () => void;
}

export function Sidebar({ user, activeView, onViewChange, mobileMenuOpen, onLogout }: SidebarProps) {
  return (
    <nav className={`w-64 flex-shrink-0 bg-stone-100 dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col p-6 absolute lg:relative inset-y-0 left-0 z-50 transition-transform lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="hidden lg:flex items-center gap-2 mb-10">
        <div className="w-10 h-10 bg-[#6B8E23] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-[#6B8E23]/20">M</div>
        <span className="text-2xl font-bold tracking-tight brand text-[#2D3911] dark:text-[#A7C957]">MALI</span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Main Menu</div>
        <div className="flex flex-col gap-1">
          <NavItem 
            icon={<Home size={20} />} 
            label="Dashboard" 
            active={activeView === 'dashboard'} 
            onClick={() => onViewChange('dashboard')} 
          />
          <NavItem 
            icon={<BookOpen size={20} />} 
            label="Learn Modules" 
            active={activeView === 'learn'} 
            onClick={() => onViewChange('learn')} 
          />
          <NavItem 
            icon={<ClipboardList size={20} />} 
            label="Task Board" 
            active={activeView === 'tasks'} 
            onClick={() => onViewChange('tasks')} 
          />
          <NavItem 
            icon={<Gamepad2 size={20} />} 
            label="Simulators & Games" 
            active={activeView === 'games'} 
            onClick={() => onViewChange('games')} 
          />
          <NavItem 
            icon={<Wallet size={20} />} 
            label="My Wallet" 
            active={activeView === 'wallet'} 
            onClick={() => onViewChange('wallet')} 
          />
          <NavItem 
            icon={<Trophy size={20} />} 
            label="Achievements" 
            active={activeView === 'achievements'} 
            onClick={() => onViewChange('achievements')} 
          />
        </div>

        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mt-6">Control</div>
        <div className="flex flex-col gap-1">
          <NavItem 
            icon={<ShieldCheck size={20} />} 
            label="Parental Guard" 
            active={activeView === 'parental'} 
            onClick={() => onViewChange('parental')} 
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeView === 'settings'} 
            onClick={() => onViewChange('settings')} 
          />
        </div>
      </div>

      <div className="mt-auto pt-6 flex flex-col gap-4">
        <div className="p-4 rounded-2xl bg-stone-200/50 dark:bg-stone-800/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-300 border-2 border-white dark:border-stone-800 shadow-sm overflow-hidden flex-shrink-0">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold truncate text-stone-800 dark:text-stone-200">{user.name}</div>
            <div className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider truncate">{user.tier} Explorer</div>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full text-[10px] font-black uppercase text-stone-400 hover:text-red-500 tracking-widest text-left px-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
      active 
        ? 'bg-[#6B8E23] text-white shadow-xl shadow-[#6B8E23]/20' 
        : 'text-stone-500 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 hover:text-stone-800 dark:hover:text-stone-200'
    }`}>
      <span className={active ? 'text-white' : 'text-stone-400 dark:text-stone-500'}>{icon}</span>
      {label}
    </button>
  );
}
