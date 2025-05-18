import { useState, useCallback } from 'react';

interface ErrorHandlerOptions {
  defaultMessage?: string;
  onError?: (error: Error) => void;
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: Error, message?: string) => {
    const errorMessage = message || options.defaultMessage || 'Ha ocurrido un error';
    console.error(errorMessage, error);
    setError(errorMessage);

    if (options.onError) {
      options.onError(error);
    }
  }, [options]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    setError,
    handleError,
    clearError
  };
};
