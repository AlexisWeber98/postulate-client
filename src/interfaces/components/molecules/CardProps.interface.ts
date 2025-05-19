import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'hover' | 'active';
  bgColor?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  shadow?: 'none' | 'sm' | 'md' | 'lg'; // <-- agregá esta línea
}
