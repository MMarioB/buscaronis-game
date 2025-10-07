export function HowToPlay() {
  const steps = [
    {
      icon: '🔍',
      title: 'Encuentra los Ronis',
      description:
        'Haz click para revelar celdas. Evita las minas y descubre dónde están los Ronis escondidos.',
      color: 'from-orange-400 to-pink-500',
    },
    {
      icon: '❓',
      title: 'Responde Preguntas',
      description:
        'Click derecho para plantar bandera. Responde preguntas sobre Ron Barceló y Desalia correctamente.',
      color: 'from-pink-500 to-purple-500',
    },
    {
      icon: '🏆',
      title: 'Gana Premios',
      description:
        'Acumula puntos, mantén tu racha y alcanza el score necesario para ganar pases VIP.',
      color: 'from-cyan-400 to-blue-500',
    },
  ];

  return (
    <section
      id="how-to-play"
      className="relative py-20 px-4 bg-gradient-to-b from-[#4ECDC4] to-[#2D9B95] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl">🌊</div>
        <div className="absolute bottom-10 right-10 text-9xl">🍹</div>
        <div className="absolute top-1/2 left-1/4 text-7xl">⭐</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-knockout text-5xl md:text-7xl text-white uppercase mb-4 drop-shadow-lg">
            ¿CÓMO JUGAR?
          </h2>
          <p className="font-futura text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Tres pasos simples para <strong>desafiar el momento</strong> y ganar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-2xl hover:scale-105 transition-all duration-300 border-4 border-white/50 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="font-knockout text-3xl text-white">{index + 1}</span>
              </div>

              <div className="relative z-10">
                <div className="text-7xl mb-6 text-center">{step.icon}</div>
                <h3 className="font-knockout text-2xl md:text-3xl text-slate-900 uppercase mb-4 text-center">
                  {step.title}
                </h3>
                <p className="font-futura text-slate-700 leading-relaxed text-center">
                  {step.description}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-tl-full" />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-2xl px-8 py-4 border-2 border-white/40">
            <p className="font-futura text-white text-lg md:text-xl font-bold">
              💡 <strong>Tip Pro:</strong> Mantén tu racha de respuestas correctas para multiplicar
              tus puntos
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 43.3C480 46.7 600 33.3 720 30C840 26.7 960 33.3 1080 43.3C1200 53.3 1320 66.7 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="rgba(255, 255, 255, 0.1)"
          />
        </svg>
      </div>
    </section>
  );
}
