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
  className?: string; // ← Agregado para el tutorial
}

export function Board({
  board,
  onCellClick,
  onCellRightClick,
  gameOver,
  explodedCell,
  className = '', // ← Agregado para el tutorial
}: BoardProps) {
  const rows = board.length;
  const cols = board[0]?.length || 0;

  // Determinar el tamaño del tablero
  const getBoardSize = (): 'small' | 'medium' | 'large' => {
    if (cols >= 30) return 'large';
    if (cols >= 16) return 'medium';
    return 'small';
  };

  const boardSize = getBoardSize();

  // Ajustar gap y padding según tamaño
  const getSpacingClasses = () => {
    switch (boardSize) {
      case 'large':
        return 'gap-[1px] p-1 sm:p-2';
      case 'medium':
        return 'gap-[1.5px] p-2 sm:p-3';
      case 'small':
      default:
        return 'gap-[2px] p-3 sm:p-4';
    }
  };

  return (
    <div
      className={`flex items-center justify-center p-2 sm:p-4 w-full overflow-x-auto ${className}`}
    >
      <div
        className={`inline-grid ${getSpacingClasses()} bg-gradient-to-br from-[#FF6B35]/40 via-[#FF8C42]/30 to-[#FFA55F]/40 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-[#FF6B35]/50 relative noise-bg`}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          maxWidth: boardSize === 'large' ? '98vw' : boardSize === 'medium' ? '95vw' : '90vw',
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none"></div>

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
              boardSize={boardSize}
            />
          ))
        )}
      </div>
    </div>
  );
}
