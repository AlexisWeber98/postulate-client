import React from 'react';
import { AuthFormContainer } from './components/AuthForm.container';
import { useLanguageStore } from '../../store';

export const AuthPage: React.FC<{ type: 'login' | 'register' }> = ({ type }) => {
  const { t } = useLanguageStore();
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="hidden md:flex flex-col justify-center items-start w-1/2 relative z-10 pl-16">
        <div className="flex flex-col items-start w-full">
          <div className="bg-white/40 rounded-lg px-6 py-4 flex items-center gap-3 shadow-lg mb-8">
            <span className="bg-blue-900 text-white font-bold px-2 py-1 rounded mr-2">Be</span>
            <span className="text-3xl font-semibold text-white drop-shadow">Postulate</span>
          </div>
          {type === 'register' && (
            <h1 className="text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent drop-shadow-lg w-full text-left" style={{ minHeight: '45vh' }}>
              {t('auth.createAccount')}
            </h1>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 min-h-screen relative z-10">
        <AuthFormContainer type={type} />
      </div>
      {/* Mobile: logo, nombre y crear cuenta */}
      <div className="flex md:hidden flex-col items-start justify-center w-full mt-8 mb-4 px-6">
        <div className="bg-white/40 rounded-lg px-6 py-4 flex items-center gap-3 shadow-lg mb-6">
          <span className="bg-blue-900 text-white font-bold px-2 py-1 rounded mr-2">Be</span>
          <span className="text-3xl font-semibold text-white drop-shadow">Postulate</span>
        </div>
        {type === 'register' && (
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent drop-shadow-lg w-full text-left" style={{ minHeight: '24vh' }}>
            {t('auth.createAccount')}
          </h1>
        )}
      </div>
    </div>
  );
};
