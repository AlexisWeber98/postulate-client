/**
 * Punto de entrada para todas las interfaces
 * Exporta todas las interfaces organizadas por dominio
 */

// UI Components
import { ButtonProps, CardProps, ApplicationCardProps } from "./components";
import { ModalProps } from "./ui";

// Auth
import { User, LoginRequest, RegisterRequest, UserWithPassword, AuthState } from "./auth";

// API
import { ApiResponse } from "./api";

// Form
import { FormFieldProps } from "./form";

// Types
import { Postulation } from "../types/interface/postulations/postulation";

// UI
import { PasswordToggleProps } from "./ui/PasswordToggleProps.interface";

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
  AuthState,

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
import * as UIComponents from "./components";
import * as Auth from "./auth";
import * as API from "./api";
import * as Form from "./form";

// Exportar los grupos completos
export { UIComponents, Auth, API, Form };
