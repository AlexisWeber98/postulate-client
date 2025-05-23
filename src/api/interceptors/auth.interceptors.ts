import {  AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../../store/auth/authStore";

// Interceptor para agregar el token de autenticación
export const requestInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers = {
        ...config.headers as Record<string, string>,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
    return config;
  },
  onRejected: (error: any) => {
    return Promise.reject(error);
  }
};

// Interceptor para manejar errores de autenticación
export const responseInterceptor = {
  onFulfilled: (response: AxiosResponse) => response,
  onRejected: (error: any) => {
    if (error.code === 'ECONNABORTED') {
      error.name = 'TimeoutError';
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      useAuthStore.getState().signOut();
      // Emitir un evento personalizado para la redirección
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
};
