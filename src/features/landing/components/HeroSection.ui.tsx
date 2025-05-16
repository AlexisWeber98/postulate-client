import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  t: (key: string) => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => (
  <section className="relative pt-16 pb-24 px-4">
    <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-2 md:gap-2 text-center md:text-left relative z-10">
      {/* Columna izquierda: textos */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
        <motion.div
          className="flex justify-center md:justify-start mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Briefcase className="h-16 w-16 text-white drop-shadow-[0_0_24px_rgba(80,112,255,0.5)]" />
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-4 drop-shadow-[0_2px_24px_rgba(80,112,255,0.45)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {t('Postulate')}
        </motion.h1>
        <motion.p
          className="text-xl text-white/90 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        >
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {t('login')}
            <ArrowRight className="ml-2 h-5 w-5 text-white" />
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-blue-700 font-semibold text-base transition bg-white border border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {t('register')}
            <ArrowRight className="ml-2 h-5 w-5 text-blue-700" />
          </Link>
        </motion.div>
      </div>
      {/* Columna derecha: imagen/ilustración */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        {/* SVG decorativo o mockup de app */}
        <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
          <defs>
            <linearGradient id="heroGradient" x1="0" y1="0" x2="320" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5a7bcf" />
              <stop offset="1" stopColor="#a18cd1" />
            </linearGradient>
          </defs>
          <rect x="20" y="40" width="220" height="320" rx="32" fill="url(#heroGradient)" />
          <rect x="40" y="60" width="180" height="40" rx="12" fill="#fff" fillOpacity="0.9" />
          <rect x="40" y="110" width="140" height="20" rx="8" fill="#fff" fillOpacity="0.7" />
          <rect x="40" y="140" width="120" height="20" rx="8" fill="#fff" fillOpacity="0.7" />
          <rect x="40" y="180" width="160" height="40" rx="12" fill="#fff" fillOpacity="0.9" />
          <rect x="40" y="240" width="100" height="20" rx="8" fill="#fff" fillOpacity="0.7" />
          <rect x="40" y="270" width="80" height="20" rx="8" fill="#fff" fillOpacity="0.7" />
        </svg>
      </div>
    </div>
  </section>
);

export default HeroSection;
