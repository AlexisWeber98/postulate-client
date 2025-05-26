import { ReactNode, ImgHTMLAttributes } from 'react';

/**
 * Props para el componente Avatar.
 * Extiende las propiedades nativas de la etiqueta img de HTML.
 */
export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Contenido alternativo a mostrar cuando la imagen no está disponible */
  fallback?: ReactNode;
  /** Clases CSS adicionales para personalizar el estilo del avatar */
  className?: string;
}
