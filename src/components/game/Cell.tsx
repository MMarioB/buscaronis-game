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
  boardSize?: 'small' | 'medium' | 'large';
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
  boardSize = 'small',
}: CellProps) {
  const getNumberColor = (num: number) => {
    const colors: { [key: number]: string } = {
      1: 'text-[#4ECDC4]', // Blue Desalia
      2: 'text-[#FFC857]', // Yellow Desalia
      3: 'text-[#FF6B35]', // Orange Desalia
      4: 'text-[#FF6B9D]', // Pink Desalia
      5: 'text-purple-500',
      6: 'text-teal-500',
      7: 'text-rose-500',
      8: 'text-indigo-500',
    };
    return colors[num] || 'text-gray-500';
  };

  // Tamaños dinámicos según el tamaño del tablero
  const getSizeClasses = () => {
    switch (boardSize) {
      case 'large': // 30x16
        return {
          cell: 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7',
          emoji: 'text-sm sm:text-base',
          number: 'text-xs sm:text-sm md:text-base',
          icon: 'w-3 h-3 sm:w-4 sm:h-4',
        };
      case 'medium': // 16x16
        return {
          cell: 'w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9',
          emoji: 'text-base sm:text-lg',
          number: 'text-sm sm:text-base md:text-lg',
          icon: 'w-4 h-4 sm:w-5 sm:h-5',
        };
      case 'small': // 9x9
      default:
        return {
          cell: 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12',
          emoji: 'text-xl sm:text-2xl',
          number: 'text-base sm:text-lg md:text-xl',
          icon: 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7',
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
        <span
          className={`font-knockout font-black ${sizes.number} ${getNumberColor(adjacentMines)}`}
        >
          {adjacentMines}
        </span>
      );
    }

    // Celda vacía revelada - MOSTRAR RONI/PATITO
    return <RoniIcon className={sizes.icon} />;
  };

  const getCellStyle = () => {
    const baseStyle = `${sizes.cell} border-2 flex items-center justify-center cursor-pointer transition-all duration-200 select-none rounded-lg relative`;

    // Celda sin revelar - Gradiente naranja Desalia con efecto hover
    if (!isRevealed && !isFlagged) {
      return `${baseStyle} bg-gradient-to-br from-[#FF6B35] via-[#FF8C42] to-[#FFA55F] hover:from-[#FF8C42] hover:to-[#FF6B35] border-[#FF6B35]/50 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 hover:border-[#FFC857]`;
    }

    // Celda con bandera
    if (isFlagged && !isRevealed) {
      return `${baseStyle} bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB3] border-[#FFC857] shadow-lg ring-2 ring-[#FFC857]/50`;
    }

    // Celda revelada con mina explotada
    if (isRevealed && isMine && isExploded) {
      return `${baseStyle} bg-gradient-to-br from-red-600 via-orange-600 to-[#FF6B35] border-red-800 animate-pulse shadow-2xl ring-2 ring-red-500`;
    }

    // Celda revelada con mina (game over)
    if (isRevealed && isMine) {
      return `${baseStyle} bg-gradient-to-br from-red-500 to-orange-600 border-red-900 shadow-lg`;
    }

    // Celda revelada vacía o con números - Fondo claro con toque Desalia
    return `${baseStyle} bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-[#FF6B35]/20 shadow-inner`;
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
