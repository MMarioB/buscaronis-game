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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border-2 border-orange-500/50 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Header decorativo */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500"></div>

        {/* Contenido */}
        <div className="p-6 sm:p-8">
          {/* Título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-4">
              <span className="text-2xl">📊</span>
              <span className="text-orange-400 font-bold uppercase tracking-wide text-sm">
                Tus Estadísticas
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white">Historial de Desafíos</h2>
          </div>

          {/* Grid de estadísticas principales */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
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

          {/* Rachas */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-xl">
              <div className="text-center">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-orange-400 mb-1">{stats.currentStreak}</div>
                <div className="text-sm text-slate-400">Racha Actual</div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl">
              <div className="text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">{stats.bestStreak}</div>
                <div className="text-sm text-slate-400">Mejor Racha</div>
              </div>
            </div>
          </div>

          {/* Trivia stats */}
          {stats.totalQuestions > 0 && (
            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Conocimiento Desalia</div>
                  <div className="text-xl font-bold text-purple-400">
                    {stats.correctAnswers}/{stats.totalQuestions} correctas ({triviaAccuracy}%)
                  </div>
                </div>
                <div className="text-4xl">🧠</div>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={onClose} variant="primary" className="px-8">
              Cerrar
            </Button>

            {onReset && stats.gamesPlayed > 0 && (
              <Button onClick={onReset} variant="secondary" className="px-8">
                Resetear Stats
              </Button>
            )}
          </div>
        </div>
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
    default: 'from-slate-700/50 to-slate-800/50 border-slate-600/50',
    success: 'from-green-600/20 to-emerald-600/20 border-green-500/50',
    warning: 'from-yellow-600/20 to-orange-600/20 border-yellow-500/50',
    info: 'from-cyan-600/20 to-blue-600/20 border-cyan-500/50',
  };

  return (
    <div className={`p-4 bg-gradient-to-br ${variants[variant]} border rounded-xl text-center`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white mb-1 tabular-nums">{value}</div>
      <div className="text-xs text-slate-400 uppercase tracking-wide">{label}</div>
    </div>
  );
}
