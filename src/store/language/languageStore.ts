import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageState } from '../../types/interface/language/language.interface';
import { t, Language, TranslationKey } from '../../i18n';

type TFunction = (key: string) => string;

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: (localStorage.getItem('lang') as Language) || 'es',
      lang: (localStorage.getItem('lang') as Language) || 'es',
      t: ((key: string) => t(key as TranslationKey, get().language)) as TFunction,
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
