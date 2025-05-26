import React, { useState, useEffect } from 'react';
import NewPostulationFormContainer from '../../features/postulation/components/NewPostulationForm.container';
import { postulationsApi } from '../../api/postulations';
import { usePostulationsStore, useLanguageStore, useAuthStore } from '../../store';
import { NewPostulationFormValues } from '../../types';
import {
  PostulationStatus,
  PostulationState,
} from '../../types/interface/postulations/postulation';
import { ApplicationStatus } from '../../interfaces/postulations/application-status';

console.log('[NuevaPostulacionPage] Componente cargado');

// Mapeo entre ApplicationStatus y PostulationStatus
const mapApplicationToPostulationStatus = (status: ApplicationStatus): PostulationStatus => {
  console.log('[mapApplicationToPostulationStatus] Estado recibido:', status);
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
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);
  const addPostulation = usePostulationsStore((state: PostulationState) => state.addPostulation);

  useEffect(() => {
    console.log('[NuevaPostulacionPage] Componente montado');
    return () => {
      console.log('[NuevaPostulacionPage] Componente desmontado');
    };
  }, []);

  const handleSubmit = async (values: NewPostulationFormValues) => {
    console.log('[handleSubmit] Valores del formulario recibidos:', values);

    if (!user?.id) {
      setFormError(translate('errorMessage') || 'No se encontró el ID del usuario.');
      return;
    }

    setLoading(true);
    setFormError(undefined);
    setSuccess(false);

    try {
      const {
        company,
        position,
        status,
        applicationDate,
        link,
        description,
        recruiterContact,
        sendCv,
        sendEmail,
      } = values;

      const mappedStatus = mapApplicationToPostulationStatus(status as ApplicationStatus);

      await postulationsApi.create({
        company,
        position,
        status: mappedStatus,
        applicationDate,
        link,
        description,
        sendCv,
        sendEmail,
        userId: user.id,
      });

      console.log('[handleSubmit] Postulación enviada exitosamente a la API');

      const newPostulation = {
        company,
        position,
        status: mappedStatus,
        applicationDate,
        link,
        description,
        recruiterContact,
        sendCv,
        sendEmail,
        userId: user.id,
      };

      console.log('[handleSubmit] Agregando postulación al store:', newPostulation);
      addPostulation(newPostulation);

      setSuccess(true);
      console.log('[handleSubmit] Postulación procesada con éxito');
    } catch (error) {
      console.error('[handleSubmit] Error al guardar la postulación:', error);
      setFormError(translate('errorMessage') || 'An error occurred while saving the application.');
    } finally {
      setLoading(false);
      console.log('[handleSubmit] Finaliza manejo del formulario');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl">
        <NewPostulationFormContainer onSubmit={handleSubmit} loading={loading} error={formError} />
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
