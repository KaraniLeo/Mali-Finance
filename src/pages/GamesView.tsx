import React from 'react';
import { Gamepad2, BrainCircuit, PiggyBank } from 'lucide-react';
import { MarketSim } from '../components/games/MarketSim';
import { toast } from '../state/toastStore';

export function GamesView() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-brand-secondary dark:text-brand-primary brand flex items-center gap-3">
          <Gamepad2 size={32} />
          Simulators & Games
        </h2>
        <p className="text-stone-500 font-medium">Test your skills in risk-free interactive environments.</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 space-y-8 pr-2">
        
        {/* Trading Simulator */}
        <div className="bg-white dark:bg-stone-800 rounded-[32px] p-6 shadow-sm border border-stone-200 dark:border-stone-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-stone-800 dark:text-stone-200">The 10-Day Market Challenge</h3>
              <p className="text-stone-500 dark:text-stone-400 text-sm">Experience the psychology of price action.</p>
            </div>
          </div>
          <MarketSim onComplete={() => toast.success('Simulator Complete! Check your new insight.')} />
        </div>

        {/* PiggyBank Challenge */}
        <div className="bg-white dark:bg-stone-800 rounded-[32px] p-6 shadow-sm border border-stone-200 dark:border-stone-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-2xl flex items-center justify-center text-pink-600 dark:text-pink-400">
              <PiggyBank size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-stone-800 dark:text-stone-200">The Ultimate PiggyBank</h3>
              <p className="text-stone-500 dark:text-stone-400 text-sm">Save your digital currency and watch it grow.</p>
            </div>
          </div>
          <div className="w-full bg-stone-50 dark:bg-stone-900 rounded-2xl p-8 border border-stone-100 dark:border-stone-800 flex flex-col items-center justify-center text-center">
            <div className="bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Coming Soon</div>
            <p className="text-stone-600 dark:text-stone-300 font-medium">The interactive PiggyBank engine is currently under construction. Check back later!</p>
          </div>
        </div>

      </div>
    </div>
  );
}
