import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostulationsStore } from '../store';
import { Postulation, PostulationStatus } from '../types/interface/postulations/postulation';
import { ApplicationCardUI } from './organisms/ApplicationCard/ApplicationCard.ui';
import { useLanguageStore } from '../store/language/languageStore';
import { toast } from 'react-hot-toast';
import { postulationsApi } from '../api/postulations';

interface ApplicationCardProps {
  application: Postulation;
}

const ApplicationCardContainer: React.FC<ApplicationCardProps> = ({ application }) => {
  const navigate = useNavigate();
  const { deletePostulation } = usePostulationsStore();
  const { language, t } = useLanguageStore();
  const { id, date } = application;
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const locale = language === 'es' ? 'es-ES' : 'en-US';
  const formattedDate = new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await postulationsApi.delete(id);
      deletePostulation(id);
      toast.success(t('dashboard.actions.deleteSuccess'));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting postulation:', error);
      toast.error(t('dashboard.actions.deleteError'));
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (companyName: string) => {
    return companyName.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  };

  const getStatusLabel = (status: PostulationStatus) => {
    return t(`dashboard.stats.status.${status}`);
  };

  return (
    <ApplicationCardUI
      application={application}
      formattedDate={formattedDate}
      getInitials={getInitials}
      getStatusLabel={getStatusLabel}
      handleEdit={handleEdit}
      openDeleteModal={openDeleteModal}
      closeDeleteModal={closeDeleteModal}
      confirmDelete={confirmDelete}
      isDeleteModalOpen={isDeleteModalOpen}
      isLoading={isLoading}
    />
  );
};

export default ApplicationCardContainer;
