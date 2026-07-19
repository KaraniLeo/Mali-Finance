import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

export interface CoachingNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  reward: number;
  progress: number;
  target: number;
  status: 'active' | 'completed' | 'failed';
  assignedAt: string;
}

export interface CustomScores {
  healthScore: number;
  accountabilityScore: number;
  trustScore: number;
}

interface ParentCoachingState {
  notes: Record<string, CoachingNote[]>;
  challenges: Record<string, Challenge[]>;
  heatMap: Record<string, Record<string, 'green' | 'amber' | 'red'>>;
  customScores: Record<string, CustomScores>;
  
  // Global active state for parent navigation
  selectedChildId: string | null;
  childrenData: User[];
  
  // Actions
  setSelectedChildId: (id: string | null) => void;
  setChildrenData: (data: User[]) => void;
  addNote: (childId: string, text: string) => void;
  deleteNote: (childId: string, noteId: string) => void;
  assignChallenge: (childId: string, challenge: Omit<Challenge, 'id' | 'assignedAt'>) => void;
  toggleChallengeStatus: (childId: string, challengeId: string, status: 'active' | 'completed' | 'failed') => void;
  updateChallengeProgress: (childId: string, challengeId: string, progress: number) => void;
  initializeChildIfNeeded: (childId: string, name: string) => void;
  updateScores: (childId: string, health: number, accountability: number, trust: number) => void;
}

const generateHeatMap = (name: string) => {
  const map: Record<string, 'green' | 'amber' | 'red'> = {};
  const today = new Date();
  const isJunior = name.toLowerCase().includes('junior');
  const isPro = name.toLowerCase().includes('pro');
  
  for (let i = 0; i < 45; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Deterministic selection based on characters to have consistency on re-seeds
    const seedVal = date.getDate() + name.charCodeAt(0 % name.length) + i;
    const val = seedVal % 10;
    
    if (isJunior) {
      if (val < 3) map[dateStr] = 'red';
      else if (val < 6) map[dateStr] = 'amber';
      else map[dateStr] = 'green';
    } else if (isPro) {
      if (val < 1) map[dateStr] = 'red';
      else if (val < 4) map[dateStr] = 'amber';
      else map[dateStr] = 'green';
    } else { // Teen
      if (val < 1) map[dateStr] = 'red';
      else if (val < 3) map[dateStr] = 'amber';
      else map[dateStr] = 'green';
    }
  }
  return map;
};

const generateDefaultChallenges = (name: string): Challenge[] => {
  const isJunior = name.toLowerCase().includes('junior');
  return [
    {
      id: 'ch-1',
      title: isJunior ? 'Save KES 200 Daily' : 'Save KES 500 Daily',
      reward: isJunior ? 1000 : 2500,
      progress: 5,
      target: 5,
      status: 'completed',
      assignedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString()
    },
    {
      id: 'ch-2',
      title: 'No Takeout Week',
      reward: 1500,
      progress: 4,
      target: 7,
      status: 'active',
      assignedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
    },
    {
      id: 'ch-3',
      title: 'Zero Impulse Purchases',
      reward: 1000,
      progress: 3,
      target: 3,
      status: 'completed',
      assignedAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString()
    },
    {
      id: 'ch-4',
      title: 'Spend Under KES 2,000 This Weekend',
      reward: 500,
      progress: 0,
      target: 1,
      status: isJunior ? 'failed' : 'active',
      assignedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString()
    }
  ];
};

const generateDefaultNotes = (name: string): CoachingNote[] => {
  return [
    {
      id: 'n-1',
      text: `Had our monthly budget review with ${name}. Discussed separating needs from wants, focusing on entertainment subscriptions.`,
      createdAt: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString()
    },
    {
      id: 'n-2',
      text: 'Assigned the "Zero Impulse Purchases" challenge. User is showing great discipline logging daily food/transport expenses.',
      createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString()
    }
  ];
};

