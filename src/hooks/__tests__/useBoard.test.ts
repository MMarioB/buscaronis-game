// src/hooks/__tests__/useBoard.test.ts
import { describe, it, expect } from 'vitest';
import { DIFFICULTIES } from '../../lib/constants';
import {
    createEmptyBoard,
    placeMines,
    checkWinCondition,
    getSafeCells,
    countFlags,
    toggleFlag,
    revealCell,
} from '../../lib/game-logic';

describe('useBoard logic integration', () => {
    const easyConfig = DIFFICULTIES.easy;

    it('should integrate board creation and mine placement', () => {
        const board = createEmptyBoard(easyConfig.rows, easyConfig.cols);
        const withMines = placeMines(board, easyConfig.rows, easyConfig.cols, easyConfig.mines, 0, 0);

        expect(withMines).toHaveLength(easyConfig.rows);
        expect(withMines[0]).toHaveLength(easyConfig.cols);
        expect(withMines[0][0].isMine).toBe(false);
    });

    it('should handle complete game workflow', () => {
        const board = createEmptyBoard(5, 5);
        const withMines = placeMines(board, 5, 5, 5, 0, 0);

        // Verificar que se colocaron las minas
        let mineCount = 0;
        withMines.forEach(row => {
            row.forEach(cell => {
                if (cell.isMine) mineCount++;
            });
        });
        expect(mineCount).toBe(5);

        // Revelar una celda
        revealCell(withMines, 0, 0, 5, 5);
        expect(withMines[0][0].isRevealed).toBe(true);
    });

    it('should handle flag toggling workflow', () => {
        const board = createEmptyBoard(3, 3);
        const flagged = toggleFlag(board, 0, 0);
        const flagCount = countFlags(flagged, 3, 3);

        expect(flagCount).toBe(1);
        expect(flagged[0][0].isFlagged).toBe(true);

        // Toggle de nuevo
        const unflagged = toggleFlag(flagged, 0, 0);
        expect(unflagged[0][0].isFlagged).toBe(false);
    });

    it('should detect win condition correctly', () => {
        const board = createEmptyBoard(3, 3);
        const withMines = placeMines(board, 3, 3, 1, 0, 0);

        // Revelar todas excepto la mina
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (!withMines[row][col].isMine) {
                    withMines[row][col].isRevealed = true;
                }
            }
        }

        const won = checkWinCondition(withMines, 3, 3, 1);
        expect(won).toBe(true);
    });

    it('should not detect win if safe cells remain', () => {
        const board = createEmptyBoard(3, 3);
        const withMines = placeMines(board, 3, 3, 1, 0, 0);

        // Revelar solo algunas celdas
        withMines[0][0].isRevealed = true;

        const won = checkWinCondition(withMines, 3, 3, 1);
        expect(won).toBe(false);
    });

    it('should get safe cells for hints', () => {
        const board = createEmptyBoard(3, 3);
        board[0][0].isMine = true;
        board[1][1].isRevealed = true;
        board[2][2].isFlagged = true;

        const safeCells = getSafeCells(board, 3, 3);

        // 9 total - 1 mine - 1 revealed - 1 flagged = 6 safe cells
        expect(safeCells).toHaveLength(6);
        expect(safeCells.find(c => c.row === 0 && c.col === 0)).toBeUndefined();
        expect(safeCells.find(c => c.row === 1 && c.col === 1)).toBeUndefined();
        expect(safeCells.find(c => c.row === 2 && c.col === 2)).toBeUndefined();
    });

    it('should handle reveal and flag operations together', () => {
        const board = createEmptyBoard(5, 5);
        const withMines = placeMines(board, 5, 5, 3, 2, 2);

        // Marcar una celda con bandera
        const flagged = toggleFlag(withMines, 0, 0);
        expect(flagged[0][0].isFlagged).toBe(true);

        // Intentar revelar celda con bandera (no debería pasar nada en el juego real)
        revealCell(flagged, 0, 0, 5, 5);
        expect(flagged[0][0].isRevealed).toBe(false); // No se revela porque tiene bandera
    });
});