import axios, { AxiosInstance } from 'axios';
import { Postulation } from "../types/interface/postulations/postulation";
import { postulationRequestInterceptor, postulationResponseInterceptor } from "./interceptors/postulation.interceptor";
import { API_URL, API_KEY } from "./apiAxios";


export const postulationsClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json' ,
    ...(API_KEY ? { 'x-api-key': API_KEY } : {}),

  }
});

console.log('[postulationsClient] Axios instance created with baseURL:', API_URL);

// Agregar interceptores específicos para postulaciones
postulationsClient.interceptors.request.use(
  postulationRequestInterceptor.onFulfilled,
  postulationRequestInterceptor.onRejected
);

postulationsClient.interceptors.response.use(
  postulationResponseInterceptor.onFulfilled,
  postulationResponseInterceptor.onRejected
);

// Definir los tipos para las solicitudes
type CreatePostulationRequest = Omit<
  Postulation,
  "id" | "createdAt" | "updatedAt"
>;
type UpdatePostulationRequest = Partial<
  Omit<Postulation, "id" | "createdAt" | "updatedAt">
>;

// Servicio para aplicaciones
export const postulationsApi = {
  // Obtener todas las aplicaciones
  getAll: () => postulationsClient.get<Postulation[]>("/postulations"),

  // Obtener una aplicación por ID
  getById: (id: string) => postulationsClient.get<Postulation>(`/postulations/user/${id}`),

  // Crear una nueva aplicación
  create: (data: CreatePostulationRequest) =>
    postulationsClient.post<Postulation>("/postulations", data),

  // Actualizar una aplicación existente
  patch: (id: string, data: UpdatePostulationRequest) =>
      postulationsClient.patch<Postulation>(`/postulations/${id}`, data),

  // Eliminar una aplicación
  delete: (id: string) => postulationsClient.delete<void>(`/postulations/${id}`),
};
