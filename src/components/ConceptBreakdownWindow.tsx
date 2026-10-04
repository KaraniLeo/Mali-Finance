import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  AlertCircle, 
  Check, 
  Lightbulb, 
  MousePointerClick, 
  ChevronDown 
} from 'lucide-react';

export interface ConceptBreakdownWindowProps {
  isCorrect: boolean;
  correctAnswerText: string;
  explanationText: string;
  headline?: string;
  keyTakeaway?: string;
  onWindowClick?: () => void;
  className?: string;
}

export const ConceptBreakdownWindow = forwardRef<HTMLDivElement, ConceptBreakdownWindowProps>(({
  isCorrect,
  correctAnswerText,
  explanationText,
  headline,
  keyTakeaway,
  onWindowClick,
  className = ''
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollableBodyRef = useRef<HTMLDivElement>(null);
  const [isSelected, setIsSelected] = useState(true);
  const [canScrollDown, setCanScrollDown] = useState(false);

  // Expose inner DOM node to parent ref for smooth scrollIntoView
  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  // Check if inner content is scrollable and show scroll indicator if so
  const checkScroll = () => {
    const el = scrollableBodyRef.current;
    if (el) {
      const hasMoreToScroll = el.scrollHeight - el.scrollTop - el.clientHeight > 15;
      setCanScrollDown(hasMoreToScroll);
    }
  };

  useEffect(() => {
    checkScroll();
    // Re-check scroll after images or fonts may render
    const timer = setTimeout(checkScroll, 100);
    return () => clearTimeout(timer);
  }, [explanationText, keyTakeaway]);

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
    if (onWindowClick) onWindowClick();
  };

  const themeClasses = isCorrect
    ? {
        selected: 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-400 ring-4 ring-emerald-500/30 shadow-2xl',
        unselected: 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/40 dark:border-emerald-500/30 hover:border-emerald-500 hover:shadow-lg',
        iconBg: 'bg-emerald-600 text-white',
        badge: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200',
        activePill: 'bg-emerald-600 text-white ring-2 ring-emerald-300 dark:ring-emerald-500 shadow-md',
        inactivePill: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200',
        scrollbarClass: 'concept-scrollbar-emerald',
        scrollHintText: 'text-emerald-700 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-900/90'
      }
    : {
        selected: 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-500 dark:border-amber-400 ring-4 ring-amber-500/40 shadow-2xl',
        unselected: 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/40 dark:border-amber-500/30 hover:border-amber-500 hover:shadow-lg',
        iconBg: 'bg-amber-500 text-white',
        badge: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200',
        activePill: 'bg-amber-500 text-white ring-2 ring-amber-300 dark:ring-amber-500 shadow-md',
        inactivePill: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 hover:bg-amber-200',
        scrollbarClass: 'concept-scrollbar',
        scrollHintText: 'text-amber-800 dark:text-amber-200 bg-amber-100/95 dark:bg-amber-900/95'
      };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={handleContainerClick}
      tabIndex={0}
      role="region"
      aria-label="Concept Breakdown Window"
      className={`mt-6 rounded-3xl border-2 transition-all duration-200 relative overflow-hidden flex flex-col cursor-pointer select-none outline-none ${
        /* Exactly a quarter of the card window size (~270px-300px) */
        'h-[270px] sm:h-[290px] md:h-[310px] min-h-[240px] max-h-[360px]'
      } ${isSelected ? themeClasses.selected : themeClasses.unselected} ${className}`}
    >
      {/* Sticky Window Header with Title & Active Indicator */}
      <div className="p-4 md:px-5 md:py-3.5 border-b border-stone-200/60 dark:border-stone-700/60 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md flex items-center justify-between gap-3 flex-shrink-0 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-2 rounded-xl flex-shrink-0 shadow-sm ${themeClasses.iconBg}`}>
            {isCorrect ? <Sparkles size={18} /> : <AlertCircle size={18} />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${themeClasses.badge}`}>
                {isCorrect ? 'Well Done!' : 'Concept Breakdown'}
              </span>
            </div>
            <h4 className="text-base md:text-lg font-black text-stone-900 dark:text-stone-100 truncate mt-0.5">
              {headline || (isCorrect ? 'Outstanding! Correct Breakdown' : "Not Quite! Here's Why This Matters")}
            </h4>
          </div>
        </div>

        {/* Clickable Active Pill Badge */}
        <div 
          onClick={handleContainerClick}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase transition-all flex-shrink-0 cursor-pointer ${
            isSelected ? themeClasses.activePill : themeClasses.inactivePill
          }`}
          title={isSelected ? 'Window is selected and scrollable' : 'Click to select and scroll inside window'}
        >
          <MousePointerClick size={13} className={isSelected ? 'animate-bounce' : ''} />
          <span className="hidden sm:inline">
            {isSelected ? 'Window Selected • Scrollable' : 'Click to Focus'}
          </span>
          <span className="sm:hidden">
            {isSelected ? 'Selected' : 'Focus'}
          </span>
        </div>
      </div>

      {/* Scrollable Window Body */}
      <div
        ref={scrollableBodyRef}
        onScroll={checkScroll}
        className={`flex-1 overflow-y-auto overscroll-contain p-4 md:p-5 space-y-3.5 select-text ${themeClasses.scrollbarClass}`}
      >
        {/* Prominent Correct Answer Callout */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-800/90 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm flex items-start gap-3 flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check size={16} strokeWidth={3} />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
              Right Answer
            </span>
            <span className="text-sm md:text-base font-bold text-stone-900 dark:text-stone-100 leading-snug">
              {correctAnswerText}
            </span>
          </div>
        </div>

        {/* Detailed Explanation Paragraphs */}
        <div className="text-stone-700 dark:text-stone-200 text-sm md:text-base font-medium leading-relaxed space-y-2.5">
          {explanationText.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="leading-relaxed">{paragraph}</p>
          ))}
        </div>

        {/* Key Takeaway / Principle Box */}
        {keyTakeaway && (
          <div className="p-3.5 rounded-2xl bg-brand-accent/15 dark:bg-brand-accent/20 border border-brand-accent/30 flex items-start gap-3 flex-shrink-0">
            <Lightbulb className="text-brand-accent flex-shrink-0 mt-0.5" size={18} />
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-brand-secondary dark:text-brand-primary block mb-0.5">
                Strategic Takeaway
              </span>
              <p className="text-stone-800 dark:text-stone-200 text-xs md:text-sm font-semibold leading-snug">
                {keyTakeaway}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Scroll Indicator Hint (Shows when more content is below) */}
      {canScrollDown && (
        <div className="absolute bottom-2 right-4 pointer-events-none z-10 transition-opacity duration-200">
          <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md animate-pulse ${themeClasses.scrollHintText}`}>
            <span>Scroll for more</span>
            <ChevronDown size={12} className="animate-bounce" />
          </div>
        </div>
      )}
    </motion.div>
  );
});

ConceptBreakdownWindow.displayName = 'ConceptBreakdownWindow';
