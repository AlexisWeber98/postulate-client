import React from 'react';
import { ButtonProps } from '../../../interfaces/components/atoms/ButtonProps.interface';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button', // Default type
  disabled = false,
  icon,
  loading = false,
  ...props // Resto de las props del botón HTML
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-blue-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-600 hover:to-violet-600 focus:ring-blue-400 shadow-xl',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm', // Ajustado para coincidir con ui/button y shared/button
    lg: 'px-6 py-3 text-base',
  };

  // Priorizar el 'disabled' de las props si se pasa explícitamente, sino usar el estado de 'loading'.
  const isDisabled = disabled || loading;
  const disabledStyles = isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size as keyof typeof sizeStyles]} ${disabledStyles} ${className}`}
      {...props} // Pasar el resto de las props
    >
      {loading && <span className="mr-2 animate-spin">⌛</span> /* Considerar un spinner SVG/mejorado */}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
