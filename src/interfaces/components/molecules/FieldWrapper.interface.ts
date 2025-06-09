import { ReactNode } from 'react';

export interface FieldWrapperProps {
  name: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  tooltip?: string;
  isBlurred?: boolean;
  fieldStatus?: {
    isValid: boolean;
    message?: string;
  };
}
