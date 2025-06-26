import React from 'react';
import { motion } from 'framer-motion';
import { TranslationKey } from '@/i18n';

interface TrustSectionProps {
  translate: (key: TranslationKey) => string;
}

const trustCards = [
  {
    icon: (
      <span className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 mb-6">
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" fill="none" />
          <path d="M15.5 10.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" stroke="white" strokeWidth="2" fill="none" />
          <path d="M17 17l-3.5-3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    ),
    title: 'Pensado por buscadores',
    text: 'Postulate fue creado por personas que realmente buscaron trabajo y conocen tus necesidades.'
  },
  {
    icon: (
      <span className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 mb-6">
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
          <path d="M12 3l7 4v6c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z" stroke="white" strokeWidth="2" fill="none" />
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    ),
    title: 'Tus datos seguros',
    text: 'Tus datos personales y de búsqueda laboral están protegidos y solo tú puedes acceder a ellos.'
  },
  {
    icon: (
      <span className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-red-500 mb-6">
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
          <path d="M4 17l6-6 4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 17v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" stroke="white" strokeWidth="2" />
        </svg>
      </span>
    ),
    title: 'Mejora continua',
    text: 'Escuchamos a los usuarios y mejoramos la plataforma continuamente para ti.'
  },
];

const TrustSection: React.FC<TrustSectionProps> = ({ translate }) => {


  return (
    <section className="py-20 sm:py-32 flex flex-col items-center w-full min-h-[60vh]">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent px-4">
        {translate('landing.trust.title')}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-7xl px-4 sm:px-6">
        {trustCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 * idx }}
            className="w-full"
          >
            <div
              className={`flex flex-col items-center justify-start border border-transparent shadow-2xl rounded-3xl min-h-[22rem] py-8 px-6 bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 transition-transform duration-300 hover:scale-105`}
            >
              {card.icon}
              <span className="text-2xl sm:text-2xl md:text-3xl font-extrabold text-white text-center leading-tight tracking-tight drop-shadow-lg select-none w-full mb-2">
                {card.title}
              </span>
              <span className="text-base sm:text-lg md:text-xl text-white text-center font-medium tracking-tight leading-relaxed select-none w-full mt-2">
                {card.text}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
