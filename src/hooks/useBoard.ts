import { useState, useCallback } from 'react';
import type { Board, GameConfig } from '../lib/types';
import {
  createEmptyBoard,
  placeMines,
  revealCell as revealCellLogic,
  checkWinCondition,
  getSafeCells,
  toggleFlag as toggleFlagLogic,
  countFlags,
} from '../lib/game-logic';

interface UseBoardReturn {
  board: Board;
  flagCount: number;
  isWon: boolean;
  initBoard: (config: GameConfig) => void;
  handleCellClick: (row: number, col: number) => { hitMine: boolean; won: boolean };
  handleCellRightClick: (row: number, col: number) => boolean; // ✅ Ahora retorna boolean
  getRandomSafeCell: () => { row: number; col: number } | null;
}

export function useBoard(): UseBoardReturn {
  const [board, setBoard] = useState<Board>([]);
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [minesPlaced, setMinesPlaced] = useState(false);

  const initBoard = useCallback((gameConfig: GameConfig) => {
    const newBoard = createEmptyBoard(gameConfig.rows, gameConfig.cols);
    setBoard(newBoard);
    setConfig(gameConfig);
    setMinesPlaced(false);
  }, []);

  const handleCellClick = useCallback(
    (row: number, col: number): { hitMine: boolean; won: boolean } => {
      if (!config) return { hitMine: false, won: false };

      if (!minesPlaced) {
        const boardWithMines = placeMines(board, config.rows, config.cols, config.mines, row, col);
        setBoard(boardWithMines);
        setMinesPlaced(true);

        const newBoard = JSON.parse(JSON.stringify(boardWithMines));
        revealCellLogic(newBoard, row, col, config.rows, config.cols);
        setBoard(newBoard);

        return { hitMine: false, won: false };
      }

      if (board[row][col].isRevealed || board[row][col].isFlagged) {
        return { hitMine: false, won: false };
      }

      if (board[row][col].isMine) {
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col].isRevealed = true;
        setBoard(newBoard);
        return { hitMine: true, won: false };
      }

      const newBoard = JSON.parse(JSON.stringify(board));
      revealCellLogic(newBoard, row, col, config.rows, config.cols);
      setBoard(newBoard);

      const won = checkWinCondition(newBoard, config.rows, config.cols, config.mines);
      return { hitMine: false, won };
    },
    [board, config, minesPlaced]
  );

  const handleCellRightClick = useCallback(
    (row: number, col: number): boolean => {
      if (!config || !minesPlaced) return false;

      // ✅ Pasar el límite de banderas
      const newBoard = toggleFlagLogic(board, row, col, config.mines);

      // ✅ Si retorna null, significa que se alcanzó el límite
      if (newBoard === null) {
        return false; // Rechazado
      }

      setBoard(newBoard);
      return true; // Exitoso
    },
    [board, config, minesPlaced]
  );

  const getRandomSafeCell = useCallback((): { row: number; col: number } | null => {
    if (!config) return null;

    const safeCells = getSafeCells(board, config.rows, config.cols);
    if (safeCells.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * safeCells.length);
    return safeCells[randomIndex];
  }, [board, config]);

  const flagCount = config ? countFlags(board, config.rows, config.cols) : 0;
  const isWon = config ? checkWinCondition(board, config.rows, config.cols, config.mines) : false;

  return {
    board,
    flagCount,
    isWon,
    initBoard,
    handleCellClick,
    handleCellRightClick,
    getRandomSafeCell,
  };
}
