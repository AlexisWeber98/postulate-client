import React from 'react';

export interface FieldWrapperProps {
  name: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  tooltip?: string;
  isBlurred: boolean;
  fieldStatus?: { isValid: boolean; message?: string };
}
