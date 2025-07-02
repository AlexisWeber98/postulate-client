import { httpClient } from './client';
import { Postulation } from '../types/interface/postulations/postulation';

// Interfaces para la respuesta de la API
interface ApiResponse<T> {
  statusResponse: string;
  result: T;
}

interface PostulationsResponse {
  data: Postulation[];
}

// Constantes reutilizables
const ENDPOINT = '/postulations';

// Tipos de solicitudes
type PostulationBase = Omit<Postulation, 'id' | 'createdAt' | 'updatedAt'>;
type CreatePostulationRequest = PostulationBase;
type UpdatePostulationRequest = Partial<PostulationBase>;

// Servicio de postulaciones
export const postulationsApi = {
  getAll: (userId: string) =>
    httpClient.get<ApiResponse<PostulationsResponse>>(`${ENDPOINT}/user/${userId}`).then(res => res.result),

  getById: (id: string) => httpClient.get<ApiResponse<Postulation>>(`${ENDPOINT}/${id}`).then(res => res.result),

  getByUserId: (userId: string) =>
    httpClient.get<ApiResponse<PostulationsResponse>>(`${ENDPOINT}/user/${userId}`).then(res => res.result),

  create: (data: CreatePostulationRequest) =>
    httpClient.post<ApiResponse<Postulation>>(ENDPOINT, data).then(res => res.result),

  update: (id: string, data: UpdatePostulationRequest) => {

    return httpClient.patch<ApiResponse<Postulation>>(`${ENDPOINT}/${id}`, {
      data: {
        company: data.company,
        position: data.position,
        status: data.status,
        applicationDate: data.applicationDate,
        link: data.link,
        description: data.description,
        sendCv: data.sendCv,
        sendEmail: data.sendEmail,
        recruiterContact: data.recruiterContact,
        userId: data.userId,
      },
      postulationId: id,
    }).then(res => res.result);
  },

   delete: (id: string) => {

     return httpClient.delete<void>(`${ENDPOINT}`, { data: { id } }).then(res => res);
   },
};
