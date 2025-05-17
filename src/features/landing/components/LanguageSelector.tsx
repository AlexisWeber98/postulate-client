import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex items-center w-24 h-10 rounded-full bg-blue-100 transition-colors overflow-hidden border-2 ${className}`}
      style={{
        minWidth: 96,
        borderImage: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%) 1',
      }}
    >
      <button
        onClick={() => setLang('es')}
        className={`flex-1 h-full flex items-center justify-center transition-all font-bold
          ${lang === 'es'
            ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
            : 'bg-transparent text-blue-900 hover:bg-blue-200'}
        `}
        aria-label="Español"
        type="button"
      >
        <span className="text-xl">🇪🇸</span>
      </button>
      <button
        onClick={() => setLang('en')}
        className={`flex-1 h-full flex items-center justify-center transition-all font-bold
          ${lang === 'en'
            ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
            : 'bg-transparent text-blue-900 hover:bg-blue-200'}
        `}
        aria-label="English"
        type="button"
      >
        <span className="text-xl">🇺🇸</span>
      </button>
    </div>
  );
};

export default LanguageSelector;
