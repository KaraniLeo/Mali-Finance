import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-02/beginner';
import { intermediateLesson } from './phase-02/intermediate';
import { proLesson } from './phase-02/pro';

export const phase02: Phase = {
  id: 'phase-02',
  title: 'Phase 2: Macroeconomics & The Money Engine',
  description: 'Understand inflation, central banks, and the top-down global forces that drive all asset prices.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};
