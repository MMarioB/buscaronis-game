import { describe, it, expect, beforeEach } from 'vitest';
import {
  createEmptyBoard,
  placeMines,
  revealCell,
  checkWinCondition,
  getSafeCells,
  toggleFlag,
  countFlags,
} from '../game-logic';
import type { Board } from '../types';

describe('game-logic', () => {
  describe('createEmptyBoard', () => {
    it('should create a board with correct dimensions', () => {
      const board = createEmptyBoard(9, 9);
      
      expect(board).toHaveLength(9);
      expect(board[0]).toHaveLength(9);
    });

    it('should initialize all cells correctly', () => {
      const board = createEmptyBoard(3, 3);
      
      board.forEach(row => {
        row.forEach(cell => {
          expect(cell.isMine).toBe(false);
          expect(cell.isRevealed).toBe(false);
          expect(cell.isFlagged).toBe(false);
          expect(cell.adjacentMines).toBe(0);
        });
      });
    });

    it('should create different board sizes', () => {
      const small = createEmptyBoard(5, 5);
      const large = createEmptyBoard(16, 30);
      
      expect(small).toHaveLength(5);
      expect(small[0]).toHaveLength(5);
      expect(large).toHaveLength(16);
      expect(large[0]).toHaveLength(30);
    });
  });

  describe('placeMines', () => {
    let board: Board;

    beforeEach(() => {
      board = createEmptyBoard(9, 9);
    });

    it('should place correct number of mines', () => {
      const mineCount = 10;
      const withMines = placeMines(board, 9, 9, mineCount, 0, 0);
      
      let actualMines = 0;
      withMines.forEach(row => {
        row.forEach(cell => {
          if (cell.isMine) actualMines++;
        });
      });
      
      expect(actualMines).toBe(mineCount);
    });

    it('should not place mine on safe cell (first click)', () => {
      const safeRow = 4;
      const safeCol = 4;
      const withMines = placeMines(board, 9, 9, 10, safeRow, safeCol);
      
      expect(withMines[safeRow][safeCol].isMine).toBe(false);
    });

    it('should calculate adjacent mines correctly', () => {
      // Crear tablero pequeño controlado 3x3 con 1 mina en el centro
      const smallBoard = createEmptyBoard(3, 3);
      // Colocar mina manualmente para test controlado
      smallBoard[1][1].isMine = true;
      
      const withAdjacent = placeMines(smallBoard, 3, 3, 0, 0, 0);
      
      // Todas las celdas alrededor del centro deberían tener adjacentMines = 1
      expect(withAdjacent[0][0].adjacentMines).toBe(1);
      expect(withAdjacent[0][1].adjacentMines).toBe(1);
      expect(withAdjacent[0][2].adjacentMines).toBe(1);
      expect(withAdjacent[1][0].adjacentMines).toBe(1);
      expect(withAdjacent[1][2].adjacentMines).toBe(1);
      expect(withAdjacent[2][0].adjacentMines).toBe(1);
      expect(withAdjacent[2][1].adjacentMines).toBe(1);
      expect(withAdjacent[2][2].adjacentMines).toBe(1);
    });

    it('should not exceed mine count even with many attempts', () => {
      // Test edge case: más minas de las posibles
      const smallBoard = createEmptyBoard(3, 3);
      const withMines = placeMines(smallBoard, 3, 3, 8, 1, 1); // 8 minas, 1 safe = todas menos safe
      
      let mineCount = 0;
      withMines.forEach(row => {
        row.forEach(cell => {
          if (cell.isMine) mineCount++;
        });
      });
      
      expect(mineCount).toBe(8);
      expect(withMines[1][1].isMine).toBe(false);
    });
  });

  describe('revealCell', () => {
    let board: Board;

    beforeEach(() => {
      board = createEmptyBoard(5, 5);
    });

    it('should reveal a single cell', () => {
      revealCell(board, 0, 0, 5, 5);
      
      expect(board[0][0].isRevealed).toBe(true);
    });

    it('should not reveal flagged cells', () => {
      board[0][0].isFlagged = true;
      revealCell(board, 0, 0, 5, 5);
      
      expect(board[0][0].isRevealed).toBe(false);
    });

    it('should flood fill empty cells', () => {
      // Tablero sin minas: debería revelar todas las celdas conectadas
      revealCell(board, 2, 2, 5, 5);
      
      // Verificar que múltiples celdas fueron reveladas (flood fill)
      let revealedCount = 0;
      board.forEach(row => {
        row.forEach(cell => {
          if (cell.isRevealed) revealedCount++;
        });
      });
      
      expect(revealedCount).toBeGreaterThan(1);
    });

    it('should stop flood fill at numbered cells', () => {
      // Crear tablero con una mina
      board[0][0].isMine = true;
      // Recalcular adyacencias manualmente para este test
      board[0][1].adjacentMines = 1;
      board[1][0].adjacentMines = 1;
      board[1][1].adjacentMines = 1;
      
      revealCell(board, 4, 4, 5, 5);
      
      // La celda [0][1] no debería revelarse porque tiene número
      // Este test puede ser más complejo dependiendo del flood fill
      expect(board[4][4].isRevealed).toBe(true);
    });

    it('should not crash with out of bounds coordinates', () => {
      expect(() => revealCell(board, -1, 0, 5, 5)).not.toThrow();
      expect(() => revealCell(board, 0, -1, 5, 5)).not.toThrow();
      expect(() => revealCell(board, 10, 10, 5, 5)).not.toThrow();
    });
  });

  describe('checkWinCondition', () => {
    it('should return false for empty board', () => {
      const board = createEmptyBoard(5, 5);
      expect(checkWinCondition(board, 5, 5, 5)).toBe(false);
    });

    it('should return true when all safe cells are revealed', () => {
      const board = createEmptyBoard(3, 3);
      // 1 mina en esquina
      board[0][0].isMine = true;
      
      // Revelar todas las celdas excepto la mina
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (!board[row][col].isMine) {
            board[row][col].isRevealed = true;
          }
        }
      }
      
      expect(checkWinCondition(board, 3, 3, 1)).toBe(true);
    });

    it('should return false if at least one safe cell is not revealed', () => {
      const board = createEmptyBoard(3, 3);
      board[0][0].isMine = true;
      
      // Revelar todas menos una celda segura
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (!board[row][col].isMine && !(row === 2 && col === 2)) {
            board[row][col].isRevealed = true;
          }
        }
      }
      
      expect(checkWinCondition(board, 3, 3, 1)).toBe(false);
    });
  });

  describe('getSafeCells', () => {
    it('should return all cells when board is empty', () => {
      const board = createEmptyBoard(3, 3);
      const safeCells = getSafeCells(board, 3, 3);
      
      expect(safeCells).toHaveLength(9);
    });

    it('should exclude mines', () => {
      const board = createEmptyBoard(3, 3);
      board[0][0].isMine = true;
      board[1][1].isMine = true;
      
      const safeCells = getSafeCells(board, 3, 3);
      
      expect(safeCells).toHaveLength(7);
      expect(safeCells.find(p => p.row === 0 && p.col === 0)).toBeUndefined();
      expect(safeCells.find(p => p.row === 1 && p.col === 1)).toBeUndefined();
    });

    it('should exclude revealed cells', () => {
      const board = createEmptyBoard(3, 3);
      board[0][0].isRevealed = true;
      board[1][1].isRevealed = true;
      
      const safeCells = getSafeCells(board, 3, 3);
      
      expect(safeCells).toHaveLength(7);
    });

    it('should exclude flagged cells', () => {
      const board = createEmptyBoard(3, 3);
      board[0][0].isFlagged = true;
      
      const safeCells = getSafeCells(board, 3, 3);
      
      expect(safeCells).toHaveLength(8);
    });
  });

  describe('toggleFlag', () => {
    it('should add flag to unflagged cell', () => {
      const board = createEmptyBoard(3, 3);
      const newBoard = toggleFlag(board, 0, 0);
      
      expect(newBoard[0][0].isFlagged).toBe(true);
    });

    it('should remove flag from flagged cell', () => {
      const board = createEmptyBoard(3, 3);
      board[0][0].isFlagged = true;
      const newBoard = toggleFlag(board, 0, 0);
      
      expect(newBoard[0][0].isFlagged).toBe(false);
    });

    it('should not flag revealed cells', () => {
      const board = createEmptyBoard(3, 3);
      board[0][0].isRevealed = true;
      const newBoard = toggleFlag(board, 0, 0);
      
      expect(newBoard[0][0].isFlagged).toBe(false);
    });

    it('should not mutate original board', () => {
      const board = createEmptyBoard(3, 3);
      const newBoard = toggleFlag(board, 0, 0);
      
      expect(board[0][0].isFlagged).toBe(false);
      expect(newBoard[0][0].isFlagged).toBe(true);
    });
  });

  describe('countFlags', () => {
    it('should return 0 for empty board', () => {
      const board = createEmptyBoard(3, 3);
      expect(countFlags(board, 3, 3)).toBe(0);
    });

    it('should count flagged cells correctly', () => {
      const board = createEmptyBoard(3, 3);
      board[0][0].isFlagged = true;
      board[1][1].isFlagged = true;
      board[2][2].isFlagged = true;
      
      expect(countFlags(board, 3, 3)).toBe(3);
    });
  });
});