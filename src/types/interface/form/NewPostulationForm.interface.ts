import { PostulationStatus } from '../postulations/postulation';

export interface NewPostulationFormValues {
  company: string;
  position: string;
  status: PostulationStatus;
  date: string;
  referenceUrl?: string;
  notes?: string;
  recruiterContact?: string;
  sentCV?: boolean;
  sentEmail?: boolean;
}

export interface NewPostulationFormProps {
  initialValues?: Partial<NewPostulationFormValues>;
  onSubmit: (values: NewPostulationFormValues) => void;
  loading?: boolean;
  error?: string;
}
