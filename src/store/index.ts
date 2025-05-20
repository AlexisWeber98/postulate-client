/**
 * Punto de entrada para todos los stores
 * Exporta todos los stores organizados por dominio
 */

// Auth Store
export { useAuthStore } from './auth/authStore';

// Postulations Store
export { usePostulationsStore } from './postulations/postulationsStore';

// Theme Store
export { useThemeStore } from './theme/themeStore';

// Language Store
export { useLanguageStore } from './language/languageStore';

// Exportar grupos con alias para mayor claridad en importaciones
import * as AuthStore from './auth/authStore';
import * as PostulationsStore from './postulations/postulationsStore';

// Exportar los grupos completos
export {
  AuthStore,
  PostulationsStore
};

// You can also export types if needed here
