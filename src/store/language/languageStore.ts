import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageState } from '../../types/interface/language/language.interface';
import { t, Language, TranslationKey } from '../../i18n';

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: (localStorage.getItem('lang') as Language) || 'es',
      lang: (localStorage.getItem('lang') as Language) || 'es',
      t: (key: TranslationKey) => t(key, get().language),
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
