import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { AuthState, User, ApiResponse, ApiError } from "../../types/auth/auth.interface";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { authApi } from "../../api";

const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  return (decoded.exp ?? 0) * 1000 < Date.now();
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
          const token = (response as unknown as ApiResponse<string>).data.result;
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
          const apiError = error as ApiError;
          if (apiError.response?.status === 401) {
            throw new Error(
              apiError.response.data.message || "Credenciales incorrectas"
            );
          }
          throw new Error(
            apiError.response?.data?.message || "Error en la autenticación"
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
          const data = (response as unknown as ApiResponse<User & { token: string }>).data;

          set({
            user: data.result,
            loading: false,
            token: data.result.token,
            isAuthenticated: true
          });
        } catch (error) {
          set({ loading: false });
          console.error("Error en signUp:", error);
          const apiError = error as ApiError;
          if (apiError.response?.status === 409) {
            throw new Error(
              apiError.response.data.message || "El usuario ya existe"
            );
          }
          throw new Error(
            apiError.response?.data?.message || "Error en el registro"
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

      updateUser: (data: { name?: string; email?: string }) => {
        console.log("Actualizando usuario:", data);
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
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

// Configurar el interceptor de axios para incluir el token en todas las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore.getState();
      authStore.signOut();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
