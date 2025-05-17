import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

function highlightImportant(text: string) {
  const parts = text.split(/(\[\[.*?\]\])/g);
  return parts.map((part, idx) => {
    if (/^\[\[.*\]\]$/.test(part)) {
      const clean = part.replace(/^\[\[/, '').replace(/\]\]$/, '');
      return (
        <span key={idx} className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent font-extrabold">{clean}</span>
      );
    }
    return part;
  });
}

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[calc(100vh-0px)] flex items-center justify-center pt-24 pb-24 px-4">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-2 md:gap-2 text-center md:text-left relative z-10">
        {/* Columna izquierda: textos */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center min-h-[480px]">
          <motion.div
            className="flex justify-center md:justify-start mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Briefcase className="h-20 w-20 text-white drop-shadow-[0_0_24px_rgba(80,112,255,0.5)]" />
          </motion.div>
          <motion.h1
            className="text-5xl font-extrabold text-white sm:text-6xl md:text-7xl mb-6 drop-shadow-[0_2px_24px_rgba(80,112,255,0.45)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {t('Postulate')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-white font-semibold max-w-2xl h-[96px] mb-10 text-center md:text-left drop-shadow-lg flex items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            {highlightImportant(t('hero.subtitle'))}
          </motion.p>
          <motion.div
            className="flex flex-row justify-center md:justify-start gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          >
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl shadow-xl text-white font-extrabold text-xl transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[220px] whitespace-nowrap"
            >
              {t('login')}
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl shadow-xl text-blue-700 font-extrabold text-xl transition bg-white border border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[220px] whitespace-nowrap"
            >
              {t('register')}
            </Link>
          </motion.div>
        </div>
        {/* Columna derecha eliminada (SVG decorativo) */}
      </div>
    </section>
  );
};

export default HeroSection;
