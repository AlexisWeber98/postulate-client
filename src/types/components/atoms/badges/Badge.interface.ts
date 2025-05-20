import { ReactNode } from 'react';

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error';
  children: ReactNode;
  className?: string;
}
