import type { Answer, ThemeStats } from '../types/quiz';

/**
 * Calcula a pontuação total
 */
export function calculateScore(answers: Answer[]): number {
  return answers.filter(answer => answer.isCorrect).length;
}

/**
 * Calcula o percentual de acertos
 */
export function calculatePercentage(score: number, total: number): number {
  return total === 0 ? 0 : Math.round((score / total) * 100);
}

/**
 * Retorna uma mensagem motivacional baseada no desempenho
 */
export function getMotivationalMessage(percentage: number): string {
  if (percentage >= 90) {
    return 'Excelente! Você é um expert em saúde! 🎉';
  } else if (percentage >= 70) {
    return 'Muito bom! Continue estudando! 👏';
  } else if (percentage >= 50) {
    return 'Bom trabalho! Revise alguns temas. 📚';
  } else {
    return 'Continue praticando! O conhecimento vem com o tempo. 💪';
  }
}

/**
 * Calcula estatísticas por tema
 */
export function calculateThemeStats(answers: Answer[]): ThemeStats {
  const stats: ThemeStats = {};
  
  answers.forEach(answer => {
    if (!stats[answer.tema]) {
      stats[answer.tema] = { correct: 0, total: 0 };
    }
    stats[answer.tema].total++;
    if (answer.isCorrect) {
      stats[answer.tema].correct++;
    }
  });
  
  return stats;
}

/**
 * Identifica os temas com mais dificuldade (menor taxa de acerto)
 */
export function getDifficultThemes(stats: ThemeStats, limit: number = 3): string[] {
  const themes = Object.entries(stats)
    .map(([tema, data]) => ({
      tema,
      percentage: data.total === 0 ? 0 : (data.correct / data.total) * 100,
    }))
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, limit)
    .map(item => item.tema);
  
  return themes;
}

