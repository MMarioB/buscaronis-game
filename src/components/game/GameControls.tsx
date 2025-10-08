import { Button } from '../ui/Button';

export type Difficulty = 'easy' | 'medium' | 'hard';

interface GameControlsProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
  isDesktop: boolean;
}

export function GameControls({
  currentDifficulty,
  onDifficultyChange,
  onNewGame,
  isDesktop,
}: GameControlsProps) {
  const difficulties: { key: Difficulty; label: string; emoji: string }[] = [
    { key: 'easy', label: 'CHILL', emoji: '🏖️' },
    { key: 'medium', label: 'DESAFÍO', emoji: '🔥' },
    { key: 'hard', label: 'VIVE AHORA', emoji: '💪' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#FF6B35]/20 to-[#FF8C42]/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-2xl border border-[#FFC857]/30">
        {difficulties.map(({ key, label, emoji }) => {
          const isHard = key === 'hard';
          const isDisabled = isHard && !isDesktop;

          return (
            <div key={key} className="relative group">
              <Button
                onClick={() => onDifficultyChange(key)}
                variant={currentDifficulty === key ? 'active' : 'secondary'}
                disabled={isDisabled}
                className="font-knockout text-xs sm:text-sm tracking-wider transition-all duration-300"
              >
                <span className="mr-1.5">{emoji}</span>
                {label}
              </Button>
              {isDisabled && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white font-futura text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg">
                  <div className="relative">
                    Solo en desktop 🖥️
                    <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-[#FFC857]/50 to-transparent"></div>

      <Button
        onClick={onNewGame}
        variant="primary"
        className="font-knockout text-sm sm:text-base tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="mr-2">🎮</span>
        NUEVO JUEGO
      </Button>
    </div>
  );
}
