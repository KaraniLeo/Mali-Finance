import React from 'react';
import { motion } from 'motion/react';
import { Module } from '../types';

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-6 rounded-[32px] bg-white border border-stone-100 shadow-lg flex flex-col relative overflow-hidden ${module.locked ? 'opacity-60 grayscale' : ''}`}
    >
      <div className="mb-6">{module.icon}</div>
      <h4 className="font-extrabold text-stone-800 text-base leading-tight mb-2">{module.title}</h4>
      <p className="text-xs text-stone-500 font-medium leading-relaxed mb-6">{module.description}</p>
      
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Progress</span>
          <span className="text-[10px] font-black text-[#6B8E23]">{module.progress}%</span>
        </div>
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${module.progress}%` }}
            className="h-full bg-[#6B8E23]"
          />
        </div>
      </div>

      {module.locked && (
        <div className="absolute inset-0 bg-stone-100/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
           <div className="bg-white/90 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-500 shadow-md">
             Locked • Lvl 15 Required
           </div>
        </div>
      )}
    </motion.div>
  );
}
