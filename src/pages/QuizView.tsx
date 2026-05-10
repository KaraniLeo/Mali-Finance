import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Sparkles, Gamepad2 } from 'lucide-react';
import { Subtopic } from '../types';
import { PiggyBank } from '../components/games/PiggyBank';
import { BudgetPuzzle } from '../components/games/BudgetPuzzle';
import { MarketSim } from '../components/games/MarketSim';

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

  const questions = subtopic.quiz;
  const currentQuestion = questions[currentQuestionIdx];

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
      <div className="flex flex-col h-full bg-[#F7F7F2]">
        <header className="p-4 flex items-center gap-4 bg-white border-b border-stone-200">
          <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-full text-stone-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1 font-bold text-stone-700 flex items-center gap-2">
            <Gamepad2 size={20} className="text-[#6B8E23]" />
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
      <div className="flex-1 bg-[#6B8E23] flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
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
            You earned <span className="text-yellow-300 font-bold">{score} KES</span> points!
          </p>
          <button 
            onClick={() => onComplete(score)}
            className="w-full bg-white text-[#6B8E23] py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Claim Rewards
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F7F7F2]">
      <header className="p-4 flex items-center gap-4 bg-white border-b border-stone-200">
        <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-full text-stone-600">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#6B8E23] transition-all duration-300" 
              style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-sm font-bold text-stone-500">
          {currentQuestionIdx + 1} / {questions.length}
        </div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto flex flex-col max-w-2xl mx-auto w-full">
        <div className="flex-1">
          <h2 className="text-2xl font-black text-[#2D3911] mb-8 mt-4 leading-snug">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;
              
              let btnClass = "w-full text-left p-5 rounded-2xl border-2 transition-all font-bold text-lg flex items-center justify-between ";
              if (!showExplanation) {
                btnClass += "bg-white border-stone-100 hover:border-[#6B8E23]/40 text-stone-700 hover:bg-stone-50";
              } else {
                if (isCorrect) {
                  btnClass += "bg-green-50 border-green-500 text-green-800";
                } else if (isSelected && !isCorrect) {
                  btnClass += "bg-red-50 border-red-400 text-red-800";
                } else {
                  btnClass += "bg-white border-stone-100 text-stone-400 opacity-50";
                }
              }

              return (
                <button 
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showExplanation}
                  className={btnClass}
                >
                  <span>{opt}</span>
                  {showExplanation && isCorrect && <CheckCircle2 className="text-green-500" />}
                  {showExplanation && isSelected && !isCorrect && <XCircle className="text-red-400" />}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 mb-4 p-5 rounded-2xl bg-[#6B8E23]/10 border border-[#6B8E23]/20"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="text-[#6B8E23] flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-black text-[#2D3911] mb-1">
                    {selectedAnswer === currentQuestion.correctAnswerIndex ? 'Great Job!' : 'Not Quite!'}
                  </h4>
                  <p className="text-stone-700 font-medium">{currentQuestion.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showExplanation && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleNext}
            className="w-full bg-[#2D3911] text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-[#1f280b] transition-colors"
          >
            {currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </motion.button>
        )}
      </div>
    </div>
  );
}
