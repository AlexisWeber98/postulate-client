import { ApplicationStatus } from './StatusBadge.interface';

export interface BadgeProps {
  status: ApplicationStatus;
  className?: string;
}
