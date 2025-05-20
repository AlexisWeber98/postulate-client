import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ClipboardList, BarChart2 } from 'lucide-react';
import { TranslationKey } from '../../../i18n';

interface HowItWorksSectionProps {
  t: (key: TranslationKey) => string;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ t }) => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-12 text-white">{t('landing.howItWorks.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Step
          icon={<UserPlus className="w-8 h-8" />}
          title={t('landing.howItWorks.step1.title')}
          description={t('landing.howItWorks.step1.description')}
        />
        <Step
          icon={<ClipboardList className="w-8 h-8" />}
          title={t('landing.howItWorks.step2.title')}
          description={t('landing.howItWorks.step2.description')}
        />
        <Step
          icon={<BarChart2 className="w-8 h-8" />}
          title={t('landing.howItWorks.step3.title')}
          description={t('landing.howItWorks.step3.description')}
        />
      </div>
    </div>
  );
};

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white"
  >
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  </motion.div>
);

export default HowItWorksSection;
