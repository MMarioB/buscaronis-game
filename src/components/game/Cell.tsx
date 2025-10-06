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
  boardSize?: 'small' | 'medium' | 'large'; // NUEVO
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
  boardSize = 'small', // NUEVO
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

  // NUEVO: Tamaños dinámicos según el tamaño del tablero
  const getSizeClasses = () => {
    switch (boardSize) {
      case 'large': // 30x16
        return {
          cell: 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7',
          emoji: 'text-sm sm:text-base',
          number: 'text-xs sm:text-sm md:text-base',
          icon: 'w-4 h-4 sm:w-5 sm:h-5',
        };
      case 'medium': // 16x16
        return {
          cell: 'w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9',
          emoji: 'text-lg sm:text-xl',
          number: 'text-sm sm:text-base md:text-lg',
          icon: 'w-5 h-5 sm:w-6 sm:h-6',
        };
      case 'small': // 9x9
      default:
        return {
          cell: 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12',
          emoji: 'text-2xl sm:text-3xl',
          number: 'text-lg sm:text-xl md:text-2xl',
          icon: 'w-7 h-7 sm:w-8 sm:h-8',
        };
    }
  };

  const sizes = getSizeClasses();

  const getCellContent = () => {
    // Si está marcada con bandera
    if (isFlagged && !isRevealed) {
      return <span className={sizes.emoji}>🏁</span>;
    }

    // Si no está revelada
    if (!isRevealed) {
      return null;
    }

    // Si es mina y está revelada
    if (isMine) {
      return <span className={`${sizes.emoji} ${isExploded ? 'animate-pulse' : ''}`}>💥</span>;
    }

    // Si tiene minas adyacentes
    if (adjacentMines > 0) {
      return (
        <span className={`font-black ${sizes.number} ${getNumberColor(adjacentMines)}`}>
          {adjacentMines}
        </span>
      );
    }

    // Celda vacía revelada - MOSTRAR RONI/PATITO
    return <RoniIcon className={sizes.icon} />;
  };

  const getCellStyle = () => {
    const baseStyle = `${sizes.cell} border-2 flex items-center justify-center cursor-pointer transition-all duration-200 font-black select-none rounded-lg`;

    // Celda sin revelar - Gradiente naranja-rosa vibrante
    if (!isRevealed) {
      return `${baseStyle} bg-gradient-to-br from-orange-400 via-pink-400 to-pink-500 hover:from-orange-300 hover:to-pink-400 border-orange-500 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`;
    }

    // Celda con bandera
    if (isFlagged && !isRevealed) {
      return `${baseStyle} bg-gradient-to-br from-red-500 to-pink-600 border-yellow-400 shadow-lg animate-pulse`;
    }

    // Celda revelada con mina explotada
    if (isRevealed && isMine && isExploded) {
      return `${baseStyle} bg-gradient-to-br from-red-600 to-orange-600 border-red-800 animate-bounce shadow-2xl`;
    }

    // Celda revelada con mina (game over)
    if (isRevealed && isMine) {
      return `${baseStyle} bg-gradient-to-br from-red-500 to-red-700 border-red-900 shadow-lg`;
    }

    // Celda revelada vacía o con números - Fondo crema/beige
    return `${baseStyle} bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100 border-yellow-600/40 shadow-inner`;
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
