import { Postulation } from '../../../types/interface/postulations/postulation';

export interface ApplicationCardProps {
  application: Postulation;
}

export interface ApplicationCardGlassProps {
  application: Postulation;
  onViewDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ApplicationDetailModalUIProps {
  application: Postulation;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export interface ApplicationEditModalUIProps {
  application: Postulation;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedApplication: Postulation) => void;
  onDelete: () => void;
  isLoading?: boolean;
}
