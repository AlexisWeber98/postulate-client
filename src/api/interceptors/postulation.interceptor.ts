import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface Postulation {
  id: string;
  applicationDate: string;
  position: string;
  company: string;
  link: string;
  userId: string;
  status: string;
  description: string;
  sendCv: boolean;
  sendEmail: boolean;
  recruiterContact: string;
}

// Interceptor para validar datos de postulación antes de enviar
export const postulationRequestInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig) => {
    // Si es una petición POST o PATCH a /postulations
    if (config.url?.includes('/postulations') && (config.method === 'post' || config.method === 'patch')) {
      const data = config.data as Partial<Postulation>;

      // Validaciones básicas
      if (data.position && data.position.length < 3) {
        return Promise.reject(new Error('El puesto debe tener al menos 3 caracteres'));
      }
      if (data.company && data.company.length < 2) {
        return Promise.reject(new Error('El nombre de la empresa debe tener al menos 2 caracteres'));
      }
      if (data.link && !data.link.startsWith('http')) {
        return Promise.reject(new Error('El enlace debe ser una URL válida'));
      }
    }
    return config;
  },
  onRejected: (error: any) => {
    return Promise.reject(error);
  }
};

// Interceptor para transformar la respuesta de postulaciones
export const postulationResponseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
    // Si es una respuesta de /postulations
    if (response.config.url?.includes('/postulations')) {
      // Transformar fechas si es necesario
      if (response.data?.applicationDate) {
        response.data.applicationDate = new Date(response.data.applicationDate);
      }
    }
    return response;
  },
  onRejected: (error: any) => {
    // Manejar errores específicos de postulaciones
    if (error.response?.status === 404 && error.config.url?.includes('/postulations')) {
      return Promise.reject(new Error('La postulación no fue encontrada'));
    }
    return Promise.reject(error);
  }
};
