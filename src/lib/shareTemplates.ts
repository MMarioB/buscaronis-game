import { ShareConfig } from './types';
import { RANKS } from './achievements';

/**
 * Genera el texto para compartir en RRSS
 */
export function generateShareText(config: ShareConfig): string {
  const { score, accuracy, won, achievement, rank } = config;

  // Template base
  let text = won
    ? `🥃 ¡Conseguí ${score.toLocaleString()} puntos en BuscaRonis!\n\n`
    : `🎮 Jugué BuscaRonis y llegué a ${score.toLocaleString()} puntos\n\n`;

  // Añadir stats
  text += `🎯 ${accuracy}% de precisión\n`;

  // Si hay logro desbloqueado
  if (achievement) {
    text += `🏆 Logro: ${achievement.icon} ${achievement.title}\n`;
  }

  // Si hay rango
  if (rank) {
    text += `👑 Rango: ${RANKS[rank].icon} ${RANKS[rank].title}\n`;
  }

  // Call to action
  text += `\n¿Puedes superarme? ¡Desafía el momento con @RonBarcelo!\n\n`;

  // Hashtags
  text += `#Desalía #RonBarceló #BuscaRonis`;

  return text;
}

/**
 * Genera el título para compartir
 */
export function generateShareTitle(config: ShareConfig): string {
  const { score, won } = config;

  if (won) {
    return `¡${score.toLocaleString()} puntos en BuscaRonis! 🥃`;
  }

  return `BuscaRonis - ${score.toLocaleString()} puntos 🎮`;
}

/**
 * URL base del juego (ajustar según tu dominio)
 */
export const GAME_URL =
  typeof window !== 'undefined' ? window.location.origin : 'https://buscaronis.com';

/**
 * Genera el texto corto para Twitter (280 caracteres)
 */
export function generateTwitterText(config: ShareConfig): string {
  const { score, accuracy, won } = config;

  let text = won
    ? `🥃 ¡${score.toLocaleString()} pts en BuscaRonis! `
    : `🎮 ${score.toLocaleString()} pts en BuscaRonis `;

  text += `🎯 ${accuracy}%\n\n`;
  text += `¿Puedes superarme? ¡Desafía el momento!\n`;
  text += `@RonBarcelo #Desalía`;

  return text;
}

/**
 * Templates específicos por plataforma
 */
export const PLATFORM_TEMPLATES = {
  twitter: generateTwitterText,
  facebook: generateShareText,
  whatsapp: generateShareText,
  default: generateShareText,
};
