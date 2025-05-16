import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-600 hover:to-violet-600',
  secondary: 'bg-white text-blue-700 border border-blue-600 hover:bg-blue-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...props
}) => (
  <button
    className={`flex items-center justify-center px-6 py-3 rounded-xl shadow-lg font-semibold text-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${variantStyles[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
