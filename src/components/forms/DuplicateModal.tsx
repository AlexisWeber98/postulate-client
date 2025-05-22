import { AlertCircle } from "lucide-react";
import Modal from "../../components/molecules/Modal";
import { useLanguageStore } from "../../store/language/languageStore";

interface DuplicateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  company: string;
  position: string;
}

const DuplicateModal: React.FC<DuplicateModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  company,
  position
}) => {
  const translate = useLanguageStore(state=>state.translate);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={translate('applicationForm.duplicateTitle')}
    >
      <div className="flex items-start p-4">
        <div className="flex-shrink-0">
          <AlertCircle className="h-6 w-6 text-yellow-500" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {translate('applicationForm.duplicateMessage', { position, company })}
          </p>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              {translate('cancel')}
            </button>
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-lg shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
            >
              {translate('applicationForm.continueAnyway')}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DuplicateModal;
