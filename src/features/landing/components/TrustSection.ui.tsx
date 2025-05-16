import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, Lightbulb } from 'lucide-react';

interface TrustSectionProps {
  t: (key: string) => string;
}

const TrustSection: React.FC<TrustSectionProps> = ({ t }) => {
  const trustPoints = [
    {
      icon: <Rocket className="h-6 w-6 text-blue-500" />,
      text: t('trust.point1')
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      text: t('trust.point2')
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-blue-500" />,
      text: t('trust.point3')
    }
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
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
            {t('trust.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 transition-transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-blue-50">
                  {point.icon}
                </div>
                <p className="text-gray-700 text-lg font-medium">
                  {point.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
