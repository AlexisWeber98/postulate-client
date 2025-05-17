export interface PasswordToggleProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  required?: boolean;
}
