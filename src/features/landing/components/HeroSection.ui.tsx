import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../../../store';

function highlightImportant(text: string) {
  return (
    <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent font-extrabold">{text}</span>
  );
}

const HeroSection: React.FC = () => {
  const translate = useLanguageStore(state=>state.translate);
  return (
    <section className="relative min-h-[calc(100vh-0px)] flex items-center justify-center pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-2 md:gap-2 text-center md:text-left relative z-10">
        {/* Columna izquierda: textos */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center min-h-[300px] sm:min-h-[350px]">
          <motion.div
            className="flex justify-center md:justify-start mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Briefcase className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white drop-shadow-[0_0_24px_rgba(80,112,255,0.5)]" />
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-4 drop-shadow-[0_2px_24px_rgba(80,112,255,0.45)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {translate('Postulate')}
          </motion.h1>

          {/* Subtítulo SEO optimizado */}
          <motion.h2
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-bold mb-3 sm:mb-4 drop-shadow-lg text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            {translate('hero.subtitle')}
          </motion.h2>

          <motion.div
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-semibold max-w-2xl mb-4 sm:mb-6 text-center md:text-left drop-shadow-lg flex flex-wrap items-center justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 sm:gap-2">
              {highlightImportant(translate('hero.organize'))}
              <span className="text-white">,</span>
              {highlightImportant(translate('hero.track'))}
              <span className="text-white"> y </span>
              {highlightImportant(translate('hero.optimize'))}
              <span className="text-white">{translate('hero.subtitle.rest')}</span>
            </div>
          </motion.div>

          {/* Descripción adicional para SEO */}
          <motion.p
            className="text-xs sm:text-sm md:text-base text-white/90 max-w-xl mb-4 sm:mb-6 text-center md:text-left drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          >
            {translate('hero.description')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-xl text-white font-extrabold text-base sm:text-lg transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-[200px] whitespace-nowrap"
              aria-label="Iniciar sesión en Postulate"
            >
              {translate('login')}
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-xl text-blue-700 font-extrabold text-base sm:text-lg transition bg-white border border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-[200px] whitespace-nowrap"
              aria-label="Crear cuenta en Postulate"
            >
              {translate('register')}
            </Link>
          </motion.div>
        </div>
        {/* Columna derecha eliminada (SVG decorativo) */}
      </div>
    </section>
  );
};

export default HeroSection;
