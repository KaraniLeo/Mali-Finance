import React from 'react';
import { create } from 'zustand';
import { Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Phase, Lesson, Module, Tier, LearningCard } from '../types';
import { modulesData } from '../data/modules';
import { allPhases } from '../data/curriculum';

interface CurriculumState {
  phases: Phase[];
  modules: Record<Tier, Module[]>;
  lessons: Record<string, Lesson[]>; // Keyed by phase_id
  cards: Record<string, LearningCard[]>; // Keyed by lesson_id
  achievements: any[]; // The global list of available achievements
  isLoading: boolean;
  isAdminLoading: boolean;
  error: string | null;

  fetchCurriculum: () => Promise<void>;
  fetchAllCurriculum: () => Promise<void>;
  fetchAchievements: () => Promise<void>;
  fetchPhaseDetails: (phaseId: string) => Promise<void>;
  fetchLessonCards: (lessonId: string) => Promise<void>;
  
  getPhaseById: (id: string) => Phase | undefined;

  // Admin Mutators
  createPhase: (phase: Partial<Phase>) => Promise<void>;
  updatePhase: (id: string, updates: Partial<Phase>) => Promise<void>;
  deletePhase: (id: string) => Promise<void>;

  createModule: (module: Partial<Module>) => Promise<void>;
  updateModule: (id: string, data: Partial<Module>) => Promise<void>;
  updateModuleOrder: (id1: string, order1: number, id2: string, order2: number) => Promise<void>;
  deleteModule: (id: string) => Promise<void>;

  createLesson: (phaseId: string, title: string, level: string) => Promise<void>;
  updateLesson: (id: string, title: string, level: string) => Promise<void>;
  deleteLesson: (id: string) => Promise<void>;

