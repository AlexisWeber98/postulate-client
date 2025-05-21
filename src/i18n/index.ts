import { es } from './translations/es';
import { en } from './translations/en';

export type Language = 'es' | 'en';
export type Translations = Record<string, string>;

// Tipo para inferir todas las posibles rutas en el objeto de traducción
type DotNotationKeys<T extends Record<string, unknown>, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? DotNotationKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T];

// Inferir las claves de traducción desde los objetos de traducción
export type TranslationKey = DotNotationKeys<typeof es>;

const translations: Record<Language, Translations> = {
  es,
  en,
};

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
    (acc, [key, value]) => acc.replace(new RegExp(`\\{${key}\\}`, 'g'), value),
    text
  );
};

// Helper type to extract placeholder keys from a translation string
type PlaceholderKeys<T extends string> = T extends `${string}{${infer K}}${infer Rest}`
  ? K | PlaceholderKeys<Rest>
  : never;

// Type to get the translation string for a given key
type GetTranslationType<K extends TranslationKey, T extends Translations> = T[K] extends string
  ? T[K]
  : never;

export const t = <K extends TranslationKey>(
  key: K,
  lang: Language,
  placeholders?: Record<PlaceholderKeys<GetTranslationType<K, typeof translations[Language]>>, string>
): string => {
  const translation = getTranslation(key, lang);
  if (placeholders) {
    return replacePlaceholders(translation, placeholders);
  }
  return translation;
};
