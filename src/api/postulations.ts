import axios, { AxiosInstance } from 'axios';
import { Postulation } from "../types/interface/postulations/postulation";
import { postulationRequestInterceptor, postulationResponseInterceptor } from "./interceptors/postulation.interceptor";
import { API_URL, API_KEY } from "./apiAxios";

// Interfaces para la respuesta de la API
interface ApiResponse<T> {
  statusResponse: string;
  result: T;
}

interface PostulationsResponse {
  postulations: Postulation[];
}

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
  getAll: () => postulationsClient.get<ApiResponse<Postulation[]>>(ENDPOINT),

  getById: (id: string) => postulationsClient.get<ApiResponse<Postulation>>(`${ENDPOINT}/${id}`),

  getByUserId: async (userId: string): Promise<ApiResponse<Postulation[]>> => {
    try {
      console.log('🔄 PostulationsApi: Obteniendo postulaciones para usuario:', userId);
      const response = await postulationsClient.get<ApiResponse<Postulation[]>>(`${ENDPOINT}/user/${userId}`);
      console.log('📥 PostulationsApi: Respuesta del servidor:', response);
      return response.data;
    } catch (error) {
      console.error('❌ PostulationsApi: Error al obtener postulaciones:', error);
      throw error;
    }
  },

  create: (data: CreatePostulationRequest) =>
    postulationsClient.post<ApiResponse<Postulation>>(ENDPOINT, data),

  update: (id: string, data: UpdatePostulationRequest) =>
    postulationsClient.patch<ApiResponse<Postulation>>(`${ENDPOINT}/${id}`, data),

  delete: (id: string) => postulationsClient.delete<void>(`${ENDPOINT}/${id}`),
};
