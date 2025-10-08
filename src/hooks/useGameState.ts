'use client';

import { useState, useCallback } from 'react';

type GameState = 'ready' | 'playing' | 'won' | 'lost';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>('ready');
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const addCorrectAnswer = useCallback(() => {
    setCorrectAnswers((prev) => prev + 1);
    setTotalQuestions((prev) => prev + 1);
    setScore((prev) => prev + 10); // +10 puntos por respuesta correcta
  }, []);

  const addIncorrectAnswer = useCallback(() => {
    setTotalQuestions((prev) => prev + 1);
  }, []);

  const resetStats = useCallback(() => {
    setScore(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
  }, []);

  return {
    gameState,
    score,
    correctAnswers,
    totalQuestions,
    setGameState,
    addCorrectAnswer,
    addIncorrectAnswer,
    resetStats,
  };
}
