import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from './Question';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';
import type { ShuffledQuestion } from '../types/quiz';

interface QuizScreenProps {
  currentQuestion: ShuffledQuestion | null;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedAnswer: number, timeTaken: number) => void;
  onNext: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  playCorrectSound: () => void;
  playErrorSound: () => void;
}

export function QuizScreen({
  currentQuestion,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  isDark,
  onToggleTheme,
  playCorrectSound,
  playErrorSound,
}: QuizScreenProps) {
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [timerEnabled, setTimerEnabled] = useState(true);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setHasAnswered(false);
    setTimerActive(true);
  }, [currentQuestion?.id]);

  const handleAnswer = useCallback(
    (selectedAnswer: number) => {
      if (hasAnswered) return;

      const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
      setHasAnswered(true);
      setTimerActive(false);

      // Toca som apropriado
      if (currentQuestion && selectedAnswer === currentQuestion.respostaCorreta) {
        playCorrectSound();
      } else {
        playErrorSound();
      }

      onAnswer(selectedAnswer, timeTaken);
    },
    [hasAnswered, questionStartTime, currentQuestion, onAnswer, playCorrectSound, playErrorSound]
  );

  const handleTimeUp = useCallback(() => {
    if (!hasAnswered && currentQuestion) {
      // Tempo esgotado - conta como erro (responde com índice -1)
      handleAnswer(-1);
    }
  }, [hasAnswered, currentQuestion, handleAnswer]);

  const handleNext = useCallback(() => {
    onNext();
  }, [onNext]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Quiz de Saúde
          </h1>

          <div className="flex items-center gap-4">
            {/* Toggle Timer */}
            <button
              onClick={() => setTimerEnabled(!timerEnabled)}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
              title={timerEnabled ? 'Desativar timer' : 'Ativar timer'}
            >
              {timerEnabled ? (
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>

            {/* Toggle Theme */}
            <motion.button
              onClick={onToggleTheme}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar current={questionNumber} total={totalQuestions} />

        {/* Timer */}
        {timerEnabled && (
          <div className="mt-6 flex justify-center">
            <Timer duration={30} onTimeUp={handleTimeUp} isActive={timerActive} />
          </div>
        )}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <Question
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </AnimatePresence>
    </div>
  );
}

