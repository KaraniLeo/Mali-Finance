import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  AlertTriangle, 
  PenTool, 
  CheckCircle2, 
  XCircle, 
  BrainCircuit, 
  Sparkles, 
  AlertCircle,
  Check
} from 'lucide-react';
import { LearningCard } from '../types';
import { resolveImage } from '../lib/imageResolver';
import { parseLocalizedContent } from '../lib/contentParser';
import { isOptionCorrect, getCardExplanation } from '../lib/explanationHelper';
import { ConceptBreakdownWindow } from './ConceptBreakdownWindow';

interface CardProps {
  card: LearningCard;
  onComplete?: () => void;
  onScrollStateChange?: (isScrolled: boolean) => void;
}

export function Card({ card, onComplete, onScrollStateChange }: CardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const explanationRef = useRef<HTMLDivElement>(null);

  // Auto-scroll smoothly to explanation when an answer is chosen
  useEffect(() => {
    if (selectedOption !== null && explanationRef.current) {
      const timer = setTimeout(() => {
        explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [selectedOption]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (onScrollStateChange) {
      const isScrolled = e.currentTarget.scrollTop > 20;
      onScrollStateChange(isScrolled);
    }
  };

  const dynamicImage = resolveImage(card);

  const getIcon = () => {
    switch (card.type) {
      case 'concept': return <BrainCircuit className="text-blue-500" />;
      case 'example': return <Lightbulb className="text-amber-500" />;
      case 'exercise': return <PenTool className="text-emerald-500" />;
      case 'insight': return <Lightbulb className="text-purple-500" />;
      case 'warning': return <AlertTriangle className="text-red-500" />;
      default: return <BrainCircuit className="text-stone-500" />;
    }
  };

  const getThemeClass = () => {
    switch (card.type) {
      case 'concept': return 'border-blue-100 bg-blue-50/10';
      case 'example': return 'border-amber-100 bg-amber-50/10';
      case 'exercise': return 'border-emerald-100 bg-emerald-50/10';
      case 'insight': return 'border-purple-100 bg-purple-50/10';
      case 'warning': return 'border-red-100 bg-red-50/10';
      default: return 'border-stone-200 bg-white';
    }
  };

  const handleExerciseOption = (opt: string, index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);
    const correct = isOptionCorrect(opt, index, card);
    setIsCorrect(correct);
  };

  const explanationData = card.type === 'exercise' ? getCardExplanation(card, selectedOption) : null;

  return (
    <div 
      onScroll={handleScroll}
      className={`w-full h-full flex flex-col bg-white dark:bg-stone-900 rounded-[32px] border ${getThemeClass()} shadow-lg overflow-y-auto custom-scrollbar relative p-4 pb-40 md:p-8 md:pb-40`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
          {getIcon()}
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">{card.type}</div>
          <h2 className="text-2xl font-black text-stone-800 dark:text-stone-200 leading-tight">{parseLocalizedContent(card.title)}</h2>
        </div>
      </div>

      {dynamicImage && (
        <div className="w-full mb-6">
          <img 
            src={dynamicImage} 
            alt={card.title} 
            style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '16px' }}
          />
        </div>
      )}

      <div className="flex-1 space-y-4">
        {parseLocalizedContent(card.content).split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="text-lg md:text-xl text-stone-800 dark:text-stone-200 font-medium leading-relaxed">
            {paragraph.split('\n').map((line, lineIdx) => {
              if (line.trim().startsWith('- ')) {
                return (
                  <span key={lineIdx} className="block pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-brand-accent before:font-bold">
                    {line.replace('- ', '')}
                  </span>
                );
              }
              return <span key={lineIdx} className="block">{line}</span>;
            })}
          </p>
        ))}
      </div>

      {card.type === 'exercise' && card.options && (
        <div className="mt-8 space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">
            Select the best answer:
          </div>
          {card.options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const isRight = isOptionCorrect(opt, i, card);
            
            let btnClasses = "w-full p-4 md:p-5 rounded-2xl border-2 text-left font-bold transition-all shadow-sm flex items-center justify-between gap-3 text-base md:text-lg leading-snug ";
            
            if (selectedOption === null) {
              btnClasses += "bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-brand-accent dark:hover:border-brand-accent hover:bg-stone-50 dark:hover:bg-stone-700/60 active:scale-[0.99]";
            } else {
              if (isRight) {
                // The right answer is ALWAYS highlighted in vivid emerald/green!
                btnClasses += "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/10";
              } else if (isSelected && !isRight) {
                // The user's wrong clicked answer is highlighted in red!
                btnClasses += "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-950 dark:text-red-100 ring-2 ring-red-500/30 shadow-md shadow-red-500/10";
              } else {
                // Other options are dimmed
                btnClasses += "bg-stone-50/50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-600 opacity-40 pointer-events-none";
              }
            }
              
            return (
              <button
                key={i}
                onClick={() => handleExerciseOption(opt, i)}
                disabled={selectedOption !== null}
                className={btnClasses}
              >
                <span className="flex-1">{parseLocalizedContent(opt)}</span>
                {selectedOption !== null && isRight && (
                  <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-emerald-600 text-white px-3 py-1 rounded-full shadow-sm">
                    <CheckCircle2 size={15} />
                    Correct Answer
                  </span>
                )}
                {selectedOption !== null && isSelected && !isRight && (
                  <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-red-500 text-white px-3 py-1 rounded-full shadow-sm">
                    <XCircle size={15} />
                    Your Choice
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* In-depth explanation revealed on the bottom simultaneously */}
      <AnimatePresence>
        {card.type === 'exercise' && selectedOption !== null && explanationData && (
          <ConceptBreakdownWindow
            ref={explanationRef}
            isCorrect={Boolean(isCorrect)}
            correctAnswerText={explanationData.correctAnswerText}
            explanationText={explanationData.explanationText}
            headline={explanationData.headline}
            keyTakeaway={explanationData.keyTakeaway}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
