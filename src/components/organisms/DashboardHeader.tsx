import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { MdAccountCircle } from 'react-icons/md';
import { useAuthStore, useLanguageStore } from '../../store';

const DashboardHeader: React.FC = () => {
  const { user } = useAuthStore();
  const { translate } = useLanguageStore();

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 p-6">
      <div className="flex items-center gap-4">
        <MdAccountCircle className="text-7xl text-blue-500 dark:text-blue-400 drop-shadow-lg bg-white/30 dark:bg-gray-800/30 rounded-full p-1" />
        <div>
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 text-transparent bg-clip-text mb-1">
            {translate('dashboard.welcome').replace('{name}', user?.name || 'Usuario')}
          </h2>
          <span className="text-lg sm:text-base md:text-lg text-gray-700 dark:text-gray-300 font-semibold tracking-wide">
            {translate('dashboard.title')}
          </span>
        </div>
      </div>
      <Link
        to="add"
        className="mt-6 md:mt-0 flex items-center px-6 py-3 rounded-xl shadow-lg text-white font-semibold text-base sm:text-base md:text-lg transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{ boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)' }}
      >
        <PlusCircle className="mr-2 h-6 w-6" />
        {translate('dashboard.newApplication')}
      </Link>
    </header>
  );
};

export default DashboardHeader;
