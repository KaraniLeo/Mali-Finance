const fs = require('fs');
const path = require('path');

// Fix ParentDashboard toggles
const parentFile = path.join(__dirname, '../src/pages/ParentDashboard.tsx');
let parentContent = fs.readFileSync(parentFile, 'utf8');

parentContent = parentContent.replace(
  /onClick=\{\(\) => toggleChallengeStatus\(selectedChildId!, c\.id, 'completed'\)\}/g,
  `onClick={async () => {
    const { error } = await supabase.from('challenges').update({ status: 'completed' }).eq('id', c.id);
    if (!error) {
      setChildChallenges(prev => prev.map(ch => ch.id === c.id ? { ...ch, status: 'completed' } : ch));
      toast.success('Challenge marked as completed');
    } else {
      toast.error('Failed to complete challenge');
    }
  }}`
);

parentContent = parentContent.replace(
  /onClick=\{\(\) => toggleChallengeStatus\(selectedChildId!, c\.id, 'failed'\)\}/g,
  `onClick={async () => {
    const { error } = await supabase.from('challenges').update({ status: 'failed' }).eq('id', c.id);
    if (!error) {
      setChildChallenges(prev => prev.map(ch => ch.id === c.id ? { ...ch, status: 'failed' } : ch));
      toast.error('Challenge marked as failed');
    } else {
      toast.error('Failed to fail challenge');
    }
  }}`
);

fs.writeFileSync(parentFile, parentContent);
console.log('ParentDashboard toggles fixed');

// Inject Challenges into DashboardView
const dashFile = path.join(__dirname, '../src/pages/DashboardView.tsx');
let dashContent = fs.readFileSync(dashFile, 'utf8');

// 1. Add childChallenges state and fetch
if (!dashContent.includes('const [childChallenges')) {
  dashContent = dashContent.replace(
    'const [tasks, setTasks] = useState<Task[]>([]);',
    'const [tasks, setTasks] = useState<Task[]>([]);\n  const [childChallenges, setChildChallenges] = useState<any[]>([]);'
  );

  const fetchTasksRegex = /const fetchTasks = async \(\) => \{[\s\S]*?\};\n\n  useEffect\(\(\) => \{/m;
  const newFetch = `const fetchTasks = async () => {
    const { data } = await supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (data) setTasks(data as Task[]);
  };

  const fetchChallenges = async () => {
    const { data } = await supabase.from('challenges').select('*').eq('child_id', user.id).eq('status', 'active').order('created_at', { ascending: false });
    if (data) setChildChallenges(data);
  };

  useEffect(() => {
    fetchChallenges();`;
    
  dashContent = dashContent.replace(fetchTasksRegex, newFetch);
  dashContent = dashContent.replace('fetchTasks();', 'fetchTasks();\n      fetchChallenges();');

  // 2. Add ChallengeBoard section above or below TaskBoard
  const taskBoardStr = '<TaskBoard tasks={tasks} onCompleteTask={handleCompleteTask} onAddTask={handleAddTask} />';
  
  const challengeUI = `
        {/* Active Challenges */}
        {childChallenges.length > 0 && (
          <div className="bg-white dark:bg-[#121212] rounded-[32px] p-6 shadow-sm border border-stone-100 dark:border-stone-800/50 relative overflow-hidden mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">Active Challenges</h3>
            </div>
            <div className="space-y-3">
              {childChallenges.map((challenge) => (
                <div key={challenge.id} className="flex flex-col p-4 bg-brand-primary/10 dark:bg-brand-primary/5 rounded-2xl border border-brand-primary/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{challenge.title}</span>
                    <span className="text-xs font-black text-brand-primary">+{formatCurrency(challenge.reward_amount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Duration: {challenge.duration_days} Days</span>
                    <button 
                      onClick={async () => {
                        const { error } = await supabase.from('challenges').update({ status: 'pending_approval' }).eq('id', challenge.id);
                        if (!error) {
                          setChildChallenges(prev => prev.filter(c => c.id !== challenge.id));
                          toast.success('Challenge marked as completed! Pending parent approval.');
                        }
                      }}
                      className="px-3 py-1.5 bg-brand-primary text-white rounded-full text-xs font-bold"
                    >
                      Log Completion
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <TaskBoard tasks={tasks} onCompleteTask={handleCompleteTask} onAddTask={handleAddTask} />
  `;

  dashContent = dashContent.replace(taskBoardStr, challengeUI);
  fs.writeFileSync(dashFile, dashContent);
  console.log('DashboardView Challenges injected');
}

