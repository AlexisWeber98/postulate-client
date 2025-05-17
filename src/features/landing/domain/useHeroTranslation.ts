import { useState } from 'react';
import { heroTexts } from './hero.i18n';

export function useHeroTranslation() {
  // Podés obtener el idioma del navegador, usuario, etc.
  const [lang, setLang] = useState<'es' | 'en'>('es'); // Cambia a 'en' para probar en inglés

  const t = (key: string) => (heroTexts[lang] as Record<string, string>)[key] || key;

  return { t, lang, setLang };
}
