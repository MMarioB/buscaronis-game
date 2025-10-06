import { useState, useEffect, useCallback } from 'react';
import type { GameState } from './useGameState';

interface UseTimerReturn {
  timer: number;
  resetTimer: () => void;
}

/**
 * Hook para gestionar el temporizador del juego
 * @param gameState - Estado actual del juego
 * @returns Timer en segundos y método para resetear
 */
export function useTimer(gameState: GameState): UseTimerReturn {
  const [timer, setTimer] = useState(0);

  const resetTimer = useCallback(() => {
    setTimer(0);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup: detener interval cuando el componente se desmonte o gameState cambie
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameState]);

  return {
    timer,
    resetTimer,
  };
}
