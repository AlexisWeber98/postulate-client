import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User, ApiError } from "../../types/auth/auth.interface";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { authApi } from "../../api";
import { AxiosError } from "axios";

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return (decoded.exp ?? 0) * 1000 < Date.now();
  } catch {
    return true; 
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
              lastName: decoded.lastName || decoded.lastname,
              userName: decoded.userName || decoded["username"] || decoded["user_name"],
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

          const token = response.result;
          const decoded = jwtDecode<JwtPayload & User>(token);


          set({
            token: token,
            loading: false,
            isAuthenticated: true,
            user: {
              id: decoded.id,
              name: decoded.name,
              lastName: decoded.lastName || decoded.lastname,
              userName: decoded.userName || decoded["username"] || decoded["user_name"],
              email: decoded.email,
            },
          });
        } catch (error) {
          set({ loading: false });
          console.error("Error en signIn:", error);

         
          if (error instanceof AxiosError) {
            if (error.message.includes('timeout')) {
              throw new Error('auth.timeoutError');
            }
            
            const axiosError = error;
            if (axiosError.response?.status === 401) {
              const backendMessage = getErrorMessage(axiosError.response.data?.message);
              if (backendMessage) {
                throw new Error(backendMessage);
              }
              throw new Error("Credenciales incorrectas");
            }
            
            throw error;
          }

          const apiError = error as ApiError;
          
          if (apiError.response?.status === 401) {
     
            const backendMessage = getErrorMessage(apiError.response.data?.message);
            if (backendMessage) {
              throw new Error(backendMessage);
            }
            throw new Error("Credenciales incorrectas");
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

          console.log("Respuesta del backend en signUp:", response);
          
         
          const user = response.result;
          console.log("Usuario extraído:", user);
          
    
          
          set({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              lastName: user.lastName || "",
              userName: user.userName || "",
            },
            loading: false,
            token: null,
            isAuthenticated: false 
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

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        });
      },

      updateUser: async (data: { name?: string; email?: string; lastName?: string; userName?: string; imageUrl?: string }) => {

        try {
          const userId = get().user?.id;
          if (!userId) {
            throw new Error('No se encontró el ID del usuario');
          }
          // Convertir lastName a lastname para el backend si es necesario
          const dataToSend: Record<string, unknown> = { ...data, userId };
          if (data.lastName) {
            dataToSend.lastname = data.lastName;
            delete dataToSend.lastName;
          }

          const response = await authApi.updateProfile(userId, dataToSend);

          set((state) => ({
            user: state.user ? { ...state.user, ...response.result.user } : null,
          }));
          return response;
        } catch (error) {
          console.error("[updateUser] Error al actualizar usuario:", error);
          if (error && typeof error === 'object' && 'response' in error) {
            // Mostrar el mensaje de error del backend si existe
            // @ts-expect-error: Backend response type is not fully defined
            console.error("[updateUser] Detalle del error del backend:", error.response?.data);
          }
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
              lastName: decoded.lastName || decoded.lastname,
              userName: decoded.userName || decoded["username"] || decoded["user_name"],
              email: decoded.email,
            },
            loading: false,
          });
        } else {
          set({ loading: false });
        }

      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);
