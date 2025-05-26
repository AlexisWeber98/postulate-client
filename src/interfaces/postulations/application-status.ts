export enum ApplicationStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export const STATUS_COLORS = {
  [ApplicationStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ApplicationStatus.REVIEWING]: 'bg-blue-100 text-blue-800',
  [ApplicationStatus.APPROVED]: 'bg-green-100 text-green-800',
  [ApplicationStatus.REJECTED]: 'bg-red-100 text-red-800'
} as const;

export const STATUS_LABELS_ES = {
  [ApplicationStatus.PENDING]: 'Pendiente',
  [ApplicationStatus.REVIEWING]: 'En revisión',
  [ApplicationStatus.APPROVED]: 'Aprobado',
  [ApplicationStatus.REJECTED]: 'Rechazado'
} as const;

export const STATUS_LABELS_EN = {
  [ApplicationStatus.PENDING]: 'Pending',
  [ApplicationStatus.REVIEWING]: 'Reviewing',
  [ApplicationStatus.APPROVED]: 'Approved',
  [ApplicationStatus.REJECTED]: 'Rejected'
} as const;
