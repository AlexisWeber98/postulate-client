export interface User {
  id: string;
  email: string;
  name: string;
  userName: string;
  lastName: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  initialize: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, userName: string, lastName: string) => Promise<void>;
  signOut: () => void;
  updateUser: (data: { name?: string; email?: string }) => void;
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



export interface UserWithPassword extends User {
  password: string;
}
