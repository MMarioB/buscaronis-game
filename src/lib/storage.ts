import {
  StorageData,
  PlayerStats,
  GameResult,
  DEFAULT_PLAYER_STATS,
  STORAGE_VERSION,
  STORAGE_KEY,
  Achievement,
  AchievementProgress,
  PlayerStatsWithAchievements,
} from './types';
import { ACHIEVEMENTS, calculateRank } from './achievements';

/**
 * Clase para manejar todas las operaciones de LocalStorage
 * con manejo de errores y validación
 */
class GameStorage {
  private isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Lee los datos del storage
   */
  public read(): StorageData | null {
    if (!this.isAvailable()) {
      console.warn('LocalStorage no disponible');
      return null;
    }

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;

      const parsed = JSON.parse(data) as StorageData;

      // Validar versión y migrar si es necesario
      if (parsed.version !== STORAGE_VERSION) {
        return this.migrate(parsed);
      }

      return parsed;
    } catch (error) {
      console.error('Error leyendo storage:', error);
      return null;
    }
  }

  /**
   * Escribe datos en el storage
   */
  public write(data: StorageData): boolean {
    if (!this.isAvailable()) {
      console.warn('LocalStorage no disponible');
      return false;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error escribiendo en storage:', error);
      // Intentar limpiar espacio si está lleno
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        this.clearOldHistory();
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  }

  /**
   * Obtiene las estadísticas del jugador (con logros)
   */
  public getStats(): PlayerStatsWithAchievements {
    const data = this.read();
    const baseStats = data?.stats || DEFAULT_PLAYER_STATS;

    // Asegurar que tiene los campos de logros
    const statsWithAchievements: PlayerStatsWithAchievements = {
      ...baseStats,
      achievements: (baseStats as PlayerStatsWithAchievements).achievements || [],
      rank: (baseStats as PlayerStatsWithAchievements).rank || 'aprendiz',
      consecutiveWins: (baseStats as PlayerStatsWithAchievements).consecutiveWins || 0,
      fastestWin: (baseStats as PlayerStatsWithAchievements).fastestWin || Infinity,
    };

    return statsWithAchievements;
  }

  /**
   * Guarda un resultado de partida y verifica logros
   */
  public saveGameResult(result: GameResult): boolean {
    const data = this.read() || {
      version: STORAGE_VERSION,
      stats: DEFAULT_PLAYER_STATS,
    };

    const baseStats = data.stats;

    // Crear stats con logros si no existen
    const stats: PlayerStatsWithAchievements = {
      ...baseStats,
      achievements: (baseStats as PlayerStatsWithAchievements).achievements || [],
      rank: (baseStats as PlayerStatsWithAchievements).rank || 'aprendiz',
      consecutiveWins: (baseStats as PlayerStatsWithAchievements).consecutiveWins || 0,
      fastestWin: (baseStats as PlayerStatsWithAchievements).fastestWin || Infinity,
    };

    // Actualizar racha de victorias consecutivas
    if (result.won) {
      stats.consecutiveWins += 1;
      // Actualizar tiempo más rápido
      if (result.timeElapsed < stats.fastestWin) {
        stats.fastestWin = result.timeElapsed;
      }
    } else {
      stats.consecutiveWins = 0;
    }

    // Actualizar high score
    if (result.score > stats.highScore) {
      stats.highScore = result.score;
    }

    // Actualizar contadores
    stats.totalGamesPlayed += 1;
    if (result.won) {
      stats.totalWins += 1;
    } else {
      stats.totalLosses += 1;
    }

    // Actualizar accuracy
    stats.totalCorrectAnswers += result.correctAnswers;
    stats.totalQuestions += result.totalQuestions;
    stats.averageAccuracy =
      stats.totalQuestions > 0 ? (stats.totalCorrectAnswers / stats.totalQuestions) * 100 : 0;

    // Actualizar mejor racha
    if (result.streak > stats.bestStreak) {
      stats.bestStreak = result.streak;
    }

    // Actualizar rango
    stats.rank = calculateRank(stats.totalGamesPlayed);

    // Verificar y desbloquear logros ANTES de guardar
    const newAchievements = checkAndUnlockAchievements(stats, result);
    if (newAchievements.length > 0) {
      stats.achievements = [...stats.achievements, ...newAchievements];
      console.log('🏆 ¡Nuevos logros desbloqueados!', newAchievements);
    }

    // Agregar al historial (máximo 10)
    stats.gameHistory = [result, ...stats.gameHistory].slice(0, 10);
    stats.lastPlayed = result.date;

    // Guardar stats actualizadas
    data.stats = stats;
    return this.write(data);
  }

  /**
   * Limpia el historial viejo para liberar espacio
   */
  private clearOldHistory(): void {
    const data = this.read();
    if (data) {
      data.stats.gameHistory = data.stats.gameHistory.slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }

  /**
   * Migra datos de versiones anteriores
   */
  private migrate(oldData: StorageData): StorageData {
    // Por ahora solo actualizamos la versión
    // En el futuro aquí iría lógica de migración
    return {
      ...oldData,
      version: STORAGE_VERSION,
    };
  }

  /**
   * Resetea todas las estadísticas
   */
  public reset(): boolean {
    if (!this.isAvailable()) return false;

    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Exporta datos como JSON para backup
   */
  public export(): string | null {
    const data = this.read();
    return data ? JSON.stringify(data, null, 2) : null;
  }

  /**
   * Importa datos desde JSON
   */
  public import(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString) as StorageData;
      return this.write(data);
    } catch {
      return false;
    }
  }
}

