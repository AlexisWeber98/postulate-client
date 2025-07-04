/**
 * Punto de entrada para todos los componentes
 * Exporta componentes organizados por nivel atómico
 */

// Exportar por nivel atómico
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';

// Exportar grupos con alias para mayor claridad en importaciones
import * as Atoms from './atoms';
import * as Molecules from './molecules';
import * as Organisms from './organisms';
import * as Templates from './templates';

// Exportar los grupos completos
export {
  Atoms,
  Molecules,
  Organisms,
  Templates
};
