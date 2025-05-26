import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore, useLanguageStore } from '../../store';
import { TranslationKey } from '../../i18n';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { translate } = useLanguageStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={theme === 'dark' ? translate('theme.switchToLight' as TranslationKey) : translate('theme.switchToDark' as TranslationKey)}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
