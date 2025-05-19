import { client } from "./client";
import { User } from "../types";

// Interfaces para las solicitudes
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  userName: string;
  lastName: string;
}

// Servicio para autenticación
export const authApi = {
  // Iniciar sesión
  login: (credentials: LoginRequest) =>
    client.post<User>("/auth/login", credentials),

  // Registrar un nuevo usuario
  register: (userData: RegisterRequest) =>
    client.post<User>("/auth/register", userData),

  // Cerrar sesión
  logout: () => client.post<void>("/auth/logout", {}),

  // Obtener usuario actual
  getCurrentUser: () => client.get<User | null>("/auth/me"),
};
