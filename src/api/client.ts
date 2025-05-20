import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "../store/auth/authStore";

// Configuración base para las peticiones HTTP
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6001";
const API_KEY = import.meta.env.VITE_API_KEY; //|| "your-api-key";

console.log("API_URL", API_URL);
console.log("API_KEY", API_KEY);

// Crear instancia de axios con configuración base
export const client: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
  timeout: 30000, // 30 segundos de timeout
  timeoutErrorMessage: "La solicitud está tardando demasiado. Por favor, intenta nuevamente.",
});

// Interceptor para agregar el token de autenticación
client.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para manejar errores de autenticación
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('La solicitud está tardando demasiado. Por favor, verifica tu conexión e intenta nuevamente.');
    }

    if (error.response?.status === 401) {
      useAuthStore.getState().signOut();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Cliente HTTP con métodos tipados
export const httpClient = {
  get: async <T>(url: string) => {
    const response = await client.get<T>(url);
    return response.data;
  },

  post: async <T>(url: string, data: unknown) => {
    const response = await client.post<T>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data: unknown) => {
    const response = await client.put<T>(url, data);
    return response.data;
  },

  patch: async <T>(url: string, data: unknown) => {
    const response = await client.patch<T>(url, data);
    return response.data;
  },

  delete: async <T>(url: string) => {
    const response = await client.delete<T>(url);
    return response.data;
  },
};
