import { useState, useCallback } from 'react';
import { DESALIA_QUESTIONS } from '../data/questions';
import type { Question } from '../lib/types';

interface UseQuestionsReturn {
  getRandomQuestion: () => Question;
  resetQuestions: () => void;
  questionsRemaining: number;
}

/**
 * Hook para gestionar el banco de preguntas con sistema anti-repetición
 * @returns Método para obtener pregunta aleatoria y resetear banco
 */
export function useQuestions(): UseQuestionsReturn {
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);

  const resetQuestions = useCallback(() => {
    setUsedQuestions([]);
  }, []);

  const getRandomQuestion = useCallback((): Question => {
    // Obtener preguntas disponibles
    const available = DESALIA_QUESTIONS.filter((_, idx) => !usedQuestions.includes(idx));

    // Si no quedan preguntas disponibles, resetear
    if (available.length === 0) {
      setUsedQuestions([]);
      const randomIndex = Math.floor(Math.random() * DESALIA_QUESTIONS.length);
      setUsedQuestions([randomIndex]);
      return DESALIA_QUESTIONS[randomIndex];
    }

    // Seleccionar pregunta aleatoria de las disponibles
    const randomQuestion = available[Math.floor(Math.random() * available.length)];
    const questionIndex = DESALIA_QUESTIONS.indexOf(randomQuestion);

    // Marcar como usada
    setUsedQuestions((prev) => [...prev, questionIndex]);

    return randomQuestion;
  }, [usedQuestions]);

  const questionsRemaining = DESALIA_QUESTIONS.length - usedQuestions.length;

  return {
    getRandomQuestion,
    resetQuestions,
    questionsRemaining,
  };
}
