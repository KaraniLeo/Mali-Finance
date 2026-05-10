import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-12/beginner';
import { intermediateLesson } from './phase-12/intermediate';
import { proLesson } from './phase-12/pro';

export const phase12: Phase = {
  id: 'phase-12',
  title: 'Phase 12: Advanced Charting & Indicators',
  description: 'Learn to read naked price action, institutional order flow, volume profiles, and algorithmic footprints.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};