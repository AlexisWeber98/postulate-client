import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex items-center w-20 h-8 rounded-full bg-blue-100 transition-colors overflow-hidden ${className}`}
      style={{ minWidth: 80 }}
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
        <span className="text-lg">🇪🇸</span>
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
        <span className="text-lg">🇺🇸</span>
      </button>
    </div>
  );
};

export default LanguageSelector;
