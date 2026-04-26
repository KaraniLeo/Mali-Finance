import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Eye, EyeOff, Bell, Lock } from 'lucide-react';

export function ParentalView() {
  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div className="bg-[#6B8E23] rounded-[32px] p-8 text-white flex items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl">
          <ShieldCheck size={36} />
        </div>
        <div>
          <h2 className="text-3xl font-black brand">Parental Guard</h2>
          <p className="text-[#F7F7F2]/80 font-medium">Safe, supervised, and guided financial discovery.</p>
        </div>
        <div className="absolute top-0 right-0 p-8">
           <Lock size={120} className="text-white/5 -mb-10 -mr-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#2D3911]">Safety Settings</h3>
            
            <div className="space-y-4">
              <div className="p-6 bg-white border border-stone-100 rounded-[24px] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-stone-50 rounded-xl text-[#6B8E23]"><Bell size={20} /></div>
                  <div>
                    <h5 className="font-bold text-stone-800">Spent Alerts</h5>
                    <p className="text-[10px] text-stone-400 font-medium tracking-wide">Notify parent on large spends</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-[#6B8E23] rounded-full relative p-1 cursor-pointer">
                   <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-md"></div>
                </div>
              </div>

              <div className="p-6 bg-white border border-stone-100 rounded-[24px] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-stone-50 rounded-xl text-[#6B8E23]"><Eye size={20} /></div>
                  <div>
                    <h5 className="font-bold text-stone-800">Portfolio View</h5>
                    <p className="text-[10px] text-stone-400 font-medium tracking-wide">Parent can view wallet balance</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-[#6B8E23] rounded-full relative p-1 cursor-pointer">
                   <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-md"></div>
                </div>
              </div>

              <div className="p-6 bg-white border border-stone-100 rounded-[24px] flex flex-col gap-4 shadow-sm">
                 <h5 className="font-bold text-stone-800">Weekly Allowance Automator</h5>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-500">Amount per week</span>
                    <span className="px-4 py-1.5 bg-stone-50 rounded-lg font-black text-stone-800">500 KES</span>
                 </div>
                 <button className="w-full py-3 bg-stone-100 rounded-xl text-stone-500 font-bold text-xs uppercase tracking-widest hover:bg-stone-200 transition-all">
                    Link Parent Card
                 </button>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#2D3911]">Parental Overview</h3>
            <div className="p-8 bg-stone-100 rounded-[32px] border-2 border-stone-200/50 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl mb-4">👨‍👩‍👧‍👦</div>
              <h4 className="font-extrabold text-[#2D3911] text-lg">Guardian Mode Active</h4>
              <p className="text-xs text-stone-500 font-medium mt-2 max-w-[200px]">
                Your parents are currently guiding your wealth journey from the Parent App.
              </p>
              <div className="mt-8 pt-8 border-t border-stone-200 w-full grid grid-cols-2 gap-4">
                <div>
                   <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Trust Level</div>
                   <div className="text-xl font-black text-[#6B8E23]">High</div>
                </div>
                <div>
                   <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Maturity Score</div>
                   <div className="text-xl font-black text-[#D4A373]">85%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
