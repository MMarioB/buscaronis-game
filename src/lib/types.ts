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