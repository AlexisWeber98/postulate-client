import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/auth/authStore';
import { APP_COLORS } from '../../styles/colors';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const handleSignOut = () => {
    signOut();
    navigate('/landing');
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Forzar la navegación a la landing page
    window.location.href = '/landing';
  };

  if (!user && !['/landing', '/login', '/register'].includes(location.pathname)) {
    return null;
  }

  // Si estamos en la landing page, mostramos el header completo
  if (location.pathname === '/landing') {
    return (
      <header>
        {/* Barra de navegación */}
        <div style={{ background: APP_COLORS.blue }} className="shadow-md">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <a href="/landing" onClick={handleLogoClick} className="flex items-center cursor-pointer">
                <Briefcase className="h-7 w-7 text-white mr-2" />
                <span className="text-xl font-bold text-white">Postulate</span>
              </a>
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
            background: APP_COLORS.blueGradient
          }}
        >
          {/* Overlay para mejorar la legibilidad del texto */}
          <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>

          <div className="container mx-auto text-center relative z-10">
            <div className="flex justify-center mb-6">
              <Briefcase className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-4">
              Gestor de Postulaciones Laborales
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Organiza y haz seguimiento de tus postulaciones laborales de manera eficiente.
              Mantén el control de tu búsqueda de trabajo en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-colors"
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
  }

  // Si el usuario no está autenticado, muestra un Navbar simple para login/register
  if (!user) {
    return (
      <header style={{ background: APP_COLORS.blue }} className="w-full shadow-md font-sans">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/landing" onClick={handleLogoClick} className="flex items-center cursor-pointer">
            <Briefcase className="h-7 w-7 text-white mr-2" />
            <span className="text-xl font-bold text-white">Postulate: gestor de Postulaciones</span>
          </a>

          <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </header>
    );
  }

  // Navbar para usuarios autenticados
  return (
    <header style={{ background: APP_COLORS.blue }} className="w-full shadow-md font-sans">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/landing" onClick={handleLogoClick} className="flex items-center cursor-pointer">
          <Briefcase className="h-7 w-7 text-white mr-2" />
          <span className="text-xl font-bold text-white">Postulate: gestor de Postulaciones</span>
        </a>

        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium text-white hover:text-blue-200 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="px-4 py-2 text-sm font-medium text-white hover:text-blue-200 transition-colors"
          >
            Perfil
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-blue-900 bg-white rounded-md hover:bg-blue-50 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
