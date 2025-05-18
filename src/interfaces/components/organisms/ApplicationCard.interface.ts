import { Postulation } from '../../../types/interface/postulations/postulation';

export interface ApplicationCardProps {
  application: Postulation;
}

export interface ApplicationCardGlassProps {
  application: Postulation;
  onViewDetail: () => void;
  onEdit: () => void;
}
