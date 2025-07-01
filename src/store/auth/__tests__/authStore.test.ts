import { useAuthStore } from '../authStore';
import { authApi } from '../../../api';
import { jwtDecode } from 'jwt-decode';
import { act } from '@testing-library/react';
import { AxiosError, AxiosResponse } from 'axios';

// Mock de jwt-decode
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

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
      loading: false,
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
    const { user, loading, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(loading).toBeFalsy();
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
        await useAuthStore.getState().signIn('test@example.com', 'password123');
      });

      const { user, loading, token, isAuthenticated } = useAuthStore.getState();
      expect(mockAuthApi.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
      expect(mockJwtDecode).toHaveBeenCalledWith(mockToken);
      expect(user).toEqual(mockUser);
      expect(loading).toBeFalsy();
      expect(token).toBe(mockToken);
      expect(isAuthenticated).toBeTruthy();
    });

    it('debería manejar errores de autenticación', async () => {
      // Ensure response.data.message is provided for getErrorMessage
      const mockAxiosError = new AxiosError('Request failed with status code 401', '401', undefined, undefined, {
        status: 401,
        data: { message: 'Credenciales incorrectas' },
      } as AxiosResponse); // Cast to AxiosResponse
      mockAuthApi.login.mockRejectedValueOnce(mockAxiosError);

      await act(async () => {
        await expect(useAuthStore.getState().signIn('wrong@example.com', 'wrongpass')).rejects.toThrow('Credenciales incorrectas');
      });

      const { loading, isAuthenticated } = useAuthStore.getState();
      expect(loading).toBeFalsy();
      expect(isAuthenticated).toBeFalsy();
    });
  });

  describe('signUp', () => {
    it('debería registrar un nuevo usuario', async () => {
      const mockUser = { id: '456', email: 'new@example.com', name: 'New', lastName: 'User', userName: 'newuser' };
      mockAuthApi.register.mockResolvedValueOnce({ result: mockUser });

      await act(async () => {
        await useAuthStore.getState().signUp('new@example.com', 'newpass', 'New', 'newuser', 'User');
      });

      const { user, loading, token, isAuthenticated } = useAuthStore.getState();
      expect(mockAuthApi.register).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'newpass',
        name: 'New',
        userName: 'newuser',
        lastName: 'User',
      });
      expect(user).toEqual({ ...mockUser, lastName: 'User', userName: 'newuser' }); // lastName y userName pueden ser opcionales en la interfaz User
      expect(loading).toBeFalsy();
      expect(token).toBeNull();
      expect(isAuthenticated).toBeFalsy();
    });

    it('debería manejar errores de registro', async () => {
      // Ensure response.data.message is provided for getErrorMessage
      const mockAxiosError = new AxiosError('Request failed with status code 409', '409', undefined, undefined, {
        status: 409,
        data: { message: 'El usuario ya existe' },
      } as AxiosResponse); // Cast to AxiosResponse
      mockAuthApi.register.mockRejectedValueOnce(mockAxiosError);

      await act(async () => {
        await expect(useAuthStore.getState().signUp('existing@example.com', 'pass', 'Existing', 'existing', 'User')).rejects.toThrow('El usuario ya existe');
      });

      const { loading, isAuthenticated } = useAuthStore.getState();
      expect(loading).toBeFalsy();
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
      const updatedData = { name: 'NewName', lastName: 'NewLastName' }; // Usar lastName aquí
      const expectedDataSent = { name: 'NewName', lastname: 'NewLastName', userId: initialUser.id }; // Lo que se espera que se envíe al backend
      const updatedUser = { ...initialUser, ...updatedData };

      useAuthStore.setState({ user: initialUser, isAuthenticated: true });
      mockAuthApi.updateProfile.mockResolvedValueOnce({ result: { user: updatedUser } });

      await act(async () => {
        await useAuthStore.getState().updateUser(updatedData);
      });

      const { user } = useAuthStore.getState();
      expect(mockAuthApi.updateProfile).toHaveBeenCalledWith(initialUser.id, expectedDataSent);
      expect(user).toEqual(updatedUser);
    });

    it('debería manejar errores al actualizar la información del usuario', async () => {
      const initialUser = { id: '123', email: 'test@example.com', name: 'OldName', lastName: 'OldLastName', userName: 'olduser' };
      const updatedData = { name: 'NewName' };
      const mockError = new Error('Error de red');

      useAuthStore.setState({ user: initialUser, isAuthenticated: true });
      mockAuthApi.updateProfile.mockRejectedValueOnce(mockError);

      await act(async () => {
        await expect(useAuthStore.getState().updateUser(updatedData)).rejects.toThrow('Error de red');
      });

      const { user } = useAuthStore.getState();
      expect(user).toEqual(initialUser); // El usuario no debería cambiar
    });
  });
});