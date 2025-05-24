import React, { useState } from 'react';
import { ApplicationCardGlass } from './components/ApplicationCardGlass.ui';
import ApplicationDetailModalUI from './components/ApplicationDetailModal.ui';
import ApplicationEditModalUI from './components/ApplicationEditModal.ui';
import { Postulation } from '../../../types/interface/postulations/postulation';
import { motion } from 'framer-motion';
import { usePostulationsStore } from '../../../store';
import { postulationsApi } from '../../../api/postulations';
import { toast } from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useLanguageStore } from '../../../store/language/languageStore';

interface ErrorResponse {
  message: string;
}

interface ApplicationCardProps {
  application: Postulation;
}

const ApplicationCardContainer: React.FC<ApplicationCardProps> = ({ application }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const translate = useLanguageStore(state=>state.translate);

  const { updatePostulation, deletePostulation } = usePostulationsStore();

  const openDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = async (updatedApplication: Postulation) => {
    console.log('[ApplicationCard] Iniciando actualización de postulación:', updatedApplication.id);
    setIsLoading(true);
    try {
      await postulationsApi.update(updatedApplication.id, updatedApplication);
      updatePostulation(updatedApplication.id, updatedApplication);
      console.log('[ApplicationCard] Postulación actualizada exitosamente:', updatedApplication.id);
      toast.success(translate('dashboard.actions.updateSuccess'));
      closeEditModal();
    } catch (error) {
      console.error('[ApplicationCard] Error al actualizar la postulación:', error);
      toast.error(translate('dashboard.actions.updateError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(translate('dashboard.actions.deleteConfirm'))) {
      console.log('[ApplicationCard] Eliminación cancelada por el usuario');
      return;
    }

    console.log('[ApplicationCard] 🟥 Botón Eliminar presionado');
    console.log('[ApplicationCard] 📤 Enviando request DELETE a API con ID:', application.id);
    setIsLoading(true);

    try {
      await postulationsApi.delete(application.id);
      deletePostulation(application.id);
      console.log('[ApplicationCard] ✅ Postulación eliminada exitosamente:', application.id);
      toast.success(translate('dashboard.actions.deleteSuccess'));
      closeEditModal();
      closeDetailModal();
    } catch (error: unknown) {
      console.error('[ApplicationCard] ❌ Error al eliminar la postulación 😓', error);

      if (isAxiosError(error)) {
        const axiosError = error as import('axios').AxiosError<ErrorResponse>;
        console.error('[ApplicationCard] 📝 Detalles del error:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
          headers: axiosError.response?.headers
        });
        toast.error(axiosError.response?.data?.message || translate('dashboard.actions.deleteError'));
      } else {
        console.error('[ApplicationCard] ❌ Error inesperado:', error);
        toast.error(translate('dashboard.actions.deleteError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div key={`application-card-container-${application.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <ApplicationCardGlass
          application={application}
          onViewDetail={openDetailModal}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </motion.div>
      <ApplicationDetailModalUI
        application={application}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        onDelete={handleDelete}
      />
      <ApplicationEditModalUI
        application={application}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleSave}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ApplicationCardContainer;
