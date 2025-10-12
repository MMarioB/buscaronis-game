'use client';

import { useState } from 'react';

/**
 * Define un logro desbloqueado. Adáptalo a tu estructura real.
 */
export interface Achievement {
  id: string;
  name: string;
  emoji: string;
}

/**
 * Configuración con los datos a mostrar en la imagen y texto compartidos.
 */
export interface ShareConfig {
  score: number;
  accuracy: number;
  difficulty: string;
  timeElapsed: number;
  unlockedAchievements?: Achievement[];
  appUrl?: string;
}

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

/**
 * Centraliza toda la configuración de estilos para la imagen generada.
 * Facilita cambios de diseño y mantiene la consistencia.
 */
const STYLE_CONFIG = {
  background: {
    gradient: ['#FF8C42', '#FF6B35', '#FFA55F'],
    textureColor: 'rgba(0, 0, 0, 0.03)',
    vignetteColor: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    font: 'bold 72px var(--font-knockout), system-ui, sans-serif',
    color: 'rgba(255, 255, 255, 0.95)',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },
  subheader: {
    font: '36px var(--font-futura), system-ui, sans-serif',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  score: {
    font: 'bold 140px var(--font-knockout), system-ui, sans-serif',
    color: '#FF6B35',
    labelFont: 'bold 32px var(--font-futura), system-ui, sans-serif',
    labelColor: '#FF8C42',
    circleGradient: ['#FFFFFF', '#F5F5F5'],
    circleShadow: 'rgba(0, 0, 0, 0.3)',
    circleStroke: 'rgba(255, 107, 53, 0.3)',
  },
  badges: {
    font: 'bold 40px var(--font-futura), system-ui, sans-serif',
    color: '#FF6B35',
    difficultyFont: 'bold 36px var(--font-futura), system-ui, sans-serif',
    iconFont: '48px system-ui, -apple-system, sans-serif',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadow: 'rgba(0, 0, 0, 0.25)',
    stroke: 'rgba(255, 107, 53, 0.3)',
  },
  footer: {
    font: 'bold 32px var(--font-futura), system-ui, sans-serif',
    color: 'rgba(255, 255, 255, 0.9)',
    shadow: 'rgba(0, 0, 0, 0.3)',
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
 * Dibuja el fondo con gradiente, textura y viñeta.
 */
function drawBackground(ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas;
  const { background } = STYLE_CONFIG;

  // Gradiente principal
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, background.gradient[0]);
  gradient.addColorStop(0.5, background.gradient[1]);
  gradient.addColorStop(1, background.gradient[2]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Textura de círculos sutil
  ctx.fillStyle = background.textureColor;
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * width,
      Math.random() * height,
      Math.random() * 200 + 100,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Viñeta para dar profundidad
  const radial = ctx.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    width * 0.7
  );
  radial.addColorStop(0, 'rgba(0,0,0,0)');
  radial.addColorStop(1, background.vignetteColor);
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Dibuja el header principal y el subtítulo.
 */
function drawHeader(ctx: CanvasRenderingContext2D) {
  const { width } = ctx.canvas;
  const { header, subheader } = STYLE_CONFIG;

  ctx.save();
  ctx.font = header.font;
  ctx.textAlign = 'center';
  ctx.fillStyle = header.color;
  ctx.shadowColor = header.shadow;
  ctx.shadowBlur = 25;
  ctx.shadowOffsetY = 5;
  ctx.fillText('🍹 BUSCARONIS', width / 2, 100);
  ctx.restore();

  ctx.save();
  ctx.font = subheader.font;
  ctx.textAlign = 'center';
  ctx.fillStyle = subheader.color;
  ctx.fillText('Ron Barceló × Desalía', width / 2, 155);
  ctx.restore();
}

/**
 * Dibuja el círculo central con la puntuación.
 */
function drawScoreCircle(ctx: CanvasRenderingContext2D, score: number) {
  const { width } = ctx.canvas;
  const { score: scoreStyle } = STYLE_CONFIG;
  const centerX = width / 2;
  const centerY = 330;
  const radius = 150;

  // Sombra proyectada del círculo
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.arc(centerX + 5, centerY + 10, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Círculo principal con gradiente y sombra interior
  ctx.save();
  const circleGradient = ctx.createRadialGradient(
    centerX - 30,
    centerY - 30,
    0,
    centerX,
    centerY,
    radius
  );
  circleGradient.addColorStop(0, scoreStyle.circleGradient[0]);
  circleGradient.addColorStop(1, scoreStyle.circleGradient[1]);
  ctx.fillStyle = circleGradient;
  ctx.shadowColor = scoreStyle.circleShadow;
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 15;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Borde sutil del círculo
  ctx.save();
  ctx.strokeStyle = scoreStyle.circleStroke;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Texto de la puntuación
  ctx.save();
  ctx.fillStyle = scoreStyle.color;
  ctx.font = scoreStyle.font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowBlur = 5;
  ctx.fillText(score.toString(), centerX, centerY - 10);
  ctx.restore();

  // Etiqueta "PUNTOS"
  ctx.save();
  ctx.fillStyle = scoreStyle.labelColor;
  ctx.font = scoreStyle.labelFont;
  ctx.textAlign = 'center';
  ctx.fillText('PUNTOS', centerX, centerY + 60);
  ctx.restore();
}

/**
 * Dibuja un badge de estadística (Precisión o Dificultad).
 */
function drawStatBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  icon: string,
  text: string,
  isDifficulty = false
) {
  const { badges } = STYLE_CONFIG;
  const width = 240;
  const height = 80;
  const radius = 20;

  // Fondo del badge con sombra
  ctx.save();
  ctx.fillStyle = badges.backgroundColor;
  ctx.shadowColor = badges.shadow;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 8;
  roundRect(ctx, x - width / 2, y - height / 2, width, height, radius);
  ctx.fill();
  ctx.restore();

  // Borde del badge
  ctx.save();
  ctx.strokeStyle = badges.stroke;
  ctx.lineWidth = 3;
  roundRect(ctx, x - width / 2, y - height / 2, width, height, radius);
  ctx.stroke();
  ctx.restore();

  // Icono
  ctx.save();
  ctx.font = badges.iconFont;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(icon, x - (isDifficulty ? 50 : 65), y);
  ctx.restore();

  // Texto
  ctx.save();
  ctx.fillStyle = badges.color;
  ctx.font = isDifficulty ? badges.difficultyFont : badges.font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + 30, y);
  ctx.restore();
}

/**
 * Dibuja el footer con la llamada a la acción.
 */
function drawFooter(ctx: CanvasRenderingContext2D) {
  const { width } = ctx.canvas;
  const { footer } = STYLE_CONFIG;

  ctx.save();
  ctx.fillStyle = footer.color;
  ctx.font = footer.font;
  ctx.textAlign = 'center';
  ctx.shadowColor = footer.shadow;
  ctx.shadowBlur = 10;
  ctx.fillText('¿Puedes superarme? 🏆', width / 2, 240);
  ctx.restore();
}

/**
 * Genera una imagen ÉPICA para compartir (1200x630px) usando Canvas.
 * @param config - Datos del resultado de la partida.
 * @returns Una promesa que resuelve con la URL de la imagen generada (blob URL).
 */
function generateShareImage(config: ShareConfig): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Espera a que las fuentes personalizadas estén listas para ser usadas.
      await document.fonts.ready;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No se pudo obtener el contexto 2D del canvas.');
      }

      canvas.width = IMAGE_WIDTH;
      canvas.height = IMAGE_HEIGHT;

      // Secuencia de dibujado
      drawBackground(ctx);
      drawHeader(ctx);
      drawScoreCircle(ctx, config.score);
      drawFooter(ctx);

      const badgeY = 530;
      const badgeSpacing = 350;
      const accuracyX = canvas.width / 2 - badgeSpacing / 2;
      const difficultyX = canvas.width / 2 + badgeSpacing / 2;

      drawStatBadge(ctx, accuracyX, badgeY, '🎯', `${config.accuracy}%`);
      drawStatBadge(ctx, difficultyX, badgeY, '⚡', config.difficulty.toUpperCase(), true);

      // Convertir canvas a Blob y crear URL
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            reject(new Error('La creación del blob de la imagen falló.'));
          }
        },
        'image/png',
        1.0 // Calidad máxima
      );
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Genera el texto formateado para compartir en redes sociales.
 * @param config - Datos del resultado de la partida.
 * @returns El texto listo para compartir.
 */
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

