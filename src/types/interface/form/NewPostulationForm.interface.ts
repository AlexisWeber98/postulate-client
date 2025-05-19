import { ApplicationStatus } from '../postulations/application-status';

export interface NewPostulationFormValues {
  company: string;
  position: string;
  status: ApplicationStatus;
  date: string;
  referenceUrl?: string;
  notes?: string;
  recruiterContact?: string;
  sentCV: boolean;
  sentEmail: boolean;
}

export interface NewPostulationFormProps {
  initialValues?: Partial<NewPostulationFormValues>;
  onSubmit: (values: NewPostulationFormValues) => void;
  loading?: boolean;
  error?: string;
}
