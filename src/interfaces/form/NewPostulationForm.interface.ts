import { PostulationStatus } from '../postulations/postulation';

/** Tipo para representar fechas en formato ISO string */
export type ISODateString = string;

export interface NewPostulationFormValues {
  company: string;
  position: string;
  status: PostulationStatus;
  applicationDate: ISODateString;
  referenceUrl?: string;
  notes?: string;
  recruiterContact?: string;
  sentCV: boolean;
  sentEmail: boolean;
}

export interface NewPostulationFormProps {
  initialValues?: Partial<NewPostulationFormValues>;
  onSubmit: (values: NewPostulationFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string | Error;
}
