/**
 * Helpers de validación
 * Funciones útiles para validar datos en formularios y otras partes de la aplicación
 */

/**
 * Valida si una cadena es una URL válida
 * @param url - La URL a validar
 * @returns true si es una URL válida, false en caso contrario
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.error('Error validando URL:', error);
    return false;
  }
};

/**
 * Valida si una cadena es un correo electrónico válido
 * @param email - El correo electrónico a validar
 * @returns true si es un correo válido, false en caso contrario
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si una cadena tiene contenido (no está vacía después de eliminar espacios)
 * @param value - La cadena a validar
 * @returns true si la cadena contiene texto, false en caso contrario
 */
export const hasContent = (value: string): boolean => {
  return value !== undefined && value !== null && value.trim().length > 0;
};

/**
 * Valida si un número está dentro de un rango
 * @param value - El número a validar
 * @param min - El valor mínimo permitido (incluido)
 * @param max - El valor máximo permitido (incluido)
 * @returns true si el número está dentro del rango, false en caso contrario
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
