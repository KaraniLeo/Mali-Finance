import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { LearningCard } from '../types';
import { Card } from './Card';
import { useAchievement } from '../context/AchievementContext';

interface SwipeViewProps {
  cards: LearningCard[];
  onClose: () => void;
  onComplete: () => void;
  isLastLessonOfModule?: boolean;
  onNextModule?: () => void;
}

export function SwipeView({ cards, onClose, onComplete, isLastLessonOfModule, onNextModule }: SwipeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { track } = useAchievement();

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed the sequence
      track('LESSON_COMPLETED');
      if (isLastLessonOfModule && onNextModule) {
        onComplete();
        onNextModule();
      } else {
        onComplete();
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-100 dark:bg-stone-900 flex flex-col h-[100dvh] w-full">
      {/* Header & Progress */}
      <header className="p-4 md:p-6 flex items-center justify-between">
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 flex items-center justify-center shadow-sm text-stone-500 hover:text-stone-800 transition-colors">
          <Home size={20} />
        </button>
        <div className="flex-1 max-w-md mx-4">
          <div className="h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-accent transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-sm font-black text-stone-400">
          {currentIndex + 1} / {cards.length}
        </div>
      </header>

      {/* Card Container */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4 md:p-8">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-x-0 mx-auto w-full max-w-2xl h-[85vh] md:h-[800px] mt-4 md:mt-12"
          >
            <Card 
              card={cards[currentIndex]} 
              onComplete={handleNext} 
              onScrollStateChange={setIsScrolled}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-0 w-full flex justify-between px-4 z-10 pointer-events-none">
        <div className="w-full max-w-2xl mx-auto flex justify-between items-center relative pointer-events-auto">
          
          <motion.button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            animate={{
              width: isScrolled ? 56 : 56,
              height: 56,
              opacity: currentIndex === 0 ? 0.3 : 1,
              x: isScrolled ? -10 : 0,
              y: isScrolled ? 10 : 0
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`rounded-full bg-stone-100 dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-600 flex items-center justify-center text-stone-700 dark:text-stone-300 shadow-xl hover:scale-105 active:scale-95 transition-all overflow-hidden ${isScrolled ? 'shadow-md opacity-90 backdrop-blur-xl bg-white/90 dark:bg-stone-800/90' : ''}`}
          >
            <ChevronLeft size={28} />
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            animate={{
              width: isScrolled ? 64 : (currentIndex === cards.length - 1 ? 200 : 160),
              height: isScrolled ? 64 : 56,
              borderRadius: isScrolled ? 32 : 9999,
              x: isScrolled ? 10 : 0,
              y: isScrolled ? 10 : 0
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`bg-brand-accent text-white font-black text-lg shadow-lg shadow-[#6B8E23]/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 overflow-hidden ${isScrolled ? 'opacity-90 backdrop-blur-md' : ''}`}
          >
            <AnimatePresence mode="wait">
              {!isScrolled && (
                <motion.span 
                  key="text"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap"
                >
                  {isLastLessonOfModule && currentIndex === cards.length - 1 && onNextModule 
                    ? 'Next Module' 
                    : (currentIndex === cards.length - 1 ? 'Finish Lesson' : 'Continue')}
                </motion.span>
              )}
            </AnimatePresence>
            <ChevronRight size={isScrolled ? 28 : 20} className={isScrolled ? 'ml-0.5' : ''} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
