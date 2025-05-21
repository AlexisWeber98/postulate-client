import { ReactNode } from 'react';
export interface AvatarProps {
  src?: string;
  alt?: string;
 /** Fallback content to render when image is unavailable */
  fallback?: ReactNode;
  className?: string;
}
