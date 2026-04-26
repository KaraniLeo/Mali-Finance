import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Plus, Filter } from 'lucide-react';
import { Task } from '../../types';

interface TasksViewProps {
  tasks: Task[];
}

export function TasksView({ tasks }: TasksViewProps) {
  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#2D3911] brand">Task Board</h2>
          <p className="text-stone-500 font-medium">Complete tasks, earn rewards, and level up!</p>
        </div>
        <button className="bg-[#6B8E23] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#6B8E23]/20 hover:scale-105 active:scale-95 transition-all">
          <Plus size={20} /> Add New Task
        </button>
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-[#6B8E23] text-white rounded-lg text-xs font-bold">All Tasks</button>
        <button className="px-4 py-2 bg-white border border-stone-200 text-stone-600 rounded-lg text-xs font-bold">Chores</button>
        <button className="px-4 py-2 bg-white border border-stone-200 text-stone-600 rounded-lg text-xs font-bold">Learning</button>
        <button className="px-4 py-2 bg-white border border-stone-200 text-stone-600 rounded-lg text-xs font-bold">Completed</button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white border border-stone-100 rounded-[24px] shadow-sm flex items-center justify-between group hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                  task.category === 'chore' ? 'bg-blue-50' : 
                  task.category === 'learning' ? 'bg-purple-50' : 'bg-emerald-50'
                }`}>
                  {task.category === 'chore' ? '🏠' : 
                   task.category === 'learning' ? '📚' : '💰'}
                </div>
                <div>
                  <h4 className={`font-bold ${task.completed ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#6B8E23]">
                      {task.category}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-[10px] font-bold text-stone-400">
                      Reward: {task.reward} KES
                    </span>
                  </div>
                </div>
              </div>
              <button 
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed 
                    ? 'bg-[#6B8E23] border-[#6B8E23] text-white' 
                    : 'border-stone-200 group-hover:border-[#6B8E23] text-transparent group-hover:text-stone-200'
                }`}
              >
                {task.completed ? '✓' : '✓'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
