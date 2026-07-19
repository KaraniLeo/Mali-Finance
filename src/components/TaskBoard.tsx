import React, { useState } from 'react';
import { formatCurrency } from '../lib/currency';
import { Task } from '../types';
import { CheckCircle, Plus } from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  onCompleteTask?: (task: Task) => void;
  onAddTask?: (title: string, reward: number) => void;
}

export function TaskBoard({ tasks, onCompleteTask, onAddTask }: TaskBoardProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskReward, setNewTaskReward] = useState('');

  const handleAdd = () => {
    if (!newTaskTitle || !newTaskReward) return;
    const reward = parseFloat(newTaskReward);
    if (isNaN(reward) || reward <= 0) return;
    
    if (onAddTask) {
      onAddTask(newTaskTitle, reward);
      setNewTaskTitle('');
      setNewTaskReward('');
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-white border border-stone-100 shadow-xl max-h-[350px] flex flex-col">
       <div className="flex justify-between items-center mb-4">
         <h3 className="text-lg font-bold text-brand-secondary">Pending Tasks</h3>
       </div>

       {onAddTask && (
         <div className="flex gap-2 mb-4 bg-stone-50 p-2 rounded-xl border border-stone-100 flex-shrink-0">
           <input 
             type="text" 
             placeholder="New Task..." 
             value={newTaskTitle}
             onChange={e => setNewTaskTitle(e.target.value)}
             className="flex-1 bg-transparent px-2 text-sm outline-none font-bold text-stone-700 placeholder:font-normal min-w-0"
           />
           <input 
             type="number" 
             placeholder="Reward" 
             value={newTaskReward}
             onChange={e => setNewTaskReward(e.target.value)}
             className="w-20 bg-transparent px-2 text-sm outline-none font-bold text-stone-700 placeholder:font-normal border-l border-stone-200"
           />
           <button 
             onClick={handleAdd}
             className="bg-brand-accent text-white p-1.5 rounded-lg hover:bg-[#5a781c] transition-colors cursor-pointer"
           >
             <Plus size={16} />
           </button>
         </div>
       )}

       <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
         {tasks.length === 0 ? (
           <div className="text-center text-stone-400 text-sm mt-4">No tasks pending. Add one above!</div>
         ) : (
           tasks.map((task) => (
             <div key={task.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100">
               <div className="flex items-center gap-3 flex-1 min-w-0">
                 <div className={`w-2 h-2 rounded-full flex-shrink-0 ${task.completed ? 'bg-brand-accent' : 'bg-[#D4A373]'}`}></div>
                 <span className={`text-xs font-bold truncate ${task.completed ? 'text-stone-300 line-through' : 'text-stone-700'}`}>{task.title}</span>
               </div>
               <div className="flex items-center gap-2 flex-shrink-0">
                 <span className="text-[10px] font-black text-emerald-600">+{formatCurrency(task.reward)}</span>
                 {!task.completed && onCompleteTask && (
                   <button 
                     onClick={() => onCompleteTask(task)}
                     className="ml-2 text-stone-300 hover:text-emerald-500 transition-colors cursor-pointer"
                   >
                     <CheckCircle size={16} />
                   </button>
                 )}
               </div>
             </div>
           ))
         )}
       </div>
    </div>
  );
}
