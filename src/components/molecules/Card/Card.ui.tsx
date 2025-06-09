import React from 'react';
import { CardProps } from '../../../types/components/molecules/CardProps.interface';

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  bgColor = 'white',
  shadow = 'md',
  rounded = 'md',
}) => {
  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-2xl',
  };

  return (
    <div
      className={`${shadowStyles[shadow]} ${roundedStyles[rounded]} ${className} overflow-hidden transition-shadow duration-300 hover:shadow-lg`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
};

export default Card;
