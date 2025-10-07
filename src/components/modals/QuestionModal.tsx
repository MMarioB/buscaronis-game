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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#FF6B35]/95 via-[#FF8C42]/95 to-[#FFA55F]/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-[#FFC857]/70 overflow-hidden animate-in zoom-in-95 duration-300 noise-bg">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FFC857] via-[#FF6B9D] to-[#4ECDC4] shadow-lg"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none rounded-3xl"></div>

        <div className="relative z-10 p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#FFC857]/30 backdrop-blur-sm border-2 border-[#FFC857] rounded-full mb-6 shadow-lg">
              <span className="text-3xl drop-shadow-lg">❓</span>
              <span className="text-white font-knockout font-bold uppercase tracking-wider text-sm sm:text-base">
                PREGUNTA DESALIA
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-knockout font-bold text-white leading-tight tracking-wide px-4">
              {question.question}
            </h2>
          </div>

          <div className="grid gap-3 sm:gap-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(index)}
                className="group relative p-4 sm:p-5 text-left bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-[#FFC857] rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FFC857]/20 active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/20 group-hover:bg-[#FFC857]/80 backdrop-blur-sm border-2 border-white/40 group-hover:border-[#FFC857] font-knockout font-bold text-lg sm:text-xl text-white transition-all duration-300 group-hover:scale-110">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-white font-futura font-medium text-base sm:text-lg group-hover:text-[#FFC857] transition-colors leading-relaxed">
                    {option}
                  </span>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={onClose}
              variant="secondary"
              className="font-knockout text-sm tracking-wider px-8 backdrop-blur-sm"
            >
              CANCELAR
            </Button>
          </div>
        </div>

        <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-[#4ECDC4]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-6 left-6 w-32 h-32 bg-gradient-to-tr from-[#FF6B9D]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#FFC857] rounded-full opacity-60 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-16 w-1.5 h-1.5 bg-[#4ECDC4] rounded-full opacity-50 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className="absolute bottom-1/4 right-12 w-2 h-2 bg-[#FF6B9D] rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>
    </div>
  );
}
