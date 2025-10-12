'use client';

import { useState, useEffect } from 'react';

// Definimos una interfaz para el estilo de cada chispa
interface SparkleStyle {
  top: string;
  left: string;
  animationDelay: string;
  opacity: number;
}

export function SparklesBackground() {
  const [sparkles, setSparkles] = useState<SparkleStyle[]>([]);

  useEffect(() => {
    // Este código solo se ejecutará en el navegador del cliente,
    // después de que el componente se haya renderizado por primera vez.
    const generatedSparkles = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    setSparkles(generatedSparkles);
  }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez

  // Mientras se generan las chispas, no renderizamos nada para evitar el mismatch.
  if (sparkles.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((style, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
          style={style}
        />
      ))}
    </div>
  );
}
