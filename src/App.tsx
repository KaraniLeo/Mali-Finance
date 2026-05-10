import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MessageSquare } from 'lucide-react';

import { Tier, View } from './types';
import { useProgress } from './hooks/useProgress';
import { Sidebar } from './components/Sidebar';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';
import { modulesData } from './data/modules';
import { useAchievement } from './context/AchievementContext';
import { useAppStore } from './state/store';

// Pages
import { DashboardView } from './pages/DashboardView';
import { LearnView } from './pages/LearnView';
import { TasksView } from './pages/TasksView';
import { WalletView } from './pages/WalletView';
import { AchievementsView } from './pages/AchievementsView';
import { ParentalView } from './pages/ParentalView';
import { SettingsView } from './pages/SettingsView';
import { ModuleSyllabusView } from './pages/ModuleSyllabusView';
import { QuizView } from './pages/QuizView';
import { ParentDashboard } from './pages/ParentDashboard';
import { GamesView } from './pages/GamesView';
import { useSidebarStore } from './state/sidebarStore';

export default function App() {
  const { 
    user, setUser, 
    balance, setBalance, 
    chatHistory, setChatHistory, 
    activeView, setActiveView, 
    selectedModule, setSelectedModule, 
    selectedSubtopic, setSelectedSubtopic, 
    tasks, setTasks 
  } = useAppStore();

  const { isOpenMobile, setMobileOpen } = useSidebarStore();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { track, setInitialAchievements } = useAchievement();
  const { getComputedModules } = useProgress();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUser(data);
      setBalance(data.balance || 0);
      if (data.achievements) {
        setInitialAchievements(data.achievements);
      }
      if (chatHistory.length === 0) {
        setChatHistory([{ role: 'bot', text: `Jambo ${data.name}! I'm MaliBot. Let's start your journey to wealth.` }]);
      }
    } catch (e) {
      console.error('Error fetching profile:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userProfile: any) => {
    setUser(userProfile);
    setBalance(userProfile.balance || 0);
    if (userProfile.achievements) {
      setInitialAchievements(userProfile.achievements);
    }
    setChatHistory([{ role: 'bot', text: `Jambo ${userProfile.name}! I'm MaliBot. Let's start your journey to wealth.` }]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleSendMessage = async (text: string) => {
    if (!user) return;

    setChatHistory(prev => [...prev, { role: 'user', text }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          userContext: {
            name: user.name,
            tier: user.tier,
            age: new Date().getFullYear() - new Date(user.dob).getFullYear()
          }
        })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: 'bot', text: data.text || "I'm processing your request..." }]);
      track('WEALTH_GUIDE_CHAT');
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'bot', text: "Network error. Please try again." }]);
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100">Loading MALI...</div>;
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  if (user.tier === 'parent') {
    return <ParentDashboard user={user} onLogout={handleLogout} />;
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
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-stone-950 border-b border-stone-100 dark:border-stone-800">
        <button onClick={() => setMobileOpen(!isOpenMobile)} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-[#6B8E23] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">M</div>
          <span className="text-xl font-bold tracking-tight brand text-[#2D3911] dark:text-[#A7C957]">MALI</span>
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
            <div className="px-6 py-2 bg-[#6B8E23] text-white rounded-xl text-sm font-bold shadow-lg ring-4 ring-[#6B8E23]/5">
              {ageTiers.find(t => t.id === tier)?.label || tier}
            </div>
            <div className="px-6 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl text-sm font-bold flex items-center gap-2">
              🔥 {user.streak || 0} Day Streak
            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex-1 md:flex-none px-5 py-2.5 bg-white dark:bg-stone-800 rounded-2xl flex items-center justify-center md:justify-start gap-2 border border-stone-200 dark:border-stone-700 shadow-sm min-w-0">
              <span className="text-sm font-bold text-stone-600 dark:text-stone-300 flex-shrink-0">💰</span>
              <span className="text-base md:text-lg font-bold tabular-nums truncate">{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} KES</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-12 w-12 flex-shrink-0 bg-[#6B8E23] text-white rounded-2xl shadow-xl shadow-[#6B8E23]/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
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
              tasks={tasks}
              setTasks={setTasks}
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
          {activeView === 'tasks' && <TasksView tasks={tasks} setTasks={setTasks} />}
          {activeView === 'wallet' && <WalletView />}
          {activeView === 'achievements' && <AchievementsView />}
          {activeView === 'parental' && <ParentalView user={user} onUpdateUser={(u) => setUser({...user, ...u})} />}
          {activeView === 'settings' && <SettingsView user={user} onLogout={handleLogout} />}
          {activeView === 'games' && <GamesView />}
        </div>
      </main>

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
              <h3 className="font-black text-xl text-[#2D3911] dark:text-[#A7C957] mb-4">Quick Action</h3>
              <div className="space-y-3">
                <button
                  onClick={() => { setIsModalOpen(false); setActiveView('wallet'); }}
                  className="w-full p-4 rounded-xl border-2 border-stone-100 dark:border-stone-700 font-bold text-stone-700 dark:text-stone-200 hover:border-[#6B8E23] dark:hover:border-[#6B8E23] hover:bg-[#6B8E23]/5 transition-all text-left cursor-pointer"
                >
                  💰 Add Funds
                </button>
                <button
                  onClick={() => { setIsModalOpen(false); setActiveView('tasks'); }}
                  className="w-full p-4 rounded-xl border-2 border-stone-100 dark:border-stone-700 font-bold text-stone-700 dark:text-stone-200 hover:border-[#6B8E23] dark:hover:border-[#6B8E23] hover:bg-[#6B8E23]/5 transition-all text-left cursor-pointer"
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
