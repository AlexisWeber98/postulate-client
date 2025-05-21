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

interface ApplicationCardProps {
  application: Postulation;
}

const ApplicationCardContainer: React.FC<ApplicationCardProps> = ({ application }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      toast.success('Postulación actualizada correctamente');
      closeEditModal();
    } catch (error) {
      console.error('[ApplicationCard] Error al actualizar la postulación:', error);
      toast.error('Error al actualizar la postulación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta postulación?')) {
      console.log('[ApplicationCard] Eliminación cancelada por el usuario');
      return;
    }

    console.log('[ApplicationCard] 🟥 Botón Eliminar presionado');
    console.log('[ApplicationCard] 📤 Enviando request DELETE a API con ID:', application.id);
    setIsLoading(true);

    try {
      const response = await postulationsApi.delete(application.id);
      console.log('[ApplicationCard] ✅ Respuesta del servidor:', response);

      deletePostulation(application.id);
      console.log('[ApplicationCard] ✅ Postulación eliminada exitosamente:', application.id);
      toast.success('Postulación eliminada correctamente');
      closeEditModal();
      closeDetailModal();
    } catch (error: unknown) {
      console.error('[ApplicationCard] ❌ Error al eliminar la postulación 😓', error);

      // Log detallado del error
      if (isAxiosError(error)) {
        console.error('[ApplicationCard] 📝 Detalles del error:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
        toast.error(error.response?.data?.message || 'Error al eliminar la postulación');
      } else {
        console.error('[ApplicationCard] ❌ Error inesperado:', error);
        toast.error('Error al eliminar la postulación');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <ApplicationCardGlass
          application={application}
          onViewDetail={openDetailModal}
          onEdit={openEditModal}
        />
      </motion.div>
      <ApplicationDetailModalUI
        application={application}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
      />
      <ApplicationEditModalUI
        application={application}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleSave}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
};

export default ApplicationCardContainer;
