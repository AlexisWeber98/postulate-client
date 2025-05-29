import { useThemeStore } from '../store/theme/themeStore';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200 dark:bg-gray-700 px-2"
      aria-label="Cambiar tema"
      type="button"
    >
      {/* Luna */}
      <Moon className={`w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 transition-colors ${theme === 'dark' ? 'text-yellow-200' : 'text-gray-500'}`} />
      {/* Sol */}
      <Sun className={`w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 transition-colors drop-shadow-[0_4px_12px_rgba(255,193,7,0.95)] ${theme === 'dark' ? 'text-gray-500' : 'text-yellow-400'}`} />
      {/* Círculo deslizante */}
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform z-10 ${
          theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
      <span className="sr-only">
        {theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      </span>
    </button>
  );
}
