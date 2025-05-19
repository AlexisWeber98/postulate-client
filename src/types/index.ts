import { User, AuthState } from "./interface/auth/authStore.interface";
import { Postulation, PostulationState, PostulationStatus, STATUS_LABELS, STATUS_COLORS } from "./interface/postulations/postulation";
import { SimpleSelectProps } from "./interface/ui/simpleSelect.interface";
import { ModalProps } from "./interface/modal/modal.interface";
import { PasswordToggleProps } from "./interface/password-toggle";
import { NewPostulationFormProps, NewPostulationFormValues } from "./interface/form/NewPostulationForm.interface";

// Exportar tipos
export type { User, AuthState, Postulation, PostulationState, PostulationStatus, SimpleSelectProps, ModalProps, PasswordToggleProps, NewPostulationFormProps, NewPostulationFormValues };

// Exportar valores
export { STATUS_LABELS, STATUS_COLORS };
