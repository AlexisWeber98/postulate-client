import React from 'react';
import { CheckCircle2, Search, ClipboardList, Briefcase } from 'lucide-react';
import { IntroSectionProps, CardProps } from '../../../types/components/landing/landing.types';

const IntroSection: React.FC<IntroSectionProps> = ({ t }) => {
  const cards: CardProps[] = [
    {
      icon: <CheckCircle2 className="w-10 h-10 text-white mb-2 drop-shadow-lg" />,
      text: t('landing.intro.card1'),
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Search className="w-10 h-10 text-white mb-2 drop-shadow-lg" />,
      text: t('landing.intro.card2'),
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <ClipboardList className="w-10 h-10 text-white mb-2 drop-shadow-lg" />,
      text: t('landing.intro.card3'),
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Briefcase className="w-10 h-10 text-white mb-2 drop-shadow-lg" />,
      text: t('landing.intro.card4'),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-20">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 w-full">
          {cards.map((card, index) => (
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
