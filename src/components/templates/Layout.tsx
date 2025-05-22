import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import { useLanguageStore } from '../../store';
import LoadingIndicator from '../atoms/LoadingIndicator';

const Layout: React.FC = () => {
  const { translate } = useLanguageStore();
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <main className="flex-grow w-full">
        <Suspense fallback={<LoadingIndicator />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="bg-white dark:bg-gray-800 shadow-inner py-4 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center text-gray-800 dark:text-gray-200 text-sm font-medium">
          {translate('footer.copyright').replace('{year}', currentYear.toString())}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
