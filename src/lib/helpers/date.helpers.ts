/**
 * Helpers para el manejo de fechas
 * Funciones reutilizables para formatear, manipular y validar fechas
 */

/**
 * Obtiene la fecha actual en formato ISO (YYYY-MM-DD)
 * @returns La fecha actual en formato ISO
 */
export const getCurrentDateISO = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Formatea una fecha para mostrar en la interfaz
 * @param dateString - La fecha en formato ISO o timestamp
 * @param locale - El locale para el formato (por defecto es-ES)
 * @returns La fecha formateada (ej: "15 mar. 2023")
 */
export const formatDate = (
  dateString: string,
  locale: string = 'es-ES',
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
): string => {
  try {
    return new Date(dateString).toLocaleDateString(locale, options);
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return dateString; // Devuelve la fecha original si hay error
  }
};

/**
 * Calcula la diferencia en días entre dos fechas
 * @param date1 - Primera fecha (string o Date)
 * @param date2 - Segunda fecha (string o Date), por defecto es la fecha actual
 * @returns Número de días de diferencia (positivo si date1 > date2)
 */
export const daysBetween = (date1: string | Date, date2: string | Date = new Date()): number => {
  const d1 = date1 instanceof Date ? date1 : new Date(date1);
  const d2 = date2 instanceof Date ? date2 : new Date(date2);
  const diffTime = d1.getTime() - d2.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Devuelve true si la fecha es hoy
 * @param dateString - La fecha a comprobar
 * @returns true si la fecha es hoy, false en caso contrario
 */
export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const date = new Date(dateString);

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Agrega días a una fecha
 * @param dateString - La fecha inicial
 * @param days - Número de días a agregar (puede ser negativo)
 * @returns Nueva fecha en formato ISO
 */
export const addDays = (dateString: string, days: number): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};
