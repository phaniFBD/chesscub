export interface LessonContent {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  interactiveUrl?: string;
  durationMinutes: number;
  ageRange: AgeRange;
  orderIndex: number;
}

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  fen: string; // Chess position in Forsyth-Edwards Notation
  solution: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  type: 'fork' | 'pin' | 'skewer' | 'discovery' | 'mate' | 'endgame';
  ageRange: AgeRange;
}

export type AgeRange = '5-7' | '8-10' | '11-15' | 'all';

export interface Module {
  id: string;
  title: string;
  description: string;
  level: 'Pawn' | 'Knight' | 'Bishop' | 'Queen';
  category: 'tactics' | 'strategy' | 'endgames' | 'openings';
  lessons: LessonContent[];
  puzzles: Puzzle[];
  quizzes: Quiz[];
  badge: {
    name: string;
    imageUrl: string;
    description: string;
  };
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  timeLimit: number; // in minutes
  passingScore: number; // percentage
  ageRange: AgeRange;
}

export interface Question {
  id: string;
  text: string;
  imageUrl?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  puzzles: string[]; // Puzzle IDs
  questions: string[]; // Question IDs
  maxPoints: number;
}