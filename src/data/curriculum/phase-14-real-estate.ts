import { Phase } from '../../types/curriculum';
import { beginnerLesson } from './phase-14/beginner';
import { intermediateLesson } from './phase-14/intermediate';
import { proLesson } from './phase-14/pro';

export const phaseRealEstate: Phase = {
  id: 'phase-real-estate',
  title: 'Real Estate & Hard Assets',
  description: 'Learn the legal money glitches of the wealthy: Leverage, Commercial Valuation, and the BRRRR Method.',
  lessons: [
    beginnerLesson,
    intermediateLesson,
    proLesson
  ]
};
