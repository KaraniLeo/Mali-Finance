import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-15/beginner';
import { intermediateLesson } from './phase-15/intermediate';
import { proLesson } from './phase-15/pro';

export const phase15: Phase = {
  id: 'phase-15',
  title: 'Phase 15: The Ultimate Wealth Engine',
  description: 'The final boss: Entity structuring, asymmetric risk, tax arbitrage, and the psychology of generational wealth.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};
