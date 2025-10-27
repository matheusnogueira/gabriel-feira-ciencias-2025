import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import type { ShuffledQuestion } from '../types/quiz';

interface QuestionProps {
  question: ShuffledQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedAnswer: number) => void;
  onNext: () => void;
}

export function Question({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;

    setSelectedAnswer(index);
    setHasAnswered(true);
    onAnswer(index);
  };

  const isCorrect = selectedAnswer === question.respostaCorreta;
  const isLastQuestion = questionNumber === totalQuestions;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Confetti ao acertar */}
      {hasAnswered && isCorrect && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {/* Tema da pergunta */}
      <div className="mb-4">
        <span className="inline-block px-4 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
          {question.tema}
        </span>
      </div>

      {/* Pergunta */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {question.pergunta}
        </h2>

        {/* Alternativas */}
        <div className="space-y-3">
          {question.alternativas.map((alternativa, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.respostaCorreta;
            const showAsCorrect = hasAnswered && isCorrectAnswer;
            const showAsWrong = hasAnswered && isSelected && !isCorrect;

            let buttonClass = 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600';

            if (showAsCorrect) {
              buttonClass = 'bg-green-100 dark:bg-green-900 border-2 border-green-500 dark:border-green-400';
            } else if (showAsWrong) {
              buttonClass = 'bg-red-100 dark:bg-red-900 border-2 border-red-500 dark:border-red-400';
            } else if (isSelected) {
              buttonClass = 'bg-primary-100 dark:bg-primary-900 border-2 border-primary-500';
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={hasAnswered}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${buttonClass} ${
                  hasAnswered ? 'cursor-default' : 'cursor-pointer'
                }`}
                whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                whileTap={!hasAnswered ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                      showAsCorrect
                        ? 'bg-green-500 text-white border-green-500'
                        : showAsWrong
                        ? 'bg-red-500 text-white border-red-500'
                        : isSelected
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500'
                    }`}
                  >
                    {showAsCorrect ? '✓' : showAsWrong ? '✗' : String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1 text-gray-800 dark:text-gray-200 font-medium">
                    {alternativa}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-lg p-6 mb-6 ${
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500'
                : 'bg-red-50 dark:bg-red-900/30 border-2 border-red-500'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {isCorrect ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3
                  className={`font-bold text-lg mb-2 ${
                    isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
                  }`}
                >
                  {isCorrect ? 'Parabéns! Resposta correta! 🎉' : 'Ops! Resposta incorreta 😕'}
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  {!isCorrect && selectedAnswer !== null && (
                    <p className="font-medium">
                      <strong>Por que está errado:</strong>{' '}
                      {question.explicacaoErro[question.shuffleMap[selectedAnswer]]}
                    </p>
                  )}
                  <p>
                    <strong>Explicação:</strong> {question.explicacao}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Próxima */}
      {hasAnswered && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onNext}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLastQuestion ? 'Ver Resultados' : 'Próxima Pergunta'} →
        </motion.button>
      )}
    </motion.div>
  );
}

