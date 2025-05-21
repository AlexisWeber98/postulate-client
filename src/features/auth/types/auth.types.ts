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
  children: React.ReactNode;
  tooltip?: string;
  isValid?: boolean;
  isBlurred?: boolean;
  errorMessage?: string;
}
