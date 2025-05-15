import React from 'react';
import { AuthFormContainer } from './components/AuthForm.container';

export const AuthPage: React.FC<{ type: 'login' | 'register' }> = ({ type }) => (
  <>
    {/* Branding y formulario, SIN fondo ni provider */}
    <div className="hidden md:flex flex-col justify-center items-center w-1/2 relative z-10">
      <div className="flex flex-col items-center">
        <div className="bg-white/40 rounded-lg px-6 py-4 flex items-center gap-3 shadow-lg">
          <span className="bg-blue-900 text-white font-bold px-2 py-1 rounded mr-2">Be</span>
          <span className="text-3xl font-semibold text-white drop-shadow">NombreApp</span>
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 min-h-screen relative z-10">
      <AuthFormContainer type={type} />
    </div>
  </>
);
