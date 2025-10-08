'use client';

import React from 'react';
import { PlayerStatsWithAchievements } from '@/lib/types';
import { calculateAchievementProgress } from '@/lib/storage';
import { ACHIEVEMENTS } from '@/lib/achievements';

interface AchievementsListProps {
  stats: PlayerStatsWithAchievements;
}

export function AchievementsList({ stats }: AchievementsListProps) {
  const progress = calculateAchievementProgress(stats);

  // Separar desbloqueados y bloqueados
  const unlocked = progress.filter((p) => p.unlocked);
  const locked = progress.filter((p) => !p.unlocked);

  return (
    <div className="space-y-6">
      {/* Desbloqueados */}
      {unlocked.length > 0 && (
        <div>
          <h3 className="text-lg font-knockout font-bold text-white mb-3 uppercase tracking-wide flex items-center gap-2">
            🏆 Desbloqueados ({unlocked.length}/{progress.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unlocked.map((item) => {
              const achievement = ACHIEVEMENTS[item.achievementId];
              return (
                <AchievementCard
                  key={item.achievementId}
                  achievement={achievement}
                  progress={item}
                  unlocked={true}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Bloqueados */}
      {locked.length > 0 && (
        <div>
          <h3 className="text-lg font-knockout font-bold text-white/70 mb-3 uppercase tracking-wide flex items-center gap-2">
            🔒 Por Desbloquear ({locked.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locked.map((item) => {
              const achievement = ACHIEVEMENTS[item.achievementId];
              return (
                <AchievementCard
                  key={item.achievementId}
                  achievement={achievement}
                  progress={item}
                  unlocked={false}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface AchievementCardProps {
  achievement: Omit<import('@/lib/types').Achievement, 'unlockedAt'>;
  progress: import('@/lib/types').AchievementProgress;
  unlocked: boolean;
}

function AchievementCard({ achievement, progress, unlocked }: AchievementCardProps) {
  const percentage = Math.round((progress.current / progress.target) * 100);

  return (
    <div
      className={`relative p-4 rounded-xl backdrop-blur-sm border-2 transition-all duration-300 ${
        unlocked
          ? 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border-yellow-400/50 hover:scale-105'
          : 'bg-white/5 border-white/20 hover:bg-white/10'
      }`}
    >
      {/* Icono */}
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 text-4xl transition-all ${
            unlocked ? 'grayscale-0 drop-shadow-lg' : 'grayscale opacity-40'
          }`}
        >
          {achievement.icon}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4
            className={`font-knockout text-base font-bold mb-1 ${
              unlocked ? 'text-white' : 'text-white/60'
            }`}
          >
            {achievement.title}
          </h4>
          <p className={`text-xs font-futura mb-2 ${unlocked ? 'text-white/80' : 'text-white/50'}`}>
            {achievement.description}
          </p>

          {/* Barra de progreso */}
          {!unlocked && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span className="font-futura">
                  {progress.current} / {progress.target}
                </span>
                <span className="font-knockout">{percentage}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FFC857] to-[#FF6B35] transition-all duration-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Fecha de desbloqueo */}
          {unlocked && progress.unlockedAt && (
            <div className="text-xs text-white/60 font-futura mt-1">✓ Desbloqueado</div>
          )}
        </div>
      </div>

      {/* Badge desbloqueado */}
      {unlocked && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xs">✓</span>
          </div>
        </div>
      )}
    </div>
  );
}
