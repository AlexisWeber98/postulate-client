import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
