/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';

export type Tier = 'junior' | 'teen' | 'pro' | 'parent';
export type View = 'dashboard' | 'learn' | 'tasks' | 'wallet' | 'achievements' | 'chat' | 'parental' | 'settings' | 'syllabus' | 'quiz' | 'games' | 'admin';

export interface ChatConversation {
  id: string;
  user_id: string;
  title: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
  message_count?: number;
}

export interface ChatMessage {
  id?: string;
  conversation_id?: string;
  role: 'user' | 'bot';
  text: string;
  created_at?: string;
}

export interface User {
  id: string;
  name: string;
  dob: string;
  tier: Tier;
  country?: 'kenya' | 'international';
  balance: number;
  streak: number;
  parentId?: string;
  linkingCode?: string;
  linkedChildId?: string;
  spentAlerts?: boolean;
  autoAllowance?: number;
  spendingLimit?: number;
  achievements?: string[];
  totalLessonsCompleted?: number;
  isAdmin?: boolean;
  chatbotPaid?: boolean;
  chatCount?: number;
  created_at?: string;
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
  orderIndex?: number;
}

export interface Task {
  id: string;
  user_id?: string;
  title: string;
  reward: number;
  category: 'chore' | 'learning' | 'financial' | 'hustle';
  completed: boolean;
  created_at?: string;
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
  icon?: string;
  color?: string;
  target: number;
  balance: number;
  category: string;
  order?: number;
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

export interface Phase {
  id: string;
  title: string;
  description: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  phaseId: string;
  title: string;
  level: Tier;
  cards?: LearningCard[];
}

export interface LearningCard {
  id: string;
  lessonId: string;
  type: 'concept' | 'insight' | 'example' | 'exercise' | 'warning';
  title: string;
  content: string;
  imageKey?: string;
  options?: string[];
  correctAnswer?: string;
  tool?: 'risk' | 'budget' | 'savings' | 'market' | 'dynamic';
  toolProps?: any;
  orderIndex: number;
}

export interface ChallengeDB {
  id: string;
  parent_id: string;
  child_id: string;
  title: string;
  duration_days: number;
  reward_amount: number;
  progress: number;
  target: number;
  status: 'active' | 'pending_approval' | 'completed' | 'failed';
  created_at: string;
  assigned_at: string;
}
