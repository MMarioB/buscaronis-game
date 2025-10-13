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
 * Mejorado con detección de movimiento para evitar clicks en scroll
 */
export function useLongPress({ onLongPress, onClick, delay = 500 }: UseLongPressOptions) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);
  const preventClickRef = useRef(false); // Flag para prevenir click después de scroll

  const start = useCallback(() => {
    isLongPressRef.current = false;
    preventClickRef.current = false;

    // Iniciar timer para long press
    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      onLongPress();
    }, delay);
  }, [onLongPress, delay]);

  const cancel = useCallback((shouldPreventClick = false) => {
    // Limpiar timer si existe
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Si se canceló por movimiento, prevenir el click
    if (shouldPreventClick) {
      preventClickRef.current = true;
    }
  }, []);

  const end = useCallback(() => {
    // Si no fue long press, no hubo movimiento y hay onClick, ejecutarlo
    if (!isLongPressRef.current && !preventClickRef.current && onClick) {
      onClick();
    }
    cancel();

    // Reset del flag después de un pequeño delay
    setTimeout(() => {
      preventClickRef.current = false;
    }, 50);
  }, [onClick, cancel]);

  const move = useCallback(() => {
    // Cancelar y marcar que hubo movimiento
    cancel(true);
  }, [cancel]);

  return {
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: () => cancel(false),
    onTouchStart: start,
    onTouchEnd: end,
    onTouchMove: move,
  };
}
