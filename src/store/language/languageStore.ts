import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  language: string;
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: (localStorage.getItem('lang') as string) || 'es',
      t: (key: string) => {
        // Aquí deberías implementar tu lógica de traducción
        return key;
      },
      setLanguage: (lang: string) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);
