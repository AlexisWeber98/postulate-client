import React from 'react';
import { ApplicationCardProps } from '../../../interfaces/components/organisms/ApplicationCard.interface';
import { Edit, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { APP_COLORS } from '../../../styles/colors';
import Modal from '../../molecules/Modal';
import Card from '../../molecules/Card';
import Button from '../../atoms/Button';
import { StatusHelpers } from '../../../lib/helpers';
import { Postulation } from '../../../types/interface/postulations/postulation';
import { useLanguageStore } from '../../../store/language/languageStore';

// Definimos la interfaz para las props del UI
interface ApplicationCardUIProps extends ApplicationCardProps {
  application: Postulation;
  formattedDate: string;
  getInitials: (companyName: string) => string;
  getStatusLabel: (status: string) => string;
  handleEdit: () => void;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  confirmDelete: () => void;
  isDeleteModalOpen: boolean;
  isLoading: boolean;
}

export const ApplicationCardUI: React.FC<ApplicationCardUIProps> = ({
  application,
  formattedDate,
  getInitials,
  getStatusLabel,
  handleEdit,
  openDeleteModal,
  closeDeleteModal,
  confirmDelete,
  isDeleteModalOpen,
  isLoading,
}) => {
  const { company, position, status, notes } = application;
  const { t } = useLanguageStore();

  const bgColor = APP_COLORS.cardColors[status as keyof typeof APP_COLORS.cardColors] || 'white';
  const statusClassName = StatusHelpers.getStatusClasses(status);

  return (
    <>
       <Card bgColor={bgColor} rounded="full">
        <div className="p-6">
          <div className="flex items-start mb-4">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4"
              style={{ background: APP_COLORS.blueGradient }}
            >
              {getInitials(company)}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{company}</h3>
              <p className="text-gray-700">{position}</p>
            </div>
            <div>
              <span className={`${statusClassName} px-3 py-1 rounded-full text-sm font-medium`}>
                {getStatusLabel(status)}
              </span>
            </div>
          </div>

          <div className="flex items-center text-gray-500 text-sm mb-3">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Aplicado: {formattedDate}</span>
          </div>

          {notes && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{notes}</p>
          )}
        </div>

        <div className="border-t border-gray-100 bg-white/60 backdrop-blur-sm px-6 py-3 flex justify-end">
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <Edit className="h-4 w-4" /> Editar
            </button>
            <button
              onClick={openDeleteModal}
              className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800 ml-4"
            >
              <Trash2 className="h-4 w-4" /> Eliminar
            </button>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirmar Eliminación"
      >
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">
                ¿Estás seguro de que deseas eliminar esta postulación?
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Esta acción no se puede deshacer. Se eliminará permanentemente la postulación para
                <span className="font-semibold"> {company}</span> como <span className="font-semibold">{position}</span>.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <Button
              variant="secondary"
              onClick={closeDeleteModal}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : t('common.delete')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
