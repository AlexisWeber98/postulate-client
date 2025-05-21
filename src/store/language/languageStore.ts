import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageState } from '../../types/interface/language/language.interface';
import i18n from '../../i18n/i18n.config';
import { Language, TranslationKey } from '../../i18n';

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: (localStorage.getItem('lang') as Language) || 'es',
      lang: (localStorage.getItem('lang') as Language) || 'es',
      t: (key: TranslationKey, placeholders?: Record<string, string | number>) => {
        return i18n.t(key, { ...placeholders });
      },
      setLanguage: (lang: Language) => {
        localStorage.setItem('lang', lang);
        i18n.changeLanguage(lang);
        set({ language: lang, lang });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);
