import React from 'react';
import { motion } from 'motion/react';
import { Trash2 } from 'lucide-react';
import { Task } from '../../types';
import { formatCurrency } from '../../lib/currency';

interface TaskListProps {
  filteredTasks: Task[];
  toggleTask: (id: string) => void;
  handleDeleteTaskClick: (task: Task) => void;
}

export function TaskList({ filteredTasks, toggleTask, handleDeleteTaskClick }: TaskListProps) {
  return (
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white border border-stone-100 rounded-[24px] shadow-sm flex items-center justify-between group hover:shadow-md transition-all relative"
          >
            <div className="flex items-center gap-4 pr-12">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
                task.category === 'chore' ? 'bg-blue-50' : 
                task.category === 'hustle' ? 'bg-purple-50' : 'bg-emerald-50'
              }`}>
                {task.category === 'chore' ? '🏠' : 
                 task.category === 'hustle' ? '🚀' : '💰'}
              </div>
              <div>
                <h4 className={`font-bold ${task.completed ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">
                    {task.category}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-[10px] font-bold text-stone-400">
                    Reward: {formatCurrency(task.reward)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!task.completed && (
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer border-stone-200 group-hover:border-brand-accent text-transparent group-hover:text-brand-accent"
                >
                  ✓
                </button>
              )}
              {task.completed && (
                <div className="text-xs font-bold text-brand-accent px-2 uppercase tracking-wider">
                  Completed
                </div>
              )}
              <button 
                onClick={() => handleDeleteTaskClick(task)}
                className="w-10 h-10 rounded-full bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
        {filteredTasks.length === 0 && (
           <div className="col-span-2 py-12 text-center text-stone-400 font-bold">
             No tasks found. Start adding some!
           </div>
        )}
      </div>
    </div>
  );
}
