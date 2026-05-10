import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, Plus, Filter, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { useAchievement } from '../context/AchievementContext';

interface TasksViewProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function TasksView({ tasks, setTasks }: TasksViewProps) {
  const [filter, setFilter] = useState<'all' | 'chore' | 'hustle' | 'completed'>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', category: 'chore', reward: '' });

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'completed') return t.completed;
    return t.category === filter;
  });

  const { track } = useAchievement();

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        if (!t.completed) track('TASK_COMPLETED');
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.reward) return;
    const reward = parseInt(newTask.reward);
    if (isNaN(reward) || reward <= 0) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      reward,
      category: newTask.category as 'chore' | 'hustle',
      completed: false
    };
    setTasks(prev => [task, ...prev]);
    setIsAddingTask(false);
    setNewTask({ title: '', category: 'chore', reward: '' });
  };

  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#2D3911] brand">Side-Hustle Simulator</h2>
          <p className="text-stone-500 font-medium">Choose virtual gigs, complete real-world chores, and build your hustle!</p>
        </div>
        <button 
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="bg-[#6B8E23] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#6B8E23]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          {isAddingTask ? 'Cancel' : <><Plus size={20} /> Add New Task</>}
        </button>
      </div>

      <AnimatePresence>
        {isAddingTask && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-wrap gap-4 items-end mb-4 shadow-sm">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Task Title</label>
                <input type="text" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} placeholder="e.g. Wash the family car" className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-[#6B8E23]" />
              </div>
              <div className="w-[120px]">
                <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Reward (KES)</label>
                <input type="number" value={newTask.reward} onChange={e => setNewTask({...newTask, reward: e.target.value})} placeholder="150" className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-[#6B8E23]" />
              </div>
              <div className="w-[150px]">
                <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Category</label>
                <select value={newTask.category} onChange={e => setNewTask({...newTask, category: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-[#6B8E23]">
                  <option value="chore">Chore (Real World)</option>
                  <option value="hustle">Gig (Virtual)</option>
                </select>
              </div>
              <button onClick={handleAddTask} className="bg-[#6B8E23] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#5a781c] cursor-pointer">Create</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${filter === 'all' ? 'bg-[#6B8E23] text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>All Tasks</button>
        <button onClick={() => setFilter('chore')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${filter === 'chore' ? 'bg-[#6B8E23] text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>Chores</button>
        <button onClick={() => setFilter('hustle')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${filter === 'hustle' ? 'bg-[#6B8E23] text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>Virtual Gigs</button>
        <button onClick={() => setFilter('completed')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${filter === 'completed' ? 'bg-[#6B8E23] text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>Completed</button>
      </div>

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
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                    task.completed 
                      ? 'bg-[#6B8E23] border-[#6B8E23] text-white' 
                      : 'border-stone-200 group-hover:border-[#6B8E23] text-transparent group-hover:text-[#6B8E23]'
                  }`}
                >
                  ✓
                </button>
                <button 
                  onClick={() => deleteTask(task.id)}
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
    </div>
  );
}
