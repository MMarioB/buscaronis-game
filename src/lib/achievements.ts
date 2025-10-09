import { Achievement, RankInfo, PlayerRank } from './types';

// Definición de todos los logros disponibles
export const ACHIEVEMENTS: Record<string, Omit<Achievement, 'unlockedAt'>> = {
  first_win: {
    id: 'first_win',
    title: '¡Primera Victoria!',
    description: 'Gana tu primera partida',
    icon: '🎉',
    requirement: 1,
    category: 'wins',
  },
  master_ron: {
    id: 'master_ron',
    title: 'Maestro del Ron',
    description: 'Consigue 10 victorias',
    icon: '🥃',
    requirement: 10,
    category: 'wins',
  },
  desalia_expert: {
    id: 'desalia_expert',
    title: 'Experto Desalía',
    description: '100% de precisión en 5 partidas',
    icon: '🎯',
    requirement: 5,
    category: 'accuracy',
  },
  unstoppable_streak: {
    id: 'unstoppable_streak',
    title: 'Racha Imparable',
    description: 'Consigue 5 victorias consecutivas',
    icon: '🔥',
    requirement: 5,
    category: 'streak',
  },
  perfectionist: {
    id: 'perfectionist',
    title: 'Perfeccionista',
    description: 'Completa una partida sin errores en trivia',
    icon: '💎',
    requirement: 1,
    category: 'accuracy',
  },
  speed_demon: {
    id: 'speed_demon',
    title: 'Velocidad del Rayo',
    description: 'Gana una partida en menos de 60 segundos',
    icon: '⚡',
    requirement: 60,
    category: 'speed',
  },
  trivia_master: {
    id: 'trivia_master',
    title: 'Maestro de Trivia',
    description: 'Responde 50 preguntas correctamente',
    icon: '🧠',
    requirement: 50,
    category: 'trivia',
  },
  veteran: {
    id: 'veteran',
    title: 'Veterano',
    description: 'Juega 50 partidas',
    icon: '🏆',
    requirement: 50,
    category: 'games',
  },
};

// Sistema de rangos
export const RANKS: Record<PlayerRank, RankInfo> = {
  aprendiz: {
    rank: 'aprendiz',
    title: 'Aprendiz',
    icon: '🌱',
    minGames: 0,
    color: 'from-green-400 to-green-500',
  },
  conocedor: {
    rank: 'conocedor',
    title: 'Conocedor',
    icon: '📚',
    minGames: 6,
    color: 'from-blue-400 to-blue-500',
  },
  experto: {
    rank: 'experto',
    title: 'Experto',
    icon: '⭐',
    minGames: 21,
    color: 'from-purple-400 to-purple-500',
  },
  maestro: {
    rank: 'maestro',
    title: 'Maestro Desalía',
    icon: '👑',
    minGames: 51,
    color: 'from-yellow-400 to-yellow-500',
  },
};

// Función helper para calcular rango según partidas jugadas
export const calculateRank = (gamesPlayed: number): PlayerRank => {
  if (gamesPlayed >= 51) return 'maestro';
  if (gamesPlayed >= 21) return 'experto';
  if (gamesPlayed >= 6) return 'conocedor';
  return 'aprendiz';
};

// Función helper para obtener el siguiente rango
export const getNextRank = (currentRank: PlayerRank): RankInfo | null => {
  const rankOrder: PlayerRank[] = ['aprendiz', 'conocedor', 'experto', 'maestro'];
  const currentIndex = rankOrder.indexOf(currentRank);
  const nextRank = rankOrder[currentIndex + 1];
  return nextRank ? RANKS[nextRank] : null;
};

// Función para calcular progreso hacia el siguiente rango
export const calculateRankProgress = (
  gamesPlayed: number
): {
  current: number;
  target: number;
  percentage: number;
} => {
  const currentRank = calculateRank(gamesPlayed);
  const nextRank = getNextRank(currentRank);

  if (!nextRank) {
    return { current: gamesPlayed, target: gamesPlayed, percentage: 100 };
  }

  const currentRankInfo = RANKS[currentRank];
  const progress = gamesPlayed - currentRankInfo.minGames;
  const total = nextRank.minGames - currentRankInfo.minGames;
  const percentage = Math.min(Math.round((progress / total) * 100), 100);

  return {
    current: gamesPlayed,
    target: nextRank.minGames,
    percentage,
  };
};
