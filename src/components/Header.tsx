import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header>
      {/* Barra de navegación */}
      <div className="bg-blue-900 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Briefcase className="h-7 w-7 text-white mr-2" />
              <span className="text-xl font-bold text-white">Postulate</span>
            </div>
            <nav className="flex space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white hover:text-blue-200 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-blue-900 bg-white rounded-md hover:bg-blue-50 transition-colors"
              >
                Registrarse
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center pt-16 pb-24 px-4"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1553451166-232112bda6f6?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}
      >
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <Briefcase className="h-16 w-16 text-blue-300" />
          </div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-4">
            Gestor de Postulaciones Laborales
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Organiza y haz seguimiento de tus postulaciones laborales de manera eficiente.
            Mantén el control de tu búsqueda de trabajo en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Iniciar Sesión
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors"
            >
              Crear Cuenta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
