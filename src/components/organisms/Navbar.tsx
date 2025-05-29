import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/auth/authStore';
import { ThemeToggle } from '../ThemeToggle';
import LanguageSelector from '../../features/landing/components/LanguageSelector';
import Avatar from '../atoms/Avatar';
import { useLanguageStore } from '../../store';
import { useIsMobile } from '../../shared/components/useIsMobile';
import IAPasosModal from '../molecules/IAPasosModal';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { translate } = useLanguageStore();
  const isMobile = useIsMobile();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const avatarRef = React.useRef<HTMLDivElement>(null);
  const [iaModalOpen, setIaModalOpen] = React.useState(false);

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  }, []);

  React.useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen, handleClickOutside]);

  const handleSignOut = () => {
    signOut();
    navigate('/landing');
  };

  // Nueva función para cerrar el modal y redirigir
  const handleCloseIAModal = () => {
    setIaModalOpen(false);
    navigate('/dashboard');
  };

  // Navbar para usuario autenticado (incluyendo landing page)
  if (user) {
    return (
      <header className="sticky top-0 z-50 w-full shadow-lg bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/landing" className="flex items-center gap-2 select-none">
            <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{translate('Postulate')}</span>
          </Link>

          {/* Menú móvil */}
          {isMobile ? (
            <>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-900 dark:text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
                )}
              </button>

              {/* Menú móvil desplegable */}
              {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg py-4 px-6 space-y-4">
                  <Link
                    to="/dashboard"
                    className="block w-full text-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {translate('auth.dashboard')}
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="block w-full text-center px-6 py-3 rounded-xl text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {translate('auth.profile')}
                  </Link>
                  <button
                    className="block w-full text-center px-6 py-3 rounded-xl text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700"
                    onClick={() => { setIaModalOpen(true); setMobileMenuOpen(false); }}
                  >
                    IA Respuesta
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}
                    className="block w-full text-center px-6 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                  >
                    {translate('auth.signOut')}
                  </button>
                  <div className="flex justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <ThemeToggle />
                    <LanguageSelector />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-4">
              <nav className="flex gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {translate('auth.dashboard')}
                </Link>
                <button
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  onClick={() => setIaModalOpen(true)}
                >
                  IA Respuesta
                </button>
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
                        className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-gray-700 rounded transition"
                        onClick={() => setMenuOpen(false)}
                      >
                        {translate('auth.profile')}
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-gray-700 rounded transition"
                        onClick={() => { setMenuOpen(false); setIaModalOpen(true); }}
                      >
                        IA Respuesta
                      </button>
                      <button
                        onClick={() => { setMenuOpen(false); handleSignOut(); }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition"
                      >
                        {translate('auth.signOut')}
                      </button>
                    </div>
                  )}
                </div>
              </nav>
              <ThemeToggle />
              <LanguageSelector />
            </div>
          )}
        </div>
        <IAPasosModal isOpen={iaModalOpen} onClose={handleCloseIAModal} />
      </header>
    );
  }

  // Navbar para usuario no autenticado
  return (
    <header className="sticky top-0 z-50 w-full shadow-lg bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/landing" className="flex items-center gap-2 select-none">
          <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{translate('Postulate')}</span>
        </Link>

        {/* Menú móvil */}
        {isMobile ? (
          <>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
              )}
            </button>

            {/* Menú móvil desplegable */}
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg py-4 px-6 space-y-4">
                <Link
                  to="/login"
                  className="block w-full text-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {translate('login')}
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-6 py-3 rounded-xl shadow-xl text-blue-700 dark:text-blue-300 font-semibold text-base transition bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {translate('register')}
                </Link>
                <div className="flex justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <ThemeToggle />
                  <LanguageSelector />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-4">
            <nav className="flex gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[160px]"
              >
                {translate('login')}
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-blue-700 dark:text-blue-300 font-semibold text-base transition bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[160px]"
              >
                {translate('register')}
              </Link>
            </nav>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        )}
      </div>
      <IAPasosModal isOpen={iaModalOpen} onClose={handleCloseIAModal} />
    </header>
  );
};

export default Navbar;
