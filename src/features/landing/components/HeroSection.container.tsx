import React from 'react';
import HeroSection from './HeroSection.ui';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../../../context/LanguageContext';

const HeroSectionContainer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="relative">
      <LanguageSelector />
      <HeroSection t={t} />
    </div>
  );
};

export default HeroSectionContainer;
