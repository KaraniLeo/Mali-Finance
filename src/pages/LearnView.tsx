import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search } from 'lucide-react';
import { Module, Tier } from '../types';
import { ModuleCard } from '../components/ModuleCard';

interface LearnViewProps {
  tier: Tier;
  modules: Module[];
  onSelectModule?: (module: Module) => void;
}

export function LearnView({ tier, modules, onSelectModule }: LearnViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = modules.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {filteredModules.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((m) => (
              <ModuleCard key={m.id} module={m} onClick={() => onSelectModule?.(m)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-stone-500">
            <Search size={32} className="mb-4 text-stone-300" />
            <p>No modules found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
