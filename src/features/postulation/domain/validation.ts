import { z } from 'zod';
import { ApplicationStatus } from '../../../interfaces/postulations/application-status';

export const newPostulationSchema = z.object({
  company: z.string().min(2, 'La empresa es obligatoria'),
  position: z.string().min(2, 'El puesto es obligatorio'),
  status: z.nativeEnum(ApplicationStatus, {
    errorMap: () => ({ message: 'El estado es obligatorio' })
  }),
  date: z.string().min(1, 'La fecha es obligatoria'),
  referenceUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  notes: z.string().max(1000, 'Máximo 1000 caracteres').optional(),
  recruiterContact: z.string().max(100, 'Máximo 100 caracteres').optional(),
  sentCV: z.boolean(),
  sentEmail: z.boolean(),
});

export type NewPostulationFormSchema = z.infer<typeof newPostulationSchema>;
