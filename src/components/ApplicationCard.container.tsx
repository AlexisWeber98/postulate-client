import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostulationsStore } from '../store';
import { Postulation } from '../types/interface/postulations/postulation';
import { ApplicationCardUI } from './organisms/ApplicationCard/ApplicationCard.ui';

interface ApplicationCardProps {
  application: Postulation;
}

const ApplicationCardContainer: React.FC<ApplicationCardProps> = ({ application }) => {
  const navigate = useNavigate();
  const { deletePostulation } = usePostulationsStore();
  const { id, date } = application;
  const formattedDate = new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    deletePostulation(id);
    closeDeleteModal();
  };

  const getInitials = (companyName: string) => {
    return companyName.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  };

  // Traducir estado a español para mostrar
  const getStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      applied: 'Aplicado',
      interview: 'Entrevista',
      technical: 'Prueba Técnica',
      offer: 'Oferta',
      rejected: 'Rechazado',
      accepted: 'Aceptado'
    };
    return statusLabels[status] || status.charAt(0).toUpperCase() + status.slice(1);
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
    />
  );
};

export default ApplicationCardContainer;
