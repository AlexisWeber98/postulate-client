import { Postulation } from '../../../../types/interface/postulations/postulation';

export interface ApplicationEditModalUIProps {
  application: Postulation;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedApplication: Postulation) => Promise<void>;
  onDelete: () => Promise<void>;
  isLoading: boolean;
}
