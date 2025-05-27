import { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { useAuthStore } from '../../store/auth/authStore';

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
    console.log('[DEBUG] Datos originales:', config.data);

    if (
      config.url?.includes('/postulations') &&
      (config.method === 'post' || config.method === 'patch')
    ) {
      console.log('[DEBUG] Procesando petición de postulación');

      const userId = getUserIdFromToken();

      if (!userId) {
        console.error('[DEBUG] Error: No se encontró userId en el token');
        return Promise.reject(new Error('No se encontró el ID del usuario en el token'));
      }

      // Asegurarnos que los datos están en el formato correcto
      const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;

      if (config.method === 'patch') {
        // Para PATCH, mantener el formato original que espera el backend
        const formattedData = {
          data: {
            company: data.data?.company,
            position: data.data?.position,
            status: data.data?.status,
            applicationDate: data.data?.applicationDate,
            link: data.data?.link || '',
            description: data.data?.description || '',
            sendCv: data.data?.sendCv ?? false,
            sendEmail: data.data?.sendEmail ?? false,
            recruiterContact: data.data?.recruiterContact || '',
            userId: data.data?.userId,
          },
          postulationId: data.postulationId,
        };

        console.log('[DEBUG] Datos formateados para PATCH:', formattedData);
        config.data = JSON.stringify(formattedData);
      } else {
        // Para POST, mantener el formato original
        const formattedData = {
          company: data.company,
          position: data.position,
          status: data.status,
          applicationDate: data.applicationDate,
          link: data.link || '',
          description: data.description || '',
          sendCv: data.sendCv ?? false,
          sendEmail: data.sendEmail ?? false,
          recruiterContact: data.recruiterContact || '',
          userId,
        };

        console.log('[DEBUG] Datos formateados para POST:', formattedData);
        config.data = JSON.stringify(formattedData);
      }

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
        ...(config.headers as Record<string, string>),
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }

    console.log('[DEBUG] Headers finales:', config.headers);
    console.log('[DEBUG] ===== FIN REQUEST INTERCEPTOR =====');
    console.log('[DEBUG] Método:', config.method);
    console.log('[DEBUG] URL:', config.url);
    if (config.method === 'delete') {
      console.log('[DEBUG] Interceptando petición DELETE');
      console.log('[DEBUG] Headers:', config.headers);
    }
    return config;
  },
  onRejected: (error: any) => {
    console.error('[DEBUG] Error en request interceptor:', error);
    return Promise.reject(error);
  },
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
  },
};
