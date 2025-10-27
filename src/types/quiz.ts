export interface Question {
  id: number;
  tema: string;
  pergunta: string;
  alternativas: string[];
  respostaCorreta: number;
  explicacao: string;
  explicacaoErro: { [key: string]: string };
}

export interface ShuffledQuestion extends Omit<Question, 'alternativas' | 'respostaCorreta'> {
  alternativas: string[];
  respostaCorreta: number;
  originalIndex: number;
  shuffleMap: number[]; // Maps shuffled index to original index
}

export interface Answer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  tema: string;
  timeTaken: number; // in seconds
}

export interface QuizState {
  questions: ShuffledQuestion[];
  currentIndex: number;
  answers: Answer[];
  isFinished: boolean;
  startTime: number;
}

export interface ThemeStats {
  [tema: string]: {
    correct: number;
    total: number;
  };
}

export type Screen = 'home' | 'quiz' | 'results';

