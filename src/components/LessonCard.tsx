import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { Lesson } from '../types';
import { SwipeView } from './SwipeView';
import { useAchievement } from '../context/AchievementContext';
import { useAppStore } from '../state/store';
import { useCurriculumStore } from '../state/curriculumStore';
import { parseLocalizedContent } from '../lib/contentParser';

interface LessonCardProps {
  key?: React.Key;
  lesson: Lesson;
  index: number;
  isLastLessonOfModule?: boolean;
  onNextModule?: () => void;
}

export function LessonCard({ lesson, index, isLastLessonOfModule, onNextModule }: LessonCardProps) {
  const [isSwiping, setIsSwiping] = useState(false);
  const { achievements } = useAchievement();
  const { completedLessons, markLessonComplete } = useAppStore();
  const { cards, fetchLessonCards } = useCurriculumStore();

  const lessonCards = cards[lesson.id] || [];
  const isCompleted = completedLessons.includes(lesson.id); 

  React.useEffect(() => {
    fetchLessonCards(lesson.id);
  }, [lesson.id, fetchLessonCards]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => setIsSwiping(true)}
        className={`bg-white dark:bg-stone-800 rounded-[32px] border ${isCompleted ? 'border-brand-accent' : 'border-stone-200 dark:border-stone-700'} shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all group`}
      >
        <div className="p-5 md:p-8 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-black uppercase tracking-widest text-brand-accent">Lesson {index + 1} {lesson.level && `• ${lesson.level}`}</span>
            <h3 className="font-black text-brand-secondary dark:text-brand-primary text-2xl group-hover:text-brand-accent transition-colors">{parseLocalizedContent(lesson.title)}</h3>
            <p className="text-stone-500 font-medium text-sm mt-2">{lessonCards.length} Micro-Cards</p>
          </div>
          <div className={`w-14 h-14 rounded-full ${isCompleted ? 'bg-brand-accent/10 text-brand-accent' : 'bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-300'} flex items-center justify-center`}>
            {isCompleted ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
          </div>
        </div>
      </motion.div>

      {isSwiping && lessonCards.length > 0 && (
        <SwipeView 
          cards={lessonCards} 
          onClose={() => setIsSwiping(false)} 
          onComplete={() => {
            setIsSwiping(false);
            markLessonComplete(lesson.id);
          }} 
          isLastLessonOfModule={isLastLessonOfModule}
          onNextModule={onNextModule}
        />
      )}
    </>
  );
}
