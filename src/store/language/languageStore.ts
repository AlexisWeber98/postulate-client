import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageState } from '../../types/interface/language/language.interface';
import { Language, TranslationKey, t } from '../../i18n';
import { es } from '../../i18n/translations/es';

// Helper type to extract placeholder keys from a translation string
type PlaceholderKeys<T extends string> = T extends `${string}{${infer K}}${infer Rest}`
  ? K | PlaceholderKeys<Rest>
  : never;

// Type to get the translation string for a given key
type TranslationFor<K extends TranslationKey> =
  K extends keyof typeof es ? (typeof es)[K]
  : string;

const getStoredLanguage = (): Language => {
  try {
    const stored = localStorage.getItem('lang') as Language;
    return stored || 'es';
  } catch (error) {
    console.warn('Could not access localStorage:', error);
    return 'es';
  }
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: getStoredLanguage(),
      lang: getStoredLanguage(),
      translate: <K extends TranslationKey>(
        key: K,
        placeholders?: Record<PlaceholderKeys<TranslationFor<K>>, string>
      ) => t(key, get().language, placeholders),
      setLanguage: (lang: Language) => {
        localStorage.setItem('lang', lang);
        set({ language: lang, lang });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);
