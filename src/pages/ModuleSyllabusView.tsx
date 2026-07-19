import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Module, Tier } from '../types';
import { useCurriculumStore } from '../state/curriculumStore';
import { LessonCard } from '../components/LessonCard';
import { parseLocalizedContent } from '../lib/contentParser';
import { useAppStore } from '../state/store';
import { useProgress } from '../hooks/useProgress';

interface ModuleSyllabusViewProps {
  module: Module;
  onBack: () => void;
  onStartQuiz: (subtopic: any) => void;
}

export function ModuleSyllabusView({ module, onBack, onStartQuiz }: ModuleSyllabusViewProps) {
  const { getPhaseById, lessons, fetchPhaseDetails } = useCurriculumStore();
  const { user, setSelectedModule } = useAppStore();
  const { getComputedModules } = useProgress();

  const phase = module.phaseId ? getPhaseById(module.phaseId) : null;
  const phaseLessons = module.phaseId ? (lessons[module.phaseId] || []) : [];

  React.useEffect(() => {
    if (module.phaseId) {
      fetchPhaseDetails(module.phaseId);
    }
  }, [module.phaseId, fetchPhaseDetails]);

  const tier = (user?.tier || 'teen') as Tier;
  const computedModules = getComputedModules(tier);
  const currentComputedModule = computedModules.find(m => m.id === module.id) || module;
  const progress = currentComputedModule.progress;

  const currentIdx = computedModules.findIndex(m => m.id === module.id);
  const nextModule = currentIdx !== -1 && currentIdx < computedModules.length - 1 
    ? computedModules[currentIdx + 1] 
    : null;

  const handleNextModule = () => {
    if (nextModule) {
      setSelectedModule(nextModule);
    }
  };

  if (!phase && !module.syllabus) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-stone-50 dark:bg-stone-900">
        <h2 className="text-2xl font-bold text-stone-700 dark:text-stone-300 mb-4">Module Content Not Found</h2>
        <button onClick={onBack} className="text-brand-accent font-bold underline">Go Back</button>
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
            <h1 className="text-xl font-black text-brand-secondary dark:text-brand-primary leading-tight">{parseLocalizedContent(phase?.title || module.title)}</h1>
            <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Professor-Level Curriculum</p>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto w-full space-y-8 pb-32">
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100 dark:border-stone-700">
          <p className="text-stone-600 dark:text-stone-300 font-medium leading-relaxed mb-6 text-lg">
            {parseLocalizedContent(phase?.description || module.description)}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-stone-100 dark:bg-stone-700 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-brand-accent h-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-bold text-stone-500 dark:text-stone-400">{progress}%</span>
          </div>
        </div>

        {phase && phaseLessons.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-brand-secondary dark:text-brand-primary px-2">Lessons & Practical Exercises</h2>
            {phaseLessons.map((lesson, index) => {
              const isLastLesson = index === phaseLessons.length - 1;
              return (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  index={index} 
                  isLastLessonOfModule={isLastLesson && !!nextModule}
                  onNextModule={handleNextModule}
                />
              );
            })}
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
