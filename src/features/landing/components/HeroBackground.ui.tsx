import React from 'react';
import { HeroBackgroundProps } from '../../../types/components/landing/landing.types';

const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
  overlayOpacity = 0.6
}) => {
  return (
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${imageUrl})`,
        zIndex: 0
      }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }} />
    </div>
  );
};

export default HeroBackground;
