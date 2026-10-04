import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Coins, 
  BookOpen, 
  Users, 
  Bot, 
  FileText, 
  ChevronRight,
  ExternalLink,
  Check,
  Award,
  TrendingUp,
  Lock,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface PublicLandingViewProps {
  onGoToAuth: (mode?: 'login' | 'signup') => void;
  initialSection?: string;
}

export function PublicLandingView({ onGoToAuth, initialSection }: PublicLandingViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'junior' | 'teen' | 'pro'>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState<'refund' | 'cancellation' | 'privacy' | 'security'>('refund');

  useEffect(() => {
    // If an anchor hash or initial section is requested (e.g. /pricing or #pricing)
    const hash = window.location.hash || (initialSection ? `#${initialSection}` : '');
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [initialSection]);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-brand-accent selection:text-white transition-colors duration-300">
      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT & COMPLIANCE BANNER */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-stone-900 text-white text-xs py-2 px-4 text-center font-bold flex items-center justify-center gap-2 shadow-inner">
        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase tracking-widest text-[10px]">
          Official Business Portal
        </span>
        <span>Mali Utajiri is licensed & settled via Safaricom M-Pesa & Paystack Kenya.</span>
        <button 
          onClick={() => scrollToSection('pricing')}
          className="underline hover:text-amber-300 ml-1 cursor-pointer font-black"
        >
          View Plans (KES 300/mo) →
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-stone-900/90 border-b border-stone-200/80 dark:border-stone-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-lg shadow-brand-accent/20 group-hover:scale-105 transition-transform bg-[#081C15] border border-brand-accent/30 flex items-center justify-center shrink-0">
              <img 
                src="/mali_icon_sunburst_crest.svg" 
                alt="Mali Crest" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-brand-secondary dark:text-white brand">
                  MALI UTAJIRI
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                  EdTech
                </span>
              </div>
              <p className="text-[11px] font-bold text-stone-500 dark:text-stone-400">
                Youth Financial Education & Wealth Platform
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-stone-600 dark:text-stone-300">
            <button 
              onClick={() => scrollToSection('overview')}
              className="hover:text-brand-accent transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button 
              onClick={() => scrollToSection('curriculum')}
              className="hover:text-brand-accent transition-colors cursor-pointer"
            >
              Curriculums
            </button>
            <button 
              onClick={() => scrollToSection('malibot')}
              className="hover:text-brand-accent transition-colors cursor-pointer"
            >
              MaliBot AI
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="hover:text-brand-accent transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Pricing</span>
              <span className="text-[10px] bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 font-extrabold px-1.5 py-0.5 rounded-md">
                KES 300
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('policies')}
              className="hover:text-brand-accent transition-colors cursor-pointer"
            >
              Terms & Refunds
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-brand-accent transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onGoToAuth('login')}
              className="px-4 py-2.5 text-xs sm:text-sm font-black text-stone-700 dark:text-stone-200 hover:text-brand-accent transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => onGoToAuth('signup')}
              className="px-5 py-2.5 rounded-2xl bg-brand-accent text-white font-black text-xs sm:text-sm shadow-lg shadow-brand-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Launch App</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO SECTION */}
      {/* ========================================================================= */}
      <section id="overview" className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-stone-100/60 dark:from-stone-900/60 to-transparent">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Empowering The Next Generation of African Wealth</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 dark:text-white leading-[1.1] tracking-tight">
                Smart Money Habits Beat{' '}
                <span className="bg-gradient-to-r from-brand-accent via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                  Pocket Money Regrets.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Mali Utajiri is Kenya’s premier digital financial education platform. We combine gamified wealth jars, realistic market simulations, chore bounty systems, and 24/7 child-safe AI mentorship under active parent governance.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold shadow-sm">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>100% Ad-Free & Child Safe</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold shadow-sm">
                  <Smartphone size={16} className="text-brand-accent" />
                  <span>Safaricom M-Pesa Integrated</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold shadow-sm">
                  <CreditCard size={16} className="text-blue-500" />
                  <span>Paystack Certified Gateway</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => onGoToAuth('signup')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-accent text-white font-black text-base shadow-xl shadow-brand-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Start Family Trial • 1st Month Free</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-bold text-base hover:bg-stone-50 dark:hover:bg-stone-750 transition-colors cursor-pointer"
                >
                  Pricing & Policies
                </button>
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                No contract • Cancel anytime from your Parent Dashboard • Instant activation
              </p>
            </div>

            {/* Right Interactive Mockup / Highlight Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-[36px] p-6 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                    Family Dashboard Live
                  </span>
                </div>

                {/* 4 Jars Preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                    <span>Active Wealth Jars</span>
                    <span>Total KES 12,450</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                      <span className="text-xl">🍯</span>
                      <h4 className="text-xs font-black text-stone-900 dark:text-white mt-1">Spend Jar (50%)</h4>
                      <p className="text-[11px] text-stone-500">Everyday needs</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                      <span className="text-xl">🌱</span>
                      <h4 className="text-xs font-black text-stone-900 dark:text-white mt-1">Save Jar (20%)</h4>
                      <p className="text-[11px] text-stone-500">Short-term goals</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
                      <span className="text-xl">📈</span>
                      <h4 className="text-xs font-black text-stone-900 dark:text-white mt-1">Invest Jar (20%)</h4>
                      <p className="text-[11px] text-stone-500">Wealth building</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40">
                      <span className="text-xl">🤝</span>
                      <h4 className="text-xs font-black text-stone-900 dark:text-white mt-1">Give Jar (10%)</h4>
                      <p className="text-[11px] text-stone-500">Community impact</p>
                    </div>
                  </div>

                  {/* MaliBot AI Snippet */}
                  <div className="mt-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-accent/20 flex items-center justify-center text-lg shrink-0">
                      🤖
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-stone-900 dark:text-white">MaliBot Financial AI</span>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.2 rounded">Child Safe</span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-snug">
                        "Great job allocating your chore reward! Putting 20% into your Invest Jar earns compound interest over time."
                      </p>
                    </div>
                  </div>

                  {/* Pricing Tag Highlight */}
                  <div className="pt-2 flex items-center justify-between text-xs font-bold border-t border-stone-100 dark:border-stone-800">
                    <span className="text-stone-500">Membership Fee:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      KES 300 / mo (Includes 4 Children)
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BUSINESS ACTIVITIES & CURRICULUMS (What Paystack Reviews) */}
      {/* ========================================================================= */}
      <section id="curriculum" className="py-20 bg-white dark:bg-stone-900 border-t border-b border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-black uppercase tracking-wider mb-3">
              <BookOpen size={14} />
              <span>Products & Services Offered</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
              Three Tailored Portals for Every Stage of Growth
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
              Mali Utajiri provides structured, age-appropriate financial literacy curricula designed specifically for young African minds, bridging the gap between pocket money and generational wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Junior Tier */}
            <div className="p-8 rounded-[32px] bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 flex flex-col justify-between hover:border-brand-accent transition-all group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-3xl mb-5 group-hover:scale-105 transition-transform">
                  👶
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-stone-900 dark:text-white">Junior Portal</h3>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                    Ages 7 – 12
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mb-6">
                  Building early financial awareness, delayed gratification, and work ethics through gamified daily chores.
                </p>

                <ul className="space-y-3 text-xs font-bold text-stone-700 dark:text-stone-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Understanding Needs vs. Wants (Sukuma Wiki vs. Toys)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>The 4 Piggy Jars: Spend, Save, Invest, and Give</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Earning allowances through verified home chores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Visual goal tracking with parent match bonuses</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200 dark:border-stone-700">
                <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider">
                  Included in Family Membership
                </span>
              </div>
            </div>

            {/* Teen Tier */}
            <div className="p-8 rounded-[32px] bg-stone-50 dark:bg-stone-800/40 border-2 border-brand-accent/50 dark:border-brand-accent/40 flex flex-col justify-between relative shadow-xl hover:border-brand-accent transition-all group">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                Most Popular
              </div>

              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center text-3xl mb-5 group-hover:scale-105 transition-transform">
                  👦
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-stone-900 dark:text-white">Teen Portal</h3>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent">
                    Ages 13 – 18
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mb-6">
                  Mastering modern cash flow, M-Pesa mechanics, digital economy risks, and entrepreneurship.
                </p>

                <ul className="space-y-3 text-xs font-bold text-stone-700 dark:text-stone-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                    <span>The Velocity of Money & M-Pesa Transaction Dynamics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                    <span>Compound Interest & The Cost of Inflation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                    <span>Simulated Double-Auction Market & Order Books</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                    <span>Budgeting rules (50/30/20 algorithm) with automated limits</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200 dark:border-stone-700">
                <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider">
                  Included in Family Membership
                </span>
              </div>
            </div>

            {/* Pro / Young Adult Tier */}
            <div className="p-8 rounded-[32px] bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 flex flex-col justify-between hover:border-brand-accent transition-all group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-3xl mb-5 group-hover:scale-105 transition-transform">
                  👱
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-stone-900 dark:text-white">Pro / Young Adult</h3>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    Ages 18+ & Parents
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mb-6">
                  Real-world financial autonomy, investments in Kenyan instruments, and navigating credit & debt.
                </p>

                <ul className="space-y-3 text-xs font-bold text-stone-700 dark:text-stone-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>SACCOs, M-Akiba, and Money Market Funds (MMFs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Credit Bureau (CRB) ratings & avoiding predatory Fuliza debt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Parent Dashboard: Monitoring family habits & financial scoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Salary allocation, tax awareness, and retirement basics</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200 dark:border-stone-700">
                <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider">
                  Included in Family Membership
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MALIBOT AI MENTOR SECTION */}
      {/* ========================================================================= */}
      <section id="malibot" className="py-20 bg-stone-100/50 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-xs font-black uppercase tracking-wider">
                <Bot size={14} />
                <span>24/7 Conversational AI Financial Mentor</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white leading-tight">
                Meet MaliBot: The Patient, Child-Safe Money Mentor
              </h2>

              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                Kids often hesitate to ask parents about money. MaliBot provides an always-available, curriculum-aligned AI companion that answers questions in relatable Kenyan analogies without judgment.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-start gap-3">
                  <ShieldCheck size={20} className="text-emerald-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-black text-stone-900 dark:text-white">Strict Child Guardrails</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      No adult content, no personal data harvesting, and zero gambling or speculative crypto advice. Focused solely on educational financial literacy.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-start gap-3">
                  <Compass size={20} className="text-brand-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-black text-stone-900 dark:text-white">Relatable Cultural Analogies</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Explains inflation using the price of bread and transport fares, and explains investment yields using tree planting and crop harvests.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white dark:bg-stone-900 rounded-[32px] p-6 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4">
                <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center text-white font-bold">
                    🤖
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900 dark:text-white">MaliBot Financial Session</h4>
                    <p className="text-[10px] text-emerald-600 font-bold">Online • Child Protected</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-end">
                    <div className="bg-brand-accent text-white p-3.5 rounded-2xl rounded-tr-none max-w-xs font-semibold shadow-sm">
                      "Why does a 100 KES note buy less sweets today than it did two years ago?"
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 p-3.5 rounded-2xl rounded-tl-none max-w-sm leading-relaxed border border-stone-200 dark:border-stone-700">
                      "That is called <strong>Inflation</strong>! Think of money like a bucket with tiny drops escaping. If the price of ingredients goes up, the baker has to charge more for the same sweet. That's why we put savings into our <strong>Invest Jar</strong> to grow faster than inflation!"
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-center text-[11px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Unlimited MaliBot mentorship included with Family Membership.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PRICING & SUBSCRIPTION DETAILS (Critical for Compliance) */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-24 bg-white dark:bg-stone-900 border-t border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase tracking-wider mb-3">
              <Coins size={14} />
              <span>Transparent Pricing Structure</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
              One Simple Family Plan. Zero Hidden Fees.
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
              We believe every child deserves world-class financial education. Our flat monthly membership covers the entire family with zero per-child micro-transactions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-[36px] bg-gradient-to-b from-stone-50 to-white dark:from-stone-850 dark:to-stone-900 border-2 border-emerald-500/30 shadow-2xl p-8 sm:p-12 overflow-hidden">
              
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest px-8 py-2 rounded-bl-3xl shadow-md">
                1st Month Free Trial
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Plan Info */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      All-Inclusive Family Membership
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                    Mali Utajiri Family Pass
                  </h3>

                  <p className="text-sm text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
                    Designed for 1 Parent / Guardian and up to 4 Child profiles. Unlocks all age portals, full gamified budgeting jars, and unlimited AI tutoring.
                  </p>

                  <div className="pt-2 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-stone-700 dark:text-stone-200">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span>Up to 5 Family Accounts (1 Parent + 4 Children)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-stone-700 dark:text-stone-200">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span>Access to Junior, Teen, and Pro Curricula</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-stone-700 dark:text-stone-200">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span>Unlimited MaliBot AI Financial Mentorship</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-stone-700 dark:text-stone-200">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span>Chore Bounty System with Verified Parent Approvals</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-stone-700 dark:text-stone-200">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span>Interactive Wealth Jars (Spend, Save, Invest, Give)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-stone-700 dark:text-stone-200">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span>Weekly Parent Habit & Risk Score Analytics</span>
                    </div>
                  </div>
                </div>

                {/* Price Display & Paystack Action */}
                <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center text-center md:text-right border-t md:border-t-0 md:border-l border-stone-200 dark:border-stone-800 pt-6 md:pt-0 md:pl-8 space-y-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-stone-400">Subscription Rate</span>
                    <div className="flex items-baseline justify-center md:justify-end gap-1 mt-1">
                      <span className="text-4xl sm:text-5xl font-black text-stone-900 dark:text-white">KES 300</span>
                      <span className="text-sm font-bold text-stone-500 dark:text-stone-400">/ month</span>
                    </div>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                      First 30 Days Free • Renews at KES 300
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Annual Option: KES 3,000 / year (Save KES 600)
                    </p>
                  </div>

                  <button
                    onClick={() => onGoToAuth('signup')}
                    className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-black text-sm shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Claim 30 Days Free</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className="w-full space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 text-center">
                      Accepted Payment Methods
                    </p>
                    <div className="flex items-center justify-center gap-2 text-stone-600 dark:text-stone-400">
                      <span className="px-2 py-1 bg-stone-100 dark:bg-stone-800 rounded-md text-[10px] font-bold border border-stone-200 dark:border-stone-700">
                        📱 M-Pesa STK & Paybill
                      </span>
                      <span className="px-2 py-1 bg-stone-100 dark:bg-stone-800 rounded-md text-[10px] font-bold border border-stone-200 dark:border-stone-700">
                        💳 Visa / Mastercard
                      </span>
                    </div>
                    <p className="text-[9px] text-stone-400 text-center">
                      Secured by Paystack Kenya (CBK Regulated)
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. COMPLIANCE, POLICIES & TERMS (CRITICAL FOR PAYSTACK AUDIT) */}
      {/* ========================================================================= */}
      <section id="policies" className="py-20 bg-stone-50 dark:bg-stone-950 border-t border-stone-200/80 dark:border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-black uppercase tracking-wider mb-2">
              <FileText size={14} />
              <span>Consumer Protection & Legal Policies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              Terms of Service, Refunds & Compliance
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
              Mali Utajiri operates in full compliance with Kenyan consumer protection standards and Central Bank of Kenya payment gateway requirements.
            </p>
          </div>

          {/* Policy Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setActivePolicyTab('refund')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activePolicyTab === 'refund'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800'
              }`}
            >
              7-Day Refund Policy
            </button>

            <button
              onClick={() => setActivePolicyTab('cancellation')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activePolicyTab === 'cancellation'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800'
              }`}
            >
              Subscription Cancellation
            </button>

            <button
              onClick={() => setActivePolicyTab('privacy')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activePolicyTab === 'privacy'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800'
              }`}
            >
              Child Privacy (KDPA & COPPA)
            </button>

            <button
              onClick={() => setActivePolicyTab('security')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activePolicyTab === 'security'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800'
              }`}
            >
              Payment Security
            </button>
          </div>

          {/* Active Policy Content Box */}
          <div className="bg-white dark:bg-stone-900 rounded-[32px] p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl">
            {activePolicyTab === 'refund' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                    🛡️
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white">7-Day Money-Back Guarantee (Refund Policy)</h3>
                    <p className="text-xs text-stone-500">Zero-risk trial for all parents and families</p>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-3 leading-relaxed">
                  <p>
                    At Mali Utajiri, our mission is to ensure every family experiences real, quantifiable improvements in their children's money habits. If for any reason you are not satisfied with your subscription, you may request a <strong>100% full refund within 7 days</strong> of any charge.
                  </p>
                  <p>
                    <strong>How to initiate a refund:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 font-medium">
                    <li>Send an email to <strong className="text-emerald-700 dark:text-emerald-400">support@utajiri.co.ke</strong> with your registered email or phone number.</li>
                    <li>Or reply to your Paystack payment receipt citing your Order Reference.</li>
                    <li>Refunds are reviewed promptly and remitted back to the originating <strong>M-Pesa line or card</strong> within 3 to 5 business days.</li>
                  </ul>
                </div>
              </div>
            )}

            {activePolicyTab === 'cancellation' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
                    🔄
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white">Subscription Cancellation Policy</h3>
                    <p className="text-xs text-stone-500">Total control over your billing</p>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-3 leading-relaxed">
                  <p>
                    Parents may cancel recurring billing at any time directly through the <strong>Parent Dashboard</strong> under Settings &gt; Membership.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 font-medium">
                    <li><strong>No Cancellation Penalties:</strong> There are zero cancellation fees or lock-in contracts.</li>
                    <li><strong>Retained Access:</strong> When you cancel, your family retains full access to all curriculum modules and MaliBot AI until the end of your current 30-day paid billing cycle.</li>
                    <li><strong>Data Preservation:</strong> Your children’s completed lessons, earned badges, and savings records will remain safely saved in our database should you choose to re-activate in the future.</li>
                  </ul>
                </div>
              </div>
            )}

            {activePolicyTab === 'privacy' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
                    🔒
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white">Child Privacy & Kenya Data Protection Act (KDPA)</h3>
                    <p className="text-xs text-stone-500">Safeguarding young minds and family data</p>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-3 leading-relaxed">
                  <p>
                    Mali Utajiri strictly follows the <strong>Kenya Data Protection Act (KDPA) 2019</strong> and international COPPA guidelines for minors:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 font-medium">
                    <li><strong>Parental Verification Required:</strong> Minors cannot create accounts independently. All child accounts are provisioned exclusively through verified parent authorization.</li>
                    <li><strong>No Third-Party Advertising:</strong> Mali Utajiri is completely ad-free. We do not sell, rent, or monetize your children's data or learning history to any third parties.</li>
                    <li><strong>Encrypted Communications:</strong> All interactions with MaliBot AI are processed securely with strict content moderation filters.</li>
                  </ul>
                </div>
              </div>
            )}

            {activePolicyTab === 'security' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
                    💳
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white">Payment Security & Settlement Protocol</h3>
                    <p className="text-xs text-stone-500">Bank-grade encryption via Paystack</p>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-3 leading-relaxed">
                  <p>
                    All payment processing on Mali Utajiri is handled via <strong>Paystack Payments Limited</strong>, an authorized payment service provider regulated by the <strong>Central Bank of Kenya (CBK)</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 font-medium">
                    <li><strong>PCI-DSS Level 1 Certified:</strong> We never store your full card number or CVV on our servers. All sensitive card information is tokenized directly by Paystack.</li>
                    <li><strong>M-Pesa STK Push Security:</strong> Mobile money transactions trigger a direct Safaricom PIN prompt on your registered handset. You only authorize payments using your private Safaricom M-Pesa PIN.</li>
                    <li><strong>HMAC Webhook Verification:</strong> Every payment event is cryptographically verified to prevent unauthorized charges.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CONTACT US & CORPORATE DETAILS (Verified for Paystack KYC) */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 bg-white dark:bg-stone-900 border-t border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase tracking-wider mb-2">
              <Phone size={14} />
              <span>Customer Care & Business Verification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white">
              Official Contact & Support Channels
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
              Need assistance with your family membership, billing, or technical queries? Our support team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            {/* Email Support */}
            <div className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 text-center flex flex-col items-center justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                  <Mail size={22} />
                </div>
                <h4 className="text-sm font-black text-stone-900 dark:text-white">Official Support Email</h4>
                <p className="text-xs text-stone-500 mt-1">For account reviews, queries, and refunds</p>
                <div className="mt-3 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 py-1.5 px-3 rounded-lg border border-emerald-500/20">
                  support@utajiri.co.ke
                </div>
              </div>

              <button
                onClick={() => handleCopyEmail('support@utajiri.co.ke')}
                className="mt-4 text-xs font-black text-stone-600 dark:text-stone-300 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedEmail ? <span className="text-emerald-600">✓ Copied to clipboard!</span> : <span>Copy Email Address</span>}
              </button>
            </div>

            {/* Telephone & WhatsApp */}
            <div className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 text-center flex flex-col items-center justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-4">
                  <Phone size={22} />
                </div>
                <h4 className="text-sm font-black text-stone-900 dark:text-white">Customer Care Line</h4>
                <p className="text-xs text-stone-500 mt-1">Phone & WhatsApp Inquiries</p>
                <div className="mt-3 font-mono text-xs font-bold text-brand-secondary dark:text-brand-primary bg-stone-200/60 dark:bg-stone-700/60 py-1.5 px-3 rounded-lg">
                  +254 700 000 000
                </div>
              </div>

              <p className="mt-4 text-[11px] font-bold text-stone-400">
                Mon - Fri: 8:00 AM – 6:00 PM EAT
              </p>
            </div>

            {/* Business Headquarters */}
            <div className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 text-center flex flex-col items-center justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
                  <MapPin size={22} />
                </div>
                <h4 className="text-sm font-black text-stone-900 dark:text-white">Registered Office</h4>
                <p className="text-xs text-stone-500 mt-1">Mali Utajiri / Utajiri Tech</p>
                <div className="mt-3 text-xs font-bold text-stone-700 dark:text-stone-300">
                  Nairobi, Kenya
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <Clock size={12} />
                <span>East Africa Time (UTC+3)</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-stone-950 text-white py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-800">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md bg-[#081C15] border border-brand-accent/30 flex items-center justify-center shrink-0">
                <img 
                  src="/mali_icon_sunburst_crest.svg" 
                  alt="Mali Crest" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-white brand">
                  MALI UTAJIRI
                </span>
                <p className="text-[11px] text-stone-400 font-medium">
                  Youth & Family Financial Education • Kenya
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs font-bold text-stone-400">
              <button onClick={() => scrollToSection('overview')} className="hover:text-white transition-colors cursor-pointer">
                Overview
              </button>
              <button onClick={() => scrollToSection('curriculum')} className="hover:text-white transition-colors cursor-pointer">
                Curriculum
              </button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors cursor-pointer">
                Pricing (KES 300)
              </button>
              <button onClick={() => scrollToSection('policies')} className="hover:text-white transition-colors cursor-pointer">
                Refund Policy
              </button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">
                Support
              </button>
            </div>

            <div>
              <button
                onClick={() => onGoToAuth('signup')}
                className="px-5 py-2.5 rounded-xl bg-brand-accent text-white font-black text-xs hover:scale-105 transition-all cursor-pointer shadow-lg shadow-brand-accent/20"
              >
                Launch App
              </button>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-medium gap-3">
            <p>© {new Date().getFullYear()} Mali Utajiri (Utajiri Financial Technologies). All rights reserved.</p>
            <p>Processed securely by Paystack Payments Kenya • Licensed by Central Bank of Kenya (CBK)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
