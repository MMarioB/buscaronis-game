'use client';

import { useState } from 'react';
import type { Achievement } from '@/lib/types';

// ✅ EXPORTAR la interfaz
export interface ShareConfig {
  score: number;
  accuracy: number;
  difficulty: string;
  timeElapsed: number;
  unlockedAchievements?: Achievement[];
  appUrl?: string;
}

/**
 * Genera una imagen premium para compartir en RRSS
 */
function generateShareImage(config: ShareConfig): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    canvas.width = 1200;
    canvas.height = 630;

    // ===================================
    // 1. FONDO: Gradiente Desalía Premium
    // ===================================
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#FF6B35');
    gradient.addColorStop(0.5, '#F7931E');
    gradient.addColorStop(1, '#FFA500');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ===================================
    // 2. OVERLAY: Patrón sutil
    // ===================================
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 100 + 50;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // ===================================
    // 3. HEADER: Título
    // ===================================
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.font = 'bold 56px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 4;
    ctx.fillText('🍹 BUSCARONIS', canvas.width / 2, 100);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '32px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Ron Barceló × Desalía', canvas.width / 2, 150);
    ctx.restore();

    // ===================================
    // 4. SCORE GIGANTE
    // ===================================
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 10;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 320, 140, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#FF6B35';
    ctx.font = 'bold 120px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(config.score.toString(), canvas.width / 2, 320);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PUNTOS', canvas.width / 2, 420);
    ctx.restore();

    // ===================================
    // 5. STATS BAR
    // ===================================
    const statsY = 500;
    const statsSpacing = 400;

    // Precisión
    ctx.save();
    const accuracyX = canvas.width / 2 - statsSpacing / 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 15;
    roundRect(ctx, accuracyX - 100, statsY - 35, 200, 70, 15);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FF6B35';
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`🎯 ${config.accuracy}%`, accuracyX, statsY);
    ctx.restore();

    // Dificultad
    ctx.save();
    const difficultyX = canvas.width / 2 + statsSpacing / 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 15;

    const diffText = config.difficulty.toUpperCase();
    const diffWidth = ctx.measureText(`⚡ ${diffText}`).width + 40;
    roundRect(ctx, difficultyX - diffWidth / 2, statsY - 35, diffWidth, 70, 15);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FF6B35';
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`⚡ ${diffText}`, difficultyX, statsY);
    ctx.restore();

    // ===================================
    // 6. FOOTER
    // ===================================
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '28px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('¿Puedes superarme? 🏆', canvas.width / 2, 590);
    ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        }
      },
      'image/png',
      1.0
    );
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function generateShareText(config: ShareConfig): string {
  const { score, accuracy, difficulty, unlockedAchievements } = config;

  let text = `🏆 ¡${score} puntos en BuscaRonis!\n\n`;
  text += `🎯 Precisión: ${accuracy}%\n`;
  text += `⚡ Dificultad: ${difficulty.toUpperCase()}\n`;

  if (unlockedAchievements && unlockedAchievements.length > 0) {
    text += `\n🏅 Logros desbloqueados: ${unlockedAchievements.length}\n`;
  }

  text += `\n¿Puedes superarme? 🍹\n`;
  text += `\n#Desalía #RonBarceló #BuscaRonis`;

  return text;
}

// ✅ EXPORTAR el hook
export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const shareResult = async (config: ShareConfig): Promise<boolean> => {
    try {
      setIsSharing(true);

      const text = generateShareText(config);
      const imageUrl = await generateShareImage(config);

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'buscaronis-score.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          text,
          files: [file],
          url: config.appUrl || window.location.href,
        });
        return true;
      } else if (navigator.share) {
        await navigator.share({
          text,
          url: config.appUrl || window.location.href,
        });
        return true;
      } else {
        await navigator.clipboard.writeText(text + '\n' + (config.appUrl || window.location.href));

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'buscaronis-score.png';
        link.click();

        return true;
      }
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  return {
    shareResult,
    isSharing,
  };
}
