import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  duration: number; // em segundos
  onTimeUp: () => void;
  isActive: boolean;
}

export function Timer({ duration, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    setTimeLeft(duration);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onTimeUp, isActive]);

  const percentage = (timeLeft / duration) * 100;
  const isUrgent = timeLeft <= 5;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className={isUrgent ? 'text-red-500' : 'text-primary-500'}
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - percentage / 100)}`}
            strokeLinecap="round"
            animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: isUrgent ? Infinity : 0 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-bold ${isUrgent ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
            {timeLeft}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {isUrgent ? (
          <motion.span
            className="text-red-500 font-semibold"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            Tempo acabando!
          </motion.span>
        ) : (
          'segundos restantes'
        )}
      </div>
    </div>
  );
}

