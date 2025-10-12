'use client';

import { useState } from 'react';
import { useShare, type ShareConfig } from '@/hooks/useShare';

interface ShareButtonProps {
  config: ShareConfig;
  className?: string;
}

export function ShareButton({ config, className = '' }: ShareButtonProps) {
  const { shareResult, isSharing } = useShare();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleShare = async () => {
    const success = await shareResult(config);

    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        disabled={isSharing}
        className={`
          w-full px-6 py-3 rounded-lg font-bold text-white
          transition-all duration-200
          ${
            isSharing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
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
          <span className="flex items-center justify-center gap-2">📤 COMPARTIR</span>
        )}
      </button>

      {showSuccess && (
        <div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                      bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg
                      animate-bounce whitespace-nowrap"
        >
          ✅ ¡Compartido!
        </div>
      )}
    </div>
  );
}
