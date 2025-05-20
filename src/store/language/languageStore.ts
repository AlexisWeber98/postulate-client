import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { heroTexts } from '../../features/landing/domain/hero.i18n';

type Lang = 'es' | 'en';

interface LanguageState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: (localStorage.getItem('lang') as Lang) || 'es',
      setLang: (newLang: Lang) => set({ lang: newLang }),
      t: (key: string) => (heroTexts[get().lang] as Record<string, string>)[key] || key,
    }),
    {
      name: 'language-storage',
    }
  )
);
