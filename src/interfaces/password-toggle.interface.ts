import type { InputHTMLAttributes } from 'react';

export interface PasswordToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
   value: string;
   onChange: (value: string) => void;
   placeholder?: string;
   className?: string;
   inputClassName?: string;
   buttonClassName?: string;
   name?: string;
   required?: boolean;
   disabled?: boolean;
   error?: string;
   label?: string;
   helperText?: string;
 }
