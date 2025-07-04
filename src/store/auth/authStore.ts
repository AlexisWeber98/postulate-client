import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "../../types/auth/auth.interface";
import { jwtDecode, type JwtPayload } from "jwt-decode";

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return (decoded.exp ?? 0) * 1000 < Date.now();
  } catch {
    return true; 
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
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

      signIn: (token: string, user: User) => {
        set({
          token: token,
          isAuthenticated: true,
          user: user,
        });
      },

      signUp: (user: User) => {
        set({
          user: user,
          token: null,
          isAuthenticated: false 
        });
      },

      signOut: () => {

        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (updatedUser: User) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
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
              lastName: decoded.lastName || decoded.lastname,
              userName: decoded.userName || decoded["username"] || decoded["user_name"],
              email: decoded.email,
            },
          });
        }

      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);