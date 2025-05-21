import React from 'react';
import { IntroSectionProps, CardProps } from '../../../types/components/landing/landing.types';
import { getIntroCards } from '../data/introCards';

const IntroSection: React.FC<IntroSectionProps> = ({ t }) => {
  const cards = getIntroCards(t);

  return (
    <section className="py-20">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 w-full">
          {cards.map((card: CardProps, index: number) => (
            <div
              key={index}
              className="relative w-full h-44 md:h-56 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center group hover:scale-105 transition-transform duration-300"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${card.image})`,
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
                {card.icon}
                <span className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg">
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
