import { useState } from 'react';
import { GameStats, Achievement, PlayerRank, Difficulty } from '@/lib/types';
import { generateShareImage } from '@/lib/shareImage';
import { generateShareText, gameStatsToShareConfig } from '@/lib/shareTemplates';

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const shareResults = async (
    stats: GameStats,
    difficulty: Difficulty = 'medium',
    achievement?: Achievement,
    rank?: PlayerRank
  ) => {
    setIsSharing(true);

    try {
      const shareConfig = gameStatsToShareConfig(stats, difficulty, achievement, rank);
      const shareText = generateShareText(shareConfig);

      // Si Web Share API está disponible y soporta archivos
      if (navigator.share && navigator.canShare) {
        try {
          const imageBlob = await generateShareImage(stats);
          const file = new File([imageBlob], 'buscaronis-results.png', {
            type: 'image/png',
          });

          const shareData = {
            text: shareText,
            files: [file],
          };

          // Verificar si se pueden compartir archivos
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return { success: true, method: 'native' as const };
          }
        } catch (error) {
          console.log('Could not share with image, trying text only:', error);
        }

        // Fallback: compartir solo texto
        try {
          await navigator.share({
            text: shareText,
            url: window.location.origin,
          });
          return { success: true, method: 'native' as const };
        } catch (error) {
          console.log('Native share cancelled or failed:', error);
        }
      }

      // Fallback final: copiar al portapapeles
      await navigator.clipboard.writeText(shareText);
      return { success: true, method: 'copy' as const };
    } catch (error) {
      console.error('Error sharing:', error);
      return {
        success: false,
        method: 'failed' as const,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    } finally {
      setIsSharing(false);
    }
  };

  const downloadImage = async (stats: GameStats) => {
    setIsSharing(true);

    try {
      const imageBlob = await generateShareImage(stats);
      const url = URL.createObjectURL(imageBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `buscaronis-${stats.score}-puntos.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      return { success: true, method: 'download' as const };
    } catch (error) {
      console.error('Error downloading image:', error);
      return {
        success: false,
        method: 'failed' as const,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    } finally {
      setIsSharing(false);
    }
  };

  return {
    shareResults,
    downloadImage,
    isSharing,
  };
}
