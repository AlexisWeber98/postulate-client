import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CTASectionProps } from '../../../types/components/landing/landing.types';
import { motion } from 'framer-motion';

interface CTASectionExtendedProps extends CTASectionProps {
  onJoinWaitlist: () => void;
}

const CTASection: React.FC<CTASectionExtendedProps> = ({translate, onJoinWaitlist}) => {

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative w-full py-12 sm:py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_CTA_BACKGROUND_IMAGE || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop'})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-8">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 md:mt-16 text-center mb-8 sm:mb-12 md:mb-16 lg:mb-32"
        >
<motion.h3
  variants={fadeInUpVariants}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.8, delay: 0.2 }}
  viewport={{ once: true }}
  className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-center mb-8 sm:mb-10 md:mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
>
  {translate('landing.cta.title')}
</motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-lg rounded-xl px-4 sm:px-6 py-3 sm:py-4 inline-block"
          >
            {translate('landing.cta.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <button
              type="button"
              onClick={onJoinWaitlist}
              className="group inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-2xl shadow-lg text-white font-extrabold text-base sm:text-lg transition-all duration-300 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[280px] sm:w-[300px] md:w-[320px] whitespace-nowrap gap-3 sm:gap-4 hover:scale-105 hover:shadow-xl"
              aria-label="Únete a nuestra lista de espera"
              style={{
                boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)',
                backdropFilter: 'blur(8px)'
              }}
            >
              Únete a nuestra lista de espera
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white transform transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
