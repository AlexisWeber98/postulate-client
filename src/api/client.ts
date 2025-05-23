import { requestInterceptor, responseInterceptor } from "./interceptors/auth.interceptors";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { API_URL, API_KEY } from "./apiAxios";






export const client: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json' ,
    ...(API_KEY ? { 'x-api-key': API_KEY } : {}),

  }
});



// Agregar interceptores base
client.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected
);

client.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

// Cliente HTTP con métodos tipados
export const httpClient = {
  client, // Exponer el cliente base para interceptores específicos
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await client.get<T>(url, config);
    return response.data;
  },

  post: async <T>(url: string, data: unknown, config?: AxiosRequestConfig) => {
    const response = await client.post<T>(url, data, config);
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
