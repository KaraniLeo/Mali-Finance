import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Coins, 
  Compass, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

interface WelcomeCarouselProps {
  onGetStarted: () => void;
  onSkipToLogin: () => void;
  onViewPublicLanding?: () => void;
}

export function WelcomeCarousel({ onGetStarted, onSkipToLogin, onViewPublicLanding }: WelcomeCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      badge: "Welcome to Mali Utajiri",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      title: "Smart Money Habits Beat Pocket Money Regrets! 🌟",
      description: "Financial wisdom so sharp, your piggy bank will ask for a promotion. Mali Utajiri transforms everyday allowance into generational wealth skills.",
      icon: <Coins className="text-brand-accent w-16 h-16 md:w-20 md:h-20" />,
      graphic: (
        <div className="relative w-44 h-44 md:w-56 md:h-56 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-accent/20 to-emerald-500/20 blur-2xl animate-pulse" />
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-white dark:bg-stone-800 shadow-2xl border-2 border-brand-accent/30 flex items-center justify-center relative z-10 rotate-3 transition-transform hover:rotate-0">
            <img 
              src="/mali_icon_sunburst_crest.svg" 
              alt="Mali Crest" 
              className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-md"
            />
          </div>
          <motion.div 
            animate={{ y: [-4, 4, -4] }} 
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-1"
          >
            <Sparkles size={12} />
            <span>Zero Regrets</span>
          </motion.div>
        </div>
      ),
      highlightText: "Master real money from day one."
    },
    {
      id: 1,
      badge: "Pedagogy & Real-World Simulation",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      title: "Financial Education Made for Young Minds 🧠",
      description: "No boring textbooks. Learn through interactive wealth jars, double-auction market simulators, order flow dynamics, and budgeting games tailored for every age.",
      icon: <Compass className="text-blue-500 w-16 h-16 md:w-20 md:h-20" />,
      graphic: (
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm text-left">
            <span className="text-2xl">🍯</span>
            <h5 className="text-xs font-black text-stone-800 dark:text-stone-200 mt-2">Wealth Jars</h5>
            <p className="text-[10px] text-stone-500 font-medium">Give, Grow, Spend</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm text-left">
            <span className="text-2xl">📈</span>
            <h5 className="text-xs font-black text-stone-800 dark:text-stone-200 mt-2">Simulated Markets</h5>
            <p className="text-[10px] text-stone-500 font-medium">Risk-free trades</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm text-left">
            <span className="text-2xl">🤖</span>
            <h5 className="text-xs font-black text-stone-800 dark:text-stone-200 mt-2">MaliBot AI</h5>
            <p className="text-[10px] text-stone-500 font-medium">Unlimited mentorship</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm text-left">
            <span className="text-2xl">🛡️</span>
            <h5 className="text-xs font-black text-stone-800 dark:text-stone-200 mt-2">Safe & Legal</h5>
            <p className="text-[10px] text-stone-500 font-medium">Parent provisioned</p>
          </div>
        </div>
      ),
      highlightText: "Junior (6-12) • Teen (13-17) • Pro (18+)"
    },
    {
      id: 2,
      badge: "Parent-Gated Wealth Journey",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      title: "Start Your Journey to Financial Freedom 🚀",
      description: "Parents set up the family plan and provision child accounts with custom age portals and localized Kenyan or International curriculums. No child paywalls—ever.",
      icon: <TrendingUp className="text-emerald-500 w-16 h-16 md:w-20 md:h-20" />,
      graphic: (
        <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-brand-accent/30 to-emerald-500/30 flex items-center justify-center p-4">
            <div className="w-32 h-32 rounded-full bg-white dark:bg-stone-800 shadow-xl flex flex-col items-center justify-center text-center p-3">
              <ShieldCheck className="text-emerald-500 mb-1" size={36} />
              <span className="text-[11px] font-black uppercase text-brand-secondary dark:text-white">1st Month Free</span>
              <span className="text-[10px] text-stone-400 font-bold">Then KES 300/mo</span>
            </div>
          </div>
        </div>
      ),
      highlightText: "Guaranteed child-safe • Unlimited AI Access"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onGetStarted();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const current = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#F7F7F2] dark:bg-stone-950 flex flex-col justify-between p-4 md:p-8 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)] select-none">
      {/* Top Header with Skip */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
            M
          </div>
          <span className="font-black text-xl tracking-tight brand text-brand-secondary dark:text-white">
            MALI UTAJIRI
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onViewPublicLanding && (
            <button
              onClick={onViewPublicLanding}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer hidden sm:inline-flex items-center gap-1"
            >
              <span>🌐 About & Pricing</span>
            </button>
          )}
          <button
            onClick={onSkipToLogin}
            className="text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-brand-accent transition-colors px-3 py-1.5 rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-800 cursor-pointer"
          >
            Already have an account? <span className="font-black underline text-brand-accent">Log In</span>
          </button>
        </div>
      </header>

      {/* Slide Content Area */}
      <main className="w-full max-w-xl mx-auto my-auto py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center flex flex-col items-center"
          >
            {/* Graphic Illustration */}
            <div className="mb-6">
              {current.graphic}
            </div>

            {/* Pill Badge */}
            <div className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full border mb-3 ${current.badgeColor}`}>
              <Sparkles size={13} />
              <span>{current.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-secondary dark:text-white leading-tight mb-3 px-2">
              {current.title}
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-stone-600 dark:text-stone-300 font-medium leading-relaxed max-w-md mb-4 px-4">
              {current.description}
            </p>

            {/* Highlight Footer Note */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 size={13} />
              <span>{current.highlightText}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Controls & Dots */}
      <footer className="w-full max-w-xl mx-auto pb-4 flex flex-col gap-4">
        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide 
                  ? 'w-8 bg-brand-accent' 
                  : 'w-2.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <button
              onClick={handlePrev}
              className="h-14 w-14 rounded-2xl bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 flex items-center justify-center shadow-sm hover:bg-stone-50 dark:hover:bg-stone-700 transition-all cursor-pointer flex-shrink-0"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex-1 h-14 bg-brand-accent text-white font-black text-base md:text-lg rounded-2xl shadow-xl shadow-brand-accent/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{currentSlide === slides.length - 1 ? 'Start Your Journey • Get Started' : 'Next'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}
