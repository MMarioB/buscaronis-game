interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'active' | 'hint' | 'stats';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled,
  className = '',
}: ButtonProps) {
  const variants = {
    primary:
      'bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#FF8C42] hover:to-[#FFA55F] text-white shadow-lg hover:shadow-xl hover:shadow-[#FF6B35]/30',
    secondary:
      'bg-white/10 border-2 border-white/30 hover:bg-white/20 hover:border-[#FFC857]/60 text-white backdrop-blur-md shadow-md',
    active:
      'bg-gradient-to-r from-[#FFC857] to-[#FFB347] text-slate-900 shadow-xl shadow-[#FFC857]/50 scale-105 border-2 border-[#FFC857]',
    hint: 'bg-gradient-to-r from-[#4ECDC4] to-[#3BB5B0] hover:from-[#5DD9D4] hover:to-[#4ECDC4] text-white shadow-lg hover:shadow-xl hover:shadow-[#4ECDC4]/30',
    stats:
      'bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] hover:from-[#FF8FB3] hover:to-[#FFA5C3] text-white shadow-lg hover:shadow-xl hover:shadow-[#FF6B9D]/30',
  };

  const disabledClass = 'bg-gray-500 cursor-not-allowed opacity-50 text-gray-300 shadow-none';
  const baseClass =
    'px-6 py-3 rounded-full font-bold uppercase transition-all duration-300 hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:active:scale-100 tracking-wide relative overflow-hidden';
  const variantClass = disabled ? disabledClass : variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {!disabled && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></span>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
