import { useState, useEffect } from 'react';

export type TutorialStep =
  | 'welcome'
  | 'first-click'
  | 'explain-number'
  | 'try-flag'
  | 'answer-question'
  | 'complete'
  | null;

interface UseTutorialReturn {
  isActive: boolean;
  currentStep: TutorialStep;
  startTutorial: () => void;
  nextStep: () => void;
  skipTutorial: () => void;
  markTutorialComplete: () => void;
  shouldShowOverlay: boolean;
  tutorialMessage: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  'welcome',
  'first-click',
  'explain-number',
  'try-flag',
  'answer-question',
  'complete',
];

const TUTORIAL_MESSAGES: Record<Exclude<TutorialStep, null>, string> = {
  welcome: '¡Bienvenido a Buscaronis! Te enseñaremos a jugar en 1 minuto.',
  'first-click': 'Haz click en cualquier celda del tablero para revelarla.',
  'explain-number':
    '¡Genial! Los números indican cuántas minas hay alrededor. El Roni 🦆 significa celda segura (0 minas cerca).',
  'try-flag': 'Ahora mantén presionado (o click derecho) en una celda para plantar una bandera 🏁',
  'answer-question':
    '¡Perfecto! Para plantar la bandera, responde esta pregunta sobre Ron Barceló 🍹',
  complete: '¡Excelente! Ya sabes jugar. Encuentra todos los Ronis sin tocar las minas 💥',
};

const TUTORIAL_STORAGE_KEY = 'buscaronis-tutorial-completed';

export function useTutorial(): UseTutorialReturn {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState<TutorialStep>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Verificar si el usuario ya completó el tutorial
    const completed = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    if (!completed) {
      // Primera vez: activar tutorial automáticamente
      startTutorial();
    }
  }, []);

  const startTutorial = () => {
    setIsActive(true);
    setStepIndex(0);
    setCurrentStep(TUTORIAL_STEPS[0]);
  };

  const nextStep = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex >= TUTORIAL_STEPS.length) {
      markTutorialComplete();
      return;
    }
    setStepIndex(nextIndex);
    setCurrentStep(TUTORIAL_STEPS[nextIndex]);
  };

  const skipTutorial = () => {
    setIsActive(false);
    setCurrentStep(null);
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
  };

  const markTutorialComplete = () => {
    setIsActive(false);
    setCurrentStep(null);
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
  };

  const shouldShowOverlay = isActive && currentStep !== null && currentStep !== 'complete';
  const tutorialMessage = currentStep ? TUTORIAL_MESSAGES[currentStep] : '';

  return {
    isActive,
    currentStep,
    startTutorial,
    nextStep,
    skipTutorial,
    markTutorialComplete,
    shouldShowOverlay,
    tutorialMessage,
  };
}
