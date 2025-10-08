'use client';

import { useGameStats } from '@/hooks/useGameStats';
import { formatTime, formatDate } from '@/lib/storage';
import { Button } from '../ui/Button';

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
  stats: GameStats; // Stats de la sesión actual (las vamos a ignorar)
  onClose: () => void;
  onReset?: () => void;
}

export function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const { stats: persistedStats, isLoading, resetStats, exportStats } = useGameStats();

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  const stats = persistedStats || {
    highScore: 0,
    totalGamesPlayed: 0,
    totalWins: 0,
    totalLosses: 0,
    averageAccuracy: 0,
    totalCorrectAnswers: 0,
    totalQuestions: 0,
    bestStreak: 0,
    gameHistory: [],
  };

  const winRate =
    stats.totalGamesPlayed > 0 ? Math.round((stats.totalWins / stats.totalGamesPlayed) * 100) : 0;

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres resetear todas tus estadísticas?')) {
      resetStats();
    }
  };

  const handleExport = () => {
    const data = exportStats();
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `buscaronis-stats-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

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

          {/* High Score destacado */}
          {stats.highScore > 0 && (
            <div className="mb-6 p-5 bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-5xl mb-3 drop-shadow-lg">🏆</div>
                <div className="text-4xl font-knockout font-bold text-white mb-1 tabular-nums">
                  {stats.highScore.toLocaleString()}
                </div>
                <div className="text-sm font-futura text-white/90 uppercase tracking-wide">
                  HIGH SCORE
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <StatCard label="Partidas" value={stats.totalGamesPlayed} icon="🎮" variant="default" />
            <StatCard label="Victorias" value={stats.totalWins} icon="🏆" variant="success" />
            <StatCard label="Tasa Victoria" value={`${winRate}%`} icon="📈" variant="info" />
            <StatCard
              label="Precisión"
              value={`${Math.round(stats.averageAccuracy)}%`}
              icon="🎯"
              variant="warning"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
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

            <div className="p-5 bg-gradient-to-br from-[#FF6B9D]/30 to-[#FF6B9D]/20 backdrop-blur-sm border-2 border-[#FF6B9D]/50 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-3 drop-shadow-lg">🧠</div>
                <div className="text-3xl font-knockout font-bold text-white mb-1 tabular-nums">
                  {stats.totalCorrectAnswers}/{stats.totalQuestions}
                </div>
                <div className="text-xs font-futura text-white/80 uppercase tracking-wide">
                  Preguntas Correctas
                </div>
              </div>
            </div>
          </div>

          {/* Historial de partidas */}
          {stats.gameHistory && stats.gameHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-knockout font-bold text-white mb-3 uppercase tracking-wide">
                📜 Últimas {stats.gameHistory.length} Partidas
              </h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                {stats.gameHistory.map((game) => (
                  <div
                    key={game.id}
                    className={`p-4 rounded-xl border-2 backdrop-blur-sm ${
                      game.won
                        ? 'bg-green-500/20 border-green-400/50'
                        : 'bg-red-500/20 border-red-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{game.won ? '🎉' : '💀'}</div>
                        <div>
                          <div className="font-knockout text-white font-bold">
                            {game.score.toLocaleString()} pts
                            <span className="ml-2 text-xs px-2 py-1 bg-white/20 rounded">
                              {game.difficulty.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-xs text-white/70 font-futura">
                            {formatDate(game.date)} • {formatTime(game.timeElapsed)} •{' '}
                            {game.accuracy}% precisión
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-xs text-white/70 font-futura">
                        Racha: {game.streak}
                      </div>
                    </div>
                  </div>
                ))}
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

            {stats.totalGamesPlayed > 0 && (
              <>
                <Button
                  onClick={handleExport}
                  variant="secondary"
                  className="font-knockout px-10 py-3 text-base tracking-wider backdrop-blur-sm"
                >
                  📥 EXPORTAR
                </Button>

                <Button
                  onClick={handleReset}
                  variant="secondary"
                  className="font-knockout px-10 py-3 text-base tracking-wider backdrop-blur-sm !bg-red-500/30 hover:!bg-red-500/40"
                >
                  🗑️ RESETEAR
                </Button>
              </>
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
