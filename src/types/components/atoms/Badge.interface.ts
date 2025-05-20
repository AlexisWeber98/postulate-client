import { PostulationStatus } from '../../interface/postulations/postulation';

export interface BadgeProps {
  status: PostulationStatus;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  onClick?: () => void;
}
