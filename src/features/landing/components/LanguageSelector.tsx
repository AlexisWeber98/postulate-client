import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="absolute top-6 right-8 z-50">
      <button
        className={`px-3 py-1 rounded-l-lg font-bold ${lang === 'es' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
        onClick={() => setLang('es')}
      >
        ES
      </button>
      <button
        className={`px-3 py-1 rounded-r-lg font-bold ${lang === 'en' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;
