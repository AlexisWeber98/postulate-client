import { PostulationStatus } from '../../interface/postulations/postulation';

export interface BadgeProps {
  status: PostulationStatus;
 variant?: 'filled' | 'outline' | 'subtle';

 size?: 'md' | 'sm' | 'lg';
  onClick?: () => void;
}
