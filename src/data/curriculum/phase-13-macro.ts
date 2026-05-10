import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-13/beginner';
import { intermediateLesson } from './phase-13/intermediate';
import { proLesson } from './phase-13/pro';

export const phase13: Phase = {
  id: 'phase-13',
  title: 'Phase 13: Macroeconomics & The Fed',
  description: 'Understand the global economic machine, debt cycles, inflation, and how central banks manipulate markets.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};
