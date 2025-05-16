import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import { APP_COLORS } from '../../constants/colors';
import { useLanguage } from '../../context/LanguageContext';
import LoadingIndicator from '../atoms/LoadingIndicator';
const Layout: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen" style={{ background: APP_COLORS.lightGray }}>
      <Navbar />
      <main className="flex-grow w-full">
        <Suspense fallback={<LoadingIndicator />}>
          <Outlet />
        </Suspense>
      </main>
      <footer style={{ background: APP_COLORS.white }} className="shadow-inner py-4">
        <div className="container mx-auto px-4 text-center text-black text-sm font-medium">
          {t('footer.copyright').replace('{year}', currentYear.toString())}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
