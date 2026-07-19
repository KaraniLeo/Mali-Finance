// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MessageSquare } from 'lucide-react';

import { Tier, View } from './types';
import { useProgress } from './hooks/useProgress';
import { Sidebar } from './components/Sidebar';
import { User, ChatMessage, Task, BudgetRule } from './types';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';
import { useWalletStore } from './state/walletStore';
import { useWealthJarStore } from './state/wealthJarStore';
import { useTaskStore } from './state/taskStore';
import { useCurriculumStore } from './state/curriculumStore';
import { formatCurrency } from './lib/currency';
import { generateMaliResponse } from './lib/openai';
import { modulesData } from './data/modules';
import { useAchievement } from './context/AchievementContext';
import { useAppStore } from './state/store';
import { useSidebarStore } from './state/sidebarStore';
import { TaskAllocationModal } from './components/TaskAllocationModal';
import { ToastContainer } from './components/Toast';

// Pages
import { DashboardView } from './pages/DashboardView';
import { LearnView } from './pages/LearnView';
import { TasksView } from './pages/TasksView';
import { WalletView } from './pages/WalletView';
import { AchievementsView } from './pages/AchievementsView';
import { AccountabilityPartnerView } from './pages/ParentalView';
import { SettingsView } from './pages/SettingsView';
import { ModuleSyllabusView } from './pages/ModuleSyllabusView';
import { QuizView } from './pages/QuizView';
import { ChatView } from './pages/ChatView';
import { AccountabilityPartnerDashboard } from './pages/ParentDashboard';
// import { GamesView } from './pages/GamesView';
import { AdminView } from './pages/AdminView';

