// Atoms
import { ButtonProps } from './atoms';

// Molecules
import { CardProps } from './molecules';

// Organisms
import { ApplicationCardProps } from './cards/ApplicationCardProps.interface';

// Exportar todas las interfaces de componentes desde aquí
export type {
  // Atoms
  ButtonProps,

  // Molecules
  CardProps,

  // Organisms
  ApplicationCardProps
};

export * from './atoms/ButtonProps.interface';
export * from './molecules/CardProps.interface';
export * from './organisms/ApplicationCardProps.interface';
