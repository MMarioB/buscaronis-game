import { Button } from '../ui/Button';

interface ExplanationModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
  onContinue: () => void;
}

export function ExplanationModal({
  isOpen,
  isCorrect,
  correctAnswer,
  explanation,
  onContinue,
}: ExplanationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-gradient-to-br from-[#FF6B35]/95 via-[#FF8C42]/95 to-[#FFA55F]/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-[#FFC857]/60 overflow-hidden animate-in zoom-in-95 duration-300 noise-bg">
        <div
          className={`absolute top-0 left-0 right-0 h-2 ${
            isCorrect
              ? 'bg-gradient-to-r from-[#4ECDC4] via-emerald-400 to-green-400'
              : 'bg-gradient-to-r from-[#FF6B9D] via-red-500 to-orange-500'
          } shadow-lg`}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none rounded-3xl"></div>

        <div className="relative z-10 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 border-2 rounded-full mb-6 shadow-lg transition-all duration-300 hover:scale-105 ${
                isCorrect
                  ? 'bg-[#4ECDC4]/20 border-[#4ECDC4] backdrop-blur-sm'
                  : 'bg-[#FF6B9D]/20 border-[#FF6B9D] backdrop-blur-sm'
              }`}
            >
              <span className="text-4xl drop-shadow-lg">{isCorrect ? '✓' : '✗'}</span>
              <span
                className={`font-knockout font-bold uppercase tracking-wider text-lg ${
                  isCorrect ? 'text-white' : 'text-white'
                }`}
              >
                {isCorrect ? '¡CORRECTO!' : 'INCORRECTO'}
              </span>
            </div>

            {!isCorrect && (
              <div className="mb-6 p-5 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl shadow-xl">
                <p className="text-xs font-futura text-white/80 mb-2 uppercase tracking-wide">
                  Respuesta correcta:
                </p>
                <p className="text-white font-knockout text-lg sm:text-xl tracking-wide">
                  {correctAnswer}
                </p>
              </div>
            )}

            {explanation && (
              <div className="p-5 bg-gradient-to-br from-[#FFC857]/20 to-[#FF6B9D]/20 backdrop-blur-md border-2 border-[#FFC857]/40 rounded-2xl text-left shadow-xl">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl flex-shrink-0 drop-shadow-lg">💡</span>
                  <p className="text-sm font-knockout text-white uppercase tracking-wide">
                    ¿Sabías que...?
                  </p>
                </div>
                <p className="text-sm font-futura text-white/90 leading-relaxed pl-9">
                  {explanation}
                </p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Button
              onClick={onContinue}
              variant="primary"
              className="font-knockout px-10 py-3 text-base sm:text-lg tracking-wider shadow-2xl hover:shadow-[0_0_30px_rgba(255,199,87,0.5)] transition-all duration-300"
            >
              CONTINUAR
            </Button>
          </div>
        </div>

        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#FFC857]/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-tr from-[#4ECDC4]/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>
      </div>
    </div>
  );
}
