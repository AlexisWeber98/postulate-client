import React, { useState, useEffect } from 'react';

interface AuthBackgroundProps {
  imagePath: string;
  children: React.ReactNode;
}

export function AuthBackground({ imagePath, children }: AuthBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!imagePath) {
      setImageLoaded(true);
      return;
    }

    const img = new window.Image();

    const handleLoad = () => {
      setImageLoaded(true);
      setImageError(false);
    };

    const handleError = () => {
      setImageLoaded(false);
      setImageError(true);
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.loading = 'lazy';
    img.src = imagePath;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imagePath]);

  return (
    <div className="relative min-h-screen">
      {!imageError && (
        <div
          className="auth-background-image absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{
            backgroundImage: `url(${imagePath})`,
            opacity: imageLoaded ? 1 : 0
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
