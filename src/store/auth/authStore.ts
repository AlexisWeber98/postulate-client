import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../../interfaces';

const API_URL = import.meta.env.VITE_API_URL || 'https://api-postulate.alexisweber.com';


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      initialize: () => {
        const { user } = get();
        if (user) {
          set({ loading: false });
        }
        console.log('Auth store inicializado', { user, loading: false });
      },
      signIn: async (email: string, password: string) => {
        console.log('Intentando login con:', { email });
        set({ loading: true });

        try {
          console.log('Haciendo petición a:', `${API_URL}/users/login`);
          const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          console.log('Respuesta del servidor:', response.status);
          if (!response.ok) {
            const error = await response.json();
            console.error('Error en login:', error);
            throw new Error(error.message || 'Credenciales inválidas');
          }

          const data = await response.json();
          console.log('Login exitoso:', data);
          set({ user: data.result, loading: false });

        } catch (error) {
          console.error('Error en login:', error);
          set({ loading: false });
          throw error;
        }
      },
      signUp: async (email: string, password: string, name: string, userName: string, lastName: string) => {
        console.log('Intentando registro con:', { email, name, userName, lastName, password });
        set({ loading: true });

        try {
          console.log('Haciendo petición a:', `${API_URL}/users`);
          const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, userName, name, lastName }),
          });

          console.log('Respuesta del servidor:', response.status);
          if (!response.ok) {
            const error = await response.json();
            console.error('Error en registro:', error);
            throw new Error(error.message || 'Error al registrar usuario');
          }

          const data = await response.json();
          console.log('Registro exitoso:', data);
          set({ user: data.user, loading: false });
        } catch (error) {
          console.error('Error en registro:', error);
          set({ loading: false });
          throw error;
        }
      },
      signOut: () => {
        console.log('Cerrando sesión');
        set({ user: null, loading: false });
      },
      updateUser: (data: { name?: string; email?: string }) => {
        console.log('Actualizando usuario:', data);
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      },
    }),
    {
      name: 'auth-storage'
    }
  )
);
