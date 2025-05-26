import React from 'react';
import { useLanguageStore } from '../../../store';

const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, setLanguage } = useLanguageStore();

  return (
    <div
      className={`flex items-center w-20 h-8 rounded-full bg-blue-100 dark:bg-gray-700 transition-colors overflow-hidden ${className}`}
      style={{ minWidth: 80 }}
    >
      <button
        onClick={() => setLanguage('es')}
        className={`flex-1 h-full flex items-center justify-center transition-all font-bold
          ${lang === 'es'
            ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
            : 'bg-transparent text-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-gray-600'}
        `}
        aria-label="Español"
        type="button"
      >
        <span className="text-lg">🇦🇷</span>
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`flex-1 h-full flex items-center justify-center transition-all font-bold
          ${lang === 'en'
            ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
            : 'bg-transparent text-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-gray-600'}
        `}
        aria-label="English"
        type="button"
      >
        <span className="text-lg">🇺🇸</span>
      </button>
    </div>
  );
};

export default LanguageSelector;
