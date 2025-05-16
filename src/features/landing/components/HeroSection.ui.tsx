import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  t: (key: string) => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => (
  <section className="relative bg-cover bg-center pt-16 pb-24 px-4" style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #c7d2fe 50%, #a5b4fc 100%)' }}>
    {/* Overlay para mejorar la legibilidad del texto */}
    <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
    <div className="container mx-auto text-center relative z-10">
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Briefcase className="h-16 w-16 text-white" />
      </motion.div>
      <motion.h1
        className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {t('Postulate')}
      </motion.h1>
      <motion.p
        className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      >
        {t('hero.subtitle')}
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
      >
        <Link
          to="/login"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-colors"
        >
          {t('login')}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link
          to="/register"
          className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors"
        >
          {t('register')}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
