import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { es } from './translations/es';
import { en } from './translations/en';
import type { InitOptions } from 'i18next';

const config: InitOptions = {
  resources: {
    es: {
      translation: es
    },
    en: {
      translation: en
    }
  },
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(config);

export default i18n;
