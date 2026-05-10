import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { Lesson } from '../types/curriculum';
import { SwipeView } from './SwipeView';
import { useAchievement } from '../context/AchievementContext';
import { useAppStore } from '../state/store';

interface LessonCardProps {
  key?: React.Key;
  lesson: Lesson;
  index: number;
}

export function LessonCard({ lesson, index }: LessonCardProps) {
  const [isSwiping, setIsSwiping] = useState(false);
  const { achievements } = useAchievement();
  const { completedLessons, markLessonComplete } = useAppStore();

  const isCompleted = completedLessons.includes(lesson.id); 

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => setIsSwiping(true)}
        className={`bg-white dark:bg-stone-800 rounded-[32px] border ${isCompleted ? 'border-[#6B8E23]' : 'border-stone-200 dark:border-stone-700'} shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all group`}
      >
        <div className="p-5 md:p-8 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#6B8E23]">Lesson {index + 1} {lesson.level && `• ${lesson.level}`}</span>
            <h3 className="font-black text-[#2D3911] dark:text-[#A7C957] text-2xl group-hover:text-[#6B8E23] transition-colors">{lesson.title}</h3>
            <p className="text-stone-500 font-medium text-sm mt-2">{lesson.cards?.length || 0} Micro-Cards</p>
          </div>
          <div className={`w-14 h-14 rounded-full ${isCompleted ? 'bg-[#6B8E23]/10 text-[#6B8E23]' : 'bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-300'} flex items-center justify-center`}>
            {isCompleted ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
          </div>
        </div>
      </motion.div>

      {isSwiping && lesson.cards && (
        <SwipeView 
          cards={lesson.cards} 
          onClose={() => setIsSwiping(false)} 
          onComplete={() => {
            setIsSwiping(false);
            markLessonComplete(lesson.id);
          }} 
        />
      )}
    </>
  );
}
