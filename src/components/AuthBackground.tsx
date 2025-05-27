import { ReactNode, useEffect, useState } from 'react';

interface AuthBackgroundProps {
  imagePath: string;
  children: ReactNode;
}

export function AuthBackground({ imagePath, children }: AuthBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);


  useEffect(() => {

    if (!imagePath) {
      return;
    }

    const img = new window.Image();

    const handleLoad = () => {
      setImageLoaded(true);
    };

    const handleError = (error: any) => {
      console.error('Error al cargar la imagen:', error);
      setImageLoaded(false);
    };

    img.onload = handleLoad;
    img.onerror = handleError;

    img.src = imagePath;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imagePath]);



  return (
    <div className="auth-background">
      <div
        className="auth-background-image"
        style={{
          backgroundImage: `url(${imagePath})`,
          opacity: imageLoaded ? 1 : 0
        }}
      />
      <div className="auth-background-overlay" />
      <div className="auth-background-content">
        {children}
      </div>
    </div>
  );
}
