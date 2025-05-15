import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  t: (key: string) => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => (
  <section className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
    <motion.h1
      className="text-center font-black leading-tight"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <span className="block text-5xl md:text-7xl text-black">{t('hero.bringing')}</span>
      <span className="block text-5xl md:text-7xl text-blue-400 font-bold">{t('hero.nonTraditional')}</span>
      <span className="block text-5xl md:text-7xl text-blue-400 font-bold">{t('hero.learningTo')}</span>
      <span className="block text-5xl md:text-7xl text-black">{t('hero.communities')}</span>
      <span className="block text-5xl md:text-7xl text-blue-400 font-bold">{t('hero.weBelieveIn')}</span>
    </motion.h1>
    <motion.div
      className="mt-10 max-w-2xl text-center text-gray-700 text-lg font-normal space-y-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
    >
      <p>{t('hero.p1')}</p>
      <p>{t('hero.p2')}</p>
    </motion.div>
  </section>
);

export default HeroSection;
