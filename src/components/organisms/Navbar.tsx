import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
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

  if (!user && !['/landing', '/login', '/register'].includes(location.pathname)) {
    return null;
  }

  // Si el usuario no está autenticado, muestra un Navbar simple para landing/login/register
  if (!user) {
    return (
      <header style={{ background: APP_COLORS.blue }} className="w-full shadow-md font-sans">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/landing" className="flex items-center">
            <Briefcase className="h-7 w-7 text-white mr-2" />
            <span className="text-xl font-bold text-white">Postulate: gestor de Postulaciones</span>
          </Link>

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
        <div className="flex items-center">
          <Briefcase className="h-7 w-7 text-white mr-2" />
          <span className="text-xl font-bold text-white">Postulate: gestor de Postulaciones</span>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium ${
              location.pathname === '/'
                ? 'text-white border-b-2 border-white'
                : 'text-blue-100 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/add"
            className={`text-sm font-medium ${
              location.pathname === '/add'
                ? 'text-white border-b-2 border-white'
                : 'text-blue-100 hover:text-white'
            }`}
          >
            Nueva Postulación
          </Link>
          <Link
            to="/profile"
            className={`text-sm font-medium ${
              location.pathname === '/profile'
                ? 'text-white border-b-2 border-white'
                : 'text-blue-100 hover:text-white'
            }`}
          >
            {user.name}
          </Link>
          <button
            onClick={handleSignOut}
            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-md hover:bg-blue-700"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
