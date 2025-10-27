import { useState, useCallback } from 'react';
import type { QuizState, Answer, ShuffledQuestion } from '../types/quiz';
import { shuffleQuestions } from '../utils/shuffle';
import questionsData from '../data/perguntas.json';

export function useQuiz() {
  const [quizState, setQuizState] = useState<QuizState>(() => ({
    questions: [],
    currentIndex: 0,
    answers: [],
    isFinished: false,
    startTime: 0,
  }));

  const startQuiz = useCallback(() => {
    const shuffled = shuffleQuestions(questionsData);
    setQuizState({
      questions: shuffled,
      currentIndex: 0,
      answers: [],
      isFinished: false,
      startTime: Date.now(),
    });
  }, []);

  const submitAnswer = useCallback((selectedAnswer: number, timeTaken: number) => {
    setQuizState(prev => {
      const currentQuestion = prev.questions[prev.currentIndex];
      const isCorrect = selectedAnswer === currentQuestion.respostaCorreta;

      const answer: Answer = {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect,
        tema: currentQuestion.tema,
        timeTaken,
      };

      const newAnswers = [...prev.answers, answer];
      const isLastQuestion = prev.currentIndex === prev.questions.length - 1;

      return {
        ...prev,
        answers: newAnswers,
        isFinished: isLastQuestion,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
    }));
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizState({
      questions: [],
      currentIndex: 0,
      answers: [],
      isFinished: false,
      startTime: 0,
    });
  }, []);

  const getCurrentQuestion = (): ShuffledQuestion | null => {
    if (quizState.questions.length === 0 || quizState.currentIndex >= quizState.questions.length) {
      return null;
    }
    return quizState.questions[quizState.currentIndex];
  };

  const getProgress = () => {
    return {
      current: quizState.currentIndex + 1,
      total: quizState.questions.length,
      percentage: quizState.questions.length === 0 
        ? 0 
        : ((quizState.currentIndex + 1) / quizState.questions.length) * 100,
    };
  };

  return {
    quizState,
    startQuiz,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    getCurrentQuestion,
    getProgress,
  };
}

