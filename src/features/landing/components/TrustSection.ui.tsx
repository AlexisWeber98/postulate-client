import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import CardFlip from 'react-card-flip';
import { motion } from 'framer-motion';
import { TranslationKey } from '../../../i18n';
import { useIsMobile } from '../../../shared/components/useIsMobile';

const trustPoints: { textKey: TranslationKey }[] = [
  { textKey: 'trust.point1' },
  { textKey: 'trust.point2' },
  { textKey: 'trust.point3' },
];

const cardSize = "w-full sm:w-72 h-64";
const cardGradient = "bg-gradient-to-r from-blue-500 to-violet-500 text-white";
const cardShadow = "shadow-2xl";

const FlipCard: React.FC<{ title: string; explanation: string; delay?: number }> = ({ title, explanation, delay = 0 }) => {
  const [flipped, setFlipped] = useState(false);
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className="w-full sm:w-auto"
    >
      <CardFlip isFlipped={flipped} flipDirection="horizontal">
        {/* Frente */}
        <div
          className={`flex flex-col justify-between items-center border border-blue-200 ${cardShadow} rounded-3xl cursor-pointer ${cardSize} ${cardGradient} transition-transform duration-300 hover:scale-105 h-full py-6 sm:py-8`}
          onClick={() => setFlipped(true)}
        >
          <div className="flex-1 flex items-center justify-center w-full px-4">
            <span className="text-base sm:text-lg md:text-xl font-extrabold text-white text-center leading-tight tracking-tight drop-shadow-lg select-none w-full">
              {title}
            </span>
          </div>
          <div className="flex-1 flex items-end justify-center w-full">
            <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          </div>
        </div>
        {/* Dorso */}
        <div
          className={`flex flex-col justify-between items-center border border-blue-200 ${cardShadow} rounded-3xl cursor-pointer ${cardSize} ${cardGradient} transition-transform duration-300 hover:scale-105 h-full py-6 sm:py-8`}
          onClick={() => setFlipped(false)}
        >
          <div className="flex-1 flex items-center justify-center w-full px-4">
            <span className="text-sm sm:text-base md:text-lg text-white text-center font-medium tracking-tight leading-relaxed select-none w-full">
              {explanation}
            </span>
          </div>
          <div className="flex-1 flex items-end justify-center w-full">
            <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          </div>
        </div>
      </CardFlip>
    </motion.div>
  );
};

interface TrustSectionProps {
  translate: (key: TranslationKey) => string;
}

const TrustSection: React.FC<TrustSectionProps> = ({ translate }) => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 sm:py-20 flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent px-4">
        {translate('trust.title')}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-7xl px-4 sm:px-6 sm:flex sm:flex-col sm:items-center lg:grid lg:items-start">
        {trustPoints.map((point, idx) => (
          <FlipCard
            key={idx}
            title={translate(point.textKey)}
            explanation={translate(`${point.textKey}.explanation` as TranslationKey)}
            delay={0.15 * idx}
          />
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
