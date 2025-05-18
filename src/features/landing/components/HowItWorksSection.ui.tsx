import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ClipboardList, BarChart2, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  t?: (key: string) => string;
}

const steps = [
  {
    icon: <UserPlus className="w-10 h-10 text-white" />,
    titleKey: 'howItWorks.step1.title',
    descKey: 'howItWorks.step1.desc',
  },
  {
    icon: <ClipboardList className="w-10 h-10 text-white" />,
    titleKey: 'howItWorks.step2.title',
    descKey: 'howItWorks.step2.desc',
  },
  {
    icon: <BarChart2 className="w-10 h-10 text-white" />,
    titleKey: 'howItWorks.step3.title',
    descKey: 'howItWorks.step3.desc',
  },
];

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ t }) => {
  return (
    <section className="relative py-20 px-2 w-full">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {t ? t('howItWorks.title') : '¿Cómo empezar a usar Postulate?'}
      </h2>
      <div className="container mx-auto">
        <div className="flex flex-row items-stretch justify-center gap-0 md:gap-8 relative">
          {steps.map((step, idx) => (
            <React.Fragment key={step.titleKey}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center justify-between bg-gradient-to-br from-indigo-500 to-blue-400 backdrop-blur-md rounded-2xl px-8 py-8 mx-0 md:mx-4 min-w-[260px] max-w-[320px] min-h-[340px] h-[340px] shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <div className="mb-3 flex flex-col items-center">
                  <div className="mb-2">{step.icon}</div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white text-lg font-bold shadow-lg mb-2 border-4 border-white/30">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-extrabold text-white mb-2 text-center">{t ? t(step.titleKey) : step.titleKey}</h3>
                <p className="text-white text-base text-center font-medium mb-0">{t ? t(step.descKey) : step.descKey}</p>
              </motion.div>
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-violet-400 mx-2 md:mx-4" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
