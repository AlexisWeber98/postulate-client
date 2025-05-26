import React from 'react';
import { AuthFormContainer } from './components/AuthForm.container';
import { useLanguageStore } from '../../store';

export const AuthPage: React.FC<{ type: 'login' | 'register' }> = ({ type }) => {
  const translate = useLanguageStore(state=>state.translate);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen relative z-10">
      {/* Columna izquierda (desktop): título */}
      <div className="hidden lg:flex flex-col justify-center items-start w-1/2 pl-16">
        <div className="flex flex-col items-start w-full">
          <h1 className="text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent drop-shadow-lg w-full text-left" style={{ minHeight: '45vh' }}>
            {type === 'register' ? translate('auth.createAccount') : translate('auth.loginTitle')}
          </h1>
        </div>
      </div>

      {/* Columna derecha (formulario + mobile title) */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 min-h-screen">
        {/* Mobile y Tablet: título */}
        <div className="lg:hidden flex flex-col items-center w-full mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent drop-shadow-lg text-center">
            {type === 'register' ? translate('auth.createAccount') : translate('auth.loginTitle')}
          </h1>
        </div>

        {/* Formulario */}
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <AuthFormContainer type={type} />
        </div>
      </div>
    </div>
  );
};
