import { Language, TranslationKey } from '../../../i18n';

export interface LanguageState {
  language: Language;
  lang: Language;
  t: (key: TranslationKey) => string;
  setLanguage: (lang: Language) => void;
}
