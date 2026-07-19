import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TaskFormProps {
  isAddingTask: boolean;
  newTask: { title: string; category: string; reward: string };
  setNewTask: (task: { title: string; category: string; reward: string }) => void;
  handleAddTask: () => void;
}

export function TaskForm({ isAddingTask, newTask, setNewTask, handleAddTask }: TaskFormProps) {
  return (
    <AnimatePresence>
      {isAddingTask && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-wrap gap-4 items-end mb-4 shadow-sm">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Task Title</label>
              <input type="text" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} placeholder="e.g. Wash the family car" className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-brand-accent text-stone-900" />
            </div>
            <div className="w-[120px]">
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Reward</label>
              <input type="number" value={newTask.reward} onChange={e => setNewTask({...newTask, reward: e.target.value})} placeholder="150" className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-brand-accent text-stone-900" />
            </div>
            <div className="w-[150px]">
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Category</label>
              <select value={newTask.category} onChange={e => setNewTask({...newTask, category: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-brand-accent text-stone-900">
                <option value="chore">Chore (Real World)</option>
                <option value="hustle">Gig (Virtual)</option>
              </select>
            </div>
            <button onClick={handleAddTask} className="bg-brand-accent text-white px-6 py-2 rounded-lg font-bold hover:bg-[#5a781c] cursor-pointer">Create</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
