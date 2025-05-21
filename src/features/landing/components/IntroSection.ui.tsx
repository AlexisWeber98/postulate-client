import React from 'react';
import { IntroSectionProps, CardProps } from '../../../types/components/landing/landing.types';
import { getIntroCards } from '../data/introCards';

const IntroSection: React.FC<IntroSectionProps> = ({ t }) => {
  const cards = getIntroCards(t);

  if (!cards || cards.length === 0) {
    return (
      <section className="py-20" role="alert" aria-live="polite">
        <div className="w-full text-center">
          <p className="text-gray-600">No hay tarjetas disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" aria-label="Sección de introducción">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 w-full">
          {cards.map((card: CardProps, index: number) => card && (
            <div
              key={`intro-card-${card.text || index}`}
              className="relative w-full h-44 md:h-56 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center group hover:scale-105 transition-transform duration-300"
              role="article"
              aria-labelledby={`card-title-${index}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${card.image})`,
                }}
                aria-hidden="true"
                role="presentation"
              />
              <div
                className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
                {card.icon && (
                  <div aria-hidden="true" role="presentation">
                    {card.icon}
                  </div>
                )}
                <span
                  id={`card-title-${index}`}
                  className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg"
                >
                  {card.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
