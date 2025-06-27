import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PasswordToggleProps } from '../../types/components/ui/PasswordToggle.interface';



export const PasswordToggle = ({
  value,
  onChange,
  placeholder = 'Contraseña',
  className = '',
  inputClassName = '',
  buttonClassName = '',
  name = 'password',
  required = false,
  disabled = false,
  error,
  label,
  helperText,
}: PasswordToggleProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          name={name}
          required={required}
          disabled={disabled}
          className={cn(
            'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
            disabled && 'bg-gray-100 cursor-not-allowed',
            'pr-10',
            inputClassName
          )}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          className={cn(
            'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors',
            disabled && 'cursor-not-allowed opacity-50',
            buttonClassName
          )}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {(error || helperText) && (
        <p className={cn('text-sm', error ? 'text-red-500' : 'text-gray-500')}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
