import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { useAuthStore } from '../../store/auth/authStore';

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
    window.location.href = '/landing';
  };

  // Ocultar Navbar en rutas no públicas y sin usuario
  if (!user && !['/landing', '/login', '/register'].includes(location.pathname)) {
    return null;
  }

  // Navbar para la landing (sin usuario)
  if (location.pathname === '/landing') {
    return (
      <header className="sticky top-0 z-50 w-full bg-gradient-to-tr from-[#1a2236] via-[#232946] to-[#2d334a] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/landing" onClick={handleLogoClick} className="flex items-center gap-2 select-none">
            <Briefcase className="h-8 w-8 text-white" />
            <span className="text-2xl font-extrabold text-white tracking-tight">Postulate</span>
          </a>
          {/* Botones */}
          <nav className="flex gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-blue-700 font-semibold text-base transition bg-white border border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Registrarse
            </Link>
          </nav>
        </div>
      </header>
    );
  }

  // Navbar para login/register (sin usuario)
  if (!user) {
    return (
      <header className="sticky top-0 z-50 w-full bg-gradient-to-tr from-[#1a2236] via-[#232946] to-[#2d334a] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/landing" onClick={handleLogoClick} className="flex items-center gap-2 select-none">
            <Briefcase className="h-8 w-8 text-white" />
            <span className="text-2xl font-extrabold text-white tracking-tight">Postulate</span>
          </a>
          <nav className="flex gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-blue-700 font-semibold text-base transition bg-white border border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Registrarse
            </Link>
          </nav>
        </div>
      </header>
    );
  }

  // Navbar para usuarios autenticados
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-tr from-[#1a2236] via-[#232946] to-[#2d334a] shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/landing" onClick={handleLogoClick} className="flex items-center gap-2 select-none">
          <Briefcase className="h-8 w-8 text-white" />
          <span className="text-2xl font-extrabold text-white tracking-tight">Postulate</span>
        </a>
        <nav className="flex gap-4 items-center">
          <Link
            to="/"
            className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow transition-all"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow transition-all"
          >
            Perfil
          </Link>
          <button
            onClick={handleSignOut}
            className="px-6 py-2 rounded-full font-semibold text-green-900 bg-white hover:bg-green-100 shadow transition-all"
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
