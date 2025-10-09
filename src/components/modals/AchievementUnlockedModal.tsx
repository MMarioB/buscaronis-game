'use client';

import React, { useEffect, useState } from 'react';
import { Achievement } from '@/lib/types';
import { Button } from '../ui/Button';

interface AchievementUnlockedModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementUnlockedModal({ achievement, onClose }: AchievementUnlockedModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
    }
  }, [achievement]);

  if (!achievement) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Esperar animación
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative max-w-md w-full bg-gradient-to-br from-[#FFC857] via-[#FF8C42] to-[#FF6B35] rounded-3xl shadow-2xl border-4 border-white/30 overflow-hidden transition-all duration-500 ${
          isVisible ? 'scale-100 rotate-0' : 'scale-50 rotate-12'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-[url('/images/fireworks-1.png')] opacity-10 animate-pulse"></div>
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 animate-pulse"></div>

        {/* Contenido */}
        <div className="relative z-10 p-8 text-center">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full mb-4">
              <span className="text-sm font-knockout font-bold text-white uppercase tracking-wider">
                🎉 ¡Logro Desbloqueado!
              </span>
            </div>
          </div>

          {/* Icono del logro */}
          <div className="mb-6 animate-bounce">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/40 shadow-2xl">
              <span className="text-7xl drop-shadow-2xl">{achievement.icon}</span>
            </div>
          </div>

          {/* Título y descripción */}
          <div className="mb-6">
            <h2 className="font-knockout text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg uppercase tracking-wide">
              {achievement.title}
            </h2>
            <p className="font-futura text-lg text-white/90 drop-shadow-md">
              {achievement.description}
            </p>
          </div>

          {/* Botón */}
          <Button
            onClick={handleClose}
            variant="primary"
            className="font-knockout px-8 py-3 text-lg tracking-wider bg-white text-[#FF6B35] hover:bg-white/90 border-2 border-white/50 shadow-xl"
          >
            ¡GENIAL!
          </Button>
        </div>

        {/* Decoraciones */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse delay-75"></div>
      </div>
    </div>
  );
}
