import React, { useState } from 'react';
import NewPostulationFormContainer from '../../features/postulation/components/NewPostulationForm.container';
import { postulationsApi } from '../../api/postulations';
import { usePostulationsStore, useLanguageStore } from '../../store';
import { NewPostulationFormValues } from '../../types';
import { PostulationStatus, PostulationState } from '../../types/interface/postulations/postulation';
import { ApplicationStatus } from '../../interfaces/postulations/application-status';



// Mapeo entre ApplicationStatus y PostulationStatus
const mapApplicationToPostulationStatus = (status: ApplicationStatus): PostulationStatus => {
  switch (status) {
    case ApplicationStatus.PENDING:
      return 'applied';
    case ApplicationStatus.REVIEWING:
      return 'interview';
    case ApplicationStatus.APPROVED:
      return 'accepted';
    case ApplicationStatus.REJECTED:
      return 'rejected';
    default:
      return 'applied';
  }
};

const NuevaPostulacionPage: React.FC = () => {
  const { translate } = useLanguageStore();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);
  const addPostulation = usePostulationsStore((state: PostulationState) => state.addPostulation);

  const handleSubmit = async (values: NewPostulationFormValues) => {
    setLoading(true);
    setFormError(undefined);
    setSuccess(false);
    try {
      // Llamada a la API para crear la postulación
      const { company, position, status, date, referenceUrl, notes, recruiterContact, sentCV, sentEmail } = values;
      await postulationsApi.create({
        company,
        position,
        status: mapApplicationToPostulationStatus(status as ApplicationStatus),
        date,
        url: referenceUrl,
        notes,
        sentCV,
        sentEmail,
      });
      // Actualizar Zustand store local
      addPostulation({
        company,
        position,
        status: mapApplicationToPostulationStatus(status as ApplicationStatus),
        date,
        url: referenceUrl,
        notes,
        recruiterContact,
        sentCV,
        sentEmail,
      });
      setSuccess(true);
    } catch {
      setFormError(translate('errorMessage') || 'An error occurred while saving the application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl">
        <NewPostulationFormContainer
          onSubmit={handleSubmit}
          loading={loading}
          error={formError}
        />
        {success && (
          <div className="mt-4 text-green-600 text-center font-semibold">
            {translate('successMessage') || 'Application created successfully!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default NuevaPostulacionPage;
