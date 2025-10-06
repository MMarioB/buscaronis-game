import { Cell } from './Cell';

interface CellData {
  isRevealed: boolean;
  isFlagged: boolean;
  isMine: boolean;
  adjacentMines: number;
}

interface BoardProps {
  board: CellData[][];
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (row: number, col: number) => (e: React.MouseEvent<HTMLDivElement>) => void;
  gameOver: boolean;
  explodedCell?: { row: number; col: number } | null;
}

export function Board({
  board,
  onCellClick,
  onCellRightClick,
  gameOver,
  explodedCell,
}: BoardProps) {
  const rows = board.length;
  const cols = board[0]?.length || 0;

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="inline-grid gap-1 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border-2 border-orange-500/20"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              isRevealed={cell.isRevealed}
              isFlagged={cell.isFlagged}
              isMine={cell.isMine}
              adjacentMines={cell.adjacentMines}
              onClick={() => onCellClick(rowIndex, colIndex)}
              onRightClick={onCellRightClick(rowIndex, colIndex)}
              gameOver={gameOver}
              isExploded={explodedCell?.row === rowIndex && explodedCell?.col === colIndex}
            />
          ))
        )}
      </div>
    </div>
  );
}
