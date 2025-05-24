import { httpClient } from './client';
import { User } from '../types';
import { LoginRequest, RegisterRequest } from '../features/auth/types/auth.types';



// Servicio para autenticación
export const authApi = {
  // Iniciar sesión
  login: (credentials: LoginRequest) =>
    httpClient.post<{ result: string }>('/auth/login', credentials),

  // Registrar un nuevo usuario
  register: (userData: RegisterRequest) =>
    httpClient.post<{ result: { user: User; token: string } }>('/auth/register', userData),

  // Actualizar perfil de usuario
  updateProfile: (id: string, userData: { name?: string; email?: string; lastName?: string; userName?: string }) => {
    const { lastName, ...rest } = userData;
    return httpClient.patch<{ result: User }>(`/users/${id}`, {
      ...rest,
      lastname: lastName // Convertir lastName a lastname para coincidir con la API
    });
  },
};
