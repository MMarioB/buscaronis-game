interface GameStatsProps {
  minesCount: number;
  flagsCount: number;
  time: number;
}

export function GameStats({ minesCount, flagsCount, time }: GameStatsProps) {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center bg-gradient-to-r from-[#FF6B35]/30 via-[#FF8C42]/40 to-[#FF6B35]/30 backdrop-blur-lg px-6 sm:px-10 py-4 sm:py-5 rounded-3xl shadow-2xl border-2 border-[#FFC857]/40 mb-6 relative noise-bg">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none"></div>

      <div className="relative z-10 flex flex-wrap gap-4 sm:gap-6 items-center justify-center w-full">
        <StatItem icon="💥" label="Minas" value={minesCount} color="text-[#FF6B9D]" />

        <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-[#FFC857]/60 to-transparent" />

        <StatItem icon="🏁" label="Banderas" value={flagsCount} color="text-[#FFC857]" />

        <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-[#FFC857]/60 to-transparent" />

        <StatItem icon="⚡" label="Tiempo" value={`${time}s`} color="text-[#4ECDC4]" />
      </div>
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
    <div className="flex items-center gap-3 group">
      <span className="text-2xl sm:text-3xl drop-shadow-lg filter brightness-125 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className="text-xs sm:text-sm text-white/80 font-futura font-medium uppercase tracking-wide">
          {label}:
        </span>
        <span
          className={`text-2xl sm:text-3xl font-knockout font-bold ${color} drop-shadow-md tabular-nums tracking-wider`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
