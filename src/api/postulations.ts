import { httpClient } from "./client";
import { Postulation } from "../types/interface/postulations/postulation";
import { postulationRequestInterceptor, postulationResponseInterceptor } from "./interceptors/postulation.interceptor";

// Agregar interceptores específicos para postulaciones
httpClient.client.interceptors.request.use(
  postulationRequestInterceptor.onFulfilled,
  postulationRequestInterceptor.onRejected
);

httpClient.client.interceptors.response.use(
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
  getAll: () => httpClient.get<Postulation[]>("/postulations"),

  // Obtener una aplicación por ID
  getById: (id: string) => httpClient.get<Postulation>(`/postulations/user/${id}`),

  // Crear una nueva aplicación
  create: (data: CreatePostulationRequest) =>
    httpClient.post<Postulation>("/postulations", data),

  // Actualizar una aplicación existente
  update: (id: string, data: UpdatePostulationRequest) =>
    httpClient.patch<Postulation>(`/postulations/${id}`, data),

  // Eliminar una aplicación
  delete: (id: string) => httpClient.delete<void>(`/postulations/${id}`),
};
