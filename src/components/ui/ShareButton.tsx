'use client';

import { useState } from 'react';
import { useShare } from '@/hooks/useShare';
import type { GameStats, Difficulty, Achievement, PlayerRank } from '@/lib/types';

interface ShareButtonProps {
  stats: GameStats;
  difficulty?: Difficulty;
  achievement?: Achievement;
  rank?: PlayerRank;
  className?: string;
  showDownload?: boolean;
}

export function ShareButton({
  stats,
  difficulty = 'medium',
  achievement,
  rank,
  className = '',
  showDownload = true,
}: ShareButtonProps) {
  const { shareResults, downloadImage, isSharing } = useShare();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleShare = async () => {
    const result = await shareResults(stats, difficulty, achievement, rank);

    if (result.success) {
      let message = '✅ ¡Compartido!';

      if (result.method === 'copy') {
        message = '📋 ¡Copiado al portapapeles!';
      } else if (result.method === 'native') {
        message = '✅ ¡Compartido!';
      }

      setSuccessMessage(message);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleDownload = async () => {
    const result = await downloadImage(stats);

    if (result.success) {
      setSuccessMessage('💾 ¡Imagen descargada!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="relative flex flex-col sm:flex-row gap-3 w-full">
      {/* Botón principal de compartir */}
      <button
        onClick={handleShare}
        disabled={isSharing}
        className={`
          flex-1 px-6 py-3 rounded-xl font-knockout text-lg font-bold text-white
          transition-all duration-200 shadow-lg
          ${
            isSharing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#FF8C42] hover:to-[#FFA55F] hover:shadow-xl hover:scale-105'
          }
          ${className}
        `}
      >
        {isSharing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span>
            Preparando...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">📤 COMPARTIR RESULTADO</span>
        )}
      </button>

      {/* Botón de descarga de imagen */}
      {showDownload && (
        <button
          onClick={handleDownload}
          disabled={isSharing}
          className={`
            px-6 py-3 rounded-xl font-knockout text-lg font-bold
            transition-all duration-200 shadow-lg
            ${
              isSharing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30 hover:shadow-xl hover:scale-105 backdrop-blur-sm'
            }
          `}
        >
          {isSharing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">💾</span>
          )}
        </button>
      )}

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div
          className="absolute -top-14 left-1/2 transform -translate-x-1/2 
                      bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl
                      animate-in zoom-in-95 duration-200 whitespace-nowrap
                      font-futura font-bold z-50"
        >
          {successMessage}
        </div>
      )}
    </div>
  );
}
