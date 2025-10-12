'use client';
import { useState } from 'react';

export interface Achievement {
  id: string;
  name: string;
  emoji: string;
}

export interface ShareConfig {
  score: number;
  accuracy: number;
  difficulty: string;
  unlockedAchievements?: Achievement[];
  appUrl?: string;
  logoUrl?: string;
}

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

const STYLE_CONFIG = {
  background: {
    gradient: ['#F99B2A', '#E65C00'],
    bubbleColors: [
      'rgba(255, 255, 255, 0.03)',
      'rgba(255, 255, 255, 0.05)',
      'rgba(255, 255, 255, 0.08)',
    ],
    vignetteColor: 'rgba(0, 0, 0, 0.4)',
  },
  header: {
    font: '900 80px var(--font-knockout), system-ui, sans-serif',
    gradient: ['#FFFFFF', '#FFDDC4'],
    shadow: 'rgba(0, 0, 0, 0.4)',
    stroke: 'rgba(0,0,0,0.25)',
  },
  subheader: {
    font: '40px var(--font-futura), system-ui, sans-serif',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  score: {
    font: '900 150px var(--font-knockout), system-ui, sans-serif',
    color: '#FFFFFF',
    labelFont: 'bold 36px var(--font-futura), system-ui, sans-serif',
    labelColor: 'rgba(255, 255, 255, 0.8)',
    circleGradient: ['#EE7752', '#E73C7E'],
    circleBezelColor: 'rgba(255, 255, 255, 0.5)',
    innerShadow: 'rgba(0, 0, 0, 0.4)',
    shineColor: 'rgba(255, 255, 255, 0.6)',
  },
  badges: {
    font: 'bold 42px var(--font-futura), system-ui, sans-serif',
    color: '#FFFFFF',
    difficultyFont: 'bold 38px var(--font-futura), system-ui, sans-serif',
    iconFont: '52px system-ui, -apple-system, sans-serif',
    backgroundGradient: ['#FF8C42', '#FF6B35'],
    shadow: 'rgba(0, 0, 0, 0.25)',
    innerStroke: 'rgba(255, 255, 255, 0.2)',
  },
  footer: {
    font: 'bold 36px var(--font-futura), system-ui, sans-serif',
    color: 'rgba(255, 255, 255, 0.95)',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
};

/**
 * Dibuja un rectángulo con esquinas redondeadas. (Sin cambios)
 */
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

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas;
  const { background } = STYLE_CONFIG;

  // Gradiente principal
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, background.gradient[0]);
  gradient.addColorStop(1, background.gradient[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Burbujas para dar profundidad y dinamismo
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 80 + 20;
    const color =
      background.bubbleColors[Math.floor(Math.random() * background.bubbleColors.length)];

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.filter = `blur(${Math.random() * 10 + 5}px)`; // desenfoque para efecto bokeh
    ctx.fill();
    ctx.filter = 'none';
  }

  // Viñeta
  const radial = ctx.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    width * 0.7
  );
  radial.addColorStop(0.5, 'rgba(0,0,0,0)');
  radial.addColorStop(1, background.vignetteColor);
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, width, height);
}

function drawHeader(ctx: CanvasRenderingContext2D) {
  const { width } = ctx.canvas;
  const { header, subheader } = STYLE_CONFIG;
  const headerY = 100;

  ctx.save();
  ctx.font = header.font;
  ctx.textAlign = 'center';

  // Gradiente para el texto
  const textGradient = ctx.createLinearGradient(0, headerY - 80, 0, headerY);
  textGradient.addColorStop(0, header.gradient[0]);
  textGradient.addColorStop(1, header.gradient[1]);
  ctx.fillStyle = textGradient;

  ctx.shadowColor = header.shadow;
  ctx.shadowBlur = 15;
  ctx.shadowOffsetY = 5;

  ctx.strokeStyle = header.stroke;
  ctx.lineWidth = 2;
  ctx.strokeText('🍹 BUSCARONIS', width / 2, headerY);
  ctx.fillText('🍹 BUSCARONIS', width / 2, headerY);
  ctx.restore();

  ctx.save();
  ctx.font = subheader.font;
  ctx.textAlign = 'center';
  ctx.fillStyle = subheader.color;
  ctx.fillText('Ron Barceló × Desalía', width / 2, 155);
  ctx.restore();
}

function drawScoreCircle(ctx: CanvasRenderingContext2D, score: number) {
  const { width } = ctx.canvas;
  const { score: style } = STYLE_CONFIG;
  const centerX = width / 2;
  const centerY = 330;
  const radius = 150;

  // Sombra proyectada del círculo
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 15;
  ctx.fill();
  ctx.restore();

  // Cuerpo del círculo con gradiente
  const circleGrad = ctx.createLinearGradient(centerX, centerY - radius, centerX, centerY + radius);
  circleGrad.addColorStop(0, style.circleGradient[1]);
  circleGrad.addColorStop(1, style.circleGradient[0]);
  ctx.fillStyle = circleGrad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Borde (bisel) para dar efecto 3D
  ctx.strokeStyle = style.circleBezelColor;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Sombra interior
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.clip(); // Limita el dibujo al interior del círculo
  ctx.shadowColor = style.innerShadow;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.stroke();
  ctx.restore();

  // Reflejo superior
  ctx.save();
  const shineGrad = ctx.createLinearGradient(0, centerY - radius, 0, centerY);
  shineGrad.addColorStop(0, style.shineColor);
  shineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = shineGrad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 3, Math.PI * 1.1, Math.PI * 1.9);
  ctx.fill();
  ctx.restore();

  // Texto de puntuación
  ctx.fillStyle = style.color;
  ctx.font = style.font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 10;
  ctx.fillText(score.toString(), centerX, centerY - 10);

  // Etiqueta "PUNTOS"
  ctx.fillStyle = style.labelColor;
  ctx.font = style.labelFont;
  ctx.fillText('PUNTOS', centerX, centerY + 70);
}

function drawStatBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  icon: string,
  text: string,
  isDifficulty = false
) {
  const { badges: style } = STYLE_CONFIG;
  const width = 250;
  const height = 85;
  const radius = 42.5; // Totalmente redondeado

  ctx.save();
  // Sombra del badge
  ctx.shadowColor = style.shadow;
  ctx.shadowBlur = 15;
  ctx.shadowOffsetY = 5;

  // Fondo con gradiente
  const badgeGrad = ctx.createLinearGradient(x - width / 2, y, x + width / 2, y);
  badgeGrad.addColorStop(0, style.backgroundGradient[0]);
  badgeGrad.addColorStop(1, style.backgroundGradient[1]);
  ctx.fillStyle = badgeGrad;

  roundRect(ctx, x - width / 2, y - height / 2, width, height, radius);
  ctx.fill();
  ctx.shadowColor = 'transparent'; // Resetear sombra para el borde

  // Borde interior sutil
  ctx.strokeStyle = style.innerStroke;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // Contenido (Icono y Texto)
  const iconX = x - 65;
  const textX = x + 20;

  ctx.font = style.iconFont;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = style.color;
  ctx.fillText(icon, iconX, y);

  ctx.font = isDifficulty ? style.difficultyFont : style.font;
  ctx.fillText(text, textX, y);
}

async function drawFooter(ctx: CanvasRenderingContext2D, logoUrl?: string) {
  const { width, height } = ctx.canvas;
  const { footer } = STYLE_CONFIG;

  if (logoUrl) {
    try {
      const logo = await loadImage(logoUrl);
      const logoHeight = 40;
      const logoWidth = (logo.width / logo.height) * logoHeight;
      ctx.drawImage(logo, width / 2 - logoWidth / 2, height - 100, logoWidth, logoHeight);
    } catch (error) {
      console.error('No se pudo cargar el logo:', error);
    }
  }

  ctx.save();
  ctx.fillStyle = footer.color;
  ctx.font = footer.font;
  ctx.textAlign = 'center';
  ctx.shadowColor = footer.shadow;
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 4;
  ctx.fillText('¿PUEDES SUPERARME? 🏆', width / 2, height - 40);
  ctx.restore();
}

function generateShareImage(config: ShareConfig): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      await document.fonts.ready;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No se pudo obtener el contexto 2D.');

      canvas.width = IMAGE_WIDTH;
      canvas.height = IMAGE_HEIGHT;

      // Secuencia de dibujado
      drawBackground(ctx);
      drawHeader(ctx);
      drawScoreCircle(ctx, config.score);

      const badgeY = 515;
      const badgeSpacing = 380;
      drawStatBadge(ctx, IMAGE_WIDTH / 2 - badgeSpacing / 2, badgeY, '🎯', `${config.accuracy}%`);
      drawStatBadge(
        ctx,
        IMAGE_WIDTH / 2 + badgeSpacing / 2,
        badgeY,
        '⚡️',
        config.difficulty.toUpperCase(),
        true
      );

      // El footer ahora es asíncrono por la carga del logo
      await drawFooter(ctx, config.logoUrl);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(URL.createObjectURL(blob));
          else reject(new Error('La creación del blob falló.'));
        },
        'image/png',
        0.95 // Un poco de compresión casi no se nota y reduce el tamaño del archivo
      );
    } catch (error) {
      reject(error);
    }
  });
}

function generateShareText(config: ShareConfig): string {
  const { score, accuracy, difficulty } = config;

  let text = `🏆 ¡He conseguido ${score} puntos en BuscaRonis!\n\n`;
  text += `🎯 Precisión: ${accuracy}%\n`;
  text += `⚡ Dificultad: ${difficulty.toUpperCase()}\n\n`;
  text += `¿Puedes superarme? ¡Juega ahora! 🍹\n`;
  text += `\n#Desalía #RonBarceló #BuscaRonis`;

  return text;
}

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const shareResult = async (config: ShareConfig): Promise<boolean> => {
    setIsSharing(true);
    try {
      const fullConfig = {
        ...config,
        logoUrl: config.logoUrl || 'https://via.placeholder.com/150x50/FFFFFF/000000?Text=TU+LOGO',
      };
      const text = generateShareText(fullConfig);
      const imageUrl = await generateShareImage(fullConfig);

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'buscaronis-score.png', { type: 'image/png' });
      const shareUrl = config.appUrl || window.location.href;

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ text, files: [file], url: shareUrl });
        return true;
      }
      if (navigator.share) {
        await navigator.share({ text, url: shareUrl });
        return true;
      }

      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'buscaronis-score.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('¡Resultado copiado! La imagen se está descargando.');
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log('El usuario canceló la acción de compartir.');
        return false;
      }
      console.error('Error al compartir:', error);
      alert('Hubo un error al intentar compartir.');
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  return { shareResult, isSharing };
}
