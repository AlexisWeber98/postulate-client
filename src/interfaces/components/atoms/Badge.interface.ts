import { ApplicationStatus } from '../../types/ApplicationStatus.type';

export interface BadgeProps {
  status: ApplicationStatus;
  className?: string;
}
