import React from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BenefitsSectionProps {
  t: (key: string) => string;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ t }) => {
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
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
            {t('benefits.title')}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Columna "Sin Postulate" */}
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-red-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-red-600">
                  {t('benefits.before.title')}
                </h3>
              </div>
              <ul className="space-y-6">
                {['benefits.before.point1', 'benefits.before.point2', 'benefits.before.point3'].map((key) => (
                  <motion.li
                    key={key}
                    variants={itemVariants}
                    className="flex items-center gap-4 group/item"
                  >
                    <span className="text-2xl">{t(key).split(' ')[0]}</span>
                    <span className="text-gray-700 text-lg leading-relaxed">
                      {t(key).split(' ').slice(1).join(' ')}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Columna "Con Postulate" */}
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-green-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">
                  {t('benefits.after.title')}
                </h3>
              </div>
              <ul className="space-y-6">
                {['benefits.after.point1', 'benefits.after.point2', 'benefits.after.point3'].map((key) => (
                  <motion.li
                    key={key}
                    variants={itemVariants}
                    className="flex items-center gap-4 group/item"
                  >
                    <span className="text-2xl">{t(key).split(' ')[0]}</span>
                    <span className="text-gray-700 text-lg leading-relaxed">
                      {t(key).split(' ').slice(1).join(' ')}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Flecha decorativa */}
        {/* Eliminada por pedido del usuario */}
      </div>
    </section>
  );
};

export default BenefitsSection;
