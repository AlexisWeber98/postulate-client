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
    console.log('[DEBUG] URL completa de la petición:', `${API_URL}${config.url}`);
    console.log('[DEBUG] Interceptor request activado para URL:', config.url);
    console.log('[DEBUG] Método:', config.method);

    console.log('[DEBUG] Datos iniciales:', config.data);

    if (config.url?.includes('/postulations') && (config.method === 'post' || config.method === 'patch')) {
      const data = config.data as Partial<Postulation>;
      console.log('[DEBUG] Tipo de datos recibidos:', typeof data);
      console.log('[DEBUG] Estructura de datos:', Object.keys(data));

      if (data.position && data.position.length < 3) {
        console.warn('[DEBUG] Posición inválida:', data.position);
        return Promise.reject(new Error('El puesto debe tener al menos 3 caracteres'));
      }
      if (data.company && data.company.length < 2) {
        console.warn('[DEBUG] Empresa inválida:', data.company);
        return Promise.reject(new Error('El nombre de la empresa debe tener al menos 2 caracteres'));
      }
      if (data.url && !data.url.startsWith('http')) {
        console.warn('[DEBUG] URL inválida:', data.url);
        return Promise.reject(new Error('El enlace debe ser una URL válida'));
      }

      const userId = getUserIdFromToken();
      console.log('[DEBUG] UserId obtenido:', userId);
      if (!userId) {
        console.warn('[DEBUG] No se encontró userId en el token');
        return Promise.reject(new Error('No se encontró el ID del usuario en el token'));
      }

      if (typeof config.data === 'string') {
        console.log('[DEBUG] Parseando datos desde string');
        config.data = JSON.parse(config.data);
        console.log('[DEBUG] Datos parseados:', config.data);
      }

      // Asegurarnos de que la fecha esté en el formato correcto
      console.log('[DEBUG] Validando fecha:', config.data.date);
      let applicationDate;
      try {
        // Asegurarnos de que la fecha esté en formato YYYY-MM-DD
        const [year, month, day] = config.data.date.split('-').map(Number);
        applicationDate = new Date(year, month - 1, day);

        if (isNaN(applicationDate.getTime())) {
          console.error('[DEBUG] Fecha inválida:', config.data.date);
          return Promise.reject(new Error('La fecha debe estar en formato YYYY-MM-DD'));
        }
      } catch (error) {
        console.error('[DEBUG] Error al procesar la fecha:', error);
        return Promise.reject(new Error('La fecha debe estar en formato YYYY-MM-DD'));
      }

      // Transformar los datos para el servidor
      console.log('[DEBUG] Iniciando transformación de datos...');
      console.log('[DEBUG] Datos originales:', config.data);
      console.log('[DEBUG] UserId del token:', userId);

      const transformedData = {
        ...config.data,
        company: String(config.data.company).trim(),
        position: String(config.data.position).trim(),
        status: config.data.status,
        date: `${applicationDate.getFullYear()}-${String(applicationDate.getMonth() + 1).padStart(2, '0')}-${String(applicationDate.getDate()).padStart(2, '0')}`,
        url: String(config.data.url || '').trim(),
        notes: String(config.data.notes || '').trim(),
        sentCV: config.data.sentCV === true,
        sentEmail: config.data.sentEmail === true,
        userId: config.data.userId,
      };

      const requiredFields = ['date', 'position', 'company', 'userId', 'status'] as const;

      // Validaciones de tipo
      const typeValidations = {
        company: typeof transformedData.company === 'string',
        position: typeof transformedData.position === 'string',
        status: typeof transformedData.status === 'string',
        date: typeof transformedData.date === 'string',
        url: typeof transformedData.url === 'string',
        notes: typeof transformedData.notes === 'string',
        sentCV: typeof transformedData.sentCV === 'boolean',
        sentEmail: typeof transformedData.sentEmail === 'boolean',
        userId: typeof transformedData.userId === 'string',
      };

      // Validaciones de campos requeridos
      if (!transformedData.date) {
        throw new Error('La fecha de aplicación es requerida');
      }

      // Validaciones de URL
      if (transformedData.url && !transformedData.url.startsWith('http')) {
        throw new Error('La URL debe comenzar con http:// o https://');
      }

      // Validaciones de longitud
      if (transformedData.notes && transformedData.notes.length < 3) {
        throw new Error('Las notas deben tener al menos 3 caracteres');
      }

      // Asegurar valores booleanos
      transformedData.sentCV = transformedData.sentCV === true;
      transformedData.sentEmail = transformedData.sentEmail === true;

      // Logging para debugging
      console.log('[DEBUG] Datos transformados:', {
        company: {
          valor: transformedData.company,
          tipo: typeof transformedData.company
        },
        position: {
          valor: transformedData.position,
          tipo: typeof transformedData.position
        },
        status: {
          valor: transformedData.status,
          tipo: typeof transformedData.status
        },
        date: {
          valor: transformedData.date,
          tipo: typeof transformedData.date
        },
        url: {
          valor: transformedData.url,
          tipo: typeof transformedData.url
        },
        notes: {
          valor: transformedData.notes,
          tipo: typeof transformedData.notes
        },
        sentCV: {
          valor: transformedData.sentCV,
          tipo: typeof transformedData.sentCV
        },
        sentEmail: {
          valor: transformedData.sentEmail,
          tipo: typeof transformedData.sentEmail
        }
      });

      // Logging de datos originales
      console.log('[DEBUG] Datos originales:', {
        company: {
          valor: config.data.company,
          tipo: typeof config.data.company
        },
        position: {
          valor: config.data.position,
          tipo: typeof config.data.position
        },
        status: {
          valor: config.data.status,
          tipo: typeof config.data.status
        },
        date: {
          valor: config.data.date,
          tipo: typeof config.data.date,
          formato: config.data.date.match(/^\d{4}-\d{2}-\d{2}$/) ? 'correcto' : 'incorrecto'
        },
        url: {
          valor: config.data.url,
          tipo: typeof config.data.url,
          longitud: config.data.url.length,
          esUrlValida: config.data.url === '' || config.data.url.startsWith('http')
        },
        notes: {
          valor: config.data.notes,
          tipo: typeof config.data.notes,
          longitud: config.data.notes.length,
          tieneCaracteresEspeciales: /[^\w\s]/.test(config.data.notes)
        },
        sentCV: {
          valor: config.data.sentCV,
          tipo: typeof config.data.sentCV,
          esBoolean: config.data.sentCV === true || config.data.sentCV === false
        },
        sentEmail: {
          valor: config.data.sentEmail,
          tipo: typeof config.data.sentEmail,
          esBoolean: config.data.sentEmail === true || config.data.sentEmail === false
        }
      });

      // Límites de longitud
      const lengthLimits = {
        company: 100,
        position: 100,
        url: 500,
        notes: 1000,
      };

      // Validar longitud de campos
      Object.entries(lengthLimits).forEach(([field, limit]) => {
        if (transformedData[field] && transformedData[field].length > limit) {
          throw new Error(`El campo ${field} no puede tener más de ${limit} caracteres`);
        }
      });

      // Lista de campos requeridos
      const requiredFieldsList = ['date', 'position', 'company', 'userId', 'status'] as const;

      // Validar campos requeridos
      requiredFieldsList.forEach(field => {
        if (!transformedData[field]) {
          throw new Error(`El campo ${field} es requerido`);
        }
      });

      config.data = transformedData;
      console.log('[DEBUG] Datos finales transformados:', JSON.stringify(config.data, null, 2));

      // Verificar tipos de datos antes de enviar
      console.log('[DEBUG] Verificación final de tipos de datos:', {
        date: {
          valor: config.data.date,
          tipo: typeof config.data.date,
          formato: config.data.date.match(/^\d{4}-\d{2}-\d{2}$/) ? 'correcto' : 'incorrecto'
        },
        position: {
          valor: config.data.position,
          tipo: typeof config.data.position,
          longitud: config.data.position.length,
          tieneEspacios: config.data.position.includes(' '),
          tieneCaracteresEspeciales: /[^a-zA-Z0-9\s]/.test(config.data.position)
        },
        company: {
          valor: config.data.company,
          tipo: typeof config.data.company,
          longitud: config.data.company.length,
          tieneEspacios: config.data.company.includes(' '),
          tieneCaracteresEspeciales: /[^a-zA-Z0-9\s]/.test(config.data.company)
        },
        url: {
          valor: config.data.url,
          tipo: typeof config.data.url,
          longitud: config.data.url.length,
          esUrlValida: config.data.url === '' || config.data.url.startsWith('http')
        },
        userId: {
          valor: config.data.userId,
          tipo: typeof config.data.userId,
          formato: config.data.userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/) ? 'correcto' : 'incorrecto'
        },
        status: {
          valor: config.data.status,
          tipo: typeof config.data.status,
          valido: ['pending', 'applied', 'interview', 'technical', 'offer', 'rejected'].includes(config.data.status)
        },
        notes: {
          valor: config.data.notes,
          tipo: typeof config.data.notes,
          longitud: config.data.notes.length,
          tieneCaracteresEspeciales: /[^\w\s]/.test(config.data.notes)
        },
        sentCV: {
          valor: config.data.sentCV,
          tipo: typeof config.data.sentCV,
          esBoolean: config.data.sentCV === true || config.data.sentCV === false
        },
        sentEmail: {
          valor: config.data.sentEmail,
          tipo: typeof config.data.sentEmail,
          esBoolean: config.data.sentEmail === true || config.data.sentEmail === false
        }
      });

      // Verificar que no haya valores undefined o null
      const hasUndefinedOrNull = Object.entries(config.data).some(([key, value]) => {
        if (value === undefined || value === null) {
          console.error(`[DEBUG] Campo ${key} tiene valor ${value}`);
          return true;
        }
        return false;
      });

      if (hasUndefinedOrNull) {
        return Promise.reject(new Error('Hay campos con valores undefined o null'));
      }

      return config;
    }

    const token = useAuthStore.getState().token;
    if (token) {
      config.headers = {
        ...config.headers as Record<string, string>,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
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
    console.log('[DEBUG] Interceptor response activado para URL:', response.config.url);
    console.log('[DEBUG] Respuesta recibida:', response.data);

    if (response.config.url?.includes('/postulations')) {
      // Validar y formatear la fecha
      let formattedDate = response.data.date;
      try {
        const date = new Date(response.data.date);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toISOString().split('T')[0];
        }
      } catch (error) {
        console.warn('[DEBUG] Error al formatear fecha:', error);
      }

      // Transformar la respuesta al formato de nuestra aplicación
      const transformedData = {
        ...response.data,
        date: formattedDate,
        url: response.data.url,
        notes: response.data.notes,
        sentCV: response.data.sentCV,
        sentEmail: response.data.sentEmail,
      };

      response.data = transformedData;
      console.log('[DEBUG] Respuesta transformada:', response.data);
    }
    return response;
  },
  onRejected: (error: any) => {
    console.error('[DEBUG] Error en response interceptor:', error);

    if (error.response?.status === 404 && error.config.url?.includes('/postulations')) {
      console.warn('[DEBUG] Postulación no encontrada (404)');
      return Promise.reject(new Error('La postulación no fue encontrada'));
    }
    return Promise.reject(error);
  }
};
