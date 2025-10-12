'use client';

import { useState } from 'react';
import type { Achievement } from '@/lib/types';

export interface ShareConfig {
  score: number;
  accuracy: number;
  difficulty: string;
  timeElapsed: number;
  unlockedAchievements?: Achievement[];
  appUrl?: string;
}

/**
 * Genera imagen ÉPICA para compartir (1200x630px)
 */
function generateShareImage(config: ShareConfig): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    canvas.width = 1200;
    canvas.height = 630;

    // ===================================
    // 1. FONDO: Gradiente + textura
    // ===================================
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#FF8C42');
    gradient.addColorStop(0.5, '#FF6B35');
    gradient.addColorStop(1, '#FFA55F');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Textura con círculos grandes
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 200 + 100;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Overlay de viñeta
    const radial = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width * 0.7
    );
    radial.addColorStop(0, 'rgba(0, 0, 0, 0)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ===================================
    // 2. HEADER con emoji patito
    // ===================================
    ctx.save();
    ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 5;
    ctx.fillText('🍹 BUSCARONIS', canvas.width / 2, 100);
    ctx.restore();

    // Subtítulo
    ctx.save();
    ctx.font = '36px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText('Ron Barceló × Desalía', canvas.width / 2, 155);
    ctx.restore();

    // ===================================
    // 3. SCORE GIGANTE - Círculo 3D
    // ===================================
    const centerX = canvas.width / 2;
    const centerY = 330;
    const radius = 150;

    // Sombra exterior del círculo
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(centerX + 5, centerY + 10, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Círculo principal con gradiente
    ctx.save();
    const circleGradient = ctx.createRadialGradient(
      centerX - 30,
      centerY - 30,
      0,
      centerX,
      centerY,
      radius
    );
    circleGradient.addColorStop(0, '#FFFFFF');
    circleGradient.addColorStop(1, '#F5F5F5');
    ctx.fillStyle = circleGradient;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 15;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Borde del círculo
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 107, 53, 0.3)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Score número - GIGANTE
    ctx.save();
    ctx.fillStyle = '#FF6B35';
    ctx.font = 'bold 140px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 5;
    ctx.fillText(config.score.toString(), centerX, centerY - 10);
    ctx.restore();

    // Label "PUNTOS"
    ctx.save();
    ctx.fillStyle = '#FF8C42';
    ctx.font = 'bold 32px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PUNTOS', centerX, centerY + 60);
    ctx.restore();

    // ===================================
    // 4. BADGES - Precisión y Dificultad
    // ===================================
    const badgeY = 530;
    const badgeSpacing = 350;

    // Badge PRECISIÓN (izquierda)
    const accuracyX = canvas.width / 2 - badgeSpacing / 2;

    // Fondo del badge con sombra
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;
    roundRect(ctx, accuracyX - 120, badgeY - 40, 240, 80, 20);
    ctx.fill();
    ctx.restore();

    // Borde del badge
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 107, 53, 0.3)';
    ctx.lineWidth = 3;
    roundRect(ctx, accuracyX - 120, badgeY - 40, 240, 80, 20);
    ctx.stroke();
    ctx.restore();

    // Icono y texto de precisión
    ctx.save();
    ctx.font = '48px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎯', accuracyX - 65, badgeY);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#FF6B35';
    ctx.font = 'bold 40px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${config.accuracy}%`, accuracyX + 30, badgeY);
    ctx.restore();

    // Badge DIFICULTAD (derecha)
    const difficultyX = canvas.width / 2 + badgeSpacing / 2;
    const diffText = config.difficulty.toUpperCase();

    // Fondo del badge
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;
    roundRect(ctx, difficultyX - 120, badgeY - 40, 240, 80, 20);
    ctx.fill();
    ctx.restore();

    // Borde del badge
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 107, 53, 0.3)';
    ctx.lineWidth = 3;
    roundRect(ctx, difficultyX - 120, badgeY - 40, 240, 80, 20);
    ctx.stroke();
    ctx.restore();

    // Icono y texto de dificultad
    ctx.save();
    ctx.font = '48px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡', difficultyX - 50, badgeY);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#FF6B35';
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(diffText, difficultyX + 30, badgeY);
    ctx.restore();

    // ===================================
    // 5. FOOTER - Call to action con emoji
    // ===================================
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 32px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.fillText('¿Puedes superarme? 🏆', canvas.width / 2, 240);
    ctx.restore();

    // Convertir a blob
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
