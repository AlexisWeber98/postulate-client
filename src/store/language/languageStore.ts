import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageState } from '../../types/interface/language/language.interface';

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: (localStorage.getItem('lang') as string) || 'es',
      lang: (localStorage.getItem('lang') as string) || 'es',
      t: (key: string) => {
        // Aquí deberías implementar tu lógica de traducción
        return key;
      },
      setLanguage: (lang: string) => set({ language: lang, lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);
