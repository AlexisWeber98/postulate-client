import { CardProps } from '../../../types/components/landing/landing.types';
import { CheckCircle2, Search, ClipboardList, Briefcase } from 'lucide-react';
import { TranslationKey } from '../../../i18n/types';

export const getIntroCards = (translate: (key: TranslationKey) => string): CardProps[] => {

  return [
    {
      icon: <CheckCircle2 className="w-10 h-10 text-white mb-2 drop-shadow-lg" />,
      text: translate('landing.intro.card1'),
      description: translate('landing.intro.card1.description'),
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Search className="w-10 h-10 text-white mb-2 drop-shadow-lg" />,
      text: translate('landing.intro.card2'),
      description: translate('landing.intro.card2.description'),
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <ClipboardList className="w-10 h-10 text-white mb-2 drop-shadow-lg" />,
      text: translate('landing.intro.card3'),
      description: translate('landing.intro.card3.description'),
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Briefcase className="w-10 h-10 text-white mb-2 drop-shadow-lg" />,
      text: translate('landing.intro.card4'),
      description: translate('landing.intro.card4.description'),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
    }
  ];
};
