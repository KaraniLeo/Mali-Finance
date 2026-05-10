import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-03/beginner';
import { intermediateLesson } from './phase-03/intermediate';
import { proLesson } from './phase-03/pro';

export const phase03: Phase = {
  id: 'phase-03',
  title: 'Phase 3: Risk Management (The Holy Grail)',
  description: 'Learn to protect your capital, position size like a professional, and survive black swan events.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};