const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/pages/ParentDashboard.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add childChallenges state
content = content.replace(
  'const [childWalletBalance, setChildWalletBalance] = useState<number | null>(null);',
  'const [childWalletBalance, setChildWalletBalance] = useState<number | null>(null);\n  const [childChallenges, setChildChallenges] = useState<any[]>([]);'
);

// 2. Fetch challenges dynamically
const fetchStr = `          // Fetch Tasks
          supabase
            .from('tasks')`;
const newFetchStr = `          // Fetch Challenges
          supabase
            .from('challenges')
            .select('*')
            .eq('child_id', selectedChildId)
            .order('created_at', { ascending: false })
            .then(({ data: challengeData }) => {
              if (challengeData) setChildChallenges(challengeData);
            });

          // Fetch Tasks
          supabase
            .from('tasks')`;
content = content.replace(fetchStr, newFetchStr);

// 3. Rewrite handleAssignChallenge
const oldAssignRegex = /  const handleAssignChallenge = \(presetTitle\?: string, presetDays\?: number, presetReward\?: number\) => \{[\s\S]*?toast\.success\(`Assigned challenge "\$\{title\}" to \$\{activeChild\?\.name\}!`\);\n  \};/;
const newAssignFn = `  const handleAssignChallenge = async (presetTitle?: string, presetDays?: number, presetReward?: number) => {
    if (!selectedChildId) return;

    const title = presetTitle || customChallengeTitle.trim();
    const target = presetDays || customChallengeDays;
    const reward = presetReward || customChallengeReward;

    if (!title) {
      toast.error('Please specify a challenge title.');
      return;
    }

    const { data, error } = await supabase.from('challenges').insert({
      parent_id: user.id,
      child_id: selectedChildId,
      title,
      duration_days: target,
      target: target,
      reward_amount: reward,
      status: 'active'
    }).select();

    if (error) {
      toast.error('Failed to assign challenge: ' + error.message);
      return;
    }

    if (data) {
      setChildChallenges(prev => [data[0], ...prev]);
      toast.success(\`Assigned challenge "\${title}" to \${activeChild?.name}!\`);
      pushLocalFeedItem(selectedChildId, \`Assigned Challenge: "\${title}" (\${target} Days)\`, 'info');
      setCustomChallengeTitle('');
      setCustomChallengeDays(7);
      setCustomChallengeReward(1000);
      setShowChallengeForm(false);
    }
  };`;
content = content.replace(oldAssignRegex, newAssignFn);

// 4. Find where activeChallenges is used and use childChallenges
content = content.replace(
  'const activeChallenges = selectedChildId ? challenges[selectedChildId] || [] : [];',
  'const activeChallenges = childChallenges;'
);

// 5. Replace toggle actions in UI
content = content.replace(
  /onClick=\{\(\) => toggleChallengeStatus\(selectedChildId, ch\.id, 'completed'\)\}/g,
  `onClick={async () => {
    const { error } = await supabase.from('challenges').update({ status: 'completed' }).eq('id', ch.id);
    if (!error) {
      setChildChallenges(prev => prev.map(c => c.id === ch.id ? { ...c, status: 'completed' } : c));
      toast.success('Challenge marked as completed');
    }
  }}`
);

content = content.replace(
  /onClick=\{\(\) => toggleChallengeStatus\(selectedChildId, ch\.id, 'failed'\)\}/g,
  `onClick={async () => {
    const { error } = await supabase.from('challenges').update({ status: 'failed' }).eq('id', ch.id);
    if (!error) {
      setChildChallenges(prev => prev.map(c => c.id === ch.id ? { ...c, status: 'failed' } : c));
      toast.error('Challenge marked as failed');
    }
  }}`
);

// Delete Challenge (Add a delete button later, or update existing delete note UI logic if needed)

fs.writeFileSync(file, content);
console.log('Challenges state and fetching updated');
