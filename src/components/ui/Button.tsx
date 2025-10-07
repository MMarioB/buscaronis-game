// src/components/ui/Button.tsx
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
      'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white',
    secondary:
      'bg-white/20 border-2 border-orange-400/50 hover:bg-white/30 text-white backdrop-blur-sm',
    active:
      'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 shadow-lg shadow-orange-500/50 scale-105',
    hint: 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white',
    stats:
      'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white',
  };

  const disabledClass = 'bg-gray-500 cursor-not-allowed opacity-50 text-gray-300';
  const baseClass =
    'px-6 py-3 rounded-full font-bold uppercase transition-all shadow-lg hover:scale-105 disabled:hover:scale-100 tracking-wide';
  const variantClass = disabled ? disabledClass : variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}
