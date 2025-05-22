import { Language, TranslationKey } from '../../../i18n';
import { es } from '../../../i18n/translations/es';

export interface LanguageState {
  language: Language;
  lang: Language;
  t: <K extends TranslationKey>(
    key: K,
    placeholders?: Record<PlaceholderKeys<TranslationFor<K>>, string>
  ) => string;
  setLanguage: (lang: Language) => void;
}

// Helper type to extract placeholder keys from a translation string
type PlaceholderKeys<T extends string> = T extends `${string}{${infer K}}${infer Rest}`
  ? K | PlaceholderKeys<Rest>
  : never;

// Type to get the translation string for a given key
type TranslationFor<K extends TranslationKey> =
  K extends keyof typeof es ? (typeof es)[K]
  : string;
