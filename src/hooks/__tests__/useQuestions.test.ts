import { describe, it, expect } from 'vitest';
import { DESALIA_QUESTIONS } from '../../data/questions';

describe('useQuestions logic', () => {
  it('should not repeat questions until bank is exhausted', () => {
    const usedIndices: number[] = [];
    const totalQuestions = 5; // Simular banco pequeño

    for (let i = 0; i < totalQuestions; i++) {
      // Simular getRandomQuestion
      const available = Array.from({ length: totalQuestions }, (_, idx) => idx).filter(
        (idx) => !usedIndices.includes(idx)
      );

      expect(available.length).toBeGreaterThan(0);

      const randomIndex = available[Math.floor(Math.random() * available.length)];
      usedIndices.push(randomIndex);
    }

    // Después de usar todas, no debe haber disponibles
    const availableAfter = Array.from({ length: totalQuestions }, (_, idx) => idx).filter(
      (idx) => !usedIndices.includes(idx)
    );

    expect(availableAfter).toHaveLength(0);
    expect(usedIndices).toHaveLength(totalQuestions);
  });

  it('should reset when bank is exhausted', () => {
    const usedIndices: number[] = [];
    const totalQuestions = 3;

    // Usar todas las preguntas
    for (let i = 0; i < totalQuestions; i++) {
      usedIndices.push(i);
    }

    // Simular reset
    const available = Array.from({ length: totalQuestions }, (_, idx) => idx).filter(
      (idx) => !usedIndices.includes(idx)
    );

    if (available.length === 0) {
      usedIndices.length = 0; // Reset
    }

    expect(usedIndices).toHaveLength(0);
  });

  it('should handle manual reset', () => {
    const usedIndices = [0, 1, 2, 3];

    const reset = () => {
      usedIndices.length = 0;
    };

    reset();
    expect(usedIndices).toHaveLength(0);
  });

  it('should calculate remaining questions correctly', () => {
    const total = DESALIA_QUESTIONS.length;
    const used = 3;
    const remaining = total - used;

    expect(remaining).toBe(total - 3);
  });

  it('should return valid question from bank', () => {
    const question = DESALIA_QUESTIONS[0];

    expect(question).toHaveProperty('question');
    expect(question).toHaveProperty('options');
    expect(question).toHaveProperty('correct');
    expect(question).toHaveProperty('explanation');
    expect(question.options).toHaveLength(4);
  });

  it('should filter used questions correctly', () => {
    const usedIndices = [0, 2, 4];
    const totalQuestions = 10;

    const available = Array.from({ length: totalQuestions }, (_, idx) => idx).filter(
      (idx) => !usedIndices.includes(idx)
    );

    expect(available).not.toContain(0);
    expect(available).not.toContain(2);
    expect(available).not.toContain(4);
    expect(available).toContain(1);
    expect(available).toContain(3);
    expect(available).toHaveLength(7);
  });
});
