import { GameConfig, Difficulty } from './types';

export const DIFFICULTIES: Record<Difficulty, GameConfig> = {
    easy: { rows: 9, cols: 9, mines: 10, label: 'Chill', points: 100 },
    medium: { rows: 16, cols: 16, mines: 40, label: 'Desafío', points: 250 },
    hard: { rows: 16, cols: 30, mines: 99, label: 'Vive Ahora', points: 500 },
} as const;

export const GAME_CONSTANTS = {
    HINT_COST: 50,
    POINTS_PER_CORRECT: 10,
    STREAK_BONUS: 5,
    TIME_BONUS_BASE: 500,
    TIME_BONUS_MULTIPLIER: 2,
    HINT_DISPLAY_TIME: 2000,
    EXPLANATION_DISPLAY_TIME: 3000,
} as const;