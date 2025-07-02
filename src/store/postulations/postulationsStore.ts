import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Postulation, PostulationState } from '../../types/interface/postulations/postulation';
import { postulationsApi } from '../../api/postulations';
import axios from 'axios';

import { useAuthStore } from '../auth/authStore';

export const usePostulationsStore = create<PostulationState>()(
  persist(
    (set, get) => ({
      postulations: [],

      addPostulation: async (
        newPostulation: Omit<Postulation, 'id' | 'createdAt' | 'updatedAt'>
      ) => {
        try {
          // Asegurarnos que la fecha está en el formato correcto
          const postulationData = {
            ...newPostulation,
            applicationDate:
              newPostulation.applicationDate || new Date().toISOString().split('T')[0],
          };

          const response = await postulationsApi.create(postulationData);

          set((state: PostulationState) => ({
            postulations: [response, ...state.postulations],
          }));
          return response.id;
        } catch (error) {
          console.error('❌ Error al crear postulación:', error);
          if (axios.isAxiosError(error)) {
            console.error('📝 Detalles del error:', {
              status: error.response?.status,
              data: error.response?.data,
              message: error.message,
              config: {
                url: error.config?.url,
                method: error.config?.method,
                data: error.config?.data,
                headers: error.config?.headers,
                baseURL: error.config?.baseURL,
              },
            });

            // Agregar logs detallados del error
            console.error('[DEBUG] Respuesta del servidor:', {
              status: error.response?.status,
              statusText: error.response?.statusText,
              headers: error.response?.headers,
              data: error.response?.data,
            });

            console.error('[DEBUG] Datos enviados:', {
              url: error.config?.url,
              method: error.config?.method,
              data: error.config?.data,
              headers: error.config?.headers,
              baseURL: error.config?.baseURL,
            });

            console.error('[DEBUG] Stack trace:', error.stack);
          }
          throw error;
        }
      },

      updatePostulation: async (id: string, updatedFields: Partial<Postulation>) => {
        try {
          // Validación de campos requeridos
          const requiredFields = ['company', 'position', 'status', 'applicationDate'];
          const missingFields = requiredFields.filter(
            field => !updatedFields[field as keyof Postulation]
          );

          if (missingFields.length > 0) {
            console.error('❌ [PostulationsStore] Campos requeridos faltantes:', missingFields);
            throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
          }

          await postulationsApi.update(id, updatedFields);

          // Actualizar el estado local de la postulación específica
          set((state: PostulationState) => ({
            postulations: state.postulations.map(p =>
              p.id === id ? { ...p, ...updatedFields } : p
            ),
          }));
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('📝 [PostulationsStore] Detalles del error:', {
              status: error.response?.status,
              data: error.response?.data,
              message: error.message,
              config: {
                url: error.config?.url,
                method: error.config?.method,
                data: error.config?.data,
                headers: error.config?.headers,
                baseURL: error.config?.baseURL,
              },
            });

            // Logs adicionales para debugging
            console.error('[DEBUG] Respuesta del servidor:', {
              status: error.response?.status,
              statusText: error.response?.statusText,
              headers: error.response?.headers,
              data: error.response?.data,
            });

            console.error('[DEBUG] Datos enviados:', {
              url: error.config?.url,
              method: error.config?.method,
              data: error.config?.data,
              headers: error.config?.headers,
              baseURL: error.config?.baseURL,
            });

            console.error('[DEBUG] Stack trace:', error.stack);
          }
          throw error;
        }
      },

   deletePostulation: async (id: string) => {
  try {
    const postulationId = id;

       await postulationsApi.delete(postulationId);

      // Actualizar estado local
      set((state: PostulationState) => ({
        postulations: state.postulations.filter(p => p.id !== postulationId),
      }));
    } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.error("❌ Postulación no encontrada (404). Ya fue eliminada o el ID no es válido.");
      } else {
        console.error("❌ Error al intentar eliminar la postulación:", error.message);
      }
    } else {
      console.error("❌ Error inesperado:", error);
    }
  }
},
      getPostulation: (id: string) => {

        const postulation = get().postulations.find((app: Postulation) => app.id === id);

        return postulation;
      },

      checkDuplicate: (company: string, position: string) => {


        // Validar que los parámetros no sean undefined o vacíos
        if (!company || !position) {

          return false;
        }

        const isDuplicate = get().postulations.some(
          (app: Postulation) =>
            app.company?.toLowerCase() === company.toLowerCase() &&
            app.position?.toLowerCase() === position.toLowerCase()
        );

        return isDuplicate;
      },

      getAllPostulations: async () => {

        try {
          const token = useAuthStore.getState().token;

          if (!token) {
            console.error('❌ No se encontró el token de autenticación');
            throw new Error('No se encontró el token de autenticación');
          }

          const [_, payload] = token.split('.');
          const decodedPayload = JSON.parse(atob(payload));

          const userId = decodedPayload.id || decodedPayload.userId;

          if (!userId) {
            console.error('❌ No se encontró el ID del usuario en el token');
            throw new Error('No se encontró el ID del usuario en el token');
          }

          const response = await postulationsApi.getAll(userId);

          // Verificar que la respuesta tiene la estructura esperada
          if (response && Array.isArray(response.data)) {

            set({
              postulations: response.data,
            });
          } else {
            console.error('❌ Estructura de respuesta inválida:', response);
            set({
              postulations: [],
            });
          }
        } catch (error) {
          console.error('❌ Error al obtener postulaciones:', error);
          if (axios.isAxiosError(error)) {
            console.error('📝 Detalles del error:', {
              status: error.response?.status,
              data: error.response?.data,
              message: error.message,
              config: {
                url: error.config?.url,
                method: error.config?.method,
                headers: error.config?.headers,
                baseURL: error.config?.baseURL,
              },
            });
          }
          throw error;
        }
      },
    }),
    {
      name: 'job-potulations-storage',
    }
  )
);
