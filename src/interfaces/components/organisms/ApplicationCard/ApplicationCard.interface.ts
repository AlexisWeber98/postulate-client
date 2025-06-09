import { Postulation } from '../../../../types/interface/postulations/postulation';

export interface ApplicationCardProps {
  application: Postulation;
  onViewDetail: () => void;
  onEdit: () => void;
  onDelete: () => Promise<void>;
}
