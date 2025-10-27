import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import type { Answer } from '../types/quiz';
import { calculateScore, calculatePercentage, getMotivationalMessage, calculateThemeStats } from '../utils/scoring';
import { ShareButton } from './ShareButton';
import { Certificate } from './Certificate';

interface ResultsScreenProps {
  answers: Answer[];
  onRestart: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function ResultsScreen({ answers, onRestart, isDark, onToggleTheme }: ResultsScreenProps) {
  const [showCertificate, setShowCertificate] = useState(false);

  const score = calculateScore(answers);
  const total = answers.length;
  const percentage = calculatePercentage(score, total);
  const message = getMotivationalMessage(percentage);
  const themeStats = calculateThemeStats(answers);
  
  const showConfetti = percentage >= 70;
  const canGetCertificate = percentage >= 70;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* Toggle Theme */}
      <motion.button
        onClick={onToggleTheme}
        className="fixed top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? (
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </motion.button>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="text-8xl">
                {percentage >= 90 ? '🏆' : percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '💪'}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4"
            >
              Quiz Concluído!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-6"
            >
              {message}
            </motion.p>
          </div>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-xl p-8 mb-8 text-center"
          >
            <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 mb-2">
              {score}/{total}
            </div>
            <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
              {percentage}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              de aproveitamento
            </div>
          </motion.div>

          {/* Stats por Tema */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              📊 Desempenho por Tema
            </h2>
            <div className="space-y-3">
              {Object.entries(themeStats).map(([tema, stats], index) => {
                const themePercentage = Math.round((stats.correct / stats.total) * 100);
                return (
                  <motion.div
                    key={tema}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-800 dark:text-white">{tema}</span>
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {stats.correct}/{stats.total} ({themePercentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          themePercentage >= 80
                            ? 'bg-green-500'
                            : themePercentage >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${themePercentage}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Ações */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            {/* Botão Refazer */}
            <motion.button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🔄 Refazer Quiz
            </motion.button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Botão Compartilhar */}
              <ShareButton score={score} total={total} />

              {/* Botão Certificado */}
              {canGetCertificate && (
                <motion.button
                  onClick={() => setShowCertificate(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  <span>Gerar Certificado</span>
                </motion.button>
              )}
            </div>

            {!canGetCertificate && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                💡 Dica: Obtenha 70% ou mais para gerar um certificado!
              </p>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400"
          >
            <p>Feira de Ciências 2025 | Colégio Pense Makenzie</p>
            <p className="mt-1">7º ano 2025 | Data de apresentação: 01/02/2025</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <Certificate
          score={score}
          total={total}
          percentage={percentage}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}

