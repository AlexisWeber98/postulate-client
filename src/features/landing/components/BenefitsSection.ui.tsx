import React from 'react';
import { CheckCircle2, XCircle, ClipboardList, Eye, Search, Paperclip, HelpCircle, Hourglass } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKey } from '@/i18n';

interface BenefitsSectionProps {
  translate: (key: TranslationKey) => string;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ translate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Arrays de claves de traducción
  const afterPoints: TranslationKey[] = [
    'benefits.after.point1',
    'benefits.after.point2',
    'benefits.after.point3'
  ];
  const beforePoints: TranslationKey[] = [
    'benefits.before.point1',
    'benefits.before.point2',
    'benefits.before.point3'
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {translate('benefits.title')}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Columna "Con Postulate" a la izquierda */}
          <div className="flex flex-col items-center w-full order-1 lg:order-1">
            <div className="flex flex-col items-center mb-4 z-10">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 mb-2">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white drop-shadow-lg text-center">
                {translate('benefits.after.title')}
              </h3>
            </div>
            <motion.div
              variants={itemVariants}
              className="relative group w-full max-w-[400px] min-h-[220px] h-[220px]"
            >
              <div className="border border-blue-200 shadow-2xl rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 text-white p-8 transition-transform hover:-translate-y-1">
                <ul className="space-y-6 text-white font-roboto">
                  {afterPoints.map((key, idx) => (
                    <motion.li
                      key={key}
                      variants={itemVariants}
                      className="flex items-center gap-3 group/item"
                    >
                      {idx === 0 && <ClipboardList className="w-5 h-5 text-white flex-shrink-0" />}
                      {idx === 1 && <Eye className="w-5 h-5 text-white flex-shrink-0" />}
                      {idx === 2 && <Search className="w-5 h-5 text-white flex-shrink-0" />}
                      <span className="text-lg leading-relaxed font-roboto text-white font-medium">
                        {translate(key)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Columna "Sin Postulate" a la derecha */}
          <div className="flex flex-col items-center w-full order-2 lg:order-2">
            <div className="flex flex-col items-center mb-4 z-10">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 mb-2">
                <XCircle className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white drop-shadow-lg text-center">
                {translate('benefits.before.title')}
              </h3>
            </div>
            <motion.div
              variants={itemVariants}
              className="relative group w-full max-w-[400px] min-h-[220px] h-[220px]"
            >
              <div className="border border-blue-200 shadow-2xl rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 text-white p-8 transition-transform hover:-translate-y-1">
                <ul className="space-y-6 text-white font-roboto">
                  {beforePoints.map((key, idx) => (
                    <motion.li
                      key={key}
                      variants={itemVariants}
                      className="flex items-center gap-3 group/item"
                    >
                      {idx === 0 && <Paperclip className="w-5 h-5 text-white flex-shrink-0" />}
                      {idx === 1 && <HelpCircle className="w-5 h-5 text-white flex-shrink-0" />}
                      {idx === 2 && <Hourglass className="w-5 h-5 text-white flex-shrink-0" />}
                      <span className="text-lg leading-relaxed font-roboto text-white font-medium">
                        {translate(key)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Flecha decorativa */}
        {/* Eliminada por pedido del usuario */}
      </div>
    </section>
  );
};

export default BenefitsSection;
