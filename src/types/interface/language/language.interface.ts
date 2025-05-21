import { Language, TranslationKey } from '../../../i18n';

export interface LanguageState {
  language: Language;
  lang: Language;
  t: (key: TranslationKey, placeholders?: Record<string, string | number>) => string;
  setLanguage: (lang: Language) => void;
}
