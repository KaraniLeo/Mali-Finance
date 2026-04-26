/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tier = 'junior' | 'teen' | 'pro';
export type View = 'dashboard' | 'learn' | 'tasks' | 'wallet' | 'achievements' | 'parental' | 'settings';

export interface User {
  name: string;
  dob: string;
  tier: Tier;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  locked?: boolean;
}

export interface Task {
  id: string;
  title: string;
  reward: number;
  category: 'chore' | 'learning' | 'financial';
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}
