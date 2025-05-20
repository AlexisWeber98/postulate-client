import { es } from './translations/es';
import { en } from './translations/en';

export type Language = 'es' | 'en';
export type Translations = typeof es;
export type TranslationKey = keyof Translations;

const translations = {
  es,
  en,
} as const;

export const getTranslation = (key: TranslationKey, lang: Language): string => {
  const translation = translations[lang][key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key} in language: ${lang}`);
    return key;
  }
  return translation;
};

export const replacePlaceholders = (text: string, placeholders: Record<string, string>): string => {
  return Object.entries(placeholders).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, value),
    text
  );
};

export const t = (key: TranslationKey, lang: Language, placeholders?: Record<string, string>): string => {
  const translation = getTranslation(key, lang);
  if (placeholders) {
    return replacePlaceholders(translation, placeholders);
  }
  return translation;
};
