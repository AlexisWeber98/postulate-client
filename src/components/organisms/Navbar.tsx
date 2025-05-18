import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { useAuthStore } from '../../store/auth/authStore';
import { ThemeToggle } from '../ThemeToggle';
import LanguageSelector from '../../features/landing/components/LanguageSelector';
import Avatar from '../atoms/Avatar';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  // Hooks para menú de usuario (deben ir antes de cualquier return o lógica condicional)
  const [menuOpen, setMenuOpen] = React.useState(false);
  const avatarRef = React.useRef<HTMLDivElement>(null);

  // Cerrar menú al click fuera
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

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
      <header className="sticky top-0 z-50 w-full shadow-lg bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/landing" onClick={handleLogoClick} className="flex items-center gap-2 select-none">
            <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Postulate</span>
          </a>
          {/* Botones + Switches */}
          <div className="flex items-center gap-4">
            <nav className="flex gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[160px]"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-blue-700 dark:text-blue-300 font-semibold text-base transition bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[160px]"
              >
                Crear Cuenta
              </Link>
            </nav>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>
    );
  }

  // Navbar para login/register (sin usuario)
  if (!user) {
    return (
      <header className="sticky top-0 z-50 w-full shadow-lg bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/landing" onClick={handleLogoClick} className="flex items-center gap-2 select-none">
            <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Postulate</span>
          </a>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[160px]"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-blue-700 dark:text-blue-300 font-semibold text-base transition bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[160px]"
              >
                Crear Cuenta
              </Link>
            </nav>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>
    );
  }

  // Navbar para usuarios autenticados
  return (
    <header className="sticky top-0 z-50 w-full shadow-lg bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/landing" onClick={handleLogoClick} className="flex items-center gap-2 select-none">
          <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Postulate</span>
        </a>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4 items-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[160px]"
            >
              Dashboard
            </Link>
            {/* Avatar + menú */}
            <div className="relative" ref={avatarRef}>
              <button
                className="focus:outline-none"
                onClick={() => setMenuOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                tabIndex={0}
              >
                <Avatar
                  fallback={user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                  className="cursor-pointer transition"
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-green-100 dark:hover:bg-gray-700 rounded transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={() => { setMenuOpen(false); handleSignOut(); }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </nav>
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
