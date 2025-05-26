import React from 'react';
import { motion } from 'framer-motion';
import { TranslationKey } from '../../../i18n';
//import { useIsMobile } from '../../../shared/components/useIsMobile';

interface TrustSectionProps {
  translate: (key: TranslationKey) => string;
}

const trustPoints: { titleKey: TranslationKey; explanationKey: TranslationKey }[] = [
  { titleKey: 'trust.point1', explanationKey: 'trust.point1.explanation' },
  { titleKey: 'trust.point2', explanationKey: 'trust.point2.explanation' },
  { titleKey: 'trust.point3', explanationKey: 'trust.point3.explanation' },
];

const cardSize = 'w-full sm:w-72 h-64';
const cardGradient = 'bg-gradient-to-r from-blue-500 to-violet-500 text-white';
const cardShadow = 'shadow-2xl';

const TrustSection: React.FC<TrustSectionProps> = ({ translate }) => {
  return (
    <section className="py-12 sm:py-20 flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent px-4">
        {translate('trust.title')}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-7xl px-4 sm:px-6 sm:flex sm:flex-col sm:items-center lg:grid lg:items-start">
        {trustPoints.map((point, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 * idx }}
            className="w-full sm:w-auto"
          >
            <div
              className={`flex flex-col items-center justify-center border border-blue-200 ${cardShadow} rounded-3xl ${cardSize} ${cardGradient} transition-transform duration-300 hover:scale-105 h-full min-h-[16rem] py-6 sm:py-8`}
            >
              <div className="flex flex-col justify-center items-center h-full w-full px-4 gap-4">
                <span className="text-base sm:text-lg md:text-xl font-extrabold text-white text-center leading-tight tracking-tight drop-shadow-lg select-none w-full">
                  {translate(point.titleKey)}
                </span>
                <span className="text-sm sm:text-base md:text-lg text-white text-center font-medium tracking-tight leading-relaxed select-none w-full mt-2">
                  {translate(point.explanationKey)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
