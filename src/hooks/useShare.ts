'use client';
import { useState } from 'react';

export interface ShareConfig {
  score: number;
  accuracy: number;
  difficulty: string;
  appUrl?: string;
}

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

const STYLE_CONFIG = {
  background: {
    gradient: ['#23053A', '#000000'],
    noiseOpacity: 0.04,
    palmColor: 'rgba(231, 60, 126, 0.5)',
  },
  header: {
    font: '900 90px Knockout, system-ui, sans-serif',
    color: '#FFFFFF',
    glowColor: '#FF6B9D',
  },
  subheader: {
    font: '40px Futura, system-ui, sans-serif',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  score: {
    font: '900 160px Knockout, system-ui, sans-serif',
    color: '#FFFFFF',
    labelFont: 'bold 38px Futura, system-ui, sans-serif',
    labelColor: 'rgba(255, 255, 255, 0.7)',
    circleColor: '#FF6B9D',
  },
  badges: {
    font: 'bold 44px Futura, system-ui, sans-serif',
    color: '#FFFFFF',
    iconFont: '54px system-ui, sans-serif',
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
    borderColor: '#FF6B9D',
    glowColor: '#FF6B9D',
  },
  footer: {
    font: 'bold 40px Futura, system-ui, sans-serif',
    color: '#FFFFFF',
    glowColor: '#4ECDC4',
  },
};

/**
 * Dibuja un rectángulo con esquinas redondeadas.
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

/**
 * Carga una imagen de forma asíncrona.
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadFonts() {
  const knockoutFont = new FontFace(
    'Knockout',
    'url(src/app/fonts/Knockout-HTF72-FullCruiserwt.woff2)'
  );
  const futuraFont = new FontFace('Futura', 'url(src/app/fonts/futura.woff2)');

  await Promise.all([knockoutFont.load(), futuraFont.load()]);

  document.fonts.add(knockoutFont);
  document.fonts.add(futuraFont);
}

/**
 * Dibuja el fondo oscuro, con ruido y palmeras.
 */
async function drawBackground(ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas;
  const { background: style } = STYLE_CONFIG;

  // Gradiente radial oscuro
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    width * 0.8
  );
  gradient.addColorStop(0, style.gradient[0]);
  gradient.addColorStop(1, style.gradient[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Capa de ruido (basado en tu CSS)
  const noise = await loadImage(
    "data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"
  );
  ctx.save();
  ctx.globalAlpha = style.noiseOpacity;
  ctx.drawImage(noise, 0, 0, width, height);
  ctx.restore();

  // Siluetas de palmeras
  ctx.save();
  ctx.fillStyle = style.palmColor;
  ctx.font = '350px system-ui'; // Usar un emoji como forma es un truco genial
  ctx.translate(width - 150, height + 100);
  ctx.rotate(-0.2);
  ctx.fillText('🌴', 0, 0);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = style.palmColor;
  ctx.font = '300px system-ui';
  ctx.translate(50, height + 80);
  ctx.scale(-1, 1); // voltear horizontalmente
  ctx.rotate(-0.1);
  ctx.fillText('🌴', 0, 0);
  ctx.restore();
}

/**
 * Dibuja el header con efecto neón.
 */
function drawHeader(ctx: CanvasRenderingContext2D) {
  const { width } = ctx.canvas;
  const { header, subheader } = STYLE_CONFIG;
  const headerY = 120;

  // Efecto neón
  ctx.save();
  ctx.font = header.font;
  ctx.textAlign = 'center';
  ctx.fillStyle = header.color;
  ctx.shadowColor = header.glowColor;
  ctx.shadowBlur = 20;
  ctx.fillText('BUSCARONIS', width / 2, headerY);
  ctx.shadowBlur = 40;
  ctx.fillText('BUSCARONIS', width / 2, headerY);
  ctx.shadowBlur = 0;
  ctx.fillText('BUSCARONIS', width / 2, headerY);
  ctx.restore();

  // Subtítulo
  ctx.save();
  ctx.font = subheader.font;
  ctx.textAlign = 'center';
  ctx.fillStyle = subheader.color;
  ctx.fillText('Ron Barceló × Desalía', width / 2, 175);
  ctx.restore();
}

/**
 * Dibuja el círculo de puntuación como un HUD brillante.
 */
function drawScoreCircle(ctx: CanvasRenderingContext2D, score: number) {
  const { width } = ctx.canvas;
  const { score: style } = STYLE_CONFIG;
  const centerX = width / 2;
  const centerY = 340;
  const radius = 140;

  // Círculo exterior brillante (glow)
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = style.circleColor;
  ctx.lineWidth = 10;
  ctx.filter = `blur(15px)`;
  ctx.globalAlpha = 0.6;
  ctx.stroke();
  ctx.filter = 'none';

  // Círculo interior nítido
  ctx.lineWidth = 4;
  ctx.globalAlpha = 1;
  ctx.stroke();
  ctx.restore();

  // Texto Puntuación
  ctx.fillStyle = style.color;
  ctx.font = style.font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(score.toString(), centerX, centerY - 10);

  // Etiqueta "PUNTOS"
  ctx.fillStyle = style.labelColor;
  ctx.font = style.labelFont;
  ctx.fillText('PUNTOS', centerX, centerY + 80);
}

/**
 * Dibuja los badges con estilo glassmorphism y neón.
 */
function drawStatBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  icon: string,
  text: string
) {
  const { badges: style } = STYLE_CONFIG;
  const width = 280;
  const height = 90;
  const radius = 25;

  ctx.save();
  // Fondo translúcido
  ctx.fillStyle = style.backgroundColor;
  roundRect(ctx, x - width / 2, y - height / 2, width, height, radius);
  ctx.fill();

  // Borde de neón
  ctx.shadowColor = style.glowColor;
  ctx.shadowBlur = 15;
  ctx.strokeStyle = style.borderColor;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // Contenido
  ctx.fillStyle = style.color;
  ctx.textBaseline = 'middle';

  ctx.font = style.iconFont;
  ctx.textAlign = 'right';
  ctx.fillText(icon, x - 15, y);

  ctx.font = style.font;
  ctx.textAlign = 'left';
  ctx.fillText(text, x + 15, y);
}

/**
 * Dibuja el footer con llamada a la acción en neón.
 */
function drawFooter(ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas;
  const { footer: style } = STYLE_CONFIG;

  ctx.save();
  ctx.font = style.font;
  ctx.textAlign = 'center';
  ctx.fillStyle = style.color;
  ctx.shadowColor = style.glowColor;
  ctx.shadowBlur = 10;
  ctx.fillText('¿PUEDES SUPERARME? 🏆', width / 2, height - 50);
  ctx.shadowBlur = 20;
  ctx.fillText('¿PUEDES SUPERARME? 🏆', width / 2, height - 50);
  ctx.restore();
}

/**
 * Genera la imagen para compartir.
 */
function generateShareImage(config: ShareConfig): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // **PASO CRÍTICO: Esperar a que las fuentes estén cargadas**
      await loadFonts();

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No se pudo obtener el contexto 2D.');

      canvas.width = IMAGE_WIDTH;
      canvas.height = IMAGE_HEIGHT;

      // Secuencia de dibujado
      await drawBackground(ctx);
      drawHeader(ctx);
      drawScoreCircle(ctx, config.score);

      const badgeY = 525;
      const badgeSpacing = 420;
      drawStatBadge(ctx, IMAGE_WIDTH / 2 - badgeSpacing / 2, badgeY, '🎯', `${config.accuracy}%`);
      drawStatBadge(
        ctx,
        IMAGE_WIDTH / 2 + badgeSpacing / 2,
        badgeY,
        '⚡️',
        config.difficulty.toUpperCase()
      );

      drawFooter(ctx);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(URL.createObjectURL(blob));
          else reject(new Error('La creación del blob falló.'));
        },
        'image/png',
        0.95
      );
    } catch (error) {
      console.error('Error generando la imagen:', error);
      reject(error);
    }
  });
}

/**
 * Genera el texto para compartir.
 */
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
      const imageUrl = await generateShareImage(config);
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
      link.click();
      link.remove();

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
