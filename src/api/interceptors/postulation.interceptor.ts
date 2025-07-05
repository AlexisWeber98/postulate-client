import { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { useAuthStore } from '../../store/auth/authStore';

// Función para decodificar el token JWT
const getUserIdFromToken = () => {
  try {
    const token = useAuthStore.getState().token;

    if (!token) {
      return null;
    }

    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload.id || decodedPayload.userId;
  } catch (error) {
    return null;
  }
};

// Interceptor para validar datos de postulación antes de enviar
export const postulationRequestInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig) => {
    if (
      config.url?.includes('/postulations') &&
      (config.method === 'post' || config.method === 'patch')
    ) {
      const userId = getUserIdFromToken();

      if (!userId) {
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

        config.data = JSON.stringify(formattedData);
      }

      // Agregar el ID en la URL para el PATCH
      if (config.method === 'patch' && data.id) {
        config.url = `${config.url}/${data.id}`;
      }
    }

    const token = useAuthStore.getState().token;
    if (token) {
      config.headers = {
        ...(config.headers as Record<string, string>),
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }

    if (config.method === 'delete') {
      // No specific action needed for delete requests in this interceptor
    }
    return config;
  },
  onRejected: (error: AxiosError) => {
    return Promise.reject(error);
  },
};

// Interceptor para transformar la respuesta de postulaciones
export const postulationResponseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
    return response;
  },
  onRejected: (error: AxiosError) => {
    return Promise.reject(error);
  },
};
