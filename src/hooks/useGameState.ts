'use client';

import { useState, useCallback } from 'react';

type GameState = 'ready' | 'playing' | 'won' | 'lost';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>('ready');
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const addCorrectAnswer = useCallback(() => {
    setCorrectAnswers((prev) => prev + 1);
    setTotalQuestions((prev) => prev + 1);

    // Incrementar racha
    setStreak((prev) => {
      const newStreak = prev + 1;
      // Actualizar mejor racha si es necesario
      setBestStreak((best) => Math.max(best, newStreak));
      return newStreak;
    });

    // Puntos base + bonus por racha
    setScore((prev) => {
      const basePoints = 10;
      const streakBonus = Math.floor(streak / 3) * 5; // +5 puntos cada 3 respuestas seguidas
      return prev + basePoints + streakBonus;
    });
  }, [streak]);

  const addIncorrectAnswer = useCallback(() => {
    setTotalQuestions((prev) => prev + 1);
    // Resetear racha al fallar
    setStreak(0);
  }, []);

  const resetStats = useCallback(() => {
    setScore(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    setStreak(0);
    setBestStreak(0);
  }, []);

  return {
    gameState,
    score,
    correctAnswers,
    totalQuestions,
    streak,
    bestStreak,
    setGameState,
    addCorrectAnswer,
    addIncorrectAnswer,
    resetStats,
  };
}
