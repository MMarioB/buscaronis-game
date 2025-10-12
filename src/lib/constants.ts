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
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: 'click' | 'rightclick' | 'none';
  highlight?: boolean;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: '🥃 ¡Bienvenido a BuscaRonis!',
    description:
      'Es el clásico Buscaminas con Ron Barceló. Tu objetivo: encontrar TODAS las casillas vacías (los "Ronis" con el patito) sin tocar las minas.',
    position: 'center',
    action: 'none',
    highlight: false,
  },
  {
    id: 'board',
    title: '🎯 ¿Qué es un Roni?',
    description:
      'En el Buscaminas clásico hay casillas vacías sin minas. Aquí, esas casillas vacías tienen el patito de Ron Barceló. ¡Esos son los "Ronis" que debes encontrar!',
    target: '.game-board',
    position: 'top',
    action: 'none',
    highlight: true,
  },
  {
    id: 'reveal',
    title: '👆 Paso 1: Click Izquierdo para Explorar',
    description:
      'Haz CLICK IZQUIERDO en las casillas. Si ves un número, indica cuántas MINAS hay alrededor. Si está VACÍA y aparece el patito, ¡encontraste un Roni!',
    target: '.game-board',
    position: 'top',
    action: 'click',
    highlight: true,
  },
  {
    id: 'flag',
    title: '🏁 Paso 2: Click Derecho para Marcar Minas',
    description:
      'Cuando sepas dónde hay una MINA (usando los números como pistas), márcala con CLICK DERECHO para poner una bandera y responder una pregunta.',
    target: '.game-board',
    position: 'top',
    action: 'rightclick',
    highlight: true,
  },
  {
    id: 'question',
    title: '❓ Paso 3: Responde sobre Ron Barceló',
    description:
      'Al marcar una mina, aparece una pregunta sobre Ron Barceló. ¡Responde bien para sumar puntos! Si te equivocas, puedes seguir jugando.',
    position: 'center',
    action: 'none',
    highlight: false,
  },
  {
    id: 'streak',
    title: '🔥 Bonus: Rachas de Respuestas',
    description:
      'Responde varias preguntas correctas seguidas para multiplicar tus puntos. ¡Cuantas más seguidas, más puntos!',
    target: '.game-stats',
    position: 'bottom',
    action: 'none',
    highlight: true,
  },
  {
    id: 'mines',
    title: '💥 ¡Cuidado: No toques las Minas!',
    description:
      'Si haces click izquierdo en una MINA, pierdes. Usa los números para saber dónde están y márcalas con bandera (click derecho).',
    position: 'center',
    action: 'none',
    highlight: false,
  },
  {
    id: 'ready',
    title: '🎮 Resumen: ¿Cómo Ganar?',
    description:
      'GANAS cuando revelas todas las casillas con el patito (los Ronis). Marca las minas con banderas, responde preguntas sobre Ron Barceló y acumula puntos. ¡Desafía el momento!',
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
