import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-indigo-500 to-blue-400">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-center md:text-left"
        >
          <Briefcase className="w-12 h-12 text-white mb-4 mx-auto md:mx-0" />
          <h1 className="text-5xl font-extrabold text-white mb-4">Postulate</h1>
          <h2 className="text-2xl text-white mb-4">Llevá el control de tu búsqueda laboral desde un solo lugar.</h2>
          <p className="text-white mb-8">Organizá tus postulaciones, hacé seguimiento fácilmente y encontrá el trabajo ideal.</p>
          <div className="flex justify-center md:justify-start">
            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4 hover:scale-105 transition shadow-md">Crear Cuenta</button>
            <button className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded hover:scale-105 transition shadow-md">Iniciar Sesión</button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 mt-8 md:mt-0"
        >
          <img src="/path/to/illustration.svg" alt="Ilustración de productividad" className="w-full h-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
