import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-10/beginner';
import { intermediateLesson } from './phase-10/intermediate';
import { proLesson } from './phase-10/pro';

export const phase10: Phase = {
  id: 'phase-10',
  title: 'Phase 10: NFTs and Digital Property Rights',
  description: 'Understand the Veblen economics of NFTs, On-Chain IP, smart royalties, and illiquid asset trading.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};