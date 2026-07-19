import React, { useState } from 'react';
import { formatCurrency } from '../lib/currency';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useWealthJarStore } from '../state/wealthJarStore';
import * as LucideIcons from 'lucide-react';

interface TaskAllocationModalProps {
  isOpen: boolean;
  taskTitle: string;
  rewardAmount: number;
  onClose: () => void;
  onConfirm: (destinationId: string) => void;
}

export function TaskAllocationModal({ isOpen, taskTitle, rewardAmount, onClose, onConfirm }: TaskAllocationModalProps) {
  const { jars } = useWealthJarStore();
  const [selectedDestination, setSelectedDestination] = useState<string>('wallet');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="mb-8">
              <div className="w-16 h-16 bg-brand-accent/10 text-brand-accent rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-black text-brand-secondary dark:text-brand-primary leading-tight mb-2">
                Task Completed!
              </h2>
              <p className="text-stone-500 font-medium">
                You earned <span className="font-bold text-brand-accent">{formatCurrency(rewardAmount)}</span> from "{taskTitle}". Where would you like to allocate these funds?
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setSelectedDestination('wallet')}
                className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                  selectedDestination === 'wallet' 
                    ? 'border-brand-accent bg-brand-accent/5 shadow-sm' 
                    : 'border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedDestination === 'wallet' ? 'bg-brand-accent text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'}`}>
                  <Wallet size={24} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-bold text-lg ${selectedDestination === 'wallet' ? 'text-brand-secondary dark:text-brand-primary' : 'text-stone-700 dark:text-stone-300'}`}>
                    Main Wallet
                  </h3>
                  <p className="text-sm font-medium text-stone-500">Unallocated funds</p>
                </div>
                {selectedDestination === 'wallet' && <CheckCircle2 className="text-brand-accent" size={20} />}
              </button>

              <div className="py-2 text-center text-xs font-bold uppercase tracking-wider text-stone-400">
                Or allocate to a Jar
              </div>

              {jars.map(jar => {
                const IconComponent = (LucideIcons as any)[jar.icon || 'PiggyBank'] || LucideIcons.PiggyBank;
                const isSelected = selectedDestination === jar.id;
                return (
                  <button
                    key={jar.id}
                    onClick={() => setSelectedDestination(jar.id)}
                    className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                      isSelected 
                        ? 'border-brand-accent bg-brand-accent/5 shadow-sm' 
                        : 'border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${jar.color || 'bg-emerald-500'}`}>
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className={`font-bold text-lg ${isSelected ? 'text-brand-secondary dark:text-brand-primary' : 'text-stone-700 dark:text-stone-300'}`}>
                        {jar.name}
                      </h3>
                      <p className="text-sm font-medium text-stone-500">
                        {formatCurrency(jar.balance)} currently
                      </p>
                    </div>
                    {isSelected && <CheckCircle2 className="text-brand-accent" size={20} />}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="p-4 md:p-6 bg-stone-50 dark:bg-stone-800 border-t border-stone-100 dark:border-stone-700">
            <button
              onClick={() => onConfirm(selectedDestination)}
              className="w-full bg-brand-accent text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-[#6B8E23]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Allocate Funds <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
