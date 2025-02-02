export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  explanation: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: number[];
  isComplete: boolean;
  streak: number;
  timePerQuestion: number[];
  categoryScores: { [key: string]: number };
}

export interface QuizData {
  questions: Question[];
  categories: Category[];
  title: string;
  description: string;
}