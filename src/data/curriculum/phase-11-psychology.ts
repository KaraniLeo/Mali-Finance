import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-11/beginner';
import { intermediateLesson } from './phase-11/intermediate';
import { proLesson } from './phase-11/pro';

export const phase11: Phase = {
  id: 'phase-11',
  title: 'Phase 11: Trading Psychology & Emotional Control',
  description: 'Conquer the hardest opponent in finance: your own brain. Master market cycles, overcome biases, and trade like a machine.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};