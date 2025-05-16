import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CardFlip from 'react-card-flip';

interface TrustSectionProps {
  t: (key: string) => string;
}

const trustPoints = [
  {
    title: 'Pensado por buscadores de empleo reales',
    explanation: 'Postulate fue creado por personas que realmente buscaron trabajo y conocen tus necesidades.',
    textKey: 'trust.point1',
  },
  {
    title: 'Tus datos están seguros y solo vos los ves',
    explanation: 'Tus datos personales y de búsqueda laboral están protegidos y solo vos podés acceder a ellos.',
    textKey: 'trust.point2',
  },
  {
    title: 'En constante mejora con feedback de usuarios',
    explanation: 'Escuchamos a los usuarios y mejoramos la plataforma continuamente para vos.',
    textKey: 'trust.point3',
  },
];

const FlipCard: React.FC<{ title: string; explanation: string }> = ({ title, explanation }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <CardFlip isFlipped={flipped} flipDirection="horizontal">
      {/* Frente */}
      <div
        className="w-full max-w-sm h-56 flex flex-col justify-center items-center bg-white/80 border border-blue-200 shadow-xl rounded-3xl cursor-pointer"
        onClick={() => setFlipped(true)}
      >
        <span className="text-lg md:text-xl font-extrabold text-blue-900 text-center mb-4">{title}</span>
        <ArrowRight className="h-10 w-10 text-blue-500 mt-2" />
      </div>
      {/* Dorso */}
      <div
        className="w-full max-w-sm h-56 flex flex-col justify-center items-center bg-white/90 border border-blue-200 shadow-xl rounded-3xl cursor-pointer"
        onClick={() => setFlipped(false)}
      >
        <span className="text-base md:text-lg text-gray-800 text-center px-4">{explanation}</span>
      </div>
    </CardFlip>
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
            title={t(point.textKey).replace(/^[^ ]+ /, '')}
            explanation={point.explanation}
          />
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
