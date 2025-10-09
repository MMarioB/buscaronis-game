export type GameState = 'ready' | 'playing' | 'won' | 'lost';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

export type Board = Cell[][];

export interface GameConfig {
  rows: number;
  cols: number;
  mines: number;
  label: string;
  points: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty?: Difficulty;
}

export interface GameStats {
  score: number;
  streak: number;
  correctAnswers: number;
  totalQuestions: number;
  timer: number;
}

export interface Position {
  row: number;
  col: number;
}

export interface GameResult {
  id: string;
  date: string; // ISO string
  difficulty: Difficulty;
  score: number;
  won: boolean;
  timeElapsed: number; // en segundos
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number; // porcentaje 0-100
  streak: number;
}

export interface PlayerStats {
  highScore: number;
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
  averageAccuracy: number;
  totalCorrectAnswers: number;
  totalQuestions: number;
  bestStreak: number;
  gameHistory: GameResult[]; // últimas 10 partidas
  lastPlayed?: string; // ISO string
}

export interface StorageData {
  version: string; // para migraciones futuras
  stats: PlayerStats;
  preferences?: {
    soundEnabled: boolean;
    difficulty: Difficulty;
  };
}

export const DEFAULT_PLAYER_STATS: PlayerStats = {
  highScore: 0,
  totalGamesPlayed: 0,
  totalWins: 0,
  totalLosses: 0,
  averageAccuracy: 0,
  totalCorrectAnswers: 0,
  totalQuestions: 0,
  bestStreak: 0,
  gameHistory: [],
  lastPlayed: undefined,
};

export const STORAGE_VERSION = '1.0.0';
export const STORAGE_KEY = 'buscaronis_data';

export type AchievementId =
  | 'first_win'
  | 'master_ron'
  | 'desalia_expert'
  | 'unstoppable_streak'
  | 'perfectionist'
  | 'speed_demon'
  | 'trivia_master'
  | 'veteran';

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  category: 'wins' | 'accuracy' | 'streak' | 'speed' | 'trivia' | 'games';
  unlockedAt?: string; // ISO date
}

export type PlayerRank = 'aprendiz' | 'conocedor' | 'experto' | 'maestro';

export interface RankInfo {
  rank: PlayerRank;
  title: string;
  icon: string;
  minGames: number;
  color: string;
}

export interface AchievementProgress {
  achievementId: AchievementId;
  current: number;
  target: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PlayerStatsWithAchievements extends PlayerStats {
  achievements: Achievement[];
  rank: PlayerRank;
  consecutiveWins: number;
  fastestWin: number;
}
