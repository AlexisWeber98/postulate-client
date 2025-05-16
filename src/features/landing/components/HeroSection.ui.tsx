import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  t: (key: string) => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => (
  <section className="relative  pt-16 pb-24 px-4">
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
  </section>
);

export default HeroSection;
