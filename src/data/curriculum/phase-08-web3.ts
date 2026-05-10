import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-08/beginner';
import { intermediateLesson } from './phase-08/intermediate';
import { proLesson } from './phase-08/pro';

export const phase08: Phase = {
  id: 'phase-08',
  title: 'Phase 8: Web3 & Decentralized Finance',
  description: 'Learn to trade, borrow, and yield farm on Decentralized Exchanges without ever using a bank.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};