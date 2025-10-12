// components/Footer.tsx
import React from 'react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] py-8 px-4 mt-auto relative overflow-hidden ${className}`}
    >
      <div className="noise-bg"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div className="text-center md:text-left">
            <h3 className="text-white font-knockout text-2xl sm:text-3xl tracking-wider mb-2">
              VIVE AHORA!
            </h3>
            <p className="text-white/90 font-futura text-sm sm:text-base">
              Un juego inspirado en Ron Barceló
            </p>
            <p className="text-white/70 font-futura text-xs mt-2">Versión 1.2.0</p>
          </div>

          <div className="text-center">
            <h4 className="text-white font-knockout text-lg tracking-wide mb-4">DESCUBRE MÁS</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.ronbarcelo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white font-futura text-sm transition-all duration-200 hover:underline inline-block hover:scale-105"
                >
                  Ron Barceló
                </a>
              </li>
              <li>
                <a
                  href="https://www.ronbarcelo.com/es/marcas/desalia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white font-futura text-sm transition-all duration-200 hover:underline inline-block hover:scale-105"
                >
                  Sobre Desalia
                </a>
              </li>
              <li>
                <a
                  href="#terminos"
                  className="text-white/90 hover:text-white font-futura text-sm transition-all duration-200 hover:underline inline-block hover:scale-105"
                >
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-white font-knockout text-lg tracking-wide mb-4">SÍGUENOS</h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="https://www.instagram.com/ronbarcelospain/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/RonBarceloSpain"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://x.com/RonBarceloSpain"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                aria-label="X (Twitter)"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-white/80 font-futura text-xs">
            <p className="text-center md:text-left">
              © {currentYear} Ron Barceló. Todos los derechos reservados.
            </p>
            <p className="text-center md:text-right font-medium">
              Bebe con moderación. Prohibida la venta a menores de edad.
            </p>
          </div>
          <p className="text-white/70 font-futura text-xs text-center mt-4">
            Desarrollado con 🍹 y ❤️ para los desaliers
          </p>
        </div>
      </div>
    </footer>
  );
};
