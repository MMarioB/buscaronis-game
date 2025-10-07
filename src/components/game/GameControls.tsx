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
  const difficulties: { key: Difficulty; label: string }[] = [
    { key: 'easy', label: 'Chill 🏖️' },
    { key: 'medium', label: 'Desafío 🔥' },
    { key: 'hard', label: 'Vive Ahora 💪' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
      {difficulties.map(({ key, label }) => {
        const isHard = key === 'hard';
        const isDisabled = isHard && !isDesktop;

        return (
          <div key={key} className="relative group">
            <Button
              onClick={() => onDifficultyChange(key)}
              variant={currentDifficulty === key ? 'active' : 'secondary'}
              disabled={isDisabled}
              className="text-sm sm:text-base"
            >
              {label}
            </Button>
            {isDisabled && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                Solo en desktop 🖥️
              </div>
            )}
          </div>
        );
      })}

      <Button onClick={onNewGame} variant="primary" className="text-sm sm:text-base">
        🎮 Nuevo Juego
      </Button>
    </div>
  );
}
