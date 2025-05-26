export interface User {
  id: string;
  email: string;
  name: string;
  userName: string;
  lastName: string;
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
  updateUser: (data: { name?: string; email?: string }) => void;

}
