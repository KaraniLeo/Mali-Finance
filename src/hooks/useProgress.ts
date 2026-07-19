import { useAppStore } from '../state/store';
import { useCurriculumStore } from '../state/curriculumStore';
import { Tier, Module } from '../types';

export function useProgress() {
  const completedLessons = useAppStore(state => state.completedLessons);
  const { modules: storeModules, getPhaseById, lessons } = useCurriculumStore();

  /**
   * Returns the progress percentage (0-100) of a module based on its lessons.
   */
  const getModuleProgress = (phaseId: string | undefined): number => {
    if (!phaseId) return 0;
    
    const phase = getPhaseById(phaseId);
    if (!phase) return 0;
    
    // We check the lessons in the store
    const phaseLessons = lessons[phaseId] || [];
    if (phaseLessons.length === 0) return 0;

    const totalLessons = phaseLessons.length;
    let completedCount = 0;

    for (const lesson of phaseLessons) {
      if (completedLessons.includes(lesson.id)) {
        completedCount++;
      }
    }

    return Math.round((completedCount / totalLessons) * 100);
  };

  /**
   * Checks if a module should be unlocked.
   * Module 0 is always unlocked.
   * Module N is unlocked if Module N-1 is >= 80% complete.
   */
  const isModuleUnlocked = (moduleIndex: number, tier: Tier): boolean => {
    if (moduleIndex === 0) return true; // First module is always unlocked

    const allTierModules = storeModules[tier] || [];
    const previousModule = allTierModules[moduleIndex - 1];

    if (!previousModule || !previousModule.phaseId) {
      return false; 
    }

    const previousProgress = getModuleProgress(previousModule.phaseId);
    return previousProgress >= 80;
  };

  /**
   * Processes the tier's modules, injecting the computed progress and locked state.
   */
  const getComputedModules = (tier: Tier): Module[] => {
    let tierModules = storeModules[tier] || [];
    
    const regionMode = useAppStore.getState().regionMode;
    tierModules = tierModules.filter(m => {
      if (m.phaseId === 'phase-mpesa' && regionMode !== 'kenya') return false;
      return true;
    });
    
    return tierModules.map((mod, index) => {
      const progress = getModuleProgress(mod.phaseId);
      const isUnlocked = isModuleUnlocked(index, tier);
      
      let lockedReason = undefined;
      if (!isUnlocked) {
        const previousModule = tierModules[index - 1];
        if (previousModule) {
          lockedReason = `Complete 80% of "${previousModule.title}"`;
        }
      }

      return {
        ...mod,
        progress,
        locked: !isUnlocked,
        lockedReason
      };
    });
  };

  return {
    completedLessons,
    getModuleProgress,
    isModuleUnlocked,
    getComputedModules
  };
}
