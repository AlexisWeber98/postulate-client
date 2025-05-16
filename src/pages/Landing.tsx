import React from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import { CheckCircle2, BarChart2, Search, ArrowRight } from 'lucide-react';
import HeroSectionContainer from '../features/landing/components/HeroSection.container';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 px-0 py-0 font-sans">
      <Navbar />

      <HeroSectionContainer />

      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-8 py-10">
          {/* Encabezado con estilo similar al Dashboard */}
          <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 p-6 gap-6 md:gap-0">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-lg">
                <CheckCircle2 className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h1 className="text-3xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text mb-1">
                  Simplifica tu búsqueda laboral
                </h1>
                <span className="text-lg text-gray-700 font-semibold tracking-wide">Organiza tus postulaciones</span>
              </div>
            </div>
            <Link
              to="/register"
              className="mt-6 md:mt-0 flex items-center px-6 py-3 rounded-xl shadow-lg text-white font-semibold text-lg transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)' }}
            >
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5 text-white" />
            </Link>
          </header>

          <div className="border-b border-white/30 mb-10" />

          {/* Sección de características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 transition-transform hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Organización Centralizada</h3>
              <p className="text-gray-700 text-base md:text-base">
                Mantén todas tus postulaciones organizadas en un solo lugar, con acceso rápido a la información importante.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 transition-transform hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
                <BarChart2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Seguimiento Visual</h3>
              <p className="text-gray-700 text-base md:text-base">
                Visualiza el estado de tus postulaciones con indicadores de color y estadísticas claras.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 transition-transform hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
                <Search className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Búsqueda Eficiente</h3>
              <p className="text-gray-700 text-base md:text-base">
                Encuentra rápidamente cualquier postulación con filtros avanzados y búsqueda por texto.
              </p>
            </div>
          </div>

          {/* Sección de llamada a la acción */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">¿Listo para comenzar?</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-base md:text-lg">
              Únete a nuestra plataforma y comienza a organizar tus postulaciones de manera eficiente.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 rounded-xl shadow-lg text-white font-semibold text-lg transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)' }}
            >
              Crear cuenta gratuita
              <ArrowRight className="ml-2 h-5 w-5 text-white" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
