import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import LoadingIndicator from '../atoms/LoadingIndicator';

const Layout: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200" role="application">
      <header role="banner">
        <Navbar />
      </header>
      <main className="flex-grow w-full h-full" role="main">
        <Suspense fallback={<LoadingIndicator />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
