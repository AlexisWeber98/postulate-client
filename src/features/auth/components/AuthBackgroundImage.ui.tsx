import React from 'react';
import { useAuthBackground } from './AuthBackgroundContext';
import { useLocation } from 'react-router-dom';

const loginImages = [
  // Persona trabajando desde casa con laptop
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  // Escritorio con laptop y café
  'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=1200&q=80',
];

const registerImages = [
  // Mujer trabajando en casa con auriculares
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
  // Persona en escritorio moderno
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
];

export const AuthBackgroundImage = () => {
  const { index, setIndex } = useAuthBackground();
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const images = isLogin ? loginImages : registerImages;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, [setIndex, images.length]);

  return (
    <div className="fixed inset-0 w-full h-full z-10 pointer-events-none">
      <img
        src={images[index]}
        alt="Fondo representativo"
        className="w-full h-full object-cover absolute inset-0 z-10"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/40 z-20" />
    </div>
  );
};
