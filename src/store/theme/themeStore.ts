import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: (localStorage.getItem('theme') as 'light' | 'dark') ||
             (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
      setTheme: (theme) => set(() => ({
        theme: theme
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
