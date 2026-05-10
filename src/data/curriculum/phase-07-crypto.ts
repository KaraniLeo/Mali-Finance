import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-07/beginner';
import { intermediateLesson } from './phase-07/intermediate';
import { proLesson } from './phase-07/pro';

export const phase07: Phase = {
  id: 'phase-07',
  title: 'Phase 7: The Crypto Ecosystem & Blockchain',
  description: 'Understand the mathematical revolution of Decentralized Finance, Smart Contracts, and Self-Sovereignty.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};