/**
 * Hook personalizado para gestionar la lógica de compartir resultados.
 * Proporciona una función `shareResult` y un estado `isSharing`.
 */
export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  /**
   * Orquesta la generación de imagen/texto y utiliza la API Web Share.
   * Proporciona fallbacks para navegadores no compatibles.
   * @param config - Los datos del resultado a compartir.
   * @returns `true` si la acción de compartir se inició, `false` si hubo un error.
   */
  const shareResult = async (config: ShareConfig): Promise<boolean> => {
    setIsSharing(true);
    try {
      const text = generateShareText(config);
      const imageUrl = await generateShareImage(config);

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'buscaronis-score.png', { type: 'image/png' });
      const shareUrl = config.appUrl || window.location.href;

      // Intento 1: Compartir con imagen (si es posible)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          text,
          files: [file],
          url: shareUrl,
        });
        return true;
      }

      // Intento 2: Compartir solo texto y URL (fallback para algunos móviles)
      if (navigator.share) {
        await navigator.share({
          text,
          url: shareUrl,
        });
        return true;
      }

      // Intento 3: Fallback para escritorio (copiar al portapapeles y descargar imagen)
      await navigator.clipboard.writeText(text + '\n' + shareUrl);

      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'buscaronis-score.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('¡Resultado copiado al portapapeles y la imagen se está descargando!');
      return true;
    } catch (error) {
      // Ignorar errores AbortError que ocurren si el usuario cierra el diálogo de compartir.
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

  return {
    shareResult,
    isSharing,
  };
}
