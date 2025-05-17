import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`flex items-center h-8 ${className}`} style={{ minWidth: 80 }}>
      <button
        className={`h-8 w-10 flex-1 flex items-center justify-center font-extrabold text-base transition-all border-2 border-[#377dff] rounded-l-2xl focus:outline-none
          ${lang === 'es'
            ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white z-10'
            : 'bg-transparent text-white'}
        `}
        style={{ borderRight: 'none' }}
        onClick={() => setLang('es')}
        aria-label="Español"
      >
        <span className="text-lg">🇪🇸</span>
      </button>
      <button
        className={`h-8 w-10 flex-1 flex items-center justify-center font-extrabold text-base transition-all border-2 border-[#377dff] rounded-r-2xl focus:outline-none
          ${lang === 'en'
            ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white z-10'
            : 'bg-transparent text-white'}
        `}
        style={{ borderLeft: 'none', marginLeft: '-2px' }}
        onClick={() => setLang('en')}
        aria-label="English"
      >
        <span className="text-lg">🇺🇸</span>
      </button>
    </div>
  );
};

export default LanguageSelector;
