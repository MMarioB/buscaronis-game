'use client';

import { useState, useEffect, useCallback } from 'react';
import { TUTORIAL_STEPS, STORAGE_KEYS } from '@/lib/constants';

export function useTutorial() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState(true);

  // Verificar si ya completó el tutorial
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem(STORAGE_KEYS.TUTORIAL_COMPLETED);
      const hasCompleted = completed === 'true';
      setHasCompletedTutorial(hasCompleted);

      // Si no ha completado, iniciar tutorial automáticamente
      if (!hasCompleted) {
        setTimeout(() => {
          setIsActive(true);
        }, 1000); // Esperar 1 segundo antes de mostrar
      }
    }
  }, []);

  // Iniciar tutorial manualmente
  const startTutorial = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  // Siguiente paso
  const nextStep = useCallback(() => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeTutorial();
    }
  }, [currentStep]);

  // Paso anterior
  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // Saltar tutorial
  const skipTutorial = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.TUTORIAL_COMPLETED, 'true');
      setHasCompletedTutorial(true);
    }
  }, []);

  // Completar tutorial
  const completeTutorial = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.TUTORIAL_COMPLETED, 'true');
      setHasCompletedTutorial(true);
    }
  }, []);

  // Reset tutorial (para testing)
  const resetTutorial = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.TUTORIAL_COMPLETED);
      setHasCompletedTutorial(false);
    }
  }, []);

  return {
    isActive,
    currentStep,
    currentStepData: TUTORIAL_STEPS[currentStep],
    totalSteps: TUTORIAL_STEPS.length,
    hasCompletedTutorial,
    startTutorial,
    nextStep,
    prevStep,
    skipTutorial,
    completeTutorial,
    resetTutorial,
  };
}
