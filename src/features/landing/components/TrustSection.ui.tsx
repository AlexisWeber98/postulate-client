import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CardFlip from 'react-card-flip';
import { motion } from 'framer-motion';

interface TrustSectionProps {
  t: (key: string) => string;
}

const trustPoints = [
  {
    title: 'Pensado por buscadores',
    explanation: 'Postulate fue creado por personas que realmente buscaron trabajo y conocen tus necesidades.',
    textKey: 'trust.point1',
  },
  {
    title: 'Tus datos seguros',
    explanation: 'Tus datos personales y de búsqueda laboral están protegidos y solo vos podés acceder a ellos.',
    textKey: 'trust.point2',
  },
  {
    title: 'Mejora continua',
    explanation: 'Escuchamos a los usuarios y mejoramos la plataforma continuamente para vos.',
    textKey: 'trust.point3',
  },
];

const cardSize = "w-72 h-64 sm:w-80 sm:h-64";
const cardGradient = "bg-gradient-to-r from-blue-500 to-violet-500 text-white";
const cardShadow = "shadow-2xl";

const FlipCard: React.FC<{ title: string; explanation: string; delay?: number }> = ({ title, explanation, delay = 0 }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
    >
      <CardFlip isFlipped={flipped} flipDirection="horizontal">
        {/* Frente */}
        <div
          className={`flex flex-col justify-center items-center border border-blue-200 ${cardShadow} rounded-3xl cursor-pointer ${cardSize} ${cardGradient} transition-transform duration-300 hover:scale-105`}
          onClick={() => setFlipped(true)}
        >
          <span className="text-2xl md:text-3xl font-extrabold text-white text-center mb-8 leading-tight tracking-tight drop-shadow-lg select-none">
            {title}
          </span>
          <ArrowRight className="h-8 w-8 text-white mt-2" />
        </div>
        {/* Dorso */}
        <div
          className={`flex flex-col justify-center items-center border border-blue-200 ${cardShadow} rounded-3xl cursor-pointer ${cardSize} ${cardGradient} transition-transform duration-300 hover:scale-105`}
          onClick={() => setFlipped(false)}
        >
          <span className="text-lg md:text-xl text-white text-center px-6 font-medium tracking-tight leading-relaxed select-none">
            {explanation}
          </span>
        </div>
      </CardFlip>
    </motion.div>
  );
};

const TrustSection: React.FC<TrustSectionProps> = ({ t }) => {
  return (
    <section className="py-20 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {t('trust.title').replace('🧠 ', '')}
      </h2>
      <div className="flex flex-col md:flex-row gap-10 w-full justify-center">
        {trustPoints.map((point, idx) => (
          <FlipCard
            key={idx}
            title={t(point.textKey)}
            explanation={t(point.textKey + '.explanation')}
            delay={0.15 * idx}
          />
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
