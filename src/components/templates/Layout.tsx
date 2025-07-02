import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../organisms/Navbar';
import { LoadingIndicator } from '@/components';
import { Footer } from '../organisms/Footer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200" role="application">
      <header role="banner" className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="flex-grow w-full h-full" role="main" aria-label="Contenido principal">
        <Suspense fallback={<LoadingIndicator />}>
          <Outlet />
        </Suspense>
      </main>
      <footer role="contentinfo" aria-label="Pie de página">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
