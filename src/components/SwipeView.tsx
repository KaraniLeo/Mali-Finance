import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { LearningCard } from '../types/curriculum';
import { Card } from './Card';
import { useAchievement } from '../context/AchievementContext';

interface SwipeViewProps {
  cards: LearningCard[];
  onClose: () => void;
  onComplete: () => void;
}

export function SwipeView({ cards, onClose, onComplete }: SwipeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { track } = useAchievement();

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed the sequence
      track('LESSON_COMPLETED');
      onComplete();
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
          <X size={20} />
        </button>
        <div className="flex-1 max-w-md mx-4">
          <div className="h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#6B8E23] transition-all duration-300 ease-out"
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
            <Card card={cards[currentIndex]} onComplete={handleNext} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4 px-4 z-10">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-14 h-14 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-500 disabled:opacity-50 shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="px-8 h-14 rounded-full bg-[#6B8E23] text-white font-black text-lg shadow-lg shadow-[#6B8E23]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          {currentIndex === cards.length - 1 ? 'Finish Lesson' : 'Continue'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
