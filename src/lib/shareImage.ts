import { GameStats } from './types';

export async function generateShareImage(stats: GameStats): Promise<Blob> {
  try {
    const wrongAnswers = stats.totalQuestions - stats.correctAnswers;

    const params = new URLSearchParams({
      score: stats.score.toString(),
      correct: stats.correctAnswers.toString(),
      wrong: wrongAnswers.toString(),
      time: formatTime(stats.timer),
      streak: stats.streak.toString(),
    });

    const response = await fetch(`/api/generate-image?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    return await response.blob();
  } catch (error) {
    console.error('Error generating share image:', error);
    throw error;
  }
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
