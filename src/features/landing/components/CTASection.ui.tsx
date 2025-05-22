import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CTASectionProps } from '../../../types/components/landing/landing.types';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../../../store/languageStore';

const CTASection: React.FC<CTASectionProps> = ({ t }) => {
  const translate = useLanguageStore(state=>state.translate);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative w-full py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_CTA_BACKGROUND_IMAGE || '/assets/images/cta-background.jpg'})`
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
          className="mt-16 text-center mb-16 md:mb-32"
        >
<motion.h3
  variants={fadeInUpVariants}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.8, delay: 0.2 }}
  viewport={{ once: true }}
  className="text-4xl md:text-6xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
>
  {translate('landing.cta.title')}
</motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white mb-12 max-w-3xl mx-auto text-lg md:text-xl drop-shadow-lg rounded-xl px-6 py-4 inline-block"
          >
            {translate('landing.cta.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/register"
              className="group inline-flex items-center justify-center px-10 py-5 rounded-2xl shadow-lg text-white font-extrabold text-lg transition-all duration-300 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[320px] whitespace-nowrap gap-4 hover:scale-105 hover:shadow-xl"
              aria-label={translate('landing.cta.button')}
              style={{
                boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {translate('landing.cta.button')}
              <ArrowRight className="h-5 w-5 text-white transform transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
