import React from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import { CheckCircle2, BarChart2, Search } from 'lucide-react';
import HeroSectionContainer from '../features/landing/components/HeroSection.container';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 px-0 py-0 font-sans">
      <Navbar />

      <HeroSectionContainer />

      <main className="py-16 flex-grow">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
            Simplifica tu búsqueda laboral
          </h2>

          {/* Sección de características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Organización Centralizada
              </h3>
              <p className="text-gray-700">
                Mantén todas tus postulaciones organizadas en un solo lugar, con acceso rápido a la información importante.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Seguimiento Visual
              </h3>
              <p className="text-gray-700">
                Visualiza el estado de tus postulaciones con indicadores de color y estadísticas claras.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Búsqueda Eficiente
              </h3>
              <p className="text-gray-700">
                Encuentra rápidamente cualquier postulación con filtros avanzados y búsqueda por texto.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
