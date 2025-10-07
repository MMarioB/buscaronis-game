'use client';
import { FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';

export function Hero() {
  const scrollToGame = () => {
    document.getElementById('game-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToHowToPlay = () => {
    document.getElementById('how-to-play')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden p-4 animated-gradient noise-bg">
      <div className="absolute inset-0 vignette pointer-events-none"></div>

      <div className="absolute bottom-0 -left-16 md:-left-12 lg:left-0 w-2/5 max-w-xs md:max-w-sm lg:max-w-md h-auto aspect-[2/3] z-10 pointer-events-none animate-sway">
        <Image
          src="/images/palmera-izquierda.png"
          alt="Palmera izquierda"
          fill
          sizes="(max-width: 768px) 40vw, 33vw"
          className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
        />
      </div>

      <div className="absolute bottom-0 -right-16 md:-right-12 lg:right-0 w-2/5 max-w-xs md:max-w-sm lg:max-w-md h-auto aspect-[2/3] z-10 pointer-events-none animate-sway-delay">
        <Image
          src="/images/palmera-izquierda.png"
          alt="Palmera derecha"
          fill
          sizes="(max-width: 768px) 40vw, 33vw"
          className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] transform -scale-x-100"
        />
      </div>

      <div className="relative z-20 text-center flex flex-col items-center">
        <h1 className="font-knockout text-8xl md:text-9xl text-white uppercase tracking-tight mb-2 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
          BUSCARONIS
        </h1>
        <h2 className="font-knockout text-4xl md:text-5xl text-yellow-300 uppercase tracking-wide mb-8 animate-neon-flicker">
          DESAFÍA EL MOMENTO
        </h2>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-8 max-w-md w-full border border-white/20 shadow-xl">
          <p className="font-futura text-lg text-white font-medium">
            Juega al <strong>buscaminas más tropical</strong> 🌴
            <br />
            Aprende sobre <strong>Ron Barceló</strong> y gana <strong>pases VIP</strong> para
            Desalia 🎉
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <button
            onClick={scrollToGame}
            className="btn-primary font-knockout text-xl px-10 py-4 bg-pink-500 text-white rounded-full border-2 border-white shadow-lg 
                                   transition-all duration-300 hover:scale-105 hover:shadow-pink-400/50"
          >
            ¡JUGAR AHORA!
          </button>
          <button
            onClick={scrollToHowToPlay}
            className="font-futura font-bold text-lg px-10 py-4 bg-white/90 text-black rounded-full border-2 border-transparent shadow-lg
                                   transition-all duration-300 hover:scale-105 hover:bg-white"
          >
            ¿CÓMO FUNCIONA? 🤔
          </button>
        </div>

        <div className="flex flex-col items-center cursor-pointer mt-8" onClick={scrollToGame}>
          <p className="font-knockout text-white tracking-widest text-lg mb-2">
            DESLIZA PARA JUGAR
          </p>
          <FiChevronDown className="text-white text-4xl animate-bounce" />
        </div>
      </div>
    </section>
  );
}
