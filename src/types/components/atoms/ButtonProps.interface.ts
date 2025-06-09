import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  // onClick is already part of React.ButtonHTMLAttributes
  // type is already part of React.ButtonHTMLAttributes
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'gradient'; // Added 'gradient'
  size?: 'sm' | 'md' | 'lg';
  // disabled is already part of React.ButtonHTMLAttributes
  // className is already part of React.ButtonHTMLAttributes
  icon?: React.ReactNode;
  loading?: boolean;
}
