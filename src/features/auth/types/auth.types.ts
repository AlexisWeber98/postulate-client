import type { ReactNode } from 'react';
export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  userName?: string;
  lastName?: string;
}

export interface FieldStatus {
  isValid: boolean;
  message?: string;
}

export interface FieldWrapperProps {
  name: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  tooltip?: string;
  isBlurred: boolean;
  fieldStatus?: FieldStatus;
}
