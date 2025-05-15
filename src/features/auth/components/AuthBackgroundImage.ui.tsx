import React from 'react';
import { useAuthBackground } from './AuthBackgroundContext';

const images = [
  // Persona trabajando desde casa con laptop
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',

  // Escritorio con laptop y café
  'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=1200&q=80',
  // Mujer trabajando en casa con auriculares
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',

];

export const AuthBackgroundImage = () => {
  const { index, setIndex } = useAuthBackground();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, [setIndex]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <img
        src={images[index]}
        alt="Fondo representativo"
        className="w-full h-full object-cover absolute inset-0"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};
