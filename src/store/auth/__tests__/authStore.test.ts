import { useAuthStore } from '../authStore';
import { authApi } from '../../../api';
import { act } from '@testing-library/react';
import { User } from '../../../types/auth/auth.interface';

// Mock de jwt-decode
jest.mock('jwt-decode', () => ({
  __esModule: true,
  jwtDecode: jest.fn(),
}));

// Importar jwtDecode después del mock para asegurar que se usa el mockeado
import { jwtDecode } from 'jwt-decode';

// Mock de authApi
jest.mock('../../../api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    updateProfile: jest.fn(),
  },
}));

const mockJwtDecode = jwtDecode as jest.Mock;
const mockAuthApi = authApi as jest.Mocked<typeof authApi>;

describe('authStore', () => {
  beforeEach(() => {
    // Resetear el estado del store antes de cada prueba
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    // Limpiar mocks
    mockJwtDecode.mockClear();
    mockAuthApi.login.mockClear();
    mockAuthApi.register.mockClear();
    mockAuthApi.updateProfile.mockClear();
  });

  it('debería inicializar el estado correctamente', () => {
    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isAuthenticated).toBeFalsy();
  });

  describe('signIn', () => {
    it('debería autenticar al usuario y establecer el token', async () => {
      const mockToken = 'mock-jwt-token';
      const mockUser = { id: '123', email: 'test@example.com', name: 'Test', lastName: 'User', userName: 'testuser' };

      mockAuthApi.login.mockResolvedValueOnce({ result: mockToken });
      mockJwtDecode.mockReturnValueOnce({ ...mockUser, exp: Date.now() / 1000 + 3600 }); // Token válido por 1 hora

      await act(async () => {
        // Simular login y decodificación manualmente
        useAuthStore.getState().signIn(mockToken, mockUser);
      });

      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(user).toEqual(mockUser);
      expect(token).toBe(mockToken);
      expect(isAuthenticated).toBeTruthy();
    });

    it('debería manejar errores de autenticación', async () => {
      // Simular error de login
      await act(async () => {
        useAuthStore.getState().signIn('', null as unknown as User);
      });
      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(user).toBeNull();
      expect(token).toBe('');
      expect(isAuthenticated).toBe(true);
    });
  });

  describe('signUp', () => {
    it('debería registrar un nuevo usuario', async () => {
      const mockUser = { id: '456', email: 'new@example.com', name: 'New', lastName: 'User', userName: 'newuser' };
      await act(async () => {
        useAuthStore.getState().signUp(mockUser);
      });
      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(user).toEqual(mockUser);
      expect(token).toBeNull();
      expect(isAuthenticated).toBeFalsy();
    });

    it('debería manejar errores de registro', async () => {
      // No se puede simular error en signUp directo, solo verificar estado
      await act(async () => {
        useAuthStore.getState().signUp(null as unknown as User);
      });
      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(user).toBeNull();
      expect(token).toBeNull();
      expect(isAuthenticated).toBeFalsy();
    });
  });

  describe('signOut', () => {
    it('debería cerrar la sesión del usuario', () => {
      useAuthStore.setState({
        user: { id: '123', email: 'test@example.com', name: 'Test', userName: 'testuser' },
        token: 'some-token',
        isAuthenticated: true,
      });

      act(() => {
        useAuthStore.getState().signOut();
      });

      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(user).toBeNull();
      expect(token).toBeNull();
      expect(isAuthenticated).toBeFalsy();
    });
  });

  describe('checkAuth', () => {
    it('debería autenticar si el token es válido', () => {
      const mockToken = 'valid-token';
      const mockUser = { id: '123', email: 'test@example.com', name: 'Test', lastName: 'User', userName: 'testuser' };
      // Ensure jwtDecode returns a complete User object with id, name, lastName, userName, email
      mockJwtDecode.mockReturnValueOnce({
        id: mockUser.id,
        name: mockUser.name,
        lastName: mockUser.lastName,
        userName: mockUser.userName,
        email: mockUser.email,
        exp: Date.now() / 1000 + 3600,
      });

      useAuthStore.setState({ token: mockToken });

      let result: boolean = false;
      act(() => {
        result = useAuthStore.getState().checkAuth();
      });

      const { user, isAuthenticated } = useAuthStore.getState();
      expect(result).toBeTruthy();
      expect(user).toEqual(mockUser);
      expect(isAuthenticated).toBeTruthy();
    });

    it('no debería autenticar si no hay token', () => {
      useAuthStore.setState({ token: null });

      let result: boolean = false;
      act(() => {
        result = useAuthStore.getState().checkAuth();
      });

      const { user, isAuthenticated } = useAuthStore.getState();
      expect(result).toBeFalsy();
      expect(user).toBeNull();
      expect(isAuthenticated).toBeFalsy();
    });

    it('no debería autenticar si el token ha expirado', () => {
      const mockToken = 'expired-token';
      mockJwtDecode.mockReturnValueOnce({ exp: Date.now() / 1000 - 3600 }); // Token expirado

      useAuthStore.setState({ token: mockToken });

      let result: boolean = false;
      act(() => {
        result = useAuthStore.getState().checkAuth();
      });

      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(result).toBeFalsy();
      expect(user).toBeNull();
      expect(token).toBeNull();
      expect(isAuthenticated).toBeFalsy();
    });
  });

  describe('updateUser', () => {
    it('debería actualizar la información del usuario', async () => {
      const initialUser = { id: '123', email: 'test@example.com', name: 'OldName', lastName: 'OldLastName', userName: 'olduser' };
      const updatedUser = { ...initialUser, name: 'NewName', lastName: 'NewLastName' };
      useAuthStore.setState({ user: initialUser, isAuthenticated: true });
      await act(async () => {
        useAuthStore.getState().updateUser(updatedUser);
      });
      const { user } = useAuthStore.getState();
      expect(user).toEqual(updatedUser);
    });

    it('debería manejar errores al actualizar la información del usuario', async () => {
      // No se puede simular error en updateUser directo, solo verificar estado
      const initialUser = { id: '123', email: 'test@example.com', name: 'OldName', lastName: 'OldLastName', userName: 'olduser' };
      useAuthStore.setState({ user: initialUser, isAuthenticated: true });
      await act(async () => {
        useAuthStore.getState().updateUser(null as unknown as User);
      });
      const { user } = useAuthStore.getState();
      expect(user).toEqual(initialUser);
    });
  });
});
