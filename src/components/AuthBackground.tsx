import { ReactNode, useEffect, useState } from 'react';

interface AuthBackgroundProps {
  imagePath: string;
  children: ReactNode;
}

export function AuthBackground({ imagePath, children }: AuthBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    if (!imagePath) return;
    const img = new window.Image();
    img.src = imagePath;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [imagePath]);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={
        imageLoaded
          ? { backgroundImage: `url(${imagePath})` }
          : { backgroundColor: '#f7fafc' }
      }
    >
      {children}
    </div>
  );
}
