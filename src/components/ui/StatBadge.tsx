interface StatBadgeProps {
  icon?: string;
  label: string;
  value: number | string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export function StatBadge({
  icon,
  label,
  value,
  variant = 'default',
  size = 'md',
}: StatBadgeProps) {
  const variants = {
    default: 'bg-gradient-to-r from-slate-700/80 to-slate-800/80 text-white border-slate-600/50',
    success: 'bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white border-green-500/50',
    warning: 'bg-gradient-to-r from-yellow-600/80 to-orange-600/80 text-white border-yellow-500/50',
    danger: 'bg-gradient-to-r from-red-600/80 to-rose-600/80 text-white border-red-500/50',
    info: 'bg-gradient-to-r from-cyan-600/80 to-blue-600/80 text-white border-cyan-500/50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-2',
    md: 'px-4 py-2 text-sm gap-2.5',
    lg: 'px-5 py-3 text-base gap-3',
  };

  return (
    <div
      className={`
          inline-flex items-center ${sizes[size]} 
          ${variants[variant]}
          backdrop-blur-md rounded-full 
          border-2 shadow-lg
          font-semibold tracking-wide
          transition-all duration-200
        `}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="opacity-90">{label}:</span>
      <span className="font-bold tabular-nums">{value}</span>
    </div>
  );
}
