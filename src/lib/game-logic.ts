import type { Board, Cell, Position } from './types';

/**
 * Crea un tablero vacío inicializado
 * @param rows - Número de filas
 * @param cols - Número de columnas
 * @returns Tablero inicializado sin minas
 */
export function createEmptyBoard(rows: number, cols: number): Board {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
        }))
    );
}

/**
 * Coloca minas aleatoriamente en el tablero
 * @param board - Tablero actual
 * @param rows - Número de filas
 * @param cols - Número de columnas
 * @param mineCount - Número de minas a colocar
 * @param safeRow - Fila segura (primera celda clickeada)
 * @param safeCol - Columna segura (primera celda clickeada)
 * @returns Nuevo tablero con minas colocadas y adyacencias calculadas
 */
export function placeMines(
    board: Board,
    rows: number,
    cols: number,
    mineCount: number,
    safeRow: number,
    safeCol: number
): Board {
    // Deep clone para inmutabilidad
    const newBoard: Board = JSON.parse(JSON.stringify(board));
    let minesPlaced = 0;

    while (minesPlaced < mineCount) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);

        // Evitar colocar mina en celda segura o donde ya hay una mina
        const isSafeCell = row === safeRow && col === safeCol;
        const hasMinealready = newBoard[row][col].isMine;

        if (!isSafeCell && !hasMinealready) {
            newBoard[row][col].isMine = true;
            minesPlaced++;
        }
    }

    return calculateAdjacentMines(newBoard, rows, cols);
}

/**
 * Calcula el número de minas adyacentes para cada celda
 * @param board - Tablero con minas colocadas
 * @param rows - Número de filas
 * @param cols - Número de columnas
 * @returns Tablero con adyacencias calculadas
 */
function calculateAdjacentMines(
    board: Board,
    rows: number,
    cols: number
): Board {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col].isMine) continue;

            let count = 0;

            for (const [dx, dy] of directions) {
                const newRow = row + dx;
                const newCol = col + dy;

                if (isValidPosition(newRow, newCol, rows, cols) && board[newRow][newCol].isMine) {
                    count++;
                }
            }

            board[row][col].adjacentMines = count;
        }
    }

    return board;
}

/**
 * Verifica si una posición está dentro del tablero
 */
function isValidPosition(
    row: number,
    col: number,
    rows: number,
    cols: number
): boolean {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

/**
 * Revela una celda y sus vecinas si es vacía (flood fill)
 * IMPORTANTE: Muta el tablero por eficiencia en recursión
 * @param board - Tablero actual (será mutado)
 * @param row - Fila de la celda
 * @param col - Columna de la celda
 * @param rows - Número total de filas
 * @param cols - Número total de columnas
 */
export function revealCell(
    board: Board,
    row: number,
    col: number,
    rows: number,
    cols: number
): void {
    // Validaciones
    if (!isValidPosition(row, col, rows, cols)) return;

    const cell = board[row][col];
    if (cell.isRevealed || cell.isFlagged) return;

    // Revelar celda actual
    cell.isRevealed = true;

    // Si tiene minas adyacentes o es mina, no continuar
    if (cell.adjacentMines > 0 || cell.isMine) return;

    // Flood fill: revelar celdas adyacentes si la actual está vacía
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    for (const [dx, dy] of directions) {
        revealCell(board, row + dx, col + dy, rows, cols);
    }
}

/**
 * Verifica si el jugador ha ganado
 * @param board - Tablero actual
 * @param rows - Número de filas
 * @param cols - Número de columnas
 * @param mineCount - Número de minas
 * @returns true si todas las celdas seguras están reveladas
 */
export function checkWinCondition(
    board: Board,
    rows: number,
    cols: number,
    mineCount: number
): boolean {
    const totalCells = rows * cols;
    const safeCells = totalCells - mineCount;
    let revealedSafeCells = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = board[row][col];
            if (cell.isRevealed && !cell.isMine) {
                revealedSafeCells++;
            }
        }
    }

    return revealedSafeCells === safeCells;
}

/**
 * Obtiene todas las celdas seguras (sin mina) no reveladas ni marcadas
 * Útil para el sistema de hints
 * @param board - Tablero actual
 * @param rows - Número de filas
 * @param cols - Número de columnas
 * @returns Array de posiciones seguras
 */
export function getSafeCells(
    board: Board,
    rows: number,
    cols: number
): Position[] {
    const safeCells: Position[] = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = board[row][col];
            const isSafe = !cell.isMine && !cell.isRevealed && !cell.isFlagged;

            if (isSafe) {
                safeCells.push({ row, col });
            }
        }
    }

    return safeCells;
}

/**
 * Alterna el estado de bandera en una celda
 * @param board - Tablero actual
 * @param row - Fila
 * @param col - Columna
 * @returns Nuevo tablero con bandera alternada
 */
export function toggleFlag(board: Board, row: number, col: number): Board {
    const newBoard: Board = JSON.parse(JSON.stringify(board));

    if (!newBoard[row][col].isRevealed) {
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    }

    return newBoard;
}

/**
 * Cuenta el número de banderas actualmente colocadas
 * @param board - Tablero actual
 * @param rows - Número de filas
 * @param cols - Número de columnas
 * @returns Número de banderas
 */
export function countFlags(board: Board, rows: number, cols: number): number {
    let count = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col].isFlagged) {
                count++;
            }
        }
    }

    return count;
}