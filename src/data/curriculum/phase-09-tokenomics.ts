import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-09/beginner';
import { intermediateLesson } from './phase-09/intermediate';
import { proLesson } from './phase-09/pro';

export const phase09: Phase = {
  id: 'phase-09',
  title: 'Phase 9: Tokenomics & Utility',
  description: 'The mathematics of evaluating crypto projects: supply schedules, token sinks, and game theory.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};