import React, { useState } from 'react';
import ApplicationCardGlass from './components/ApplicationCardGlass.ui';
import ApplicationDetailModalUI from './components/ApplicationDetailModal.ui';
import ApplicationEditModalUI from './components/ApplicationEditModal.ui';
import { Postulation } from '../../../types/interface/postulations/postulation';
import { motion } from 'framer-motion';

interface ApplicationCardProps {
  application: Postulation;
}

const ApplicationCardContainer: React.FC<ApplicationCardProps> = ({ application }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const openDetailModal = () => setIsDetailModalOpen(true);
  const closeDetailModal = () => setIsDetailModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleSave = (updatedApplication: Postulation) => {
    // Aquí deberías implementar la lógica para guardar los cambios
    console.log('Guardando cambios:', updatedApplication);
    closeEditModal();
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
      />
    </>
  );
};

export default ApplicationCardContainer;
