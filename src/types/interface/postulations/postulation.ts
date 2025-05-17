export type PostulationStatus = 'applied' | 'interview' | 'technical' | 'offer' | 'rejected' | 'accepted';

export interface Postulation {
  id: string;
  company: string;
  position: string;
  status: PostulationStatus;
  date: string;
    url?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostulationState {
  postulations: Postulation[];
  loading: boolean;
  addPostulation: (newPostulation: Omit<Postulation, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updatePostulation: (id: string, updatedFields: Partial<Postulation>) => void;
  deletePostulation: (id: string) => void;
  getPostulation: (id: string) => Postulation | undefined;
  checkDuplicate: (company: string, position: string) => boolean;
}

export const STATUS_LABELS: Record<PostulationStatus, string> = {
  applied: 'Aplicado',
  interview: 'Entrevista',
  technical: 'Prueba Técnica',
  offer: 'Oferta',
  rejected: 'Rechazado',
  accepted: 'Aceptado'
};

export const STATUS_COLORS: Record<PostulationStatus, string> = {
  applied: 'bg-blue-100 text-blue-800',
  interview: 'bg-purple-100 text-purple-800',
  technical: 'bg-yellow-100 text-yellow-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  accepted: 'bg-green-100 text-green-800'
};
