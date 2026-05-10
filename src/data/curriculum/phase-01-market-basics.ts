import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-01/beginner';
import { intermediateLesson } from './phase-01/intermediate';
import { proLesson } from './phase-01/pro';

export const phase01: Phase = {
  id: 'phase-01',
  title: 'Phase 1: Market Mechanics & Auction Theory',
  description: 'Understand the fundamental mechanics of the global financial market, the order book, and how institutions manipulate liquidity.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};
