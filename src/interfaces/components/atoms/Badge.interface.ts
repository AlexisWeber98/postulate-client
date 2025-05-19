import { ApplicationStatus } from '../../../types/interface/postulations/application-status';

export interface BadgeProps {
  status: ApplicationStatus;
  className?: string;
}
