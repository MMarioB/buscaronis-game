'use client';

import { useEffect, useState, useCallback } from 'react';
import * as Tone from 'tone';

type SoundType =
  | 'click'
  | 'correct'
  | 'incorrect'
  | 'flag'
  | 'explosion'
  | 'victory'
  | 'achievement';

interface SoundSettings {
  enabled: boolean;
  volume: number; // 0-1
}

const STORAGE_KEY = 'buscaronis_sound_settings';

/**
 * Hook para manejar todos los sonidos del juego
 */
export function useSound() {
  const [settings, setSettings] = useState<SoundSettings>({
    enabled: true,
    volume: 0.5,
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar settings desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading sound settings:', e);
      }
    }
  }, []);

  // Guardar settings en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Inicializar Tone.js al primer click del usuario (requerido por navegadores)
  const initAudio = useCallback(async () => {
    if (!isInitialized) {
      await Tone.start();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  /**
   * Reproduce un sonido específico
   */
  const play = useCallback(
    async (type: SoundType) => {
      if (!settings.enabled) return;

      try {
        await initAudio();

        const synth = new Tone.Synth({
          volume: Tone.gainToDb(settings.volume),
        }).toDestination();

        const now = Tone.now();

        switch (type) {
          case 'click':
            // Click suave en celda
            synth.triggerAttackRelease('C5', '0.05', now);
            break;

          case 'flag':
            // Bandera colocada - sonido más alto
            synth.triggerAttackRelease('E5', '0.1', now);
            break;

          case 'correct':
            // Respuesta correcta - acorde ascendente
            synth.triggerAttackRelease('C5', '0.1', now);
            synth.triggerAttackRelease('E5', '0.1', now + 0.05);
            synth.triggerAttackRelease('G5', '0.15', now + 0.1);
            break;

          case 'incorrect':
            // Respuesta incorrecta - tono descendente
            synth.triggerAttackRelease('E4', '0.15', now);
            synth.triggerAttackRelease('C4', '0.2', now + 0.1);
            break;

          case 'explosion':
            // Explosión - ruido grave
            const noiseSynth = new Tone.NoiseSynth({
              volume: Tone.gainToDb(settings.volume * 0.8),
              noise: { type: 'brown' },
              envelope: {
                attack: 0.001,
                decay: 0.3,
                sustain: 0,
              },
            }).toDestination();
            noiseSynth.triggerAttackRelease('0.3', now);

            // Añadir tono grave
            synth.triggerAttackRelease('C2', '0.4', now);
            break;

          case 'victory':
            // Victoria - fanfarria ascendente
            const victoryNotes = ['C5', 'E5', 'G5', 'C6'];
            victoryNotes.forEach((note, i) => {
              synth.triggerAttackRelease(note, '0.2', now + i * 0.1);
            });
            break;

          case 'achievement':
            // Logro desbloqueado - sonido mágico
            const magicNotes = ['E5', 'G5', 'B5', 'E6'];
            magicNotes.forEach((note, i) => {
              synth.triggerAttackRelease(note, '0.15', now + i * 0.08);
            });
            break;

          default:
            break;
        }

        // Limpiar synth después de usarlo
        setTimeout(() => {
          synth.dispose();
        }, 2000);
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    },
    [settings, initAudio]
  );

  /**
   * Toggle sonido on/off
   */
  const toggleSound = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      enabled: !prev.enabled,
    }));
  }, []);

  /**
   * Cambiar volumen
   */
  const setVolume = useCallback((volume: number) => {
    setSettings((prev) => ({
      ...prev,
      volume: Math.max(0, Math.min(1, volume)),
    }));
  }, []);

  return {
    play,
    toggleSound,
    setVolume,
    isEnabled: settings.enabled,
    volume: settings.volume,
    isInitialized,
  };
}
