import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { useLanguageStore } from '../../store';

const Footer: React.FC = () => {
  const { t } = useLanguageStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-inner py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Postulate</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('footer.login')}
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('footer.register')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">
                {t('footer.email')}
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                {t('footer.phone')}
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {currentYear} Postulate. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