const generateDefaultScores = (name: string): CustomScores => {
  const isJunior = name.toLowerCase().includes('junior');
  const isPro = name.toLowerCase().includes('pro');
  if (isJunior) {
    return { healthScore: 68, accountabilityScore: 54, trustScore: 60 };
  } else if (isPro) {
    return { healthScore: 82, accountabilityScore: 78, trustScore: 85 };
  } else { // Teen
    return { healthScore: 87, accountabilityScore: 92, trustScore: 89 };
  }
};

export const useParentCoachingStore = create<ParentCoachingState>()(
  persist(
    (set, get) => ({
      notes: {},
      challenges: {},
      heatMap: {},
      customScores: {},
      selectedChildId: null,
      childrenData: [],

      setSelectedChildId: (selectedChildId) => set({ selectedChildId }),
      setChildrenData: (childrenData) => set({ childrenData }),

      initializeChildIfNeeded: (childId: string, name: string) => {
        const state = get();
        
        // Check if data already exists for this child
        if (state.customScores[childId]) return;

        set((prev) => ({
          customScores: {
            ...prev.customScores,
            [childId]: generateDefaultScores(name)
          },
          notes: {
            ...prev.notes,
            [childId]: generateDefaultNotes(name)
          },
          challenges: {
            ...prev.challenges,
            [childId]: generateDefaultChallenges(name)
          },
          heatMap: {
            ...prev.heatMap,
            [childId]: generateHeatMap(name)
          }
        }));
      },

      addNote: (childId: string, text: string) => {
        set((prev) => {
          const currentNotes = prev.notes[childId] || [];
          const newNote: CoachingNote = {
            id: 'n-' + Date.now(),
            text,
            createdAt: new Date().toISOString()
          };
          return {
            notes: {
              ...prev.notes,
              [childId]: [newNote, ...currentNotes]
            }
          };
        });
      },

      deleteNote: (childId: string, noteId: string) => {
        set((prev) => {
          const currentNotes = prev.notes[childId] || [];
          return {
            notes: {
              ...prev.notes,
              [childId]: currentNotes.filter(n => n.id !== noteId)
            }
          };
        });
      },

      assignChallenge: (childId: string, challenge: Omit<Challenge, 'id' | 'assignedAt'>) => {
        set((prev) => {
          const currentChallenges = prev.challenges[childId] || [];
          const newCh: Challenge = {
            ...challenge,
            id: 'ch-' + Date.now(),
            assignedAt: new Date().toISOString()
          };
          return {
            challenges: {
              ...prev.challenges,
              [childId]: [newCh, ...currentChallenges]
            }
          };
        });
      },

      toggleChallengeStatus: (childId: string, challengeId: string, status: 'active' | 'completed' | 'failed') => {
        set((prev) => {
          const currentChallenges = prev.challenges[childId] || [];
          const updated = currentChallenges.map(c => {
            if (c.id === challengeId) {
              const newProgress = status === 'completed' ? c.target : (status === 'failed' ? 0 : c.progress);
              return { ...c, status, progress: newProgress };
            }
            return c;
          });
          return {
            challenges: {
              ...prev.challenges,
              [childId]: updated
            }
          };
        });
      },

      updateChallengeProgress: (childId: string, challengeId: string, progress: number) => {
        set((prev) => {
          const currentChallenges = prev.challenges[childId] || [];
          const updated = currentChallenges.map(c => {
            if (c.id === challengeId) {
              const status = progress >= c.target ? 'completed' : c.status;
              return { ...c, progress, status };
            }
            return c;
          });
          return {
            challenges: {
              ...prev.challenges,
              [childId]: updated
            }
          };
        });
      },

      updateScores: (childId: string, health: number, accountability: number, trust: number) => {
        set((prev) => ({
          customScores: {
            ...prev.customScores,
            [childId]: { healthScore: health, accountabilityScore: accountability, trustScore: trust }
          }
        }));
      }
    }),
    {
      name: 'mali-parent-coaching-storage',
      partialize: (state) => ({
        notes: state.notes,
        challenges: state.challenges,
        heatMap: state.heatMap,
        customScores: state.customScores,
        selectedChildId: state.selectedChildId
      })
    }
  )
);
