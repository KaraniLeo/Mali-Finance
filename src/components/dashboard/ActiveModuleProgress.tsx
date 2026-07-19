import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Module, View } from '../../types';

interface ActiveModuleProgressProps {
  activeModule: Module;
  learnProgress: number;
  earnProgress: number;
  saveProgress: number;
  onNavigate?: (view: View) => void;
  onSelectModule?: (module: Module) => void;
}

export function ActiveModuleProgress({ activeModule, learnProgress, earnProgress, saveProgress, onNavigate, onSelectModule }: ActiveModuleProgressProps) {
  return (
    <motion.div 
      layout
      className="p-6 md:p-10 rounded-[32px] md:rounded-[40px] bg-brand-accent text-white relative overflow-hidden flex flex-col min-h-[280px] shadow-2xl flex-shrink-0 cursor-pointer hover:scale-[1.01] transition-transform"
      onClick={() => onSelectModule?.(activeModule)}
    >
      <div className="absolute -top-12 -right-12 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-3xl"></div>
 
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 flex flex-col h-full"
        >
          <div className="self-start bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-auto">
            TODAY'S CHALLENGE
          </div>
          
          <div className="flex items-center gap-4 mb-4 mt-8">
            {activeModule.icon}
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {activeModule.title}
            </h2>
          </div>
          <p className="text-[#F7F7F2]/90 max-w-lg text-sm md:text-lg font-medium leading-relaxed mb-6">
            {activeModule.description}
          </p>
          <div className="flex gap-2 mt-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate?.('learn'); }}
              className="flex-1 bg-black/20 hover:bg-black/30 transition-colors rounded-xl p-3 flex flex-col justify-between text-left cursor-pointer group"
            >
              <div className="text-[10px] font-black tracking-widest uppercase mb-2 group-hover:text-white transition-colors">Learn</div>
              <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-[#D4A373] h-1.5 rounded-full transition-all" style={{ width: `${learnProgress}%` }} /></div>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate?.('tasks'); }}
              className="flex-1 bg-black/20 hover:bg-black/30 transition-colors rounded-xl p-3 flex flex-col justify-between text-left cursor-pointer group"
            >
              <div className="text-[10px] font-black tracking-widest uppercase mb-2 group-hover:text-white transition-colors">Earn</div>
              <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-yellow-400 h-1.5 rounded-full transition-all" style={{ width: `${earnProgress}%` }} /></div>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate?.('wallet'); }}
              className="flex-1 bg-black/20 hover:bg-black/30 transition-colors rounded-xl p-3 flex flex-col justify-between text-left cursor-pointer group"
            >
              <div className="text-[10px] font-black tracking-widest uppercase mb-2 group-hover:text-white transition-colors">Save</div>
              <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-brand-accent/20 h-1.5 rounded-full transition-all" style={{ width: `${saveProgress}%` }} /></div>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
