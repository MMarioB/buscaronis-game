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
      <div className="relative w-full max-w-xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border-2 border-orange-500/50 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header decorativo con color según resultado */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${
            isCorrect
              ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500'
              : 'bg-gradient-to-r from-red-500 via-orange-500 to-pink-500'
          }`}
        ></div>

        {/* Contenido */}
        <div className="p-6 sm:p-8">
          {/* Resultado */}
          <div className="text-center mb-6">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-4 ${
                isCorrect
                  ? 'bg-green-500/20 border-green-500/50'
                  : 'bg-red-500/20 border-red-500/50'
              }`}
            >
              <span className="text-3xl">{isCorrect ? '✓' : '✗'}</span>
              <span
                className={`font-bold uppercase tracking-wide text-sm ${
                  isCorrect ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </span>
            </div>

            {/* Respuesta correcta */}
            {!isCorrect && (
              <div className="mb-4 p-4 bg-slate-700/50 border border-slate-600/50 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">Respuesta correcta:</p>
                <p className="text-white font-semibold">{correctAnswer}</p>
              </div>
            )}

            {/* Explicación */}
            {explanation && (
              <div className="p-4 bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-xl text-left">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg flex-shrink-0">💡</span>
                  <p className="text-sm text-slate-300 font-medium">¿Sabías que...?</p>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed pl-7">{explanation}</p>
              </div>
            )}
          </div>

          {/* Botón continuar */}
          <div className="text-center">
            <Button onClick={onContinue} variant="primary" className="px-8">
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
