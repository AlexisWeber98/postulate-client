import axios, { AxiosInstance } from 'axios';
import { Postulation } from "../types/interface/postulations/postulation";
import { postulationRequestInterceptor, postulationResponseInterceptor } from "./interceptors/postulation.interceptor";
import { API_URL, API_KEY } from "./apiAxios";

// Constantes reutilizables
const ENDPOINT = '/postulations';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

// Configuración común del cliente
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      ...DEFAULT_HEADERS,
      ...(API_KEY && { 'x-api-key': API_KEY })
    }
  });

  client.interceptors.request.use(
    postulationRequestInterceptor.onFulfilled,
    postulationRequestInterceptor.onRejected
  );

  client.interceptors.response.use(
    postulationResponseInterceptor.onFulfilled,
    postulationResponseInterceptor.onRejected
  );

  return client;
};

// Tipos de solicitudes
type PostulationBase = Omit<Postulation, "id" | "createdAt" | "updatedAt">;
type CreatePostulationRequest = PostulationBase;
type UpdatePostulationRequest = Partial<PostulationBase>;

// Cliente de API específico
export const postulationsClient: AxiosInstance = createApiClient();

// Servicio de postulaciones
export const postulationsApi = {
  getAll: () => postulationsClient.get<Postulation[]>(ENDPOINT),

  getById: (id: string) => postulationsClient.get<Postulation>(`${ENDPOINT}/${id}`),

  getByUserId: (userId: string) =>
    postulationsClient.get<Postulation[]>(`${ENDPOINT}/user/${userId}`),

  create: (data: CreatePostulationRequest) =>
    postulationsClient.post<Postulation>(ENDPOINT, data),

  update: (id: string, data: UpdatePostulationRequest) =>
    postulationsClient.patch<Postulation>(`${ENDPOINT}/${id}`, data),

  delete: (id: string) => postulationsClient.delete<void>(`${ENDPOINT}/${id}`),
};
