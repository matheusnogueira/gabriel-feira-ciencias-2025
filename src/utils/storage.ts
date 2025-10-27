/**
 * Utilitários para trabalhar com localStorage
 */

const THEME_KEY = 'quiz-theme-preference';
const HIGH_SCORE_KEY = 'quiz-high-score';

export function saveThemePreference(isDark: boolean): void {
  try {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  } catch (error) {
    console.error('Erro ao salvar preferência de tema:', error);
  }
}

export function getThemePreference(): boolean {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      return saved === 'dark';
    }
    // Default: verifica preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (error) {
    console.error('Erro ao carregar preferência de tema:', error);
    return false;
  }
}

export function saveHighScore(score: number, total: number): void {
  try {
    const percentage = Math.round((score / total) * 100);
    const currentHighScore = getHighScore();
    
    if (percentage > currentHighScore) {
      localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify({
        score,
        total,
        percentage,
        date: new Date().toISOString(),
      }));
    }
  } catch (error) {
    console.error('Erro ao salvar recorde:', error);
  }
}

export function getHighScore(): number {
  try {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      return data.percentage || 0;
    }
  } catch (error) {
    console.error('Erro ao carregar recorde:', error);
  }
  return 0;
}

