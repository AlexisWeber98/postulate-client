export interface User {
  id: string;
  email: string;
  name: string;
  userName: string;
  lastName: string;
  profileImage?: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface ApiResponse<T> {
  data: {
    result: T;
  };
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  initialize: () => void;
  checkAuth: () => boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, userName: string, lastName: string) => Promise<void>;
  signOut: () => void;
  updateUser: (data: Partial<Omit<User, 'id'>>) => void;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  userName: string;
  lastName: string;
}

export interface ApiError {
  response?: {
    status: number;
    data: {
      message: string | string[];
      errors?: Record<string, string[]>;
    };
  };
  message?: string;
}
