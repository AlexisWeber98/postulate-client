import React from 'react';
import { CheckCircle2, BarChart2, Search } from 'lucide-react';

interface FeaturesSectionProps {
  translate: (key: string) => string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ translate }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="border border-blue-200 shadow-2xl rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 text-white p-8 transition-transform hover:-translate-y-1 flex flex-col items-center text-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-white/20">
          <CheckCircle2 className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{translate('card1.title')}</h3>
        <p className="text-white/90 text-base md:text-base">
          {translate('card1.desc')}
        </p>
      </div>

      <div className="border border-blue-200 shadow-2xl rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 text-white p-8 transition-transform hover:-translate-y-1 flex flex-col items-center text-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-white/20">
          <BarChart2 className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{translate('card2.title')}</h3>
        <p className="text-white/90 text-base md:text-base">
          {translate('card2.desc')}
        </p>
      </div>

      <div className="border border-blue-200 shadow-2xl rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 text-white p-8 transition-transform hover:-translate-y-1 flex flex-col items-center text-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-white/20">
          <Search className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{translate('card3.title')}</h3>
        <p className="text-white/90 text-base md:text-base">
          {translate('card3.desc')}
        </p>
      </div>
    </div>
  );
};

export default FeaturesSection;
