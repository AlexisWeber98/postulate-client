import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageState } from '../../types/interface/language/language.interface';
import { Language, TranslationKey, t } from '../../i18n';

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
      t: (key: TranslationKey, placeholders?: Record<string, string | number>) =>
        t(key, get().language, placeholders),
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
