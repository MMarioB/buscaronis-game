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
    default: 'bg-gradient-to-r from-white/15 to-white/10 text-white border-white/30',
    success: 'bg-gradient-to-r from-[#4ECDC4]/30 to-[#3BB5B0]/20 text-white border-[#4ECDC4]/50',
    warning: 'bg-gradient-to-r from-[#FFC857]/30 to-[#FFB347]/20 text-white border-[#FFC857]/50',
    danger: 'bg-gradient-to-r from-[#FF6B9D]/30 to-[#FF8FB3]/20 text-white border-[#FF6B9D]/50',
    info: 'bg-gradient-to-r from-[#4ECDC4]/30 to-[#5DD9D4]/20 text-white border-[#4ECDC4]/50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-2',
    md: 'px-4 py-2.5 text-sm gap-2.5',
    lg: 'px-5 py-3 text-base gap-3',
  };

  return (
    <div
      className={`
          inline-flex items-center ${sizes[size]} 
          ${variants[variant]}
          backdrop-blur-md rounded-full 
          border-2 shadow-lg
          font-futura font-semibold tracking-wide
          transition-all duration-300
          hover:scale-105 hover:shadow-xl
        `}
    >
      {icon && <span className="text-lg sm:text-xl drop-shadow-lg">{icon}</span>}
      <span className="opacity-90">{label}:</span>
      <span className="font-knockout font-bold tabular-nums tracking-wider">{value}</span>
    </div>
  );
}
