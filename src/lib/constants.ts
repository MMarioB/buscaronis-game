import { GameConfig, Difficulty } from './types';

export const DIFFICULTIES: Record<Difficulty, GameConfig> = {
  easy: { rows: 9, cols: 9, mines: 10, label: 'Chill', points: 100 },
  medium: { rows: 16, cols: 16, mines: 40, label: 'Desafío', points: 250 },
  hard: { rows: 16, cols: 30, mines: 99, label: 'Vive Ahora', points: 500 },
} as const;

export const GAME_CONSTANTS = {
  HINT_COST: 50,
  POINTS_PER_CORRECT: 10,
  STREAK_BONUS: 5,
  TIME_BONUS_BASE: 500,
  TIME_BONUS_MULTIPLIER: 2,
  HINT_DISPLAY_TIME: 2000,
  EXPLANATION_DISPLAY_TIME: 3000,
  STREAK_BONUS_THRESHOLD: 3,
  STREAK_BONUS_POINTS: 5,
  MIN_SCORE_TO_WIN: 1000,
} as const;

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector del elemento a destacar
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: 'click' | 'rightclick' | 'none';
  highlight?: boolean;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: '🥃 ¡Bienvenido a BuscaRonis!',
    description:
      'Encuentra todos los Ronis escondidos sin tocar las minas. ¿Estás listo para desafiar el momento?',
    position: 'center',
    action: 'none',
    highlight: false,
  },
  {
    id: 'board',
    title: '🎯 El Tablero',
    description:
      'Este es tu campo de juego. Cada celda puede contener un Roni (🥃) o una mina (💥). ¡Descúbrelas con cuidado!',
    target: '.game-board',
    position: 'top',
    action: 'none',
    highlight: true,
  },
  {
    id: 'reveal',
    title: '👆 Click para Revelar',
    description:
      'Haz click en cualquier celda para revelarla. Los números indican cuántas minas hay alrededor.',
    target: '.game-board',
    position: 'top',
    action: 'click',
    highlight: true,
  },
  {
    id: 'flag',
    title: '🏁 Click Derecho para Bandera',
    description:
      'Cuando creas que hay un Roni, haz click derecho (o mantén presionado en móvil) para poner una bandera.',
    target: '.game-board',
    position: 'top',
    action: 'rightclick',
    highlight: true,
  },
  {
    id: 'question',
    title: '❓ Responde Correctamente',
    description:
      'Al poner una bandera, deberás responder una pregunta sobre Ron Barceló. ¡Cada respuesta correcta suma puntos!',
    position: 'center',
    action: 'none',
    highlight: false,
  },
  {
    id: 'streak',
    title: '🔥 Sistema de Rachas',
    description:
      'Responde varias preguntas correctas seguidas para multiplicar tus puntos. ¡Mantén la racha!',
    target: '.game-stats',
    position: 'bottom',
    action: 'none',
    highlight: true,
  },
  {
    id: 'mines',
    title: '💥 ¡Evita las Minas!',
    description:
      'Si tocas una mina, pierdes el juego. Usa los números como pistas para encontrar los Ronis de forma segura.',
    position: 'center',
    action: 'none',
    highlight: false,
  },
  {
    id: 'ready',
    title: '🎮 ¡Listo para Jugar!',
    description:
      '¡Desafía el momento! Encuentra todos los Ronis y comparte tu puntuación. ¡Vive ahora!',
    position: 'center',
    action: 'none',
    highlight: false,
  },
];

export const STORAGE_KEYS = {
  GAME_DATA: 'buscaronis_data',
  TUTORIAL_COMPLETED: 'buscaronis_tutorial_completed',
  SOUND_ENABLED: 'buscaronis_sound_enabled',
  HIGH_SCORE: 'buscaronis_high_score',
} as const;

export const ANIMATION = {
  REVEAL_DELAY: 50,
  EXPLOSION_DURATION: 1000,
  MODAL_FADE: 300,
  TUTORIAL_TRANSITION: 500,
} as const;
