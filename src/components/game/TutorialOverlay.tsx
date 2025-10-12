'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { TutorialStep } from '@/lib/constants';

interface TutorialOverlayProps {
  isActive: boolean;
  currentStep: TutorialStep;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

export function TutorialOverlay({
  isActive,
  currentStep,
  stepNumber,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
}: TutorialOverlayProps) {
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  // Calcular posición del elemento destacado
  useEffect(() => {
    if (!isActive || !currentStep.target) {
      setHighlightRect(null);
      return;
    }

    const element = document.querySelector(currentStep.target);
    if (element) {
      const rect = element.getBoundingClientRect();
      setHighlightRect(rect);
    }
  }, [isActive, currentStep]);

  if (!isActive) return null;

  const isFirstStep = stepNumber === 0;
  const isLastStep = stepNumber === totalSteps - 1;
  const isCentered = currentStep.position === 'center' || !currentStep.target;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Overlay oscuro con recorte para highlight */}
      <div className="absolute inset-0 pointer-events-auto">
        {/* Fondo oscuro */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Recorte para elemento destacado */}
        {highlightRect && currentStep.highlight && (
          <div
            className="absolute border-4 border-[#FFD700] rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.8)] animate-pulse-slow pointer-events-none"
            style={{
              left: `${highlightRect.left - 8}px`,
              top: `${highlightRect.top - 8}px`,
              width: `${highlightRect.width + 16}px`,
              height: `${highlightRect.height + 16}px`,
            }}
          />
        )}
      </div>

      {/* Contenedor del tooltip */}
      <div
        className={`absolute pointer-events-auto ${
          isCentered
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            : getTooltipPosition(currentStep.position, highlightRect)
        }`}
      >
        <div
          className="bg-gradient-to-br from-[#FF6B35]/95 via-[#FF8C42]/95 to-[#FFA55F]/95 
                     backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-[#FFC857]/70 
                     p-6 max-w-md w-[90vw] sm:w-full animate-in zoom-in-95 duration-300 noise-bg"
        >
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-futura text-white/70 uppercase tracking-wide">
                Paso {stepNumber + 1} de {totalSteps}
              </span>
              <button
                onClick={onSkip}
                className="text-xs font-futura text-white/70 hover:text-white transition-colors uppercase tracking-wide"
              >
                Saltar Tutorial
              </button>
            </div>
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFC857] transition-all duration-300"
                style={{ width: `${((stepNumber + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Contenido */}
          <div className="mb-6">
            <h3 className="font-knockout text-2xl sm:text-3xl font-bold text-white mb-3 tracking-wider">
              {currentStep.title}
            </h3>
            <p className="font-futura text-white/90 text-base leading-relaxed">
              {currentStep.description}
            </p>

            {/* Indicador de acción */}
            {currentStep.action && currentStep.action !== 'none' && (
              <div className="mt-4 flex items-center gap-2 text-sm font-futura text-[#FFD700]">
                {currentStep.action === 'click' && (
                  <>
                    <span className="text-xl">👆</span>
                    <span>Prueba hacer click en una celda</span>
                  </>
                )}
                {currentStep.action === 'rightclick' && (
                  <>
                    <span className="text-xl">🖱️</span>
                    <span>Prueba hacer click derecho</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Botones de navegación */}
          <div className="flex gap-3">
            {!isFirstStep && (
              <Button
                onClick={onPrev}
                variant="secondary"
                className="flex-1 font-knockout text-base py-3"
              >
                ← Anterior
              </Button>
            )}
            <Button
              onClick={onNext}
              variant="primary"
              className="flex-1 font-knockout text-base py-3 shadow-lg"
            >
              {isLastStep ? '¡Empezar! 🚀' : 'Siguiente →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Función helper para calcular posición del tooltip
function getTooltipPosition(
  position: 'top' | 'bottom' | 'left' | 'right' | 'center' | undefined,
  rect: DOMRect | null
): string {
  if (!rect || !position || position === 'center') {
    return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
  }

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  switch (position) {
    case 'top':
      return `left-1/2 -translate-x-1/2`;
    case 'bottom':
      return `left-1/2 -translate-x-1/2 top-[calc(${rect.bottom}px+20px)]`;
    case 'left':
      return `top-1/2 -translate-y-1/2 right-[calc(100vw-${rect.left}px+20px)]`;
    case 'right':
      return `top-1/2 -translate-y-1/2 left-[calc(${rect.right}px+20px)]`;
    default:
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
  }
}
