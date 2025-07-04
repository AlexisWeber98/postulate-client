export interface User {
  id: string;
  email: string;
  name: string;
  userName: string;
  lastName?: string;
  profileImage?: string;
  lastname?: string;
  imageUrl?: string;
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
  token: string | null;
  isAuthenticated: boolean;
  initialize: () => void;
  checkAuth: () => boolean;
  signIn: (token: string, user: User) => void;
  signUp: (user: User) => void;
  updateUser: (updatedUser: User) => void;
  signOut: () => void;
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