// Exportar instancia singleton
export const gameStorage = new GameStorage();

export const calculateAccuracy = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Hace un momento';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffMins < 1440) return `Hace ${Math.floor(diffMins / 60)} horas`;
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });
};

/**
 * Verifica y desbloquea logros según las estadísticas actuales
 */
export const checkAndUnlockAchievements = (
  stats: PlayerStatsWithAchievements,
  newResult: GameResult
): Achievement[] => {
  const unlockedAchievements: Achievement[] = [];
  const now = new Date().toISOString();

  // Cargar logros actuales
  const unlockedIds = new Set(stats.achievements.map((a) => a.id));

  // Verificar cada logro
  Object.values(ACHIEVEMENTS).forEach((achievement) => {
    // Si ya está desbloqueado, skip
    if (unlockedIds.has(achievement.id)) return;

    let shouldUnlock = false;

    switch (achievement.id) {
      case 'first_win':
        shouldUnlock = stats.totalWins >= 1;
        break;

      case 'master_ron':
        shouldUnlock = stats.totalWins >= 10;
        break;

      case 'desalia_expert':
        // Contar partidas con 100% precisión
        const perfectGames = stats.gameHistory.filter(
          (g) => g.accuracy === 100 && g.totalQuestions > 0
        ).length;
        shouldUnlock = perfectGames >= 5;
        break;

      case 'unstoppable_streak':
        shouldUnlock = stats.consecutiveWins >= 5;
        break;

      case 'perfectionist':
        shouldUnlock = newResult.accuracy === 100 && newResult.totalQuestions > 0;
        break;

      case 'speed_demon':
        shouldUnlock = newResult.won && newResult.timeElapsed <= 60;
        break;

      case 'trivia_master':
        shouldUnlock = stats.totalCorrectAnswers >= 50;
        break;

      case 'veteran':
        shouldUnlock = stats.totalGamesPlayed >= 50;
        break;
    }

    if (shouldUnlock) {
      unlockedAchievements.push({
        ...achievement,
        unlockedAt: now,
      });
    }
  });

  return unlockedAchievements;
};

/**
 * Calcula el progreso hacia cada logro
 */
export const calculateAchievementProgress = (
  stats: PlayerStatsWithAchievements
): AchievementProgress[] => {
  const progress: AchievementProgress[] = [];
  const unlockedIds = new Set(stats.achievements.map((a) => a.id));

  Object.values(ACHIEVEMENTS).forEach((achievement) => {
    let current = 0;

    switch (achievement.id) {
      case 'first_win':
      case 'master_ron':
        current = stats.totalWins;
        break;

      case 'desalia_expert':
        current = stats.gameHistory.filter(
          (g) => g.accuracy === 100 && g.totalQuestions > 0
        ).length;
        break;

      case 'unstoppable_streak':
        current = stats.consecutiveWins;
        break;

      case 'perfectionist':
        current = stats.gameHistory.some((g) => g.accuracy === 100 && g.totalQuestions > 0) ? 1 : 0;
        break;

      case 'speed_demon':
        const fastestWin = stats.gameHistory
          .filter((g) => g.won)
          .reduce((min, g) => Math.min(min, g.timeElapsed), Infinity);
        current = fastestWin && fastestWin <= 60 ? 60 : fastestWin !== Infinity ? fastestWin : 0;
        break;

      case 'trivia_master':
        current = stats.totalCorrectAnswers;
        break;

      case 'veteran':
        current = stats.totalGamesPlayed;
        break;
    }

    progress.push({
      achievementId: achievement.id,
      current: Math.min(current, achievement.requirement),
      target: achievement.requirement,
      unlocked: unlockedIds.has(achievement.id),
      unlockedAt: stats.achievements.find((a) => a.id === achievement.id)?.unlockedAt,
    });
  });

  return progress;
};
