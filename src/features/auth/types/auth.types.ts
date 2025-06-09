
export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  userName?: string;
  lastName?: string;
}

export interface FieldStatus {
  isValid: boolean;
  message?: string;
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
