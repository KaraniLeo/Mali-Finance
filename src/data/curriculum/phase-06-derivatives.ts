import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-06/beginner';
import { intermediateLesson } from './phase-06/intermediate';
import { proLesson } from './phase-06/pro';

export const phase06: Phase = {
  id: 'phase-06',
  title: 'Phase 6: Derivative Markets',
  description: 'Master Options, Futures, the Greeks, and how to use leverage to surgically remove risk from your portfolio.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};