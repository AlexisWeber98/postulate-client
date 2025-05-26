import React from 'react';
import { ButtonProps } from '../../../interfaces/components/atoms/ButtonProps.interface';

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  icon,
  loading = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-blue-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const disabledStyles = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size as keyof typeof sizeStyles]} ${disabledStyles} ${className}`}
    >
      {loading ? (
        <span className="mr-2">⌛</span>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
