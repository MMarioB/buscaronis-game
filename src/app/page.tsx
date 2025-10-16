'use client';

import { useState, useCallback, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { Hero } from '@/components/landing/Hero';
import { HowToPlay } from '@/components/landing/HowToPlay';
import { PrizesSection } from '@/components/landing/PrizesSection';
import { Footer } from '@/components/landing/Footer';
import { Board } from '@/components/game/GameBoard';
import { GameStats } from '@/components/game/GameStats';
import { GameControls, type Difficulty } from '@/components/game/GameControls';
import { QuestionModal } from '@/components/modals/QuestionModal';
import { ExplanationModal } from '@/components/modals/ExplanationModal';
import { GameOverModal } from '@/components/modals/GameOverModal';
import { StatsModal } from '@/components/modals/StatsModal';
import { AchievementUnlockedModal } from '@/components/modals/AchievementUnlockedModal';
import { TutorialOverlay } from '@/components/game/TutorialOverlay';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { MobileTip } from '@/components/ui/MobileTip';
import { useBoard } from '@/hooks/useBoard';
import { useQuestions } from '@/hooks/useQuestions';
import { useTimer } from '@/hooks/useTimer';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { useGameState } from '@/hooks/useGameState';
import { useGameStats } from '@/hooks/useGameStats';
import { useSound } from '@/hooks/useSound';
import { useTutorial } from '@/hooks/useTutorial';
import type { Question, GameConfig, Achievement, PlayerStatsWithAchievements } from '@/lib/types';

const DIFFICULTIES: Record<Difficulty, GameConfig> = {
  easy: { rows: 9, cols: 9, mines: 10, label: 'Chill', points: 100 },
  medium: { rows: 16, cols: 16, mines: 40, label: 'Desafío', points: 250 },
  hard: { rows: 16, cols: 30, mines: 99, label: 'Vive Ahora', points: 500 },
};

export default function Home() {
  // Hooks
  const isDesktop = useIsDesktop();
  const { board, flagCount, initBoard, handleCellClick, handleCellRightClick } = useBoard();
  const {
    gameState,
    score,
    correctAnswers,
    totalQuestions,
    streak,
    bestStreak,
    setGameState,
    addCorrectAnswer,
    addIncorrectAnswer,
    resetStats,
  } = useGameState();
  const { getRandomQuestion, resetQuestions } = useQuestions();
  const { timer, resetTimer } = useTimer(gameState);
  const { stats, saveGame } = useGameStats();
  const { play: playSound } = useSound();
  const {
    isActive: tutorialActive,
    currentStepData,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    skipTutorial,
  } = useTutorial();

  // Estado local
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [pendingFlag, setPendingFlag] = useState<{ row: number; col: number } | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState('');
  const [showGameOver, setShowGameOver] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [explodedCell, setExplodedCell] = useState<{ row: number; col: number } | null>(null);
  const [moves, setMoves] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  // Auto-cambiar a medium si está en hard y cambia a móvil
  useEffect(() => {
    if (difficulty === 'hard' && !isDesktop) {
      setDifficulty('medium');
      const config = DIFFICULTIES.medium;
      initBoard(config);
      resetStats();
      resetTimer();
      setGameState('ready');
      setMoves(0);
    }
  }, [isDesktop, difficulty, initBoard, resetStats, resetTimer, setGameState]);

  // 🔊 Reproducir sonido de logro cuando se desbloquea
  useEffect(() => {
    if (newAchievement) {
      playSound('achievement');
    }
  }, [newAchievement, playSound]);

  // Scroll suave al juego
  const scrollToGame = useCallback(() => {
    const gameSection = document.getElementById('game-section');
    if (gameSection) {
      gameSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Guardar resultado de partida
  const saveGameResult = useCallback(
    (won: boolean) => {
      console.log('🎮 saveGameResult llamada - won:', won);
      console.log('🎮 gameStartTime:', gameStartTime);

      if (!gameStartTime) {
        console.log('⚠️ No hay gameStartTime, no se puede guardar');
        return;
      }

      const endTime = Date.now();
      const timeElapsed = Math.floor((endTime - gameStartTime) / 1000);

      const result = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        difficulty,
        score,
        won,
        timeElapsed,
        correctAnswers,
        totalQuestions,
        accuracy: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
        streak: correctAnswers,
      };

      console.log('🎮 Resultado a guardar:', result);

      const persistedStats = stats as PlayerStatsWithAchievements | null;
      const statsBefore = persistedStats?.achievements?.length || 0;

      const success = saveGame(result);

      console.log('🎮 saveGame retornó:', success);

      if (success) {
        console.log('✅ Partida guardada:', result);

        setTimeout(() => {
          const updatedStats = stats as PlayerStatsWithAchievements | null;
          const statsAfter = updatedStats?.achievements?.length || 0;
          if (statsAfter > statsBefore && updatedStats?.achievements) {
            const lastAchievement = updatedStats.achievements[updatedStats.achievements.length - 1];
            console.log('🏆 Nuevo logro desbloqueado:', lastAchievement);
            setNewAchievement(lastAchievement);
          }
        }, 500);
      } else {
        console.error('❌ Error guardando partida');
      }
    },
    [gameStartTime, difficulty, score, correctAnswers, totalQuestions, saveGame, stats]
  );

  // Inicializar juego
  const startNewGame = useCallback(() => {
    const config = DIFFICULTIES[difficulty];
    initBoard(config);
    resetStats();
    resetTimer();
    resetQuestions();
    setShowGameOver(false);
    setShowStats(false);
    setExplodedCell(null);
    setMoves(0);
    setGameStartTime(Date.now());
    setGameState('ready');
  }, [difficulty, initBoard, resetStats, resetTimer, resetQuestions, setGameState]);

  // Manejar cambio de dificultad
  const handleDifficultyChange = useCallback(
    (newDifficulty: Difficulty) => {
      setDifficulty(newDifficulty);
      const config = DIFFICULTIES[newDifficulty];
      initBoard(config);
      resetStats();
      resetTimer();
      setGameState('ready');
      setMoves(0);
    },
    [initBoard, resetStats, resetTimer, setGameState]
  );

  // Manejar click en celda
  const onCellClick = useCallback(
    (row: number, col: number) => {
      if (gameState === 'won' || gameState === 'lost') return;

      if (gameState === 'ready') {
        setGameState('playing');
        setGameStartTime(Date.now());
        console.log('🎮 Juego iniciado - gameStartTime establecido');
      }

      playSound('click');

      const result = handleCellClick(row, col);
      setMoves((prev) => prev + 1);

      if (result.hitMine) {
        playSound('explosion');
        console.log('💥 Mina tocada - llamando saveGameResult(false)');
        setGameState('lost');
        setExplodedCell({ row, col });
        saveGameResult(false);
        setShowGameOver(true);
      } else if (result.won) {
        playSound('victory');
        console.log('🎉 Juego ganado - llamando saveGameResult(true)');
        setGameState('won');
        saveGameResult(true);
        setShowGameOver(true);
      }
    },
    [gameState, handleCellClick, setGameState, saveGameResult, playSound]
  );

  const onCellRightClick = useCallback(
    (row: number, col: number) => {
      return (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (gameState === 'won' || gameState === 'lost' || gameState === 'ready') return;

        if (board[row]?.[col]?.isFlagged) {
          const success = handleCellRightClick(row, col);
          if (success) {
            playSound('flag'); // Sonido al quitar bandera
          }
          return;
        }

        const maxFlags = DIFFICULTIES[difficulty].mines;
        if (flagCount >= maxFlags) {
          toast.error('⚠️ Ya has usado todas tus banderas', {
            description: `Límite: ${maxFlags} banderas`,
            duration: 2000,
          });
          playSound('incorrect');
          return;
        }

        // ✅ MOSTRAR PREGUNTA SOLO SI NO HAY BANDERA Y HAY ESPACIO
        if (!board[row]?.[col]?.isRevealed) {
          setPendingFlag({ row, col });
          setCurrentQuestion(getRandomQuestion());
        }
      };
    },
    [gameState, board, handleCellRightClick, getRandomQuestion, flagCount, difficulty, playSound]
  );

  // Manejar respuesta a pregunta
  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      if (!currentQuestion || !pendingFlag) return;

      const isCorrect = selectedIndex === currentQuestion.correct;
      setLastAnswerCorrect(isCorrect);
      setLastCorrectAnswer(currentQuestion.options[currentQuestion.correct]);

      if (isCorrect) {
        playSound('correct');
        addCorrectAnswer();

        const success = handleCellRightClick(pendingFlag.row, pendingFlag.col);

        if (success) {
          setTimeout(() => playSound('flag'), 300);
        } else {
          // ✅ Si falla toast
          toast.error('⚠️ Límite de banderas alcanzado', {
            duration: 2000,
          });
        }
      } else {
        playSound('incorrect');
        addIncorrectAnswer();
      }

      setCurrentQuestion(null);
      setShowExplanation(true);
    },
    [
      currentQuestion,
      pendingFlag,
      addCorrectAnswer,
      addIncorrectAnswer,
      handleCellRightClick,
      playSound,
    ]
  );

  // Cerrar modal de pregunta sin responder
  const handleQuestionClose = useCallback(() => {
    setCurrentQuestion(null);
    setPendingFlag(null);
  }, []);

  // Continuar después de explicación
  const handleExplanationContinue = useCallback(() => {
    setShowExplanation(false);
    setPendingFlag(null);
  }, []);

  // Stats globales
  const globalStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    bestTime: 0,
    totalTime: 0,
    totalMoves: 0,
    correctAnswers: correctAnswers,
    totalQuestions: totalQuestions,
    currentStreak: 0,
    bestStreak: 0,
  };

  return (
    <>
      <Toaster position="top-center" richColors />

      <Hero onPlayClick={scrollToGame} />
      <HowToPlay />
      <PrizesSection />

      <section
        id="game-section"
        className="min-h-screen animated-gradient p-4 sm:p-6 overflow-x-hidden relative"
      >
        <div className="noise-bg absolute inset-0 pointer-events-none"></div>
        <div className="vignette absolute inset-0 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-knockout text-5xl sm:text-6xl md:text-7xl font-black uppercase mb-3 text-white drop-shadow-2xl tracking-wider">
              ¡DESAFÍA EL MOMENTO!
            </h1>
            <p className="font-futura text-lg sm:text-xl text-white/90 font-semibold drop-shadow-lg">
              Encuentra todos los Ronis sin tocar las minas
            </p>
          </div>

          <GameStats
            className="game-stats"
            minesCount={DIFFICULTIES[difficulty].mines}
            flagsCount={flagCount}
            time={timer}
            streak={streak}
            bestStreak={bestStreak}
          />

          <GameControls
            currentDifficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onNewGame={startNewGame}
            isDesktop={isDesktop}
          />

          {!isDesktop && (
            <div className="text-center font-futura text-white/80 text-sm mb-4 px-4 bg-white/10 backdrop-blur-sm py-3 rounded-xl mx-auto max-w-md border border-white/20">
              💡 <span className="font-semibold">Tip:</span> Modo Vive Ahora solo disponible en
              pantallas grandes
            </div>
          )}

          <Board
            className="game-board"
            board={board}
            onCellClick={onCellClick}
            onCellRightClick={onCellRightClick}
            gameOver={gameState === 'won' || gameState === 'lost'}
            explodedCell={explodedCell}
          />

          <SoundToggle className="fixed bottom-6 left-6 z-50" />

          <button
            onClick={() => setShowStats(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB3] hover:from-[#FF8FB3] hover:to-[#FFA5C3] rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/30 backdrop-blur-sm z-50"
            aria-label="Ver estadísticas"
          >
            📊
          </button>
        </div>

        <QuestionModal
          isOpen={currentQuestion !== null}
          question={currentQuestion || { question: '', options: [], correct: 0 }}
          onAnswer={handleAnswer}
          onClose={handleQuestionClose}
        />

        <ExplanationModal
          isOpen={showExplanation}
          isCorrect={lastAnswerCorrect}
          correctAnswer={lastCorrectAnswer}
          explanation={currentQuestion?.explanation}
          onContinue={handleExplanationContinue}
        />

        <GameOverModal
          isOpen={showGameOver}
          isWon={gameState === 'won'}
          stats={{
            score,
            streak,
            correctAnswers,
            totalQuestions,
            timer,
          }}
          difficulty={difficulty}
          onPlayAgain={startNewGame}
          onViewStats={() => setShowStats(true)}
        />

        <StatsModal isOpen={showStats} stats={globalStats} onClose={() => setShowStats(false)} />

        <AchievementUnlockedModal
          achievement={newAchievement}
          onClose={() => setNewAchievement(null)}
        />

        {/* 📱 Tip móvil - Solo primera vez en móvil */}
        <MobileTip />

        {/* 📚 Tutorial interactivo */}
        <TutorialOverlay
          isActive={tutorialActive}
          currentStep={currentStepData}
          stepNumber={currentStep}
          totalSteps={totalSteps}
          onNext={nextStep}
          onPrev={prevStep}
          onSkip={skipTutorial}
        />
      </section>

      <Footer />
    </>
  );
}
