import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User, ApiError } from "../../types/auth/auth.interface";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { authApi } from "../../api";

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return (decoded.exp ?? 0) * 1000 < Date.now();
  } catch {
    return true; // treat undecodable token as expired/invalid
  }
};

const getErrorMessage = (message: string | string[] | undefined): string => {
  if (Array.isArray(message)) {
    return message[0];
  }
  return message || '';
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      token: null,
      isAuthenticated: false,

      checkAuth: () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return false;
        }

        if (isTokenExpired(token)) {
          set({ isAuthenticated: false, user: null, token: null });
          return false;
        }

        try {
          const decoded = jwtDecode<JwtPayload & User>(token);
          set({
            isAuthenticated: true,
            user: {
              id: decoded.id,
              name: decoded.name,
              lastName: decoded.lastName,
              userName: decoded.userName,
              email: decoded.email,
            },
          });
          return true;
        } catch (error) {
          console.error("Error al decodificar token:", error);
          set({ isAuthenticated: false, user: null, token: null });
          return false;
        }
      },

      signIn: async (email: string, password: string) => {
        set({ loading: true });

        try {
          const response = await authApi.login({ email, password });
          console.log('Respuesta del login:', response);
          const token = response.result;
          const decoded = jwtDecode<JwtPayload & User>(token);

          set({
            token: token,
            loading: false,
            isAuthenticated: true,
            user: {
              id: decoded.id,
              name: decoded.name,
              lastName: decoded.lastName,
              userName: decoded.userName,
              email: decoded.email,
            },
          });
        } catch (error) {
          set({ loading: false });
          console.error("Error en signIn:", error);

          if (error instanceof Error) {
            if (error.message.includes('timeout')) {
              throw new Error('auth.timeoutError');
            }
            throw error;
          }

          const apiError = error as ApiError;
          if (apiError.response?.status === 401) {
            throw new Error(
              getErrorMessage(apiError.response.data.message) || "Credenciales incorrectas"
            );
          }
          throw new Error(
            getErrorMessage(apiError.response?.data?.message) || "Error en la autenticación"
          );
        }
      },

      signUp: async (
        email: string,
        password: string,
        name: string,
        userName: string,
        lastName: string,
      ) => {
        set({ loading: true });

        try {
          const response = await authApi.register({
            email,
            name,
            userName,
            lastName,
            password,
          });
          const { user, token } = response.result;

          set({
            user,
            loading: false,
            token,
            isAuthenticated: true
          });
        } catch (error) {
          set({ loading: false });
          console.error("Error en signUp:", error);
          const apiError = error as ApiError;
          if (apiError.response?.status === 409) {
            throw new Error(
              getErrorMessage(apiError.response.data.message) || "El usuario ya existe"
            );
          }
          throw new Error(
            getErrorMessage(apiError.response?.data?.message) || "Error en el registro"
          );
        }
      },

      signOut: () => {
        console.log("Cerrando sesión");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        });
      },

      updateUser: async (data: { name?: string; email?: string; lastName?: string; userName?: string }) => {
        console.log("Actualizando usuario:", data);
        try {
          const userId = get().user?.id;
          if (!userId) {
            throw new Error('No se encontró el ID del usuario');
          }
          const response = await authApi.updateProfile(userId, data);
          set((state) => ({
            user: state.user ? { ...state.user, ...response.result } : null,
          }));
        } catch (error) {
          console.error("Error al actualizar usuario:", error);
          throw error;
        }
      },

      initialize: () => {
        const { token } = get();
        if (token) {
          const decoded = jwtDecode<JwtPayload & User>(token);
          set({
            isAuthenticated: true,
            user: {
              id: decoded.id,
              name: decoded.name,
              lastName: decoded.lastName,
              userName: decoded.userName,
              email: decoded.email,
            },
            loading: false,
          });
        } else {
          set({ loading: false });
        }
        console.log("Auth store inicializado", { token, loading: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    },
  ),
);
