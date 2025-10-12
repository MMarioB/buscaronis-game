'use client';

import { useSound } from '@/hooks/useSound';

interface SoundToggleProps {
  className?: string;
}

export function SoundToggle({ className = '' }: SoundToggleProps) {
  const { isEnabled, toggleSound, play } = useSound();

  const handleToggle = () => {
    toggleSound();
    // Si estamos activando, reproducir sonido de confirmación
    if (!isEnabled) {
      setTimeout(() => {
        play('click');
      }, 100);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        p-3 rounded-lg transition-all duration-200
        ${
          isEnabled
            ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
            : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
        }
        ${className}
      `}
      title={isEnabled ? 'Desactivar sonidos' : 'Activar sonidos'}
      aria-label={isEnabled ? 'Desactivar sonidos' : 'Activar sonidos'}
    >
      <span className="text-2xl">{isEnabled ? '🔊' : '🔇'}</span>
    </button>
  );
}
