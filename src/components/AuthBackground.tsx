import { ReactNode, useEffect, useState } from 'react';

interface AuthBackgroundProps {
  imagePath: string;
  children: ReactNode;
}

export function AuthBackground({ imagePath, children }: AuthBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log('=== AuthBackground Component ===');
  console.log('Initial render - Props:', { imagePath });
  console.log('Initial state - imageLoaded:', imageLoaded);

  useEffect(() => {
    console.log('=== useEffect Hook ===');
    console.log('Effect triggered with imagePath:', imagePath);

    if (!imagePath) {
      console.warn('No imagePath provided, returning early');
      return;
    }

    console.log('Creating new Image object');
    const img = new window.Image();

    const handleLoad = () => {
      console.log('=== Image Load Success ===');
      console.log('Image loaded successfully:', imagePath);
      console.log('Image dimensions:', img.width, 'x', img.height);
      console.log('Image complete:', img.complete);
      console.log('Image natural dimensions:', img.naturalWidth, 'x', img.naturalHeight);
      setImageLoaded(true);
    };

    const handleError = (error: any) => {
      console.error('=== Image Load Error ===');
      console.error('Failed to load image:', imagePath);
      console.error('Error details:', error);
      console.error('Image object state:', {
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      });
      setImageLoaded(false);
    };

    console.log('Setting up image load handlers');
    img.onload = handleLoad;
    img.onerror = handleError;

    console.log('Setting image source:', imagePath);
    img.src = imagePath;

    return () => {
      console.log('=== Cleanup ===');
      console.log('Removing image handlers');
      img.onload = null;
      img.onerror = null;
    };
  }, [imagePath]);

  console.log('=== Rendering Component ===');
  console.log('Current state:', {
    imageLoaded,
    imagePath,
    styles: {
      backgroundImage: `url(${imagePath})`,
      opacity: imageLoaded ? 1 : 0
    }
  });

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
