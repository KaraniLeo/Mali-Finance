import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  ClipboardList, 
  Wallet, 
  Trophy, 
  ShieldCheck, 
  Settings,
  Gamepad2
import { User, View } from '../types';
import { useSidebarStore } from '../state/sidebarStore';

interface SidebarProps {
  user: User;
  activeView: View;
  onViewChange: (view: View) => void;
  mobileMenuOpen: boolean;
  onLogout: () => void;
}

export function Sidebar({ user, activeView, onViewChange, mobileMenuOpen, onLogout }: SidebarProps) {
  const { isExpanded, toggleSidebar } = useSidebarStore();
  
  return (
    <>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onViewChange(activeView)} // Clicking backdrop closes menu
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.nav 
        animate={{ width: isExpanded ? 256 : 96 }} 
        className={`flex-shrink-0 bg-stone-100 dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col p-6 fixed lg:relative inset-y-0 left-0 z-50 transition-transform lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
      <div className="flex items-center justify-between mb-10 overflow-hidden">
        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleSidebar}>
          <div className="w-12 h-12 flex-shrink-0 bg-[#6B8E23] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-[#6B8E23]/20">M</div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-3xl font-bold tracking-tight brand text-[#2D3911] dark:text-[#A7C957] whitespace-nowrap"
              >
                MALI
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-6 overflow-hidden">
        {isExpanded ? (
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 whitespace-nowrap">Main Menu</div>
        ) : (
          <div className="h-4"></div>
        )}
        <div className="flex flex-col gap-2">
          <NavItem 
            icon={<Home size={24} />} 
            label="Dashboard" 
            active={activeView === 'dashboard'} 
            isExpanded={isExpanded}
            onClick={() => onViewChange('dashboard')} 
          />
          <NavItem 
            icon={<BookOpen size={24} />} 
            label="Learn Modules" 
            active={activeView === 'learn'} 
            isExpanded={isExpanded}
            onClick={() => onViewChange('learn')} 
          />
          <NavItem 
            icon={<ClipboardList size={24} />} 
            label="Task Board" 
            active={activeView === 'tasks'} 
            isExpanded={isExpanded}
            onClick={() => onViewChange('tasks')} 
          />
          <NavItem 
            icon={<Gamepad2 size={24} />} 
            label="Simulators & Games" 
            active={activeView === 'games'} 
            isExpanded={isExpanded}
            onClick={() => onViewChange('games')} 
          />
          <NavItem 
            icon={<Wallet size={24} />} 
            label="My Wallet" 
            active={activeView === 'wallet'} 
            isExpanded={isExpanded}
            onClick={() => onViewChange('wallet')} 
          />
          <NavItem 
            icon={<Trophy size={24} />} 
            label="Achievements" 
            active={activeView === 'achievements'} 
            isExpanded={isExpanded}
            onClick={() => onViewChange('achievements')} 
          />
        </div>

        {isExpanded ? (
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mt-6 whitespace-nowrap">Control</div>
        ) : (
          <div className="h-4 mt-6"></div>
        )}
        <div className="flex flex-col gap-2">
          <NavItem 
            icon={<ShieldCheck size={24} />} 
            label="Parental Guard" 
            active={activeView === 'parental'} 
            isExpanded={isExpanded}
            onClick={() => onViewChange('parental')} 
          />
          <NavItem 
            icon={<Settings size={24} />} 
            label="Settings" 
            active={activeView === 'settings'} 
            isExpanded={isExpanded}
            onClick={() => onViewChange('settings')} 
          />
        </div>
      </div>

      <div className="mt-auto pt-6 flex flex-col gap-4 overflow-hidden">
        <div className={`p-4 rounded-2xl bg-stone-200/50 dark:bg-stone-800/50 flex items-center ${isExpanded ? 'gap-3' : 'justify-center p-2'}`}>
          <div className="w-12 h-12 rounded-full bg-emerald-300 border-2 border-white dark:border-stone-800 shadow-sm overflow-hidden flex-shrink-0">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="min-w-0 whitespace-nowrap">
                <div className="text-sm font-bold truncate text-stone-800 dark:text-stone-200">{user.name}</div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider truncate">{user.tier} Explorer</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button 
          onClick={onLogout}
          className={`w-full text-[10px] font-black uppercase text-stone-400 hover:text-red-500 tracking-widest ${isExpanded ? 'text-left px-4' : 'text-center'}`}
        >
          {isExpanded ? 'Logout' : 'Quit'}
        </button>
      </div>
    </motion.nav>
    </>
  );
}

function NavItem({ icon, label, active = false, isExpanded = true, onClick }: { icon: React.ReactNode; label: string; active?: boolean; isExpanded?: boolean; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      title={label}
      className={`w-full flex items-center ${isExpanded ? 'gap-4 px-4' : 'justify-center px-0'} py-3 rounded-xl text-sm font-bold transition-all overflow-hidden ${
      active 
        ? 'bg-[#6B8E23] text-white shadow-xl shadow-[#6B8E23]/20' 
        : 'text-stone-500 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 hover:text-stone-800 dark:hover:text-stone-200'
    }`}>
      <span className={`flex-shrink-0 ${active ? 'text-white' : 'text-stone-400 dark:text-stone-500'}`}>{icon}</span>
      <AnimatePresence>
        {isExpanded && (
          <motion.span 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
