import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Gem } from 'lucide-react';
import { User, Tier, Module, Task } from '../../types';
import { ModuleCard } from '../ModuleCard';
import { SavingsGoalCard } from '../SavingsGoalCard';
import { TaskBoard } from '../TaskBoard';
import { MaliBot } from '../MaliBot';

interface DashboardViewProps {
  user: User;
  modules: Module[];
  tasks: Task[];
  chatHistory: any[];
  onSendMessage: (text: string) => void;
}

export function DashboardView({ user, modules, tasks, chatHistory, onSendMessage }: DashboardViewProps) {
  const { tier } = user;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
      <div className="lg:col-span-8 flex flex-col gap-8 overflow-y-auto lg:pr-2 custom-scrollbar lg:h-full">
        
        <motion.div 
          layout
          className="p-6 md:p-10 rounded-[32px] md:rounded-[40px] bg-[#6B8E23] text-white relative overflow-hidden flex flex-col justify-end min-h-[240px] md:min-h-[300px] shadow-2xl flex-shrink-0"
        >
          <div className="absolute top-6 md:top-8 left-6 md:left-10 bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
            {tier === 'junior' ? "TODAY'S MISSION" : tier === 'teen' ? "HUSTLE LAB" : "MARKET INSIGHT"}
          </div>
          <div className="absolute -top-12 -right-12 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-3xl"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tier}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative z-10"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight leading-tight">
                {tier === 'junior' ? "Piggy Power! 🐷" : tier === 'teen' ? "Stock Market Simulator 🚀" : "Bond Yield Strategies 🏛️"}
              </h2>
              <p className="text-[#F7F7F2]/80 max-w-lg text-sm md:text-lg font-medium leading-relaxed">
                {tier === 'junior' 
                  ? "Learn how to feed your piggy bank and watch it grow!"
                  : tier === 'teen'
                  ? "Test your instincts in a live digital market sim."
                  : "Master fixed-income maturity dates like a pro."
                }
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <button className="w-full sm:w-auto bg-[#D4A373] text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:translate-y-[-2px] transition-transform">
                  {tier === 'junior' ? "Play Game" : tier === 'teen' ? "Start Sim" : "Read Manuscript"}
                </button>
                <div className="flex items-center gap-4 text-xs font-bold text-white/70">
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
                    <TrendingUp size={14} /> <span>15 Mins</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 text-amber-300">
                    <Gem size={14} /> <span>+500 XP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#2D3911]">Adventure Modules</h3>
            <button className="text-[10px] font-black text-[#6B8E23] uppercase tracking-widest">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {modules.map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
        </div>

        <div className="mb-8">
           <h3 className="text-xl md:text-2xl font-bold text-[#2D3911] mb-6">Wealth Jars</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
             <SavingsGoalCard 
               title="New Mountain Bike" 
               target={12000} 
               current={8500} 
               category="Toys"
               color="bg-[#D4A373]"
             />
             <SavingsGoalCard 
               title="Education Fund" 
               target={50000} 
               current={12500} 
               category="Long Term"
               color="bg-[#6B8E23]"
             />
           </div>
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8 pb-10 lg:pb-0 h-full">
        <MaliBot user={user} chatHistory={chatHistory} onSendMessage={onSendMessage} />
        <TaskBoard tasks={tasks} />
      </div>
    </div>
  );
}
