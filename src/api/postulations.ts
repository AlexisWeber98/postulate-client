import { client } from './client';
import { Postulation } from '../types/interface/postulations/postulation';

// Definir los tipos para las solicitudes
type CreatePostulationRequest = Omit<Postulation, 'id' | 'createdAt' | 'updatedAt'>;
type UpdatePostulationRequest = Partial<Omit<Postulation, 'id' | 'createdAt' | 'updatedAt'>>;

// Servicio para aplicaciones
export const postulationsApi = {
  // Obtener todas las aplicaciones
  getAll: () => client.get<Postulation[]>('/postulations'),

  // Obtener una aplicación por ID
  getById: (id: string) => client.get<Postulation>(`/postulation/${id}`),

  // Crear una nueva aplicación
  create: (data: CreatePostulationRequest) => client.post<Postulation>('/postulation', data),

  // Actualizar una aplicación existente
  update: (id: string, data: UpdatePostulationRequest) =>
    client.put<Postulation>(`/postulation/${id}`, data),

  // Eliminar una aplicación
  delete: (id: string) => client.delete<void>(`/postulation/${id}`),
};
