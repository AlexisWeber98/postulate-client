import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import { APP_COLORS } from '../../styles/colors';

const LoadingIndicator: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
      <p className="text-gray-600">Cargando contenido...</p>
    </div>
  </div>
);

const Layout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: APP_COLORS.lightGray, fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <main className="container mx-auto px-4 py-6 mt-4 sm:px-6 lg:px-8 flex-grow">
        <Suspense fallback={<LoadingIndicator />}>
          <Outlet />
        </Suspense>
      </main>
      <footer style={{ background: APP_COLORS.white }} className="shadow-inner py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Postulate - Gestor de Postulaciones Laborales
        </div>
      </footer>
    </div>
  );
};

export default Layout;
