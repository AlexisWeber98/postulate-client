import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Postulation,
  PostulationState,
} from "../../types/interface/postulations/postulation";
import { postulationsApi } from "../../api/postulations";
import axios from 'axios';
import { API_URL } from "../../api/apiAxios";
import { useAuthStore } from "../auth/authStore";

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
            postulations: [response.data.result, ...state.postulations],
            loading: false
          }));
          return response.data.result.id;
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
          const response = await postulationsApi.update(id, updatedFields);
          console.log('✅ Postulación actualizada exitosamente:', response);
          set((state: PostulationState) => ({
            postulations: state.postulations.map((app: Postulation) =>
              app.id === id ? response.data.result : app
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

      getAllPostulations: async () => {
        console.log('🔄 Iniciando getAllPostulations');
        try {
          const token = useAuthStore.getState().token;
          console.log('🔑 Token actual:', token);

          if (!token) {
            console.error('❌ No se encontró el token de autenticación');
            throw new Error('No se encontró el token de autenticación');
          }

          const [, payload] = token.split('.');
          const decodedPayload = JSON.parse(atob(payload));
          console.log('📝 Payload decodificado:', decodedPayload);

          const userId = decodedPayload.id || decodedPayload.userId;
          console.log('👤 UserId obtenido del token:', userId);

          if (!userId) {
            console.error('❌ No se encontró el ID del usuario en el token');
            throw new Error('No se encontró el ID del usuario en el token');
          }

          set({ loading: true });
          console.log('📤 Enviando petición al servidor...');
          const response = await postulationsApi.getByUserId(userId);
          console.log('✅ Respuesta del servidor:', response);

          // Verificar que la respuesta tiene la estructura esperada
          if (response?.result?.postulations) {
            console.log('📦 Datos de postulaciones:', response.result.postulations);
            // Verificar que las postulaciones pertenecen al usuario actual
            const filteredPostulations = response.result.postulations.filter(
              (postulation: Postulation) => {
                console.log('🔍 Comparando postulación:', {
                  postulationUserId: postulation.userId,
                  currentUserId: userId,
                  match: postulation.userId === userId
                });
                return postulation.userId === userId;
              }
            );
            console.log('🔍 Postulaciones filtradas por userId:', filteredPostulations);

            set({
              postulations: Array.isArray(filteredPostulations) ? filteredPostulations : [],
              loading: false
            });
          } else {
            console.error('❌ Estructura de respuesta inválida:', response);
            set({
              postulations: [],
              loading: false
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
                baseURL: error.config?.baseURL
              }
            });
          }
          set({ loading: false, postulations: [] });
          throw error;
        }
      }
    }),
    {
      name: "job-potulations-storage",
    }
  )
);
