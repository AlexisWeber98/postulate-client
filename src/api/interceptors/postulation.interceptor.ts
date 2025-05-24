import { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { Postulation } from "../../types/interface/postulations/postulation";
import { useAuthStore } from "../../store/auth/authStore";
import { API_URL } from "../apiAxios";

// Función para decodificar el token JWT
const getUserIdFromToken = () => {
  try {
    const token = useAuthStore.getState().token;
    console.log('[DEBUG] Token obtenido del auth store:', token);

    if (!token) {
      console.error('[DEBUG] No se encontró token en el auth store');
      return null;
    }

    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    console.log('[DEBUG] Payload decodificado:', decodedPayload);

    return decodedPayload.id || decodedPayload.userId;
  } catch (error) {
    console.error('[DEBUG] Error al decodificar el token:', error);
    return null;
  }
};

// Interceptor para validar datos de postulación antes de enviar
export const postulationRequestInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig) => {
    console.log('[DEBUG] ===== INICIO REQUEST INTERCEPTOR =====');
    console.log('[DEBUG] URL:', config.url);
    console.log('[DEBUG] Método:', config.method);
    console.log('[DEBUG] Datos originales:', config.data);

    if (config.url?.includes('/postulations') && (config.method === 'post' || config.method === 'patch')) {
      console.log('[DEBUG] Procesando petición de postulación');

      const userId = getUserIdFromToken();
      console.log('[DEBUG] UserId obtenido:', userId);

      if (!userId) {
        console.error('[DEBUG] Error: No se encontró userId en el token');
        return Promise.reject(new Error('No se encontró el ID del usuario en el token'));
      }

      // Asegurarnos que los datos están en el formato correcto
      const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;

      // Asegurarnos que la fecha está en string
      let dateString = '';
      if (data.date) {
        if (typeof data.date === 'string') {
          dateString = data.date;
        } else if (data.date instanceof Date) {
          dateString = data.date.toISOString().split('T')[0];
        }
      } else {
        dateString = new Date().toISOString().split('T')[0];
      }

      console.log('[DEBUG] Fecha formateada:', dateString);

      // Crear un nuevo objeto con los datos formateados según la interfaz del servidor
      const formattedData = {
        company: data.company,
        position: data.position,
        status: data.status,
        applicationDate: dateString,
        link: data.url || '',
        description: data.notes || '',
        sendCv: data.sentCV ?? true,
        sendEmail: data.sentEmail ?? true,
        recruiterContact: data.recruiterContact || '',
        userId,
        // Agregar el ID para el PATCH
        ...(config.method === 'patch' && { id: data.id })
      };

      console.log('[DEBUG] Datos formateados:', formattedData);

      // Convertir a string y asignar de nuevo
      config.data = JSON.stringify(formattedData);
      console.log('[DEBUG] Datos finales serializados:', config.data);

      // Agregar el ID en la URL para el PATCH
      if (config.method === 'patch' && data.id) {
        config.url = `${config.url}/${data.id}`;
        console.log('[DEBUG] URL actualizada para PATCH:', config.url);
      }
    }

    const token = useAuthStore.getState().token;
    if (token) {
      console.log('[DEBUG] Agregando token de autorización');
      config.headers = {
        ...config.headers as Record<string, string>,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }

    console.log('[DEBUG] Headers finales:', config.headers);
    console.log('[DEBUG] ===== FIN REQUEST INTERCEPTOR =====');
    return config;
  },
  onRejected: (error: any) => {
    console.error('[DEBUG] Error en request interceptor:', error);
    return Promise.reject(error);
  }
};

// Interceptor para transformar la respuesta de postulaciones
export const postulationResponseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
    console.log('[DEBUG] ===== INICIO RESPONSE INTERCEPTOR =====');
    console.log('[DEBUG] URL:', response.config.url);
    console.log('[DEBUG] Status:', response.status);
    console.log('[DEBUG] Datos recibidos:', response.data);
    console.log('[DEBUG] ===== FIN RESPONSE INTERCEPTOR =====');
    return response;
  },
  onRejected: (error: any) => {
    console.error('[DEBUG] ===== ERROR RESPONSE INTERCEPTOR =====');
    console.error('[DEBUG] URL:', error.config?.url);
    console.error('[DEBUG] Status:', error.response?.status);
    console.error('[DEBUG] Mensaje:', error.message);
    console.error('[DEBUG] Datos del error:', error.response?.data);
    console.error('[DEBUG] ===== FIN ERROR RESPONSE INTERCEPTOR =====');
    return Promise.reject(error);
  }
};
