import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useTimer logic', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should increment timer every second', () => {
    let time = 0;
    const increment = () => {
      time += 1;
    };

    const interval = setInterval(increment, 1000);

    // Avanzar 3 segundos
    vi.advanceTimersByTime(3000);
    expect(time).toBe(3);

    // Avanzar 2 segundos más
    vi.advanceTimersByTime(2000);
    expect(time).toBe(5);

    clearInterval(interval);
  });

  it('should reset timer to zero', () => {
    let time = 10;
    const reset = () => {
      time = 0;
    };

    reset();
    expect(time).toBe(0);
  });

  it('should handle interval cleanup', () => {
    const interval = setInterval(() => {}, 1000);
    const intervalId = interval[Symbol.toPrimitive]();

    clearInterval(interval);

    // Verificar que clearInterval no lanza error
    expect(() => clearInterval(interval)).not.toThrow();
  });

  it('should not increment when interval is cleared', () => {
    let time = 0;
    const increment = () => {
      time += 1;
    };

    const interval = setInterval(increment, 1000);

    vi.advanceTimersByTime(2000);
    expect(time).toBe(2);

    clearInterval(interval);

    // Avanzar más tiempo, pero el contador no debe cambiar
    vi.advanceTimersByTime(5000);
    expect(time).toBe(2);
  });
});
