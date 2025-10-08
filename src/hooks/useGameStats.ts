'use client';

import { useState, useEffect, useCallback } from 'react';
import { gameStorage } from '@/lib/storage';
import { PlayerStats, GameResult } from '@/lib/types';

export function useGameStats() {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar stats al montar
  useEffect(() => {
    const loadStats = () => {
      try {
        const loadedStats = gameStorage.getStats();
        setStats(loadedStats);
      } catch (error) {
        console.error('Error cargando stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  /**
   * Guarda un resultado de partida
   */
  const saveGame = useCallback((result: GameResult) => {
    const success = gameStorage.saveGameResult(result);

    if (success) {
      // Recargar stats después de guardar
      const updatedStats = gameStorage.getStats();
      setStats(updatedStats);
    }

    return success;
  }, []);

  /**
   * Resetea todas las estadísticas
   */
  const resetStats = useCallback(() => {
    const success = gameStorage.reset();

    if (success) {
      const freshStats = gameStorage.getStats();
      setStats(freshStats);
    }

    return success;
  }, []);

  /**
   * Exporta estadísticas como JSON
   */
  const exportStats = useCallback(() => {
    return gameStorage.export();
  }, []);

  /**
   * Importa estadísticas desde JSON
   */
  const importStats = useCallback((jsonString: string) => {
    const success = gameStorage.import(jsonString);

    if (success) {
      const importedStats = gameStorage.getStats();
      setStats(importedStats);
    }

    return success;
  }, []);

  /**
   * Recarga las estadísticas manualmente
   */
  const refreshStats = useCallback(() => {
    const freshStats = gameStorage.getStats();
    setStats(freshStats);
  }, []);

  return {
    stats,
    isLoading,
    saveGame,
    resetStats,
    exportStats,
    importStats,
    refreshStats,
  };
}
