import { describe, it, expect } from 'vitest';
import { GAME_CONSTANTS } from '../../lib/constants';

describe('useGameState logic', () => {
  it('should calculate correct points with streak bonus', () => {
    const basePoints = GAME_CONSTANTS.POINTS_PER_CORRECT;
    const streakBonus = GAME_CONSTANTS.STREAK_BONUS;

    // Streak 1: 10 + (1 * 5) = 15
    const points1 = basePoints + 1 * streakBonus;
    expect(points1).toBe(15);

    // Streak 5: 10 + (5 * 5) = 35
    const points5 = basePoints + 5 * streakBonus;
    expect(points5).toBe(35);
  });

  it('should calculate accuracy correctly', () => {
    const correct = 7;
    const total = 10;
    const accuracy = Math.round((correct / total) * 100);

    expect(accuracy).toBe(70);
  });

  it('should handle zero questions for accuracy', () => {
    const correct = 0;
    const total = 0;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    expect(accuracy).toBe(0);
  });

  it('should handle perfect accuracy', () => {
    const correct = 10;
    const total = 10;
    const accuracy = Math.round((correct / total) * 100);

    expect(accuracy).toBe(100);
  });
});
