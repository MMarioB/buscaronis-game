'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'buscaronis_mobile_tip_shown';

export function MobileTip() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      return window.innerWidth < 1024 && 'ontouchstart' in window;
    };

    setIsMobile(checkMobile());

    // Verificar si ya se mostró el tip
    const tipShown = localStorage.getItem(STORAGE_KEY);

    if (!tipShown && checkMobile()) {
      // Mostrar después de 1 segundo para no abrumar
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }

    // Actualizar en resize
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleGotIt = () => {
    handleClose();
  };

  // Auto-cerrar después de 8 segundos
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // No mostrar si no es móvil o ya se mostró
  if (!isMobile || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Backdrop oscuro */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />

      {/* Modal del tip */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto bg-gradient-to-br from-[#FF6B35] via-[#FF8C42] to-[#FFA55F] rounded-2xl shadow-2xl max-w-sm w-full p-6 border-2 border-[#FFC857] animate-in zoom-in-95 duration-300">
          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Contenido */}
          <div className="text-center">
            {/* Icono grande */}
            <div className="text-6xl mb-4 animate-bounce">📱</div>

            {/* Título */}
            <h3 className="font-knockout text-2xl font-black text-white mb-3 uppercase tracking-wider">
              ¡Tip Móvil!
            </h3>

            {/* Instrucciones */}
            <div className="space-y-3 mb-6 text-white/90 font-futura">
              <div className="flex items-start gap-3 text-left bg-white/10 rounded-lg p-3">
                <span className="text-2xl flex-shrink-0">👆</span>
                <div>
                  <p className="font-semibold">Toca rápido</p>
                  <p className="text-sm text-white/80">Para revelar una celda</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left bg-white/10 rounded-lg p-3">
                <span className="text-2xl flex-shrink-0">⏱️</span>
                <div>
                  <p className="font-semibold">Mantén presionado</p>
                  <p className="text-sm text-white/80">Para colocar bandera 🏁</p>
                </div>
              </div>
            </div>

            {/* Botón de acción */}
            <button
              onClick={handleGotIt}
              className="w-full bg-white hover:bg-white/90 text-[#FF6B35] font-knockout font-bold text-lg py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg uppercase tracking-wide"
            >
              ¡Entendido! 🎮
            </button>

            {/* Texto pequeño */}
            <p className="text-xs text-white/70 mt-3">Este mensaje solo se muestra una vez</p>
          </div>
        </div>
      </div>
    </>
  );
}
