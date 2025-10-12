'use client';

import React, { useEffect, useState } from 'react';

interface HeroProps {
  onPlayClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlayClick }) => {
  const [particles, setParticles] = useState<
    Array<{ id: number; left: number; delay: number; size: number }>
  >([]);

  useEffect(() => {
    // Generar partículas flotantes
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 25,
      size: Math.random() * 8 + 4,
    }));
    setParticles(newParticles);
  }, []);

  const handlePlayClick = () => {
    if (onPlayClick) {
      onPlayClick();
    } else {
      // Scroll por defecto si no se pasa la función
      const gameSection = document.getElementById('game-section');
      if (gameSection) {
        gameSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient">
      <div className="noise-bg"></div>

      <div className="absolute inset-0 vignette pointer-events-none"></div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          {/* Título principal - Responsive */}
          <h1 className="font-knockout text-[3rem] leading-none sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-wider mb-3 sm:mb-4 animate-neon-flicker">
            BUSCARONIS
          </h1>

          {/* Subtítulo con líneas decorativas */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-[2px] w-8 sm:w-16 md:w-24 bg-white/50"></div>
            <p className="font-knockout text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#FFC857] tracking-wide whitespace-nowrap">
              DESAFÍA EL MOMENTO
            </p>
            <div className="h-[2px] w-8 sm:w-16 md:w-24 bg-white/50"></div>
          </div>
        </div>

        {/* Descripción */}
        <p className="font-futura text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
          Juega, aprende sobre Ron Barceló y gana pases para{' '}
          <span className="font-bold text-[#4ECDC4]">Desalia</span>
        </p>

        {/* Botón CTA */}
        <button
          onClick={handlePlayClick}
          className="btn-primary group relative bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#FF8C42] hover:to-[#FF6B35] text-white font-knockout text-xl sm:text-2xl md:text-3xl px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-[0_0_40px_rgba(255,107,53,0.6)] tracking-wider mb-16 sm:mb-20"
        >
          JUGAR AHORA
          <span className="ml-2 sm:ml-3 inline-block transition-transform group-hover:translate-x-2">
            →
          </span>
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="font-futura text-white/70 text-xs sm:text-sm">Descubre más</span>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white/70"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative elements - Ocultos en móvil pequeño */}
      <div className="hidden sm:block absolute bottom-0 left-0 w-24 sm:w-32 h-48 sm:h-64 opacity-20 animate-sway">
        <div className="w-full h-full bg-gradient-to-t from-[#FF6B35] to-transparent rounded-t-full"></div>
      </div>
      <div className="hidden sm:block absolute bottom-0 right-0 w-24 sm:w-32 h-48 sm:h-64 opacity-20 animate-sway-delay">
        <div className="w-full h-full bg-gradient-to-t from-[#4ECDC4] to-transparent rounded-t-full"></div>
      </div>
    </section>
  );
};
