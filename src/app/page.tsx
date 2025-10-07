'use client';

import { useState, useCallback } from 'react';
import { Board } from '@/components/game/GameBoard';
import { GameStats } from '@/components/game/GameStats';
import { GameControls, type Difficulty } from '@/components/game/GameControls';
import { QuestionModal } from '@/components/modals/QuestionModal';
import { ExplanationModal } from '@/components/modals/ExplanationModal';
import { GameOverModal } from '@/components/modals/GameOverModal';
import { StatsModal } from '@/components/modals/StatsModal';
import { useBoard } from '@/hooks/useBoard';
import { useGameState } from '@/hooks/useGameState';
import { useQuestions } from '@/hooks/useQuestions';
import { useTimer } from '@/hooks/useTimer';
import type { Question, GameConfig } from '@/lib/types';

const DIFFICULTIES: Record<Difficulty, GameConfig> = {
  easy: { rows: 9, cols: 9, mines: 10, label: 'Chill', points: 100 },
  medium: { rows: 16, cols: 16, mines: 40, label: 'Desafío', points: 250 },
  hard: { rows: 16, cols: 30, mines: 99, label: 'Vive Ahora', points: 500 },
};

export default function Home() {
  // Hooks
  const { board, flagCount, initBoard, handleCellClick, handleCellRightClick } = useBoard();
  const {
    gameState,
    score,
    correctAnswers,
    totalQuestions,
    setGameState,
    addCorrectAnswer,
    addIncorrectAnswer,
    resetStats,
  } = useGameState();
  const { getRandomQuestion, resetQuestions } = useQuestions();
  const { timer, resetTimer } = useTimer(gameState);

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
      }

      const result = handleCellClick(row, col);
      setMoves((prev) => prev + 1);

      if (result.hitMine) {
        setGameState('lost');
        setExplodedCell({ row, col });
        setShowGameOver(true);
      } else if (result.won) {
        setGameState('won');
        setShowGameOver(true);
      }
    },
    [gameState, handleCellClick, setGameState]
  );

  // Manejar click derecho (bandera con pregunta)
  const onCellRightClick = useCallback(
    (row: number, col: number) => {
      return (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (gameState === 'won' || gameState === 'lost' || gameState === 'ready') return;

        // Si la celda ya tiene bandera, quitarla sin pregunta
        if (board[row]?.[col]?.isFlagged) {
          handleCellRightClick(row, col);
          return;
        }

        // Si quiere poner bandera, mostrar pregunta
        if (!board[row]?.[col]?.isRevealed) {
          setPendingFlag({ row, col });
          setCurrentQuestion(getRandomQuestion());
        }
      };
    },
    [gameState, board, handleCellRightClick, getRandomQuestion]
  );

  // Manejar respuesta a pregunta
  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      if (!currentQuestion || !pendingFlag) return;

      const isCorrect = selectedIndex === currentQuestion.correct;
      setLastAnswerCorrect(isCorrect);
      setLastCorrectAnswer(currentQuestion.options[currentQuestion.correct]);

      if (isCorrect) {
        addCorrectAnswer();
        // Plantar la bandera
        handleCellRightClick(pendingFlag.row, pendingFlag.col);
      } else {
        addIncorrectAnswer();
      }

      // Mostrar explicación
      setCurrentQuestion(null);
      setShowExplanation(true);
    },
    [currentQuestion, pendingFlag, addCorrectAnswer, addIncorrectAnswer, handleCellRightClick]
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

  // Stats globales (mock - aquí podrías usar localStorage)
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 p-4 sm:p-6 overflow-x-hidden">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-4xl sm:text-6xl font-black uppercase mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-lg">
          ¡Desafía el Momento!
        </h1>
        <p className="text-base sm:text-xl text-yellow-200 font-semibold drop-shadow-md">
          Encuentra todos los Ronis sin tocar las minas
        </p>
      </div>

      {/* Game Stats */}
      <GameStats minesCount={DIFFICULTIES[difficulty].mines} flagsCount={flagCount} time={timer} />

      {/* Game Controls */}
      <GameControls
        currentDifficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        onNewGame={startNewGame}
      />

      {/* Board */}
      <Board
        board={board}
        onCellClick={onCellClick}
        onCellRightClick={onCellRightClick}
        gameOver={gameState === 'won' || gameState === 'lost'}
        explodedCell={explodedCell}
      />

      {/* Modales */}
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
        time={timer}
        moves={moves}
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
        onPlayAgain={startNewGame}
        onViewStats={() => setShowStats(true)}
      />

      <StatsModal isOpen={showStats} stats={globalStats} onClose={() => setShowStats(false)} />
    </div>
  );
}
