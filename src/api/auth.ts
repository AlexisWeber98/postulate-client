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
    httpClient.post<{ result: User }>('/auth/register', userData),

  // Actualizar perfil de usuario
  updateProfile: (userId: string, userData: { name?: string; email?: string; lastname?: string; userName?: string; imageUrl?: string }) => {
    return httpClient.patch<{ result: { user: User } }>(`/users/${userId}`, { userId, data: userData });
  },
};
