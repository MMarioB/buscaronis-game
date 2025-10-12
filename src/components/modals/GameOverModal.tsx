import { Button } from '../ui/Button';
import { StatBadge } from '../ui/StatBadge';
import { ShareButton } from '../ui/ShareButton';
import type { ShareConfig } from '@/hooks/useShare';

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

  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // ✅ Configuración para compartir
  const shareConfig: ShareConfig = {
    score: correctAnswers * 10,
    accuracy,
    difficulty: 'easy',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-500">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#FF6B35]/95 via-[#FF8C42]/95 to-[#FFA55F]/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-[#FFC857]/70 overflow-hidden animate-in zoom-in-95 duration-500 noise-bg">
        <div
          className={`absolute top-0 left-0 right-0 h-2 shadow-lg ${
            isWon
              ? 'bg-gradient-to-r from-[#4ECDC4] via-emerald-400 to-green-400'
              : 'bg-gradient-to-r from-[#FF6B9D] via-red-500 to-orange-500'
          }`}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none rounded-3xl"></div>

        <div className="relative z-10 p-6 sm:p-10">
          <div className="text-center mb-10">
            <div className="text-7xl sm:text-8xl mb-6 animate-bounce drop-shadow-2xl">
              {isWon ? '🎉' : '💥'}
            </div>

            <h2
              className={`font-knockout text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider mb-4 drop-shadow-lg ${
                isWon ? 'text-white' : 'text-white'
              }`}
            >
              {isWon ? '¡DESAFÍO COMPLETADO!' : '¡RETO FALLIDO!'}
            </h2>

            <p className="font-futura text-white/90 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              {isWon
                ? '¡Has encontrado todos los Ronis! ¡VIVE AHORA!'
                : 'Tocaste una mina. Los Ronis te desafían a intentarlo de nuevo.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-10">
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
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Botón compartir - Solo si ganó */}
            {isWon && (
              <div className="flex justify-center">
                <ShareButton config={shareConfig} />
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                onClick={onPlayAgain}
                variant="primary"
                className="font-knockout px-10 py-4 text-lg sm:text-xl font-bold tracking-wider shadow-2xl hover:shadow-[0_0_40px_rgba(255,199,87,0.6)] transition-all duration-300"
              >
                <span className="mr-2">🔥</span>
                JUGAR DE NUEVO
              </Button>

              {onViewStats && (
                <Button
                  onClick={onViewStats}
                  variant="secondary"
                  className="font-knockout px-10 py-4 text-base sm:text-lg tracking-wider backdrop-blur-sm"
                >
                  <span className="mr-2">📊</span>
                  VER ESTADÍSTICAS
                </Button>
              )}
            </div>
          </div>
        </div>

        {isWon ? (
          <>
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#4ECDC4]/30 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div
              className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-green-400/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
              style={{ animationDelay: '0.5s' }}
            ></div>

            <div className="absolute top-20 left-20 w-3 h-3 bg-[#FFC857] rounded-full opacity-70 animate-ping"></div>
            <div
              className="absolute top-32 right-24 w-2 h-2 bg-[#4ECDC4] rounded-full opacity-60 animate-ping"
              style={{ animationDelay: '0.3s' }}
            ></div>
            <div
              className="absolute bottom-24 right-16 w-2.5 h-2.5 bg-[#FF6B9D] rounded-full opacity-50 animate-ping"
              style={{ animationDelay: '0.6s' }}
            ></div>
          </>
        ) : (
          <>
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#FF6B9D]/30 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div
              className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-red-500/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div className="absolute top-24 left-24 w-2 h-2 bg-orange-400 rounded-full opacity-70 animate-ping"></div>
            <div
              className="absolute top-36 right-20 w-1.5 h-1.5 bg-red-400 rounded-full opacity-60 animate-ping"
              style={{ animationDelay: '0.4s' }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
}
