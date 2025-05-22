import { PostulationStatus } from '../../interface/postulations/postulation';

export interface BadgeProps {
  status: PostulationStatus;
 variant?: 'filled' | 'outline' | 'subtle';
 className?: string;
 size?: 'md' | 'sm' | 'lg';
  onClick?: () => void;

}
