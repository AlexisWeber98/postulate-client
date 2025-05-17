/**
 * Punto de entrada para todas las interfaces
 * Exporta todas las interfaces organizadas por dominio
 */

// UI Components
import { ButtonProps, CardProps, ApplicationCardProps } from './components';
import { ModalProps } from './ui';

// Auth
import { User, LoginRequest, RegisterRequest, UserWithPassword } from './auth';

// API
import { ApiResponse } from './api';

// Form
import { FormFieldProps } from './form';

// Types
import { Postulation } from '../types/interface/postulations/postulation';

// UI
import { PasswordToggleProps } from './ui/PasswordToggleProps.interface';

export type {
  // UI Components
  ButtonProps,
  CardProps,
  ApplicationCardProps,
  ModalProps,

  // Auth
  User,
  LoginRequest,
  RegisterRequest,
  UserWithPassword,

  // API
  ApiResponse,

  // Form
  FormFieldProps,

  // Types
  Postulation,

  // UI
  PasswordToggleProps,
};

// Exportar grupos con alias para mayor claridad en importaciones
import * as UIComponents from './components';
import * as Auth from './auth';
import * as API from './api';
import * as Form from './form';

// Exportar los grupos completos
export {
  UIComponents,
  Auth,
  API,
  Form
};

export interface AuthState {
  user: User | null;
  loading: boolean;
  initialize: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, userName: string, lastName: string) => Promise<void>;
  signOut: () => void;
  updateUser: (data: { name?: string; email?: string }) => void;
}
