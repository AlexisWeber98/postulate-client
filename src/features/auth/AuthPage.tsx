import React from 'react';
import { AuthFormContainer } from './components/AuthForm.container';
import { useLanguageStore } from '../../store';

export const AuthPage: React.FC<{ type: 'login' | 'register' }> = ({ type }) => {
  const { t } = useLanguageStore();

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Columna izquierda (desktop): logo y título */}
      <div className="hidden lg:flex flex-col justify-center items-start w-1/2 relative z-10 pl-16">
        <div className="flex flex-col items-start w-full">
          <div className="bg-white/40 rounded-lg px-6 py-4 flex items-center gap-3 shadow-lg mb-8">
            <span className="bg-blue-900 text-white font-bold px-2 py-1 rounded mr-2">Be</span>
            <span className="text-3xl font-semibold text-white drop-shadow">Postulate</span>
          </div>
          <h1 className="text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent drop-shadow-lg w-full text-left" style={{ minHeight: '45vh' }}>
            {type === 'register' ? t('auth.createAccount') : t('auth.loginTitle')}
          </h1>
        </div>
      </div>

      {/* Columna derecha (formulario + mobile title/logo) */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 min-h-screen relative z-10">
        {/* Mobile: logo y título */}
        {type === 'register' && (
          <div className="lg:hidden flex flex-col items-center w-full mb-8">
            <div className="bg-white/40 rounded-lg px-6 py-4 flex items-center gap-3 shadow-lg mb-6">
              <span className="bg-blue-900 text-white font-bold px-2 py-1 rounded mr-2">Be</span>
              <span className="text-3xl font-semibold text-white drop-shadow">Postulate</span>
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent drop-shadow-lg text-center">
              {t('auth.createAccount')}
            </h1>
          </div>
        )}

        {/* Formulario */}
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <AuthFormContainer type={type} />
        </div>
      </div>
    </div>
  );
};
