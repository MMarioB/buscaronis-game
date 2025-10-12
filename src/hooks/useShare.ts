'use client';
import { useState } from 'react';

export interface ShareConfig {
  score: number;
  accuracy: number;
  difficulty: string;
  appUrl?: string;
}

function generateShareText(config: ShareConfig): string {
  const { score, accuracy, difficulty } = config;
  let text = `🏆 ¡He conseguido ${score} puntos en #BuscaRonis!\n\n`;
  text += `🎯 Precisión: ${accuracy}%\n`;
  text += `⚡ Dificultad: ${difficulty.toUpperCase()}\n\n`;
  text += `¿Puedes superar mi puntuación? ¡Juega ahora en Desalía! 🍹\n`;
  text += `\n#Desalía #RonBarceló`;
  return text;
}

/**
 * Hook para gestionar la lógica de compartir.
 */
export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const shareResult = async (config: ShareConfig): Promise<boolean> => {
    setIsSharing(true);
    try {
      const text = generateShareText(config);
      const imageUrl = `/api/generate-image?score=${config.score}&accuracy=${config.accuracy}&difficulty=${config.difficulty.toUpperCase()}`;

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'buscaronis-score.png', { type: 'image/png' });
      const shareUrl = config.appUrl || window.location.href;

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ text, files: [file], url: shareUrl });
      } else if (navigator.share) {
        await navigator.share({ text, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'buscaronis-score.png';
        link.click();
        link.remove();
        alert('¡Resultado copiado! La imagen se está descargando.');
      }
      return true;
    } catch (error) {
      console.error('Error al compartir:', error);
      alert('Hubo un error al intentar compartir.');
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  return { shareResult, isSharing };
}
