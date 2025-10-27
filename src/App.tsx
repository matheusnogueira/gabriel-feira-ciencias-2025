import { useState, useCallback, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { useQuiz } from './hooks/useQuiz';
import { useTheme } from './hooks/useTheme';
import { useSound } from './hooks/useSound';
import type { Screen } from './types/quiz';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const { quizState, startQuiz, submitAnswer, nextQuestion, resetQuiz, getCurrentQuestion, getProgress } = useQuiz();
  const { isDark, toggleTheme } = useTheme();
  const { playCorrectSound, playErrorSound } = useSound();

  // Quando o quiz termina, vai para tela de resultados
  useEffect(() => {
    if (quizState.isFinished && quizState.answers.length > 0) {
      setCurrentScreen('results');
    }
  }, [quizState.isFinished, quizState.answers.length]);

  const handleStart = useCallback(() => {
    startQuiz();
    setCurrentScreen('quiz');
  }, [startQuiz]);

  const handleAnswer = useCallback(
    (selectedAnswer: number, timeTaken: number) => {
      submitAnswer(selectedAnswer, timeTaken);
    },
    [submitAnswer]
  );

  const handleNext = useCallback(() => {
    if (quizState.isFinished) {
      setCurrentScreen('results');
    } else {
      nextQuestion();
    }
  }, [nextQuestion, quizState.isFinished]);

  const handleRestart = useCallback(() => {
    resetQuiz();
    setCurrentScreen('home');
  }, [resetQuiz]);

  return (
    <div className="min-h-screen">
      {currentScreen === 'home' && (
        <HomeScreen onStart={handleStart} isDark={isDark} onToggleTheme={toggleTheme} />
      )}

      {currentScreen === 'quiz' && (
        <QuizScreen
          currentQuestion={getCurrentQuestion()}
          questionNumber={getProgress().current}
          totalQuestions={getProgress().total}
          onAnswer={handleAnswer}
          onNext={handleNext}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          playCorrectSound={playCorrectSound}
          playErrorSound={playErrorSound}
        />
      )}

      {currentScreen === 'results' && (
        <ResultsScreen
          answers={quizState.answers}
          onRestart={handleRestart}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}

export default App;
