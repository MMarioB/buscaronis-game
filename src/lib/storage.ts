import {
  StorageData,
  PlayerStats,
  GameResult,
  DEFAULT_PLAYER_STATS,
  STORAGE_VERSION,
  STORAGE_KEY,
} from './types';

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
   * Obtiene las estadísticas del jugador
   */
  public getStats(): PlayerStats {
    const data = this.read();
    return data?.stats || DEFAULT_PLAYER_STATS;
  }

  /**
   * Guarda un resultado de partida
   */
  public saveGameResult(result: GameResult): boolean {
    const data = this.read() || {
      version: STORAGE_VERSION,
      stats: DEFAULT_PLAYER_STATS,
    };

    const stats = data.stats;

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

    // Agregar al historial (máximo 10)
    stats.gameHistory = [result, ...stats.gameHistory].slice(0, 10);
    stats.lastPlayed = result.date;

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

// Utilidades helper
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
