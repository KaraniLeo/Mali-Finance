const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/pages/ParentDashboard.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace customScores usage with a dynamic calculator function
const dynamicCalculator = `
  // Calculate Dynamic Scores based on live data
  const calculateDynamicScores = () => {
    if (!activeChild) return { healthScore: 0, accountabilityScore: 0, trustScore: 0 };
    
    // Health Score: Based on Wealth Jars (savings vs target)
    let totalTarget = 0;
    let totalSaved = 0;
    childJars.forEach(j => {
      totalTarget += Number(j.target) || 0;
      totalSaved += Number(j.balance) || 0;
    });
    const savingsRatio = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 50;
    const healthScore = Math.min(100, Math.max(0, Math.round(savingsRatio * 1.5))); // Example dynamic calculation

    // Accountability Score: Based on Tasks completed
    const completedTasks = childTasks.filter(t => t.completed).length;
    const accountabilityScore = Math.min(100, Math.max(0, 40 + (completedTasks * 5))); // Base 40, +5 per task

    // Trust Score: Based on staying under budget / good transactions
    const totalSpent = childTransactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + Number(t.amount), 0);
    const budgetLimit = activeChild.spendingLimit || 5000;
    const trustScore = totalSpent > budgetLimit ? 30 : Math.min(100, 100 - (totalSpent / budgetLimit) * 50);

    return {
      healthScore: Math.round(healthScore) || 50,
      accountabilityScore: Math.round(accountabilityScore) || 50,
      trustScore: Math.round(trustScore) || 50
    };
  };
  const scores = calculateDynamicScores();
`;

content = content.replace(
  'const scores = customScores[selectedChildId] || { healthScore: 0, accountabilityScore: 0, trustScore: 0 };',
  dynamicCalculator
);

// Update Activity Feed loop to map over real transactions and tasks
// ParentDashboard previously mapped over feed items like `localFeedItems[selectedChildId]`
// We will replace `const feedItems = localFeedItems[selectedChildId] || [];`
// with a derived list from childTransactions + childTasks + challenges

const dynamicFeed = `
  const feedItems = React.useMemo(() => {
    const items = [];
    childTransactions.forEach(tx => {
      items.push({
        id: tx.id,
        text: \`\${tx.type === 'credit' ? 'Received' : 'Spent'} \${formatCurrency(Number(tx.amount))} (\${tx.description || 'General'})\`,
        type: tx.type === 'credit' ? 'success' : 'warning',
        timestamp: tx.created_at
      });
    });
    childTasks.filter(t => t.completed).forEach(t => {
      items.push({
        id: t.id,
        text: \`Completed task: \${t.title} (\${t.reward} KES)\`,
        type: 'success',
        timestamp: new Date().toISOString() // Or t.updated_at if it exists
      });
    });
    const local = localFeedItems[selectedChildId] || [];
    return [...items, ...local].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [childTransactions, childTasks, localFeedItems, selectedChildId]);
`;

content = content.replace(
  'const feedItems = selectedChildId ? localFeedItems[selectedChildId] || [] : [];',
  dynamicFeed
);

fs.writeFileSync(file, content);
console.log('Dynamic Metrics and Feed updated');
