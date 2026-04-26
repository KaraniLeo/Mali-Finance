import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  MessageSquare, 
  TrendingUp,
  Gem
} from 'lucide-react';

import { User, Tier, Module, Task, ChatMessage, View } from './types';
import { Sidebar } from './components/Sidebar';
import { Auth } from './components/Auth';
import { DashboardView } from './components/views/DashboardView';
import { LearnView } from './components/views/LearnView';
import { TasksView } from './components/views/TasksView';
import { WalletView } from './components/views/WalletView';
import { AchievementsView } from './components/views/AchievementsView';
import { ParentalView } from './components/views/ParentalView';
import { SettingsView } from './components/views/SettingsView';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(1450.0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [activeView, setActiveView] = useState<View>('dashboard');

  // Calculate age-based tier
  const calculateTier = (dob: string): Tier => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 13) return 'junior';
    if (age < 18) return 'teen';
    return 'pro';
  };

  // Load user session
  useEffect(() => {
    const savedUser = localStorage.getItem('mali_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const currentTier = calculateTier(parsedUser.dob);
      setUser({ ...parsedUser, tier: currentTier });
      setChatHistory([{ role: 'bot', text: `Welcome back, ${parsedUser.name}! Ready to grow your Mali today?` }]);
    }
  }, []);

  const handleLogin = (name: string, dob: string) => {
    const tier = calculateTier(dob);
    const newUser = { name, dob, tier };
    localStorage.setItem('mali_user', JSON.stringify(newUser));
    setUser(newUser);
    setChatHistory([{ role: 'bot', text: `Jambo ${name}! I'm MaliBot. Let's start your journey to wealth.` }]);
  };

  const handleLogout = () => {
    localStorage.removeItem('mali_user');
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
          systemInstruction: `You are MaliBot, a friendly and wise financial tutor for children and young adults. 
          The current user is '${user.name}' in the '${user.tier}' age group. 
          Provide advice that is age-appropriate. Keep responses encouraging, concise, and focused on building wealth (Mali).`
        })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: 'bot', text: data.text || "I'm processing your request..." }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'bot', text: "Network error. Please try again." }]);
    }
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const { tier } = user;

  // Mock Content
  const ageTiers = [
    { id: 'junior' as Tier, label: '7 - 12 Yrs' },
    { id: 'teen' as Tier, label: '13 - 18 Yrs' },
    { id: 'pro' as Tier, label: '18+ Pro' }
  ];

  const modules: Record<Tier, Module[]> = {
    junior: [
      { id: 'j1', title: 'Piggy Bank Basics', description: 'Learn how to keep your coins safe.', progress: 75, icon: <div className="text-3xl">🐷</div> },
      { id: 'j2', title: 'Needs vs Wants', description: 'Master the art of smart spending.', progress: 20, icon: <div className="text-3xl">🛒</div> },
      { id: 'j3', title: 'Earning Your First KES', description: 'How to do chores for rewards.', progress: 0, icon: <div className="text-3xl">💪</div> },
    ],
    teen: [
      { id: 't1', title: 'The Side Hustle', description: 'Start your mini-business in 30 days.', progress: 45, icon: <div className="text-3xl">🚀</div> },
      { id: 't2', title: 'Interest Magic', description: 'How money grows while you sleep.', progress: 80, icon: <div className="text-3xl">✨</div> },
      { id: 't3', title: 'Budgeting 101', description: 'The 50/30/20 rule explained.', progress: 10, icon: <div className="text-3xl">📊</div> },
    ],
    pro: [
      { id: 'p1', title: 'Bond Market Mastery', description: 'Lending to governments for steady returns.', progress: 15, icon: <div className="text-3xl">🏛️</div> },
      { id: 'p2', title: 'Diversified Portfolios', description: 'Avoid putting all eggs in one basket.', progress: 60, icon: <div className="text-3xl">🧺</div> },
      { id: 'p3', title: 'Hedge Fund Basics', description: 'Sophisticated strategies for protection.', progress: 0, icon: <div className="text-3xl">🛡️</div>, locked: true },
    ]
  };

  const tasks: Task[] = [
    { id: '1', title: 'Wash the car', reward: 50, category: 'chore', completed: false },
    { id: '2', title: 'Read 2 chapters: Financial Literacy', reward: 30, category: 'learning', completed: false },
    { id: '3', title: 'Update Weekly Budget', reward: 20, category: 'financial', completed: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#F7F7F2] text-stone-800 antialiased overflow-hidden">
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#6B8E23] rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
          <span className="text-xl font-bold tracking-tight brand text-[#2D3911]">MALI</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-stone-500">
          <MessageSquare size={24} />
        </button>
      </div>

      <Sidebar 
        user={user} 
        activeView={activeView} 
        onViewChange={(v) => {
          setActiveView(v);
          setMobileMenuOpen(false);
        }} 
        mobileMenuOpen={mobileMenuOpen} 
        onLogout={handleLogout} 
      />

      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="hidden md:flex gap-2 p-1 bg-stone-200/50 rounded-2xl">
            <div className="px-6 py-2 bg-[#6B8E23] text-white rounded-xl text-sm font-bold shadow-lg ring-4 ring-[#6B8E23]/5">
              {ageTiers.find(t => t.id === tier)?.label || tier}
            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex-1 md:flex-none px-5 py-2.5 bg-white rounded-2xl flex items-center justify-center md:justify-start gap-2 border border-stone-200 shadow-sm min-w-0">
              <span className="text-sm font-bold text-stone-600 flex-shrink-0">💰</span>
              <span className="text-base md:text-lg font-bold tabular-nums truncate">{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} KES</span>
            </div>
            <button className="h-12 w-12 flex-shrink-0 bg-[#6B8E23] text-white rounded-2xl shadow-xl shadow-[#6B8E23]/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
              <Plus size={24} />
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
          {activeView === 'dashboard' && (
            <DashboardView 
              user={user} 
              modules={modules[tier]} 
              tasks={tasks} 
              chatHistory={chatHistory} 
              onSendMessage={handleSendMessage} 
            />
          )}
          {activeView === 'learn' && <LearnView tier={tier} modules={modules[tier]} />}
          {activeView === 'tasks' && <TasksView tasks={tasks} />}
          {activeView === 'wallet' && <WalletView />}
          {activeView === 'achievements' && <AchievementsView />}
          {activeView === 'parental' && <ParentalView />}
          {activeView === 'settings' && <SettingsView onLogout={handleLogout} />}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}
