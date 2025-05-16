import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  t: (key: string) => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => (
  <section className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] px-4 py-12">
    <motion.h1
      className="text-center font-extrabold leading-tight"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <span className="block text-3xl md:text-5xl bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text mb-2">
        {t('hero.bringing')}
      </span>
      <span className="block text-3xl md:text-5xl text-blue-500 font-extrabold mb-2">{t('hero.nonTraditional')}</span>
      <span className="block text-3xl md:text-5xl text-blue-500 font-extrabold mb-2">{t('hero.learningTo')}</span>
      <span className="block text-3xl md:text-5xl bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text mb-2">
        {t('hero.communities')}
      </span>
      <span className="block text-3xl md:text-5xl text-blue-500 font-extrabold">{t('hero.weBelieveIn')}</span>
    </motion.h1>
    <motion.div
      className="mt-8 max-w-2xl text-center text-gray-700 text-lg md:text-xl font-normal space-y-4"
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
