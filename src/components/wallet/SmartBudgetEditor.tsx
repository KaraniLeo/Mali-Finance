import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit2, Check, X, AlertCircle } from 'lucide-react';
import { BudgetRule } from '../../types';

interface SmartBudgetEditorProps {
  budgetRules: Record<string, BudgetRule>;
  isEditingBudget: boolean;
  setIsEditingBudget: (val: boolean) => void;
  tempRules: Record<string, BudgetRule>;
  setTempRules: React.Dispatch<React.SetStateAction<Record<string, BudgetRule>>>;
  setBudgetRules: (rules: Record<string, BudgetRule>) => void;
  toast: any;
}

export function SmartBudgetEditor({
  budgetRules,
  isEditingBudget,
  setIsEditingBudget,
  tempRules,
  setTempRules,
  setBudgetRules,
  toast
}: SmartBudgetEditorProps) {

  const handleUpdateBudgetRule = (jarId: string, value: number) => {
    setTempRules(prev => ({
      ...prev,
      [jarId]: { ...prev[jarId], value }
    }));
  };

  const handleSaveBudgetRules = () => {
    const total = Object.values(tempRules).reduce((acc, rule) => acc + rule.value, 0);
    if (total !== 100) {
      toast.error(`Total allocation must equal 100% (currently ${total}%)`);
      return;
    }
    setBudgetRules(tempRules);
    setIsEditingBudget(false);
    toast.success('Budget rules updated successfully!');
  };

  const totalAllocation = Object.values(tempRules).reduce((acc, rule) => acc + rule.value, 0);

  return (
    <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-stone-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-brand-secondary flex items-center gap-2">
            Smart Budget Rules
            <div className="bg-brand-accent/10 text-brand-accent text-[10px] px-2 py-1 rounded-md font-black uppercase tracking-wider">Auto-Pilot</div>
          </h3>
          <p className="text-stone-500 text-sm mt-1">Automatically split your deposits</p>
        </div>
        {!isEditingBudget ? (
          <button 
            onClick={() => {
              setTempRules(budgetRules);
              setIsEditingBudget(true);
            }}
            className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 hover:bg-brand-accent hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <Edit2 size={16} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditingBudget(false)}
              className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
            <button 
              onClick={handleSaveBudgetRules}
              className="px-4 py-2 rounded-xl bg-brand-accent text-white hover:bg-[#5a781c] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Check size={16} /> Save
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {isEditingBudget && totalAllocation !== 100 && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
            <AlertCircle size={18} />
            Allocations must total 100%. Currently at {totalAllocation}%.
          </div>
        )}
        
        {Object.values(isEditingBudget ? tempRules : budgetRules).map((rule: any) => (
          <div key={rule.jarId} className="flex items-center gap-4">
            <div className="w-32 font-bold text-stone-700">{rule.jarName || rule.name}</div>
            <div className="flex-1">
              {isEditingBudget ? (
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={rule.value}
                    onChange={(e) => handleUpdateBudgetRule(rule.jarId, parseInt(e.target.value))}
                    className="w-full accent-[#6B8E23]"
                  />
                  <div className="w-16 font-black text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-lg text-center">
                    {rule.value}%
                  </div>
                </div>
              ) : (
                <div className="h-4 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${rule.value}%` }}
                    className="h-full bg-brand-accent rounded-full"
                  />
                </div>
              )}
            </div>
            {!isEditingBudget && (
              <div className="w-16 text-right font-black text-stone-400">
                {rule.value}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
