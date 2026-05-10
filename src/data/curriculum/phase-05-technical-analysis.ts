import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-05/beginner';
import { intermediateLesson } from './phase-05/intermediate';
import { proLesson } from './phase-05/pro';

export const phase05: Phase = {
  id: 'phase-05',
  title: 'Phase 5: Technical Analysis Masterclass',
  description: 'Learn the true language of the markets. Technical analysis isn\'t about predicting the future; it\'s about identifying probabilities, institutional traps, and liquidity sweeps.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};
