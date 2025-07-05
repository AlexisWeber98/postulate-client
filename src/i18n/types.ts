import { es } from './translations/es';

type OnlyStringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T];

export type TranslationKey = OnlyStringKeys<typeof es>;
