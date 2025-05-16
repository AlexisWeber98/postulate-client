import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HowItWorksSectionProps {
  t?: (key: string) => string;
}

const defaultSteps = [
  {
    label: 'Paso 1',
    title: 'Registrate gratis',
    desc: 'Completa tu registro en menos de un minuto y comienza a organizar tu búsqueda laboral.',
  },
  {
    label: 'Paso 2',
    title: 'Agregá tus postulaciones',
    desc: 'Registra todas tus postulaciones actuales y futuras para mantener un seguimiento organizado.',
  },
  {
    label: 'Paso 3',
    title: 'Visualizá tu progreso',
    desc: 'Analiza tu progreso y optimiza tu estrategia de búsqueda laboral con nuestras herramientas.',
  },
];

const enSteps = [
  {
    label: 'Step 1',
    title: 'Sign up for free',
    desc: 'Complete your registration in less than a minute and start organizing your job search.',
  },
  {
    label: 'Step 2',
    title: 'Add your applications',
    desc: 'Register all your current and future applications to keep an organized tracking.',
  },
  {
    label: 'Step 3',
    title: 'Track your progress',
    desc: 'Analyze your progress and optimize your job search strategy with our tools.',
  },
];

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ t }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Detecta idioma por función t o por fallback
  const isEnglish = t && t('landing.hero.title') === 'Job hunting will no longer be another job';
  const steps = t ? (isEnglish ? enSteps : defaultSteps) : defaultSteps;


  return (
    <section className="relative py-20 px-2 w-full">

      <div className="relative flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto min-h-[220px]">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="relative z-10 flex flex-col items-center text-center flex-1 px-2 mb-12 md:mb-0 cursor-pointer"
            onMouseEnter={() => setActiveStep(idx)}
            onMouseLeave={() => setActiveStep(null)}
          >
            <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white text-3xl font-bold shadow-lg mb-2 border-4 border-white/60 transition-all duration-300 ${activeStep === idx ? 'scale-110 ring-4 ring-violet-300' : ''}`}>
              {idx + 1}
            </div>
            <span className="text-base font-semibold text-blue-700 mb-1">{step.label}</span>
            <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-2 uppercase tracking-wide">{step.title}</h3>
            {/* Mostrar solo la descripción del paso activo */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={activeStep === idx ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {activeStep === idx && (
                <p className="text-gray-700 text-base max-w-xs mx-auto mt-2">{step.desc}</p>
              )}
            </motion.div>
          </div>
        ))}
      </div>
      {/* Línea vertical para mobile (sin animación por simplicidad) */}
      <div className="md:hidden absolute left-1/2 top-32 bottom-10 w-1 bg-gradient-to-b from-blue-400 via-violet-400 to-blue-400 z-0" style={{transform: 'translateX(-50%)'}} />
    </section>
  );
};

export default HowItWorksSection;
