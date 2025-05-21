import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { es } from './translations/es';
import { en } from './translations/en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
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
    },
    pluralRules: {
      es: {
        numbers: [1, 2],
        plurals: (n: number) => {
          if (n === 1) return 0;
          return 1;
        }
      },
      en: {
        numbers: [1, 2],
        plurals: (n: number) => {
          if (n === 1) return 0;
          return 1;
        }
      }
    }
  });

export default i18n;
