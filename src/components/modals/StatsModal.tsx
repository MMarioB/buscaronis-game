import { Button } from '../ui/Button';
import { StatBadge } from '../ui/StatBadge';

interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  bestTime: number;
  totalTime: number;
  totalMoves: number;
  correctAnswers: number;
  totalQuestions: number;
  currentStreak: number;
  bestStreak: number;
}

interface StatsModalProps {
  isOpen: boolean;
  stats: GameStats;
  onClose: () => void;
  onReset?: () => void;
}

export function StatsModal({ isOpen, stats, onClose, onReset }: StatsModalProps) {
  if (!isOpen) return null;

  const winRate =
    stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

  const avgTime = stats.gamesWon > 0 ? Math.round(stats.totalTime / stats.gamesWon) : 0;

  const triviaAccuracy =
    stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-gradient-to-br from-[#FF6B35]/95 via-[#FF8C42]/95 to-[#FFA55F]/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-[#FFC857]/70 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto noise-bg">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FFC857] via-[#FF6B9D] to-[#4ECDC4] shadow-lg"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none rounded-3xl"></div>

        <div className="relative z-10 p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#FFC857]/30 backdrop-blur-sm border-2 border-[#FFC857] rounded-full mb-5 shadow-lg">
              <span className="text-3xl drop-shadow-lg">📊</span>
              <span className="text-white font-knockout font-bold uppercase tracking-wider text-sm sm:text-base">
                TUS ESTADÍSTICAS
              </span>
            </div>

            <h2 className="font-knockout text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
              HISTORIAL DE DESAFÍOS
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <StatCard label="Partidas" value={stats.gamesPlayed} icon="🎮" variant="default" />
            <StatCard label="Victorias" value={stats.gamesWon} icon="🏆" variant="success" />
            <StatCard label="Tasa Victoria" value={`${winRate}%`} icon="📈" variant="info" />
            <StatCard
              label="Mejor Tiempo"
              value={stats.bestTime > 0 ? `${stats.bestTime}s` : '-'}
              icon="⚡"
              variant="warning"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
            <div className="p-5 bg-gradient-to-br from-[#FF6B35]/30 to-[#FF8C42]/30 backdrop-blur-sm border-2 border-[#FF6B35]/50 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-3 drop-shadow-lg">🔥</div>
                <div className="text-3xl font-knockout font-bold text-white mb-1 tabular-nums">
                  {stats.currentStreak}
                </div>
                <div className="text-xs font-futura text-white/80 uppercase tracking-wide">
                  Racha Actual
                </div>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-[#4ECDC4]/30 to-[#4ECDC4]/20 backdrop-blur-sm border-2 border-[#4ECDC4]/50 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-3 drop-shadow-lg">⭐</div>
                <div className="text-3xl font-knockout font-bold text-white mb-1 tabular-nums">
                  {stats.bestStreak}
                </div>
                <div className="text-xs font-futura text-white/80 uppercase tracking-wide">
                  Mejor Racha
                </div>
              </div>
            </div>
          </div>

          {stats.totalQuestions > 0 && (
            <div className="p-5 bg-gradient-to-br from-[#FF6B9D]/30 to-[#FF6B9D]/20 backdrop-blur-sm border-2 border-[#FF6B9D]/50 rounded-2xl mb-6 shadow-lg">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-xs font-futura text-white/80 mb-2 uppercase tracking-wide">
                    Conocimiento Desalia
                  </div>
                  <div className="text-xl sm:text-2xl font-knockout font-bold text-white tabular-nums">
                    {stats.correctAnswers}/{stats.totalQuestions} correctas ({triviaAccuracy}%)
                  </div>
                </div>
                <div className="text-5xl drop-shadow-lg">🧠</div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={onClose}
              variant="primary"
              className="font-knockout px-10 py-3 text-base sm:text-lg tracking-wider shadow-xl"
            >
              CERRAR
            </Button>

            {onReset && stats.gamesPlayed > 0 && (
              <Button
                onClick={onReset}
                variant="secondary"
                className="font-knockout px-10 py-3 text-base tracking-wider backdrop-blur-sm"
              >
                RESETEAR STATS
              </Button>
            )}
          </div>
        </div>

        <div className="absolute top-8 right-8 w-28 h-28 bg-gradient-to-br from-[#4ECDC4]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-8 left-8 w-32 h-32 bg-gradient-to-tr from-[#FF6B9D]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  variant: 'default' | 'success' | 'warning' | 'info';
}

function StatCard({ label, value, icon, variant }: StatCardProps) {
  const variants = {
    default: 'from-white/10 to-white/5 border-white/30',
    success: 'from-[#4ECDC4]/20 to-[#4ECDC4]/10 border-[#4ECDC4]/50',
    warning: 'from-[#FFC857]/20 to-[#FFC857]/10 border-[#FFC857]/50',
    info: 'from-[#FF6B9D]/20 to-[#FF6B9D]/10 border-[#FF6B9D]/50',
  };

  return (
    <div
      className={`p-4 sm:p-5 bg-gradient-to-br ${variants[variant]} backdrop-blur-sm border-2 rounded-2xl text-center shadow-lg transition-transform duration-300 hover:scale-105`}
    >
      <div className="text-3xl sm:text-4xl mb-2 drop-shadow-lg">{icon}</div>
      <div className="text-2xl sm:text-3xl font-knockout font-bold text-white mb-1 tabular-nums">
        {value}
      </div>
      <div className="text-xs font-futura text-white/80 uppercase tracking-wide">{label}</div>
    </div>
  );
}
