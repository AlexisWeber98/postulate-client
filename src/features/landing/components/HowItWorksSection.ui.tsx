import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ClipboardList, BarChart2 } from 'lucide-react';
import { useLanguageStore } from '@/store/language/languageStore';

const HowItWorksSection: React.FC = () => {
  const translate = useLanguageStore(state=>state.translate);

  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {translate('landing.howItWorks.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Step
          icon={<UserPlus className="w-8 h-8" />}
          title={translate('landing.howItWorks.step1.title')}
          description={translate('landing.howItWorks.step1.description')}
        />
        <Step
          icon={<ClipboardList className="w-8 h-8" />}
          title={translate('landing.howItWorks.step2.title')}
          description={translate('landing.howItWorks.step2.description')}
        />
        <Step
          icon={<BarChart2 className="w-8 h-8" />}
          title={translate('landing.howItWorks.step3.title')}
          description={translate('landing.howItWorks.step3.description')}
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
    className="border border-blue-200 shadow-2xl rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 text-white p-8 transition-transform hover:-translate-y-1 flex flex-col items-center text-center"
  >
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-white/20">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-100 mb-2 drop-shadow-sm">{title}</h3>
      <p className="text-gray-100 text-base md:text-base drop-shadow-sm">{description}</p>
    </div>
  </motion.div>
);

export default HowItWorksSection;
