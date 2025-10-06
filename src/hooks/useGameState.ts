import { useState, useCallback } from 'react';
import { GAME_CONSTANTS } from '../lib/constants';

export type GameState = 'ready' | 'playing' | 'won' | 'lost';

interface UseGameStateReturn {
  gameState: GameState;
  score: number;
  streak: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  setGameState: (state: GameState) => void;
  addCorrectAnswer: () => number;
  addIncorrectAnswer: () => void;
  addScore: (points: number) => void;
  resetStats: () => void;
}

export function useGameState(): UseGameStateReturn {
  const [gameState, setGameState] = useState<GameState>('ready');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const resetStats = useCallback(() => {
    setGameState('ready');
    setScore(0);
    setStreak(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
  }, []);

  const addCorrectAnswer = useCallback(() => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    setCorrectAnswers((prev) => prev + 1);
    setTotalQuestions((prev) => prev + 1);

    const points = GAME_CONSTANTS.POINTS_PER_CORRECT + newStreak * GAME_CONSTANTS.STREAK_BONUS;
    setScore((prev) => prev + points);

    return newStreak;
  }, [streak]);

  const addIncorrectAnswer = useCallback(() => {
    setStreak(0);
    setTotalQuestions((prev) => prev + 1);
  }, []);

  const addScore = useCallback((points: number) => {
    setScore((prev) => prev + points);
  }, []);

  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return {
    gameState,
    score,
    streak,
    correctAnswers,
    totalQuestions,
    accuracy,
    setGameState,
    addCorrectAnswer,
    addIncorrectAnswer,
    addScore,
    resetStats,
  };
}
