import { z } from 'zod';
import { PostulationStatus } from '../../../types/interface/postulations/postulation';

export const newPostulationSchema = z.object({
  company: z.string().min(1, 'El nombre de la empresa es requerido'),
  position: z.string().min(1, 'El título del puesto es requerido'),
  status: z.enum(['applied', 'interview', 'technical', 'offer', 'rejected', 'accepted'] as const),
  date: z.string().min(1, 'La fecha de aplicación es requerida'),
  url: z.string().url('Debe ser una URL válida').optional(),
  notes: z.string().optional(),
  recruiterContact: z.string().optional(),
  sentCV: z.boolean().optional(),
  sentEmail: z.boolean().optional(),
});

export type NewPostulationFormSchema = z.infer<typeof newPostulationSchema>;
