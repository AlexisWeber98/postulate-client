import React from 'react';

import { UserPlus, ClipboardList, BarChart2 } from 'lucide-react';
import { TranslationKey } from '../../../i18n/types';
import { Box, Card, Inset, Text } from '@radix-ui/themes';

interface HowItWorksSectionProps {
  translate: (key: TranslationKey) => string;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ translate }) => {
  // Datos de los pasos
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: translate('landing.howItWorks.step1.title'),
      description: translate('landing.howItWorks.step1.description'),
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: translate('landing.howItWorks.step2.title'),
      description: translate('landing.howItWorks.step2.description'),
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: translate('landing.howItWorks.step3.title'),
      description: translate('landing.howItWorks.step3.description'),
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="text-center py-24 md:py-32 min-h-[600px]">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {translate('landing.howItWorks.title')}
      </h2>
      <div className="w-full max-w-6xl mx-auto px-2 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {steps.map((step, idx) => (
            <Box key={idx} className="w-full shadow-2xl rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 text-white p-0 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <Card size="2" style={{ background: 'transparent', boxShadow: 'none', width: '100%' }}>
                <div className="relative">
                  <Inset clip="padding-box" side="top" pb="current">
                    <img
                      src={step.image}
                      alt={step.title}
                      style={{
                        display: 'block',
                        objectFit: 'cover',
                        width: '100%',
                        height: 140,
                        backgroundColor: 'var(--gray-5)',
                        borderTopLeftRadius: '1.5rem',
                        borderTopRightRadius: '1.5rem',
                      }}
                    />
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 lg:-top-10 lg:translate-y-0 w-24 h-24 flex items-center justify-center rounded-full bg-white/30 z-10 backdrop-blur"
                      style={{
                        pointerEvents: 'none',
                        boxShadow: '0 0 32px 12px #a78bfa, 0 4px 40px 0 #7c3aed99', // violeta degradado
                      }}
                    >
                      {React.cloneElement(step.icon, { className: 'w-16 h-16 text-violet-600' })}
                    </div>
                  </Inset>
                </div>
                <div className="flex flex-col items-center px-4 pb-8 pt-6">
                  <Text as="div" size="5" className="font-semibold text-gray-100 mb-4 drop-shadow-sm">{step.title}</Text>
                  <Text as="p" size="3" className="text-gray-100 drop-shadow-sm" style={{paddingBottom: '0.5rem'}}>{step.description}</Text>
                </div>
              </Card>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
