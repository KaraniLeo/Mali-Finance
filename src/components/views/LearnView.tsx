import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search } from 'lucide-react';
import { Module, Tier } from '../../types';
import { ModuleCard } from '../ModuleCard';

interface LearnViewProps {
  tier: Tier;
  modules: Module[];
}

export function LearnView({ tier, modules }: LearnViewProps) {
  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#2D3911] brand">Knowledge Hub</h2>
          <p className="text-stone-500 font-medium">Master your financial future, one module at a time.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Search modules..." 
            className="w-full bg-white border border-stone-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
          {/* Example of more modules */}
          <ModuleCard module={{
            id: 'extra-1',
            title: 'Smart Saving',
            description: 'Why saving early matters more than you think.',
            progress: 0,
            icon: <div className="text-3xl">🏦</div>,
            locked: true
          }} />
          <ModuleCard module={{
            id: 'extra-2',
            title: 'Crypto For Kids',
            description: 'Understanding digital gold and the blockchain.',
            progress: 0,
            icon: <div className="text-3xl">🪙</div>,
            locked: true
          }} />
        </div>
      </div>
    </div>
  );
}
