import React from 'react';
import { motion } from 'motion/react';
import { Module } from '../types';
import { parseLocalizedContent } from '../lib/contentParser';

interface ModuleCardProps {
  module: Module;
  onClick?: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  return (
    <motion.div 
      whileHover={!module.locked ? { y: -5 } : undefined}
      onClick={!module.locked ? onClick : undefined}
      className={`p-6 rounded-[32px] bg-white border border-stone-100 shadow-lg flex flex-col relative overflow-hidden ${module.locked ? 'opacity-60 grayscale' : 'cursor-pointer'}`}
    >
      <div className="mb-6">{module.icon}</div>
      <h4 className="font-extrabold text-stone-800 text-base leading-tight mb-2">{parseLocalizedContent(module.title)}</h4>
      <p className="text-xs text-stone-500 font-medium leading-relaxed mb-6">{parseLocalizedContent(module.description)}</p>
      
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Progress</span>
          <span className="text-[10px] font-black text-brand-accent">{module.progress}%</span>
        </div>
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${module.progress}%` }}
            className="h-full bg-brand-accent"
          />
        </div>
      </div>

      {module.locked && (
        <div className="absolute inset-0 bg-stone-100/40 dark:bg-stone-950/60 backdrop-blur-[2px] flex items-center justify-center pointer-events-none p-4 text-center">
           <div className="bg-white/90 dark:bg-stone-800/90 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-500 shadow-md">
             Locked • {module.lockedReason || 'Complete previous module'}
           </div>
        </div>
      )}
    </motion.div>
  );
}
