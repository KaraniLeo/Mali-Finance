import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-04/beginner';
import { intermediateLesson } from './phase-04/intermediate';
import { proLesson } from './phase-04/pro';

export const phase04: Phase = {
  id: 'phase-04',
  title: 'Phase 4: Equities & Fundamentals',
  description: 'Understand how to evaluate a business, read financial statements, and determine if a stock is actually worth owning.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};
