import React, { useState, useEffect } from 'react';
import { DEFAULT_HERO_IMAGE } from '../../../constants/images';

interface HeroBackgroundProps {
  imageUrl?: string;
  children: React.ReactNode;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageUrl = DEFAULT_HERO_IMAGE,
  children,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Verificar si la imagen ya está en caché
    const img = new window.Image();
    
    const handleLoad = () => {
      setImageLoaded(true);
      setImageError(false);
    };

    const handleError = () => {
      console.error('Error al cargar la imagen del hero');
      setImageLoaded(false);
      setImageError(true);
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = imageUrl;

    // Limpiar listeners
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return (
    <div className="relative min-h-screen">
      {!imageError && (
        <>
          {/* Placeholder con gradiente */}
          <div
            className="hero-background absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
            style={{
              opacity: imageLoaded ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
          {/* Imagen real con prioridad de carga */}
          <div
            className="hero-background absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${imageUrl})`,
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              willChange: 'opacity'
            }}
          />
        </>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
