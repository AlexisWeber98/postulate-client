import { ApplicationStatus } from '../postulations/application-status';

/** Tipo para representar fechas en formato ISO string */
export type ISODateString = string;

export interface NewPostulationFormValues {
  /** Nombre de la empresa objetivo */
  company: string;
  /** Título del puesto al que se está aplicando */
  position: string;
  /** Estado actual de la postulación */
  status: ApplicationStatus;
  /** Fecha de la postulación en formato ISO string (YYYY-MM-DD) */
  date: ISODateString;
  /** URL del anuncio de trabajo original o material de referencia */
  referenceUrl?: string;
  /** Notas adicionales sobre la postulación */
  notes?: string;
  /** Información de contacto del reclutador (email o teléfono) */
  recruiterContact?: string;
  /** Indica si el CV ha sido enviado */
  sentCV: boolean;
  /** Indica si se ha enviado un email de seguimiento */
  sentEmail: boolean;
}

export interface NewPostulationFormProps {
  initialValues?: Partial<NewPostulationFormValues>;
  onSubmit: (values: NewPostulationFormValues) => void;
  loading?: boolean;
  error?: string;
}
