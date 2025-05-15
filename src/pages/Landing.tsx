import React from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import { APP_COLORS } from '../styles/colors';
import { CheckCircle2, BarChart2, Search } from 'lucide-react';
import HeroSectionContainer from '../features/landing/components/HeroSection.container';

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <HeroSectionContainer />

      <main className="bg-white py-16 flex-grow">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Simplifica tu búsqueda laboral</h2>

          {/* Sección de características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4" style={{ background: APP_COLORS.blueGradient }}>
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Organización Centralizada
              </h3>
              <p className="text-gray-700">
                Mantén todas tus postulaciones organizadas en un solo lugar, con acceso rápido a la información importante.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4" style={{ background: APP_COLORS.blueGradient }}>
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Seguimiento Visual
              </h3>
              <p className="text-gray-700">
                Visualiza el estado de tus postulaciones con indicadores de color y estadísticas claras.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4" style={{ background: APP_COLORS.blueGradient }}>
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
