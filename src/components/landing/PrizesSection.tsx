export function PrizesSection() {
  const prizes = [
    {
      emoji: '🥉',
      level: 'Nivel Chill',
      points: 300,
      reward: 'Entrada Estándar',
      color: 'from-orange-400 to-yellow-500',
      glow: 'shadow-orange-400/50',
    },
    {
      emoji: '🥈',
      level: 'Nivel Desafío',
      points: 500,
      reward: 'Entrada VIP + Bebida',
      color: 'from-pink-500 to-purple-500',
      glow: 'shadow-pink-500/50',
      featured: true,
    },
    {
      emoji: '🥇',
      level: 'Vive Ahora',
      points: 800,
      reward: 'Pase Backstage Exclusivo',
      color: 'from-cyan-400 to-blue-500',
      glow: 'shadow-cyan-400/50',
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-9xl animate-pulse">🎁</div>
        <div
          className="absolute bottom-20 right-20 text-9xl animate-pulse"
          style={{ animationDelay: '1s' }}
        >
          🎉
        </div>
        <div
          className="absolute top-1/2 left-1/2 text-8xl animate-spin"
          style={{ animationDuration: '20s' }}
        >
          ✨
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-8 py-3 rounded-full shadow-2xl border-4 border-white">
              <span className="font-knockout text-xl md:text-2xl uppercase drop-shadow-lg">
                🎁 PREMIOS EXCLUSIVOS
              </span>
            </div>
          </div>

          <h2 className="font-knockout text-5xl md:text-7xl text-white uppercase mb-6 drop-shadow-lg">
            GANA PASES VIP
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500">
              PARA DESALIA
            </span>
          </h2>

          <p className="font-futura text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Alcanza{' '}
            <span className="text-yellow-400 font-bold text-2xl md:text-3xl">500 puntos</span> y
            obtén tu entrada para la experiencia más épica de{' '}
            <span className="text-cyan-400 font-bold">Ron Barceló</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className={`
                  group relative bg-gradient-to-br ${prize.color} rounded-3xl p-8 
                  shadow-2xl hover:scale-105 transition-all duration-500 border-4 border-white
                  ${prize.featured ? 'md:scale-110 md:z-10' : ''}
                  ${prize.glow}
                `}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              {prize.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-full font-knockout text-sm uppercase shadow-xl border-2 border-white animate-pulse">
                    ⭐ MÁS POPULAR
                  </div>
                </div>
              )}

              <div className="relative z-10 text-center">
                <div
                  className="text-8xl mb-4 animate-bounce"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {prize.emoji}
                </div>

                <div className="font-knockout text-2xl md:text-3xl text-white uppercase mb-3 drop-shadow-lg">
                  {prize.level}
                </div>

                <div className="mb-4">
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border-2 border-white/50">
                    <span className="font-knockout text-4xl md:text-5xl text-white drop-shadow-lg">
                      {prize.points}
                    </span>
                    <span className="font-futura text-xl text-white/90 ml-2">pts</span>
                  </div>
                </div>

                <p className="font-futura text-white text-lg md:text-xl font-bold leading-tight">
                  {prize.reward}
                </p>
              </div>

              <div className="absolute top-4 right-4 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                ✨
              </div>
              <div className="absolute bottom-4 left-4 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                ✨
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-cyan-500/20 backdrop-blur-md border-4 border-white/30 rounded-3xl p-8 shadow-2xl">
          <div className="text-center">
            <p className="font-futura text-white text-xl md:text-2xl mb-4 font-bold">
              ¿Listo para <span className="text-yellow-300">desafiar el momento</span>? 🔥
            </p>
            <p className="font-futura text-gray-300 text-base md:text-lg mb-6">
              Cuanto más juegues y mejor respondas, más cerca estarás de vivir la experiencia
              Desalia
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="font-futura text-white">✓ Sin costo</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="font-futura text-white">✓ Premios reales</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="font-futura text-white">✓ Diversión garantizada</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs md:text-sm mt-8 font-futura">
          * Premios sujetos a disponibilidad. Promoción válida hasta fin de temporada. +18 años.
        </p>
      </div>

      <div className="absolute top-0 left-0 right-0 rotate-180">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 43.3C480 46.7 600 33.3 720 30C840 26.7 960 33.3 1080 43.3C1200 53.3 1320 66.7 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="rgba(78, 205, 196, 0.1)"
          />
        </svg>
      </div>
    </section>
  );
}