export default function App() {
  const { 
    user, setUser, 
    chatHistory, setChatHistory, 
    activeView, setActiveView, 
    selectedModule, setSelectedModule, 
    selectedSubtopic, setSelectedSubtopic,
    pendingTaskReward, setPendingTaskReward
  } = useAppStore();

  const { balance, setBalance, addTransaction, fetchWalletData } = useWalletStore();
  const { updateJarBalance, jars, fetchJars } = useWealthJarStore();
  const { isOpenMobile, setMobileOpen } = useSidebarStore();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { track, setInitialAchievements } = useAchievement();
  const { getComputedModules } = useProgress();
  const { fetchCurriculum, fetchAchievements, isLoading: isCurriculumLoading } = useCurriculumStore();
  const { fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchCurriculum();
    fetchAchievements();
  }, []);

  // Dynamic Theming Effect
  useEffect(() => {
    const root = document.documentElement;
    // Remove existing theme classes
    root.classList.remove('theme-junior', 'theme-teen', 'theme-pro');
    
    if (user?.id) {
      const savedThemeTier = localStorage.getItem(`theme-tier-${user.id}`);
      if (savedThemeTier) {
        root.classList.add(savedThemeTier);
      } else if (user.tier === 'parent') {
        root.classList.add('theme-pro'); // Parent defaults to Pro
      } else {
        root.classList.add(`theme-${user.tier}`); // Student defaults to tier
      }
    } else {
      root.classList.add('theme-pro'); // Default unauthenticated theme
    }
  }, [user]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string, email: string = '') => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      let isAdmin = false;
      const { data: adminData } = await supabase
        .from('admin_accounts')
        .select('id')
        .eq('id', userId)
        .maybeSingle();
        
      if (adminData) isAdmin = true;

      const mappedUser = {
        id: data.id,
        name: data.name,
        email: email || '',
        dob: data.dob,
        tier: data.tier,
        country: data.country,
        balance: Number(data.balance || 0),
        streak: Number(data.streak || 0),
        parentId: data.parent_id,
        linkingCode: data.linking_code,
        linkedChildId: data.linked_child_id,
        spentAlerts: data.spent_alerts !== undefined ? data.spent_alerts : true,
        autoAllowance: Number(data.auto_allowance || 0),
        spendingLimit: Number(data.spending_limit || 0),
        achievements: data.achievements || [],
        isAdmin
      };

      setUser(mappedUser);
      if (data.country) {
        useAppStore.getState().setRegionMode(data.country);
      }
      // Remove setting local balance here, fetchWalletData does it
      if (data.achievements) {
        setInitialAchievements(data.achievements);
      }
      if (chatHistory.length === 0) {
        setChatHistory([{ role: 'bot', text: `Jambo ${data.name}! I'm MaliBot. Let's start your journey to wealth.` }]);
      }

      // Fetch completed lessons
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('lesson_id')
        .eq('user_id', userId)
        .eq('completed', true);
        
      if (progressData) {
        const dbLessons = progressData.map(p => p.lesson_id);
        const localLessons = useAppStore.getState().completedLessons || [];
        const mergedLessons = Array.from(new Set([...localLessons, ...dbLessons]));
        useAppStore.setState({ completedLessons: mergedLessons });
      }

      // Fetch Tasks
      fetchTasks(userId);
      
      // Fetch Wallet & Jars
      const walletId = await fetchWalletData(userId);
      if (walletId) {
        await fetchJars(walletId);
      }
    } catch (e) {
      console.error('Error fetching profile:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (userProfile: any) => {
    setUser(userProfile);
    if (userProfile.achievements) {
      setInitialAchievements(userProfile.achievements);
    }
    if (userProfile.country) {
      useAppStore.getState().setRegionMode(userProfile.country);
    }
    setChatHistory([{ role: 'bot', text: `Jambo ${userProfile.name}! I'm MaliBot. Let's start your journey to wealth.` }]);
    
    const walletId = await fetchWalletData(userProfile.id);
    if (walletId) {
      await fetchJars(walletId);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleSendMessage = async (text: string) => {
    if (!user) return;

    const newHistory = [...chatHistory, { role: 'user' as const, text }];
    setChatHistory(newHistory);

    try {
      const balance = useWalletStore.getState().balance;
      
      const context = {
        name: user.name,
        tier: user.tier,
        age: new Date().getFullYear() - new Date(user.dob).getFullYear(),
        balance: balance,
      };

      const botResponse = await generateMaliResponse(text, context, chatHistory);
      
      setChatHistory([...newHistory, { role: 'bot' as const, text: botResponse.text }]);
      track('WEALTH_GUIDE_CHAT');
    } catch (e) {
      console.error(e);
      setChatHistory([...newHistory, { role: 'bot' as const, text: "I'm having a little trouble connecting right now. Try again!" }]);
    }
  };

  const handleTaskAllocationConfirm = async (destinationId: string) => {
    if (!pendingTaskReward || !user) return;
    
    const rewardAmount = pendingTaskReward.reward;
    const taskTitle = pendingTaskReward.title;
    const walletStore = useWalletStore.getState();

    // 1. Mark task as complete
    await useTaskStore.getState().toggleTaskComplete(pendingTaskReward.taskId, user.id, track);
    
    // 2. Route funds
    if (destinationId === 'wallet') {
      const newBalance = balance + rewardAmount;
      walletStore.updateWalletBalance(newBalance);
      addTransaction({
        id: Date.now().toString(),
        wallet_id: 'local',
        jar_id: undefined,
        amount: rewardAmount,
        type: 'credit',
        description: `Task Reward: ${taskTitle}`,
        created_at: new Date().toISOString()
      });
    } else {
      const jar = jars.find(j => j.id === destinationId);
      if (jar) {
        // Increase jar's balance
        updateJarBalance(jar.id, jar.balance + rewardAmount);
        
        // Increase overall wallet balance because this is new money
        const newBalance = balance + rewardAmount;
        walletStore.updateWalletBalance(newBalance);
        
        // Adjust budget rules to keep absolute allocations intact for other rules
        const { budgetRules, setBudgetRules } = walletStore;
        const newRules: Record<string, BudgetRule> = {};
        
        // Use a safe balance for calculations to prevent division by zero
        const safeOldBalance = balance > 0 ? balance : rewardAmount;
        
        Object.values(budgetRules).forEach(rule => {
          if (rule && rule.type === 'percentage') {
            const oldCashVal = (balance * rule.value) / 100;
            if (rule.jarId === jar.id) {
              const newCashVal = oldCashVal + rewardAmount;
              const newPct = (newCashVal / newBalance) * 100;
              newRules[rule.jarId] = { ...rule, value: newPct };
            } else {
              const newPct = (oldCashVal / newBalance) * 100;
              newRules[rule.jarId] = { ...rule, value: newPct };
            }
          } else {
            newRules[rule.jarId] = rule;
          }
        });
        
        // If the jar didn't have a rule, add it so the percentages match the new allocation
        if (!newRules[jar.id]) {
          const newPct = (rewardAmount / newBalance) * 100;
          newRules[jar.id] = { jarId: jar.id, type: 'percentage', value: newPct };
        }
        
        await setBudgetRules(newRules);

        addTransaction({
          id: Date.now().toString(),
          wallet_id: 'local',
          jar_id: jar.id,
          amount: rewardAmount,
          type: 'credit',
          description: `Task Reward: ${taskTitle}`,
          created_at: new Date().toISOString()
        });
      }
    }
    
    // 3. Clear pending state
    setPendingTaskReward(null);
  };

  if (loading || isCurriculumLoading) {
    return <div className="h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 font-bold">Loading MALI Curriculum...</div>;
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  if (user.tier === 'parent') {
    return <AccountabilityPartnerDashboard user={user} onLogout={handleLogout} />;
  }

  const tier = user.tier as Tier;
  const computedModules = getComputedModules(tier);

  const ageTiers = [
    { id: 'junior' as Tier, label: '7 - 12 Yrs' },
    { id: 'teen' as Tier, label: '13 - 18 Yrs' },
    { id: 'pro' as Tier, label: '18+ Pro' }
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 antialiased overflow-hidden">
      <ToastContainer />
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-stone-950 border-b border-stone-100 dark:border-stone-800">
        <button onClick={() => setMobileOpen(!isOpenMobile)} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">M</div>
          <span className="text-xl font-bold tracking-tight brand text-brand-secondary dark:text-brand-primary">MALI</span>
        </button>
        <div className="w-8"></div>
      </div>

      <Sidebar
        user={user}
        activeView={activeView}
        onViewChange={(v) => {
          setActiveView(v);
          setSelectedModule(null);
          setSelectedSubtopic(null);
          setMobileOpen(false);
        }}
        mobileMenuOpen={isOpenMobile}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="hidden md:flex gap-2 p-1 bg-stone-200/50 dark:bg-stone-800/50 rounded-2xl">
            <div className="px-6 py-2 bg-brand-accent text-white rounded-xl text-sm font-bold shadow-lg ring-4 ring-[#6B8E23]/5">
              {ageTiers.find(t => t.id === tier)?.label || tier}
            </div>
            <div className="px-6 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl text-sm font-bold flex items-center gap-2">
              {(() => {
                const allAchievements = useCurriculumStore.getState().achievements;
                const unlockedIds = user?.achievements || [];
                const latestId = unlockedIds[unlockedIds.length - 1];
                const latest = allAchievements.find(a => a.id === latestId);
                return latest ? `🏆 ${latest.title}` : '0 Achievements';
              })()}
            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex-1 md:flex-none px-5 py-2.5 bg-white dark:bg-stone-800 rounded-2xl flex items-center justify-center md:justify-start gap-2 border border-stone-200 dark:border-stone-700 shadow-sm min-w-0">
              <span className="text-sm font-bold text-stone-600 dark:text-stone-300 flex-shrink-0">💰</span>
              <span className="text-base md:text-lg font-bold tabular-nums truncate">{formatCurrency(balance)}</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-12 w-12 flex-shrink-0 bg-brand-accent text-white rounded-2xl shadow-xl shadow-[#6B8E23]/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <Plus size={24} />
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto w-full">
          {activeView === 'dashboard' && (
            <DashboardView
              user={user}
              modules={computedModules}
              chatHistory={chatHistory}
              onSendMessage={handleSendMessage}
              onNavigate={setActiveView}
              onSelectModule={(m) => {
                setSelectedModule(m);
                setActiveView('syllabus');
              }}
            />
          )}
          {activeView === 'learn' && (
            <LearnView 
              tier={tier} 
              modules={computedModules} 
              onSelectModule={(m) => {
                setSelectedModule(m);
                setActiveView('syllabus');
              }}
            />
          )}
          {activeView === 'syllabus' && selectedModule && (
            <ModuleSyllabusView 
              module={selectedModule} 
              onBack={() => {
                setActiveView('learn');
                setSelectedModule(null);
              }}
              onStartQuiz={(subtopic) => {
                setSelectedSubtopic(subtopic);
                setActiveView('quiz');
              }}
            />
          )}
          {activeView === 'quiz' && selectedSubtopic && (
            <QuizView
              subtopic={selectedSubtopic}
              onBack={() => setActiveView('syllabus')}
              onComplete={(score) => {
                setBalance(b => b + score);
                setActiveView('syllabus');
                setSelectedSubtopic(null);
              }}
            />
          )}
          {activeView === 'tasks' && <TasksView />}
          {activeView === 'wallet' && <WalletView />}
          {activeView === 'achievements' && <AchievementsView />}
          {activeView === 'chat' && <ChatView user={user} />}
          {activeView === 'admin' && <AdminView />}
          {activeView === 'parental' && <AccountabilityPartnerView user={user} onUpdateUser={(u) => setUser({...user, ...u})} />}
          {activeView === 'settings' && <SettingsView user={user} onLogout={handleLogout} />}
          {/* {activeView === 'games' && <GamesView />} */}
        </div>
      </main>

      <TaskAllocationModal 
        isOpen={!!pendingTaskReward}
        taskTitle={pendingTaskReward?.title || ''}
        rewardAmount={pendingTaskReward?.reward || 0}
        onClose={() => setPendingTaskReward(null)}
        onConfirm={handleTaskAllocationConfirm}
      />

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-stone-800 p-6 rounded-3xl shadow-2xl w-full max-w-sm border border-stone-100 dark:border-stone-700"
            >
              <h3 className="font-black text-xl text-brand-secondary dark:text-brand-primary mb-4">Quick Action</h3>
              <div className="space-y-3">
                <button
                  onClick={() => { setIsModalOpen(false); setActiveView('wallet'); }}
                  className="w-full p-4 rounded-xl border-2 border-stone-100 dark:border-stone-700 font-bold text-stone-700 dark:text-stone-200 hover:border-brand-accent dark:hover:border-brand-accent hover:bg-brand-accent/5 transition-all text-left cursor-pointer"
                >
                  💰 Add Funds
                </button>
                <button
                  onClick={() => { setIsModalOpen(false); setActiveView('tasks'); }}
                  className="w-full p-4 rounded-xl border-2 border-stone-100 dark:border-stone-700 font-bold text-stone-700 dark:text-stone-200 hover:border-brand-accent dark:hover:border-brand-accent hover:bg-brand-accent/5 transition-all text-left cursor-pointer"
                >
                  📝 Create Task
                </button>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-6 py-3 bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-200 dark:hover:bg-stone-600 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}
