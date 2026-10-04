import React, { useState, useRef, useEffect } from 'react';
import { formatCurrency } from '../lib/currency';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Sparkles, 
  Gamepad2, 
  AlertCircle, 
  Check, 
  Lightbulb 
} from 'lucide-react';
import { Subtopic } from '../types';
import { PiggyBank } from '../components/games/PiggyBank';
import { BudgetPuzzle } from '../components/games/BudgetPuzzle';
import { MarketSim } from '../components/games/MarketSim';
import { ConceptBreakdownWindow } from '../components/ConceptBreakdownWindow';

interface QuizViewProps {
  subtopic: Subtopic;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function QuizView({ subtopic, onComplete, onBack }: QuizViewProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(!subtopic.game);
  const explanationRef = useRef<HTMLDivElement>(null);

  const questions = subtopic.quiz;
  const currentQuestion = questions[currentQuestionIdx];

  // Auto-scroll to explanation when an answer is chosen
  useEffect(() => {
    if (showExplanation && explanationRef.current) {
      const timer = setTimeout(() => {
        explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [showExplanation]);

  const handleAnswer = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    
    if (idx === currentQuestion.correctAnswerIndex) {
      setScore(s => s + 100);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(i => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  if (!gameCompleted && subtopic.game) {
    return (
      <div className="flex flex-col h-full bg-[#F7F7F2] dark:bg-stone-900">
        <header className="p-4 flex items-center gap-4 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-800">
          <button onClick={onBack} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full text-stone-600 dark:text-stone-300">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1 font-bold text-stone-700 dark:text-stone-200 flex items-center gap-2">
            <Gamepad2 size={20} className="text-brand-accent" />
            Practical Challenge
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            {subtopic.game === 'piggy' && <PiggyBank onComplete={() => setGameCompleted(true)} />}
            {subtopic.game === 'budget' && <BudgetPuzzle onComplete={() => setGameCompleted(true)} />}
            {subtopic.game === 'market' && <MarketSim onComplete={() => setGameCompleted(true)} />}
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex-1 bg-brand-accent flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#A3B18A_0%,_transparent_60%)] opacity-50"></div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4A373] shadow-2xl relative">
            <Trophy size={48} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-dashed border-[#D4A373]/30"
            />
          </div>
          <h1 className="text-4xl font-black mb-4">Quiz Complete!</h1>
          <p className="text-xl font-medium text-white/90 mb-8">
            You earned <span className="text-yellow-300 font-bold">{formatCurrency(score)}</span> points!
          </p>
          <button 
            onClick={() => onComplete(score)}
            className="w-full bg-white text-brand-accent py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Claim Rewards
          </button>
        </motion.div>
      </div>
    );
  }

  const isUserCorrect = selectedAnswer === currentQuestion.correctAnswerIndex;
  const correctAnswerText = currentQuestion.options[currentQuestion.correctAnswerIndex];

  return (
    <div className="flex flex-col h-full bg-[#F7F7F2] dark:bg-stone-900">
      <header className="p-4 flex items-center gap-4 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-800">
        <button onClick={onBack} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full text-stone-600 dark:text-stone-300">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <div className="h-2 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-accent transition-all duration-300" 
              style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-sm font-bold text-stone-500 dark:text-stone-400">
          {currentQuestionIdx + 1} / {questions.length}
        </div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto flex flex-col max-w-2xl mx-auto w-full pb-28">
        <div className="flex-1">
          <div className="text-xs font-black uppercase tracking-widest text-brand-accent mb-2">
            Knowledge Check
          </div>
          <h2 className="text-2xl font-black text-brand-secondary dark:text-brand-primary mb-8 leading-snug">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;
              
              let btnClass = "w-full text-left p-5 rounded-2xl border-2 transition-all font-bold text-base md:text-lg flex items-center justify-between gap-3 shadow-sm ";
              
              if (!showExplanation) {
                btnClass += "bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-brand-accent dark:hover:border-brand-accent text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/60 active:scale-[0.99]";
              } else {
                if (isCorrect) {
                  // Right answer is highlighted in green
                  btnClass += "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/10";
                } else if (isSelected && !isCorrect) {
                  // Wrong clicked answer is highlighted in red
                  btnClass += "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-950 dark:text-red-100 ring-2 ring-red-500/30 shadow-md shadow-red-500/10";
                } else {
                  // Other options are dimmed
                  btnClass += "bg-stone-50/50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-600 opacity-40 pointer-events-none";
                }
              }

              return (
                <button 
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showExplanation}
                  className={btnClass}
                >
                  <span className="flex-1">{opt}</span>
                  {showExplanation && isCorrect && (
                    <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-emerald-600 text-white px-3 py-1 rounded-full shadow-sm">
                      <CheckCircle2 size={15} />
                      Correct Answer
                    </span>
                  )}
                  {showExplanation && isSelected && !isCorrect && (
                    <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-red-500 text-white px-3 py-1 rounded-full shadow-sm">
                      <XCircle size={15} />
                      Your Choice
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* In-depth explanation revealed at the bottom simultaneously */}
        <AnimatePresence>
          {showExplanation && (
            <ConceptBreakdownWindow
              ref={explanationRef}
              isCorrect={isUserCorrect}
              correctAnswerText={correctAnswerText}
              explanationText={currentQuestion.explanation || 'Mastering this financial principle allows you to make informed, deliberate choices and build long-term wealth.'}
              headline={isUserCorrect ? 'Great Job! Correct Concept Breakdown' : "Not Quite! Here's Why:"}
              keyTakeaway="Mastering this concept ensures you make analytical, disciplined financial decisions rather than reactive ones."
            />
          )}
        </AnimatePresence>

        {showExplanation && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNext}
            className="w-full bg-brand-secondary text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-[#1f280b] active:scale-[0.99] transition-all"
          >
            {currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </motion.button>
        )}
      </div>
    </div>
  );
}
