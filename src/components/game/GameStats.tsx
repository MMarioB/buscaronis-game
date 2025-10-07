interface GameStatsProps {
  minesCount: number;
  flagsCount: number;
  time: number;
}

export function GameStats({ minesCount, flagsCount, time }: GameStatsProps) {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center bg-gradient-to-r from-slate-800/40 via-slate-900/40 to-slate-800/40 backdrop-blur-md px-6 sm:px-10 py-4 sm:py-5 rounded-3xl shadow-2xl border-2 border-orange-400/30 mb-6">
      <StatItem icon="💥" label="Minas" value={minesCount} color="text-red-400" />

      <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-orange-400/50 to-transparent" />

      <StatItem icon="🏁" label="Banderas" value={flagsCount} color="text-yellow-400" />

      <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-orange-400/50 to-transparent" />

      <StatItem icon="⚡" label="Tiempo" value={`${time}s`} color="text-cyan-400" />
    </div>
  );
}

interface StatItemProps {
  icon: string;
  label: string;
  value: number | string;
  color: string;
}

function StatItem({ icon, label, value, color }: StatItemProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl sm:text-3xl drop-shadow-lg filter brightness-125">{icon}</span>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className="text-xs sm:text-sm text-orange-300/80 font-medium uppercase tracking-wide">
          {label}:
        </span>
        <span className={`text-xl sm:text-2xl font-bold ${color} drop-shadow-md tabular-nums`}>
          {value}
        </span>
      </div>
    </div>
  );
}
