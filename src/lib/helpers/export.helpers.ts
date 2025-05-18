/**
 * Helper para crear exportaciones de módulos de manera consistente
 * @param modules - Objeto con los módulos a exportar
 * @returns Objeto con las exportaciones
 */
export const createExports = (modules: Record<string, unknown>) => {
  return Object.entries(modules).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, unknown>);
};

/**
 * Helper para crear exportaciones con alias
 * @param modules - Objeto con los módulos a exportar
 * @returns Objeto con las exportaciones y sus alias
 */
export const createExportsWithAlias = (modules: Record<string, unknown>) => {
  const exports = createExports(modules);
  return {
    ...exports,
    ...Object.entries(modules).reduce((acc, [key, value]) => {
      acc[`${key}Module`] = value;
      return acc;
    }, {} as Record<string, unknown>)
  };
};
