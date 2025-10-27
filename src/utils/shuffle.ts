import type { Question, ShuffledQuestion } from '../types/quiz';

/**
 * Fisher-Yates shuffle algorithm
 * Embaralha um array de forma aleatória
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Embaralha as perguntas do quiz
 */
export function shuffleQuestions(questions: Question[]): ShuffledQuestion[] {
  const shuffled = shuffleArray(questions);
  return shuffled.map((question, index) => shuffleAlternatives(question, index));
}

/**
 * Embaralha as alternativas de uma pergunta mantendo o índice correto da resposta
 */
export function shuffleAlternatives(question: Question, originalIndex: number): ShuffledQuestion {
  const indices = question.alternativas.map((_, i) => i);
  const shuffledIndices = shuffleArray(indices);
  
  // Cria o novo array de alternativas na ordem embaralhada
  const shuffledAlternativas = shuffledIndices.map(i => question.alternativas[i]);
  
  // Encontra a nova posição da resposta correta
  const newCorrectIndex = shuffledIndices.indexOf(question.respostaCorreta);
  
  return {
    id: question.id,
    tema: question.tema,
    pergunta: question.pergunta,
    alternativas: shuffledAlternativas,
    respostaCorreta: newCorrectIndex,
    explicacao: question.explicacao,
    explicacaoErro: question.explicacaoErro,
    originalIndex,
    shuffleMap: shuffledIndices,
  };
}

