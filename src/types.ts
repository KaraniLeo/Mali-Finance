/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';

export type Tier = 'junior' | 'teen' | 'pro' | 'parent';
export type View = 'dashboard' | 'learn' | 'tasks' | 'wallet' | 'achievements' | 'parental' | 'settings' | 'syllabus' | 'quiz' | 'games';

export interface User {
  id: string;
  name: string;
  dob: string;
  tier: Tier;
  balance: number;
  streak: number;
  parentId?: string;
  linkingCode?: string;
  linkedChildId?: string;
  achievements?: string[];
  totalLessonsCompleted?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Subtopic {
  id: string;
  title: string;
  content: string; // Markdown or rich text
  quiz: QuizQuestion[];
  game?: 'piggy' | 'budget' | 'market';
  tool?: 'risk' | 'budget' | 'savings';
}

export interface Syllabus {
  subtopics: Subtopic[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  locked?: boolean;
  lockedReason?: string;
  syllabus?: Syllabus;
  phaseId?: string; // Links to the modular curriculum system
}

export interface Task {
  id: string;
  user_id?: string;
  title: string;
  reward: number;
  category: 'chore' | 'learning' | 'financial' | 'hustle';
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

export interface GameScore {
  id: string;
  user_id: string;
  game_id: string;
  score: number;
  played_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  total_debt: number;
  created_at: string;
}

export interface WealthJar {
  id: string;
  wallet_id: string;
  name: string;
  target: number;
  balance: number;
  category: 'spend' | 'save' | 'invest' | 'give' | 'custom';
  created_at: string;
}

export interface BudgetRule {
  jarId: string;
  type: 'percentage' | 'fixed';
  value: number;
}

export interface Transaction {
  id: string;
  wallet_id: string;
  jar_id?: string;
  amount: number;
  type: 'credit' | 'debit';
  description?: string;
  created_at: string;
}

export interface Debt {
  id: string;
  wallet_id: string;
  name: string;
  total_amount: number;
  remaining_amount: number;
  due_date?: string;
  created_at: string;
}
