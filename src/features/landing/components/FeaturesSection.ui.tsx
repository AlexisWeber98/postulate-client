import React from 'react';
import { CheckCircle2, BarChart2, Search } from 'lucide-react';

interface FeaturesSectionProps {
  t: (key: string) => string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ t }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 transition-transform hover:-translate-y-1 flex flex-col items-center text-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
        <CheckCircle2 className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t('card1.title')}</h3>
      <p className="text-gray-700 text-base md:text-base">
        {t('card1.desc')}
      </p>
    </div>

    <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 transition-transform hover:-translate-y-1 flex flex-col items-center text-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
        <BarChart2 className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t('card2.title')}</h3>
      <p className="text-gray-700 text-base md:text-base">
        {t('card2.desc')}
      </p>
    </div>

    <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 transition-transform hover:-translate-y-1 flex flex-col items-center text-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
        <Search className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t('card3.title')}</h3>
      <p className="text-gray-700 text-base md:text-base">
        {t('card3.desc')}
      </p>
    </div>
  </div>
);

export default FeaturesSection;
