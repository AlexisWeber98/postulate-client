import { PostulationStatus } from '../postulations/postulation';

export interface NewPostulationFormValues {
  company: string;
  position: string;
  status: PostulationStatus;
  applicationDate: string;
  link?: string;
  description?: string;
  recruiterContact?: string;
  sendCv?: boolean;
  sendEmail?: boolean;
}

export interface NewPostulationFormProps {
  initialValues?: Partial<NewPostulationFormValues>;
  onSubmit: (values: NewPostulationFormValues) => void;
  loading?: boolean;
  error?: string;
}