  createCard: (lessonId: string, card: Partial<LearningCard>) => Promise<void>;
  updateCard: (id: string, updates: Partial<LearningCard>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
}

// Helper to construct module icons
const getModuleIcon = (iconSvg: string | null, id: string): React.ReactNode => {
  if (iconSvg === '🐷' || id.startsWith('j')) {
    return React.createElement('div', { className: 'text-3xl' }, '🐷');
  }
  if (iconSvg === '📊' || id.startsWith('t')) {
    return React.createElement('div', { className: 'text-3xl' }, '📊');
  }
  return React.createElement(Globe, { className: 'text-brand-accent', size: 32 });
};

export const useCurriculumStore = create<CurriculumState>((set, get) => ({
  phases: [],
  modules: {
    parent: [],
    junior: [],
    teen: [],
    pro: []
  },
  lessons: {},
  cards: {},
  achievements: [],
  isLoading: false,
  isAdminLoading: false,
  error: null,

  fetchCurriculum: async () => {
    set({ isLoading: true, error: null });
    try {
      let modulesRes = await supabase.from('modules').select('*').order('order_index', { ascending: true });
      if (modulesRes.error) modulesRes = await supabase.from('modules').select('*'); // fallback
      let lessonsRes = await supabase.from('lessons').select('*').order('order_index', { ascending: true });
      if (lessonsRes.error) lessonsRes = await supabase.from('lessons').select('*'); // fallback
      let phasesRes = await supabase.from('phases').select('*').order('order_index', { ascending: true });
      if (phasesRes.error) phasesRes = await supabase.from('phases').select('*'); // fallback
        
      if (modulesRes.error) throw modulesRes.error;
      if (lessonsRes.error) throw lessonsRes.error;
      if (phasesRes.error) throw phasesRes.error;

      // Group modules by tier, starting with static modulesData so they are always available
      const groupedModules: Record<Tier, Module[]> = {
        parent: [...modulesData.parent],
        junior: [...modulesData.junior],
        teen: [...modulesData.teen],
        pro: [...modulesData.pro]
      };

      modulesRes.data?.forEach(m => {
        const tier = m.tier as Tier;
        if (groupedModules[tier]) {
          const existing = groupedModules[tier].find(mod => mod.id === m.id);
          if (existing) {
            const isStaticPhase = allPhases.some(sp => sp.id === m.phase_id);
            if (!isStaticPhase) {
              existing.title = m.title;
              existing.description = m.description;
            }
            existing.phaseId = m.phase_id;
          } else {
            groupedModules[tier].push({
              id: m.id,
              title: m.title,
              description: m.description,
              progress: 0,
              icon: getModuleIcon(m.icon_svg, m.id), 
              phaseId: m.phase_id
            } as Module);
          }
        }
      });

      // Group lessons by phase_id
      const groupedLessons: Record<string, Lesson[]> = {};
      lessonsRes.data?.forEach(l => {
        if (!groupedLessons[l.phase_id]) groupedLessons[l.phase_id] = [];
        groupedLessons[l.phase_id].push({
          id: l.id,
          phaseId: l.phase_id,
          title: l.title,
          level: l.level
        } as Lesson);
      });

      // Merge static phases into phases list
      const mergedPhases = [...(phasesRes.data || [])];
      allPhases.forEach(sp => {
        if (!mergedPhases.some(p => p.id === sp.id)) {
          mergedPhases.push({
            id: sp.id,
            title: sp.title,
            description: sp.description
          });
        } else {
          // Update details of static phases in list
          const existingPhase = mergedPhases.find(p => p.id === sp.id);
          if (existingPhase) {
            existingPhase.title = sp.title;
            existingPhase.description = sp.description;
          }
        }
      });

      // Merge static lessons
      const mergedLessons = { ...groupedLessons };
      allPhases.forEach(sp => {
        // ALWAYS overwrite with the latest static lessons to incorporate overhauls and extra lessons (e.g. wallet tutorial)
        mergedLessons[sp.id] = sp.lessons.map(l => ({
          id: l.id,
          phaseId: sp.id,
          title: l.title,
          level: l.level as any
        }));
      });

      set({ phases: mergedPhases, modules: groupedModules, lessons: mergedLessons, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchAllCurriculum: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      // Fetch everything for Admin
      let modulesRes = await supabase.from('modules').select('*').order('order_index', { ascending: true });
      if (modulesRes.error) modulesRes = await supabase.from('modules').select('*');
      let phasesRes = await supabase.from('phases').select('*').order('order_index', { ascending: true });
      if (phasesRes.error) phasesRes = await supabase.from('phases').select('*');
      let lessonsRes = await supabase.from('lessons').select('*').order('order_index', { ascending: true });
      if (lessonsRes.error) lessonsRes = await supabase.from('lessons').select('*');
      let cardsRes = await supabase.from('learning_cards').select('*').order('order_index', { ascending: true });
      if (cardsRes.error) cardsRes = await supabase.from('learning_cards').select('*');

      if (modulesRes.error) throw modulesRes.error;
      if (phasesRes.error) throw phasesRes.error;
      if (lessonsRes.error) throw lessonsRes.error;
      if (cardsRes.error) throw cardsRes.error;

      // Group modules by tier
      const groupedModules: Record<Tier, Module[]> = { parent: [], junior: [], teen: [], pro: [] };
      modulesRes.data?.forEach(m => {
        const tier = m.tier as Tier;
        if (groupedModules[tier]) {
          groupedModules[tier].push({
            id: m.id,
            title: m.title,
            description: m.description,
            progress: 0,
            icon: getModuleIcon(m.icon_svg, m.id), 
            phaseId: m.phase_id
          } as Module);
        }
      });

      // Group lessons by phase_id
      const groupedLessons: Record<string, Lesson[]> = {};
      lessonsRes.data?.forEach(l => {
        if (!groupedLessons[l.phase_id]) groupedLessons[l.phase_id] = [];
        groupedLessons[l.phase_id].push({
          id: l.id,
          phaseId: l.phase_id,
          title: l.title,
          level: l.level
        } as Lesson);
      });

      // Group cards by lesson_id
      const groupedCards: Record<string, LearningCard[]> = {};
      cardsRes.data?.forEach(c => {
        if (!groupedCards[c.lesson_id]) groupedCards[c.lesson_id] = [];
        groupedCards[c.lesson_id].push({
          id: c.id,
          lessonId: c.lesson_id,
          type: c.type,
          title: c.title,
          content: c.content,
          imageKey: c.image_key,
          options: c.options && typeof c.options === 'string' ? JSON.parse(c.options) : c.options,
          correctAnswer: c.correct_answer,
          tool: c.tool,
          toolProps: c.tool_props && typeof c.tool_props === 'string' ? JSON.parse(c.tool_props) : c.tool_props,
          orderIndex: c.order_index
        });
      });

      set({ 
        phases: phasesRes.data || [],
        modules: groupedModules,
        lessons: groupedLessons,
        cards: groupedCards,
        isAdminLoading: false 
      });
    } catch (err: any) {
      set({ error: err.message, isAdminLoading: false });
    }
  },

  fetchAchievements: async () => {
    try {
      const { data, error } = await supabase.from('achievements').select('*');
      if (error) throw error;
      if (data) {
        set({ achievements: data });
      }
    } catch (err: any) {
      console.error('Failed to fetch achievements:', err.message);
    }
  },

  fetchPhaseDetails: async (phaseId: string) => {
    try {
      // 1. Fetch Phase if not exists
      const currentPhases = get().phases;
      let phase = currentPhases.find(p => p.id === phaseId);
      
      if (!phase) {
        const staticPhase = allPhases.find(p => p.id === phaseId);
        if (staticPhase) {
          phase = {
            id: staticPhase.id,
            title: staticPhase.title,
            description: staticPhase.description,
            lessons: []
          };
          set({ phases: [...currentPhases, phase] });
        } else {
          const { data: phaseData, error: phaseError } = await supabase
            .from('phases')
            .select('*')
            .eq('id', phaseId)
            .single();
            
          if (phaseError) throw phaseError;
          if (phaseData) {
            phase = {
              id: phaseData.id,
              title: phaseData.title,
              description: phaseData.description,
              lessons: [] // placeholder
            };
            set({ phases: [...currentPhases, phase] });
          }
        }
      }

      // 2. Fetch Lessons for this phase
      if (!get().lessons[phaseId]) {
        const staticPhase = allPhases.find(p => p.id === phaseId);
        if (staticPhase) {
          const formattedLessons = staticPhase.lessons.map(l => ({
            id: l.id,
            phaseId: phaseId,
            title: l.title,
            level: l.level as any,
            cards: (l.cards || []).map((card, cardIndex) => ({
              id: card.id,
              lessonId: l.id,
              type: card.type as any,
              title: card.title,
              content: card.content,
              imageKey: card.imageKey,
              options: card.options,
              correctAnswer: card.correctAnswer as any,
              tool: card.tool,
              toolProps: card.toolProps,
              orderIndex: card.orderIndex ?? cardIndex
            }))
          }));
          set((state) => ({ lessons: { ...state.lessons, [phaseId]: formattedLessons } }));
        } else {
          const { data: lessonsData, error: lessonsError } = await supabase
            .from('lessons')
            .select('*')
            .eq('phase_id', phaseId);
            
          if (lessonsError) throw lessonsError;
          
          if (lessonsData) {
            const formattedLessons = lessonsData.map(l => ({
              id: l.id,
              phaseId: l.phase_id,
              title: l.title,
              level: l.level as any,
              cards: [] // Will fetch later
            }));
            set((state) => ({ lessons: { ...state.lessons, [phaseId]: formattedLessons } }));
          }
        }
      }
    } catch (err: any) {
      console.error('Failed to fetch phase details:', err.message);
    }
  },

  fetchLessonCards: async (lessonId: string) => {
    if (get().cards[lessonId]) return; // Already fetched

    // Check if cards exist statically
    let foundCards: any[] | undefined = undefined;
    for (const phase of allPhases) {
      const lesson = phase.lessons.find(l => l.id === lessonId);
      if (lesson) {
        foundCards = lesson.cards;
        break;
      }
    }

    if (foundCards) {
      const mappedCards = foundCards.map((card, cardIndex) => ({
        id: card.id,
        lessonId: lessonId,
        type: card.type as any,
        title: card.title,
        content: card.content,
        imageKey: card.imageKey,
        options: card.options,
        correctAnswer: card.correctAnswer as any,
        tool: card.tool,
        toolProps: card.toolProps,
        orderIndex: card.orderIndex ?? cardIndex
      }));
      set((state) => ({
        cards: { ...state.cards, [lessonId]: mappedCards }
      }));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('learning_cards')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('order_index', { ascending: true });

      if (error) throw error;

      if (data) {
        const formattedCards: LearningCard[] = data.map((c: any) => ({
          id: c.id,
          lessonId: c.lesson_id,
          type: c.type,
          title: c.title,
          content: c.content,
          imageKey: c.image_key,
          options: c.options && typeof c.options === 'string' ? JSON.parse(c.options) : c.options,
          correctAnswer: c.correct_answer,
          tool: c.tool,
          toolProps: c.tool_props && typeof c.tool_props === 'string' ? JSON.parse(c.tool_props) : c.tool_props,
          orderIndex: c.order_index
        }));

        set((state) => ({ 
          cards: { ...state.cards, [lessonId]: formattedCards }
        }));
      }
    } catch (err: any) {
      console.error('Failed to fetch lesson cards:', err.message);
    }
  },
  
  getPhaseById: (id: string) => {
    const dbPhase = get().phases.find(p => p.id === id);
    if (dbPhase) return dbPhase;
    const staticPhase = allPhases.find(p => p.id === id);
    if (staticPhase) {
      return {
        id: staticPhase.id,
        title: staticPhase.title,
        description: staticPhase.description,
        lessons: staticPhase.lessons.map(l => ({
          id: l.id,
          phaseId: staticPhase.id,
          title: l.title,
          level: l.level as any,
          cards: (l.cards || []).map((card, cardIndex) => ({
            id: card.id,
            lessonId: l.id,
            type: card.type as any,
            title: card.title,
            content: card.content,
            imageKey: card.imageKey,
            options: card.options,
            correctAnswer: card.correctAnswer as any,
            tool: card.tool,
            toolProps: card.toolProps,
            orderIndex: card.orderIndex ?? cardIndex
          }))
        }))
      };
    }
    return undefined;
  },

  // Admin Mutators
  createPhase: async (phase) => {
    const newPhase = { id: phase.id || Date.now().toString(), title: phase.title, description: phase.description };
    const { error } = await supabase.from('phases').insert(newPhase);
    if (!error) get().fetchCurriculum();
  },
  updatePhase: async (id, updates) => {
    const { error } = await supabase.from('phases').update(updates).eq('id', id);
    if (!error) get().fetchCurriculum();
  },
  deletePhase: async (id) => {
    const { error } = await supabase.from('phases').delete().eq('id', id);
    if (!error) get().fetchCurriculum();
  },

  createModule: async (module) => {
    const newModule = { 
      id: module.id || Date.now().toString(), 
      title: module.title, 
      description: module.description, 
      tier: 'teen', // Default
      phase_id: module.phaseId,
      icon_svg: module.icon
    };
    const { error } = await supabase.from('modules').insert(newModule);
    if (!error) get().fetchCurriculum();
  },
  updateModule: async (id, updates) => {
    const mappedUpdates = {
      title: updates.title,
      description: updates.description,
      tier: 'teen', // TODO: support dynamic tier
      phase_id: updates.phaseId,
      icon_svg: updates.icon
    };
    const { error } = await supabase.from('modules').update(mappedUpdates).eq('id', id);
    if (!error) get().fetchCurriculum();
  },
  updateModuleOrder: async (id1, order1, id2, order2) => {
    try {
      const res1 = await supabase.from('modules').update({ order_index: order1 }).eq('id', id1);
      const res2 = await supabase.from('modules').update({ order_index: order2 }).eq('id', id2);
      if (res1.error) throw res1.error;
      if (res2.error) throw res2.error;
      get().fetchAllCurriculum();
    } catch (err: any) {
      set({ error: err.message });
    }
  },
  deleteModule: async (id) => {
    const { error } = await supabase.from('modules').delete().eq('id', id);
    if (!error) get().fetchCurriculum();
  },

  createLesson: async (phaseId, title, level) => {
    const { error } = await supabase.from('lessons').insert({
      id: Date.now().toString(), phase_id: phaseId, title, level
    });
    if (!error) get().fetchPhaseDetails(phaseId);
  },
  updateLesson: async (id, title, level) => {
    const { error } = await supabase.from('lessons').update({ title, level }).eq('id', id);
  },
  deleteLesson: async (id) => {
    const { error } = await supabase.from('lessons').delete().eq('id', id);
  },

  createCard: async (lessonId, card) => {
    const { error } = await supabase.from('learning_cards').insert({
      id: Date.now().toString(),
      lesson_id: lessonId,
      type: card.type,
      title: card.title,
      content: card.content,
      image_key: card.imageKey,
      options: card.options ? JSON.stringify(card.options) : null,
      correct_answer: card.correctAnswer,
      tool: card.tool,
      tool_props: card.toolProps ? JSON.stringify(card.toolProps) : null,
      order_index: Date.now()
    });
    if (!error) get().fetchLessonCards(lessonId);
  },
  updateCard: async (id, updates) => {
    const mappedUpdates: any = {
      type: updates.type,
      title: updates.title,
      content: updates.content,
      image_key: updates.imageKey,
      correct_answer: updates.correctAnswer,
      tool: updates.tool
    };
    if (updates.options !== undefined) mappedUpdates.options = updates.options ? JSON.stringify(updates.options) : null;
    if (updates.toolProps !== undefined) mappedUpdates.tool_props = updates.toolProps ? JSON.stringify(updates.toolProps) : null;

    const { error } = await supabase.from('learning_cards').update(mappedUpdates).eq('id', id);
  },
  deleteCard: async (id) => {
    const { error } = await supabase.from('learning_cards').delete().eq('id', id);
  }
}));
