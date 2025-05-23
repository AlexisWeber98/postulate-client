import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Postulation,
  PostulationState,
} from "../../types/interface/postulations/postulation";
import { postulationsApi } from "../../api/postulations";
import axios from 'axios';
import { API_URL } from "../../api/apiAxios";

export const usePostulationsStore = create<PostulationState>()(
  persist(
    (set, get) => ({
      postulations: [],
      loading: false,

      addPostulation: async (newPostulation: Omit<Postulation, 'id' | 'createdAt' | 'updatedAt'>) => {
        console.log('🔄 Iniciando addPostulation:', newPostulation);
        console.log('[DEBUG] API URL configurada:', API_URL);
        try {
          set({ loading: true });
          console.log('📤 Enviando petición al servidor...');
          console.log('📝 Datos a enviar:', JSON.stringify(newPostulation, null, 2));
          console.log('🔍 Configuración de la petición:', {
            url: '/postulations',
            method: 'post',
            data: newPostulation,
            baseURL: API_URL
          });

          // Asegurarnos que la fecha está en el formato correcto
          const postulationData = {
            ...newPostulation,
            date: newPostulation.date || new Date().toISOString().split('T')[0]
          };

          const response = await postulationsApi.create(postulationData);
          console.log('✅ Postulación creada exitosamente:', response);
          set((state: PostulationState) => ({
            postulations: [response.data, ...state.postulations],
            loading: false
          }));
          return response.data.id;
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
                baseURL: error.config?.baseURL
              }
            });

            // Agregar logs detallados del error
            console.error('[DEBUG] Respuesta del servidor:', {
              status: error.response?.status,
              statusText: error.response?.statusText,
              headers: error.response?.headers,
              data: error.response?.data
            });

            console.error('[DEBUG] Datos enviados:', {
              url: error.config?.url,
              method: error.config?.method,
              data: error.config?.data,
              headers: error.config?.headers,
              baseURL: error.config?.baseURL
            });

            console.error('[DEBUG] Stack trace:', error.stack);
          }
          set({ loading: false });
          throw error;
        }
      },

      updatePostulation: async (id: string, updatedFields: Partial<Postulation>) => {
        console.log('🔄 Iniciando updatePostulation:', { id, updatedFields });
        try {
          set({ loading: true });
          console.log('📤 Enviando petición al servidor...');
          const response = await postulationsApi.patch(id, updatedFields);
          console.log('✅ Postulación actualizada exitosamente:', response);
          set((state: PostulationState) => ({
            postulations: state.postulations.map((app: Postulation) =>
              app.id === id ? response.data : app
            ),
            loading: false
          }));
        } catch (error) {
          console.error('❌ Error al actualizar postulación:', error);
          if (axios.isAxiosError(error)) {
            console.error('📝 Detalles del error:', {
              status: error.response?.status,
              data: error.response?.data,
              message: error.message,
              config: {
                url: error.config?.url,
                method: error.config?.method,
                data: error.config?.data
              }
            });
          }
          set({ loading: false });
          throw error;
        }
      },

      deletePostulation: async (id: string) => {
        console.log('🔄 Iniciando deletePostulation:', id);
        try {
          set({ loading: true });
          console.log('📤 Enviando petición al servidor...');
          await postulationsApi.delete(id);
          console.log('✅ Postulación eliminada exitosamente');
          set((state: PostulationState) => ({
            postulations: state.postulations.filter((app: Postulation) => app.id !== id),
            loading: false
          }));
        } catch (error) {
          console.error('❌ Error al eliminar postulación:', error);
          if (axios.isAxiosError(error)) {
            console.error('📝 Detalles del error:', {
              status: error.response?.status,
              data: error.response?.data,
              message: error.message,
              config: {
                url: error.config?.url,
                method: error.config?.method
              }
            });
          }
          set({ loading: false });
          throw error;
        }
      },

      getPostulation: (id: string) => {
        console.log('🔍 Buscando postulación:', id);
        const postulation = get().postulations.find((app: Postulation) => app.id === id);
        console.log('📝 Resultado de búsqueda:', postulation);
        return postulation;
      },

      checkDuplicate: (company: string, position: string) => {
        console.log('🔍 Verificando duplicado:', { company, position });

        // Validar que los parámetros no sean undefined o vacíos
        if (!company || !position) {
          console.log('❌ Parámetros inválidos para verificación de duplicado');
          return false;
        }

        const isDuplicate = get().postulations.some(
          (app: Postulation) =>
            app.company?.toLowerCase() === company.toLowerCase() &&
            app.position?.toLowerCase() === position.toLowerCase()
        );
        console.log('📝 Resultado de verificación de duplicado:', isDuplicate);
        return isDuplicate;
      },

      fetchPostulations: async () => {
        console.log('🔄 Iniciando fetchPostulations');
        try {
          set({ loading: true });
          console.log('📤 Enviando petición al servidor...');
          const response = await postulationsApi.getAll();
          console.log('✅ Postulaciones obtenidas exitosamente:', response);
          set({
            postulations: response.data,
            loading: false
          });
        } catch (error) {
          console.error('❌ Error al obtener postulaciones:', error);
          if (axios.isAxiosError(error)) {
            console.error('📝 Detalles del error:', {
              status: error.response?.status,
              data: error.response?.data,
              message: error.message,
              config: {
                url: error.config?.url,
                method: error.config?.method
              }
            });
          }
          set({ loading: false });
          throw error;
        }
      }
    }),
    {
      name: "job-potulations-storage",
    }
  )
);
