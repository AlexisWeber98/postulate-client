export interface LanguageState {
  language: string;
  lang: string;
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
}
