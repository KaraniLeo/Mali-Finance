export type CardType = "concept" | "example" | "exercise" | "insight" | "warning";

export type CardLevel = "beginner" | "intermediate" | "pro";

export type LearningCard = {
  id: string;
  type: CardType;
  level?: CardLevel; // Made optional temporarily so existing data doesn't break instantly
  title: string;
  content: string;
  image?: string; // Legacy image field
  imageUrl?: string; // Legacy
  imagePrompt?: string; // Legacy
  imageKey?: string; // Mapping key for local educational images
  progressXP?: number;
  tool?: 'risk' | 'budget' | 'savings' | 'market' | 'dynamic';
  toolProps?: any; 
  options?: string[]; // For exercises
  correctAnswer?: string | number; // For exercises
};

export type LessonLevel = "beginner" | "intermediate" | "advanced" | "pro";

export interface Lesson {
  id: string;
  title: string;
  level?: LessonLevel;
  explanation?: string;
  subtopics?: any;
  insights?: any;
  cards?: LearningCard[];
  [key: string]: any;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export type AchievementTrigger =
  | "FIRST_SAVE"
  | "TASK_COMPLETED"
  | "LESSON_COMPLETED"
  | "FIRST_INVESTMENT"
  | "STREAK_7"
  | "WEALTH_GUIDE_CHAT";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  trigger: AchievementTrigger;
  icon?: string;
}
