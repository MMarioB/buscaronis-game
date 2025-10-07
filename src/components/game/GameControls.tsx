import { Button } from '../ui/Button';

export type Difficulty = 'easy' | 'medium' | 'hard';

interface GameControlsProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
}

const difficulties: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Chill (9x9)' },
  { value: 'medium', label: 'Desafío (16x16)' },
  { value: 'hard', label: 'Vive Ahora (16x30)' },
];

export function GameControls({
  currentDifficulty,
  onDifficultyChange,
  onNewGame,
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center mb-6">
      {difficulties.map(({ value, label }) => (
        <Button
          key={value}
          onClick={() => onDifficultyChange(value)}
          variant={currentDifficulty === value ? 'active' : 'secondary'}
          className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
        >
          {label}
        </Button>
      ))}

      <Button
        onClick={onNewGame}
        variant="primary"
        className="text-sm sm:text-base px-5 sm:px-7 py-2 sm:py-3 font-bold"
      >
        ⭐ Nuevo Desafío
      </Button>
    </div>
  );
}
