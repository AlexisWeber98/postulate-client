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
            <span className="text-xl font-bold text-white">Postulate</span>
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
          <span className="text-xl font-bold text-white">Postulate</span>
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
