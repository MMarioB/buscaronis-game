import { ShareConfig } from './types';
import { RANKS } from './achievements';

/**
 * Genera una imagen para compartir usando Canvas API (VERSIÓN MEJORADA)
 */
export async function generateShareImage(config: ShareConfig): Promise<Blob> {
  const { score, accuracy, difficulty, rank, achievement, won } = config;

  // Crear canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No se pudo crear el contexto del canvas');
  }

  // Dimensiones optimizadas para RRSS (1200x630 - formato Open Graph)
  canvas.width = 1200;
  canvas.height = 630;

  // ============================================
  // FONDO CON GRADIENTE MEJORADO
  // ============================================
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#FF6B35');
  gradient.addColorStop(0.3, '#FF8C42');
  gradient.addColorStop(0.7, '#FFA55F');
  gradient.addColorStop(1, '#FFB84D');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Overlay oscuro para mejor contraste
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ============================================
  // DECORACIÓN: Círculos de fondo
  // ============================================
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(100, 100, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - 100, canvas.height - 100, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // ============================================
  // HEADER: "DESAFÍA EL MOMENTO"
  // ============================================
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 40px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText('🍹 DESAFÍA EL MOMENTO', canvas.width / 2, 70);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // ============================================
  // SCORE PRINCIPAL (ENORME Y DESTACADO)
  // ============================================
  const scoreY = 200;

  // Icono de victoria
  if (won) {
    ctx.font = '80px Arial';
    ctx.fillText('🏆', canvas.width / 2, scoreY - 40);
  }

  // Score con efecto de stroke
  ctx.font = 'bold 140px Arial, sans-serif';
  ctx.fillStyle = '#FFC857';
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 8;
  const scoreText = `${score.toLocaleString()}`;

  // Sombra para el score
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 5;

  ctx.strokeText(scoreText, canvas.width / 2, scoreY);
  ctx.fillText(scoreText, canvas.width / 2, scoreY);

  // Reset shadow
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Label "PUNTOS"
  ctx.font = 'bold 32px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('PUNTOS', canvas.width / 2, scoreY + 50);

  // ============================================
  // STATS EN BADGES (PRECISIÓN, DIFICULTAD)
  // ============================================
  const badgeY = 320;
  const badgeSpacing = 280;
  const leftX = canvas.width / 2 - badgeSpacing / 2;
  const rightX = canvas.width / 2 + badgeSpacing / 2;

  // Helper para dibujar badge
  const drawBadge = (x: number, y: number, icon: string, label: string, value: string) => {
    // Fondo del badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(x - 120, y - 35, 240, 90);

    // Borde
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 120, y - 35, 240, 90);

    // Icono
    ctx.font = '36px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(icon, x, y - 5);

    // Valor
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#FFC857';
    ctx.fillText(value, x, y + 30);
  };

  // Badge de precisión
  drawBadge(leftX, badgeY, '🎯', 'Precisión', `${accuracy}%`);

  // Badge de dificultad
  const difficultyLabel = difficulty.toUpperCase();
  drawBadge(rightX, badgeY, '⚡', 'Dificultad', difficultyLabel);

  // ============================================
  // LOGRO DESBLOQUEADO (si existe)
  // ============================================
  if (achievement) {
    const achievementY = 430;

    // Fondo destacado
    ctx.fillStyle = 'rgba(255, 199, 87, 0.3)';
    ctx.fillRect(canvas.width / 2 - 280, achievementY - 25, 560, 60);

    ctx.strokeStyle = '#FFC857';
    ctx.lineWidth = 3;
    ctx.strokeRect(canvas.width / 2 - 280, achievementY - 25, 560, 60);

    // Texto del logro
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`${achievement.icon} ${achievement.title}`, canvas.width / 2, achievementY + 10);
  }

  // ============================================
  // RANGO (si existe)
  // ============================================
  if (rank) {
    const rankInfo = RANKS[rank];
    const rankY = achievement ? 510 : 450;

    ctx.font = 'bold 26px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(`${rankInfo.icon} Rango: ${rankInfo.title}`, canvas.width / 2, rankY);
  }

  // ============================================
  // FOOTER: BRANDING
  // ============================================
  const footerY = canvas.height - 60;

  // Línea decorativa
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 300, footerY - 20);
  ctx.lineTo(canvas.width / 2 + 300, footerY - 20);
  ctx.stroke();

  // Nombre del juego
  ctx.font = 'bold 40px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 5;
  ctx.fillText('BUSCARONIS', canvas.width / 2, footerY + 20);
  ctx.shadowBlur = 0;

  // Crédito
  ctx.font = '20px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('Ron Barceló × Desalía', canvas.width / 2, footerY + 50);

  // Convertir canvas a Blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('No se pudo generar la imagen'));
        }
      },
      'image/png',
      0.95
    );
  });
}

/**
 * Descarga la imagen generada
 */
export function downloadImage(blob: Blob, filename: string = 'buscaronis-score.png'): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Copia el contenido al portapapeles
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copiando al portapapeles:', error);
    return false;
  }
}
