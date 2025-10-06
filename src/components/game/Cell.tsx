import { RoniIcon } from '../ui/RoniIcon';

interface CellProps {
  isRevealed: boolean;
  isFlagged: boolean;
  isMine: boolean;
  adjacentMines: number;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  gameOver: boolean;
  isExploded?: boolean;
}

export function Cell({
  isRevealed,
  isFlagged,
  isMine,
  adjacentMines,
  onClick,
  onRightClick,
  gameOver,
  isExploded = false,
}: CellProps) {
  const getNumberColor = (num: number) => {
    const colors: { [key: number]: string } = {
      1: 'text-blue-500',
      2: 'text-green-500',
      3: 'text-red-500',
      4: 'text-purple-600',
      5: 'text-orange-600',
      6: 'text-cyan-500',
      7: 'text-pink-600',
      8: 'text-gray-700',
    };
    return colors[num] || 'text-gray-500';
  };

  const getCellContent = () => {
    // Si está marcada con bandera
    if (isFlagged && !isRevealed) {
      return <span className="text-2xl">🚩</span>;
    }

    // Si no está revelada
    if (!isRevealed) {
      return null;
    }

    // Si es mina y está revelada
    if (isMine) {
      return <RoniIcon animate={isExploded} />;
    }

    // Si tiene minas adyacentes
    if (adjacentMines > 0) {
      return (
        <span className={`font-bold text-lg ${getNumberColor(adjacentMines)}`}>
          {adjacentMines}
        </span>
      );
    }

    // Celda vacía revelada
    return null;
  };

  const getCellStyle = () => {
    const baseStyle =
      'w-8 h-8 sm:w-10 sm:h-10 border flex items-center justify-center cursor-pointer transition-all duration-150 font-bold select-none';

    // Celda sin revelar
    if (!isRevealed) {
      return `${baseStyle} bg-gradient-to-br from-orange-400 to-pink-500 hover:from-orange-300 hover:to-pink-400 border-orange-600 shadow-md hover:shadow-lg active:scale-95`;
    }

    // Celda revelada con mina explotada
    if (isRevealed && isMine && isExploded) {
      return `${baseStyle} bg-red-600 border-red-800 animate-bounce`;
    }

    // Celda revelada con mina (game over)
    if (isRevealed && isMine) {
      return `${baseStyle} bg-red-500 border-red-700`;
    }

    // Celda revelada vacía
    return `${baseStyle} bg-gradient-to-br from-amber-50 to-orange-50 border-orange-200`;
  };

  const handleClick = () => {
    if (!gameOver && !isRevealed && !isFlagged) {
      onClick();
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!gameOver && !isRevealed) {
      onRightClick(e);
    }
  };

  return (
    <div className={getCellStyle()} onClick={handleClick} onContextMenu={handleContextMenu}>
      {getCellContent()}
    </div>
  );
}
