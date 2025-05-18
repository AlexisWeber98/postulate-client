import React from 'react';
import { AuthBackgroundProvider } from './components/AuthBackgroundContext';
import { AuthBackgroundImage } from './components/AuthBackgroundImage.ui';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => (
  <AuthBackgroundProvider>
    <div className="relative min-h-screen w-full flex">
      <AuthBackgroundImage />
      <Outlet />
    </div>
  </AuthBackgroundProvider>
);
