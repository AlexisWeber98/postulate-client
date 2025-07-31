/**
 * Helpers para manejar estados de las aplicaciones
 * Funciones para traducir, formatear y trabajar con estados de aplicaciones
 */

/**
 * Traduce un estado de aplicación al español
 * @param status - El estado a traducir
 * @returns El estado traducido al español
 */
export const getStatusLabel = (status: string): string => {
  const statusLabels: Record<string, string> = {
    applied: 'Aplicado',
    interview: 'Entrevista',
    technical: 'Prueba Técnica',
    offer: 'Oferta',
    rejected: 'Rechazado',
    accepted: 'Aceptado',
  };
  return statusLabels[status] || status;
};

/**
 * Obtiene el color de fondo para un estado de aplicación
 * @param status - El estado para el que se quiere obtener el color
 * @returns El nombre de clase CSS para el color de fondo
 */
export const getStatusBackgroundColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    applied: 'bg-blue-100',
    interview: 'bg-purple-100',
    technical: 'bg-orange-100',
    offer: 'bg-teal-100',
    rejected: 'bg-red-100',
    accepted: 'bg-green-100',
  };
  return statusColors[status] || 'bg-gray-100';
};

/**
 * Obtiene el color de texto para un estado de aplicación
 * @param status - El estado para el que se quiere obtener el color
 * @returns El nombre de clase CSS para el color de texto
 */
export const getStatusTextColor = (status: string): string => {
  const statusTextColors: Record<string, string> = {
    applied: 'text-blue-700',
    interview: 'text-purple-700',
    technical: 'text-orange-700',
    offer: 'text-teal-700',
    rejected: 'text-red-700',
    accepted: 'text-green-700',
  };
  return statusTextColors[status] || 'text-gray-700';
};

/**
 * Obtiene la combinación de clases CSS para un estado (fondo + texto)
 * @param status - El estado para el que se quiere obtener las clases
 * @returns Las clases CSS combinadas para el estado
 */
export const getStatusClasses = (status: string): string => {
  return `${getStatusBackgroundColor(status)} ${getStatusTextColor(status)}`;
};
