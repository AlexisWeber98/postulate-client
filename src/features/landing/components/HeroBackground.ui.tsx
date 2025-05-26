import React from 'react';
import { HeroBackgroundProps } from '../../../types/components/landing/landing.types';
import { DEFAULT_HERO_IMAGE } from '../../../constants/images';

const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageUrl = DEFAULT_HERO_IMAGE,
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
