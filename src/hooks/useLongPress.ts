'use client';

import { useCallback, useRef } from 'react';

interface UseLongPressOptions {
  onLongPress: () => void;
  onClick?: () => void;
  delay?: number; // ms para considerar long press
}

/**
 * Hook para detectar long press (mantener presionado)
 * Útil para móviles donde no hay click derecho
 */
export function useLongPress({ onLongPress, onClick, delay = 500 }: UseLongPressOptions) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  const start = useCallback(() => {
    isLongPressRef.current = false;

    // Iniciar timer para long press
    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      onLongPress();
    }, delay);
  }, [onLongPress, delay]);

  const cancel = useCallback(() => {
    // Limpiar timer si existe
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const end = useCallback(() => {
    // Si no fue long press y hay onClick, ejecutarlo
    if (!isLongPressRef.current && onClick) {
      onClick();
    }
    cancel();
  }, [onClick, cancel]);

  return {
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: end,
    onTouchMove: cancel, // Cancelar si el usuario mueve el dedo
  };
}
