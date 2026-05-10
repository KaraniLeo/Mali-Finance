import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Module } from '../types';
import { getPhaseById } from '../data/curriculum';
import { LessonCard } from '../components/LessonCard';

interface ModuleSyllabusViewProps {
  module: Module;
  onBack: () => void;
  onStartQuiz: (subtopic: any) => void;
}

export function ModuleSyllabusView({ module, onBack, onStartQuiz }: ModuleSyllabusViewProps) {
  const phase = module.phaseId ? getPhaseById(module.phaseId) : null;

  if (!phase && !module.syllabus) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-stone-50 dark:bg-stone-900">
        <h2 className="text-2xl font-bold text-stone-700 dark:text-stone-300 mb-4">Module Content Not Found</h2>
        <button onClick={onBack} className="text-[#6B8E23] font-bold underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-stone-900 overflow-y-auto">
      <header className="sticky top-0 z-20 bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-lg border-b border-stone-200 dark:border-stone-800 px-6 py-4 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-stone-700 dark:text-stone-300" />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-stone-800 dark:text-stone-200">{module.icon}</div>
          <div>
            <h1 className="text-xl font-black text-[#2D3911] dark:text-[#A7C957] leading-tight">{phase?.title || module.title}</h1>
            <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Professor-Level Curriculum</p>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto w-full space-y-8 pb-32">
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100 dark:border-stone-700">
          <p className="text-stone-600 dark:text-stone-300 font-medium leading-relaxed mb-6 text-lg">
            {phase?.description || module.description}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-stone-100 dark:bg-stone-700 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-[#6B8E23] h-full transition-all duration-1000"
                style={{ width: `${module.progress}%` }}
              />
            </div>
            <span className="text-sm font-bold text-stone-500 dark:text-stone-400">{module.progress}%</span>
          </div>
        </div>

        {phase ? (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#2D3911] dark:text-[#A7C957] px-2">Lessons & Practical Exercises</h2>
            {phase.lessons.map((lesson, index) => (
              <LessonCard key={lesson.id} lesson={lesson} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center text-stone-500 dark:text-stone-400 py-12">
            Loading legacy syllabus...
          </div>
        )}
      </div>
    </div>
  );
}

