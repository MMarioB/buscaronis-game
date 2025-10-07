import { Button } from '../ui/Button';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface QuestionModalProps {
  isOpen: boolean;
  question: Question;
  onAnswer: (selectedIndex: number) => void;
  onClose: () => void;
}

export function QuestionModal({ isOpen, question, onAnswer, onClose }: QuestionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border-2 border-orange-500/50 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header decorativo */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500"></div>

        {/* Contenido */}
        <div className="p-6 sm:p-8">
          {/* Título */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-4">
              <span className="text-2xl">❓</span>
              <span className="text-orange-400 font-bold uppercase tracking-wide text-sm">
                Pregunta Desalia
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {question.question}
            </h2>
          </div>

          {/* Opciones */}
          <div className="grid gap-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(index)}
                className="group relative p-4 text-left bg-gradient-to-r from-slate-700/50 to-slate-800/50 hover:from-orange-600/30 hover:to-pink-600/30 border-2 border-slate-600/50 hover:border-orange-500/70 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-600/50 group-hover:bg-orange-500/50 border border-slate-500/50 group-hover:border-orange-400/70 font-bold text-white transition-colors">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-white font-medium group-hover:text-orange-100 transition-colors">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Botón cancelar */}
          <div className="text-center">
            <Button onClick={onClose} variant="secondary" className="text-sm">
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
