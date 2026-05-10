import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, AlertTriangle, PenTool, CheckCircle, BrainCircuit } from 'lucide-react';
import { LearningCard } from '../types/curriculum';
import { resolveImage } from '../lib/imageResolver';

interface CardProps {
  card: LearningCard;
  onComplete?: () => void;
}

export function Card({ card, onComplete }: CardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
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

  const handleExerciseOption = (opt: string) => {
    setSelectedOption(opt);
    if (card.correctAnswer !== undefined) {
      const correct = opt === card.correctAnswer;
      setIsCorrect(correct);
    }
  };

  return (
    <div className={`w-full h-full flex flex-col bg-white dark:bg-stone-900 rounded-[32px] border ${getThemeClass()} shadow-lg overflow-y-auto custom-scrollbar relative p-4 pb-24 md:p-8`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
          {getIcon()}
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">{card.type}</div>
          <h2 className="text-2xl font-black text-stone-800 dark:text-stone-200 leading-tight">{card.title}</h2>
        </div>
      </div>

      <div className="w-full mb-6">
        <img 
          src={dynamicImage} 
          alt={card.title} 
          style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '16px' }}
        />
      </div>

      <div className="flex-1 space-y-4">
        {card.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="text-lg md:text-xl text-stone-800 dark:text-stone-200 font-medium leading-relaxed">
            {paragraph.split('\n').map((line, lineIdx) => {
              if (line.trim().startsWith('- ')) {
                return (
                  <span key={lineIdx} className="block pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#6B8E23] before:font-bold">
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
          {card.options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const statusClass = isSelected 
              ? (isCorrect 
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900 dark:bg-emerald-900/30 dark:border-emerald-500 dark:text-emerald-100' 
                  : 'bg-red-100 border-red-500 text-red-900 dark:bg-red-900/30 dark:border-red-500 dark:text-red-100')
              : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-[#6B8E23] dark:hover:border-[#6B8E23] hover:bg-stone-50 dark:hover:bg-stone-700';
              
            return (
              <button
                key={i}
                onClick={() => handleExerciseOption(opt)}
                disabled={selectedOption !== null}
                className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all shadow-sm ${statusClass}`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      )}

      {/* Simulators removed */}
    </div>
  );
}
