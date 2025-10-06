import { Button } from '../ui/Button';
import { StatBadge } from '../ui/StatBadge';

interface GameOverModalProps {
  isOpen: boolean;
  isWon: boolean;
  time: number;
  moves: number;
  correctAnswers?: number;
  totalQuestions?: number;
  onPlayAgain: () => void;
  onViewStats?: () => void;
}

export function GameOverModal({
  isOpen,
  isWon,
  time,
  moves,
  correctAnswers = 0,
  totalQuestions = 0,
  onPlayAgain,
  onViewStats,
}: GameOverModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border-2 border-orange-500/50 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header decorativo */}
        <div
          className={`absolute top-0 left-0 right-0 h-2 ${
            isWon
              ? 'bg-gradient-to-r from-green-500 via-emerald-400 to-cyan-500'
              : 'bg-gradient-to-r from-red-500 via-orange-500 to-pink-500'
          }`}
        ></div>

        {/* Contenido */}
        <div className="p-6 sm:p-10">
          {/* Título con animación */}
          <div className="text-center mb-8">
            <div className="text-6xl sm:text-7xl mb-4 animate-bounce">{isWon ? '🎉' : '💥'}</div>

            <h2
              className={`text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3 ${
                isWon
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-pink-400'
              }`}
            >
              {isWon ? '¡Desafío Completado!' : '¡Reto Fallido!'}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg">
              {isWon
                ? '¡Has encontrado todos los Ronis! ¡VIVE AHORA!'
                : 'Tocaste una mina. Los Ronis te desafían a intentarlo de nuevo.'}
            </p>
          </div>

          {/* Estadísticas */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <StatBadge icon="⚡" label="Tiempo" value={`${time}s`} variant="info" />
            <StatBadge icon="🎯" label="Movimientos" value={moves} variant="default" />
            {totalQuestions > 0 && (
              <StatBadge
                icon="🧠"
                label="Preguntas"
                value={`${correctAnswers}/${totalQuestions}`}
                variant={correctAnswers === totalQuestions ? 'success' : 'warning'}
              />
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={onPlayAgain} variant="primary" className="px-8 py-3 text-lg font-bold">
              🔥 Jugar de Nuevo
            </Button>

            {onViewStats && (
              <Button onClick={onViewStats} variant="secondary" className="px-8 py-3">
                📊 Ver Estadísticas
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
