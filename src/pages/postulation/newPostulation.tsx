import React, { useState } from 'react';
import NewPostulationFormContainer from '../../features/postulation/components/NewPostulationForm.container';
import { postulationsApi } from '../../api/postulations';
import { usePostulationsStore, useLanguageStore, useAuthStore } from '../../store';
import { NewPostulationFormValues } from '../../types';
import {
  PostulationState,
} from '../../types/interface/postulations/postulation';

const NuevaPostulacionPage: React.FC = () => {
  const { translate } = useLanguageStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);
  const addPostulation = usePostulationsStore((state: PostulationState) => state.addPostulation);

  const handleSubmit = async (values: NewPostulationFormValues) => {
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
        sentCV,
        sentEmail,
      } = values;

      await postulationsApi.create({
        company,
        position,
        status,
        applicationDate,
        link,
        description,
        sendCv: sentCV,
        sendEmail: sentEmail,
        userId: user.id,
      });

      const newPostulation = {
        company,
        position,
        status,
        applicationDate,
        link,
        description,
        recruiterContact,
        sentCV,
        sentEmail,
        userId: user.id,
      };

      addPostulation(newPostulation);

      setSuccess(true);

    } catch (_error) {
      console.error(_error);
      setFormError(translate('errorMessage') || 'An error occurred while saving the application.');
    } finally {
      setLoading(false);
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
