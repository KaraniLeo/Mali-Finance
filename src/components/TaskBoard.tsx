import React from 'react';
import { Task } from '../types';

interface TaskBoardProps {
  tasks: Task[];
}

export function TaskBoard({ tasks }: TaskBoardProps) {
  return (
    <div className="p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white border border-stone-100 shadow-xl max-h-[300px] flex flex-col">
       <h3 className="text-lg font-bold text-[#2D3911] mb-4">Pending Tasks</h3>
       <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
         {tasks.map((task) => (
           <div key={task.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100">
             <div className="flex items-center gap-3">
               <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-[#6B8E23]' : 'bg-[#D4A373]'}`}></div>
               <span className={`text-xs font-bold truncate max-w-[120px] ${task.completed ? 'text-stone-300' : 'text-stone-700'}`}>{task.title}</span>
             </div>
             <span className="text-[10px] font-black text-emerald-600 flex-shrink-0">+{task.reward} KES</span>
           </div>
         ))}
       </div>
    </div>
  );
}
