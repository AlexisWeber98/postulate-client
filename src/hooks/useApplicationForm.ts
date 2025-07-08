import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostulationsStore } from '../store';
import { useAuthStore } from '../store/auth/authStore';
import { DateHelpers } from '../lib/helpers';
import { z } from 'zod';
import { newPostulationSchema } from '../features/postulation/domain/validation';


type FormData = z.infer<typeof newPostulationSchema>;

interface UseApplicationFormReturn {
  formData: FormData;
  fieldStatus: Record<string, { isValid: boolean; message?: string }>;
  isBlurred: Record<string, boolean>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  showDuplicateModal: boolean;
  handleFieldChange: (name: keyof FormData, value: string | boolean) => void;
  handleFieldBlur: (name: keyof FormData) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setShowDuplicateModal: (show: boolean) => void;
  handleContinueAnyway: () => void;
  validateForm: () => boolean;
}

export const useApplicationForm = (): UseApplicationFormReturn => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPostulation, updatePostulation, checkDuplicate } = usePostulationsStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    company: '',
    position: '',
    status: 'applied',
    date: DateHelpers.getCurrentDateISO(),
    url: '',
    notes: '',
    recruiterContact: '',
    sentCV: true,
    sentEmail: true,
  });

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fieldStatus, setFieldStatus] = useState<
    Record<string, { isValid: boolean; message?: string }>
  >({});
  const [isBlurred, setIsBlurred] = useState<Record<string, boolean>>({});

  const validateForm = useCallback(() => {
    const result = newPostulationSchema.safeParse(formData);
    const newErrors: Record<string, string> = {};
    const newFieldStatus: Record<string, { isValid: boolean; message?: string }> = {};

    if (!result.success) {
      result.error.errors.forEach((err) => {
        const fieldName = err.path[0] as keyof FormData;
        newErrors[fieldName] = err.message;
        newFieldStatus[fieldName] = { isValid: false, message: err.message };
      });
    }

    // Set valid status for fields that are not in newErrors
    Object.keys(formData).forEach((key) => {
      if (!newErrors[key]) {
        newFieldStatus[key] = { isValid: true };
      }
    });

    setErrors(newErrors);
    setFieldStatus(newFieldStatus);

    return result.success;
  }, [formData]);

  const handleFieldChange = useCallback(
    (name: keyof FormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Re-validate the specific field immediately
      const fieldValidation = newPostulationSchema.safeParse({ ...formData, [name]: value });
      if (fieldValidation.success) {
        setFieldStatus((prev) => ({ ...prev, [name]: { isValid: true } }));
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      } else {
        const errorForField = fieldValidation.error.errors.find((err) => err.path[0] === name);
        if (errorForField) {
          setFieldStatus((prev) => ({
            ...prev,
            [name]: { isValid: false, message: errorForField.message },
          }));
          setErrors((prev) => ({ ...prev, [name]: errorForField.message }));
        }
      }
    },
    [formData]
  );

  const handleFieldBlur = useCallback((name: keyof FormData) => {
    setIsBlurred((prev) => ({ ...prev, [name]: true }));
    // Trigger full form validation on blur to update all field statuses
    validateForm();
  }, [validateForm]);

  useEffect(() => {
    // Initial validation when component mounts or formData changes (e.g., on edit load)
    validateForm();
  }, [formData.company, formData.position, formData.date, formData.url, validateForm]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Forzar que todos los campos se marquen como "blurred" para mostrar errores
    const allFields = ['company', 'position', 'status', 'date', 'url', 'notes', 'recruiterContact', 'sentCV', 'sentEmail'] as const;
    setIsBlurred(prev => {
      const newBlurred = { ...prev };
      allFields.forEach(field => {
        newBlurred[field] = true;
      });
      return newBlurred;
    });

    if (!validateForm()) {
      setIsSubmitting(false);
      // Agregar un error general para que el usuario sepa que hay problemas
      setErrors(prev => ({
        ...prev,
        general: 'Por favor, completa todos los campos obligatorios marcados con *'
      }));
      return;
    }

    // Limpiar error general si la validación pasa
    setErrors(prev => {
      const { general, ...rest } = prev;
      return rest;
    });

    try {
      if (!user || !user.id) {
        throw new Error('Usuario no autenticado');
      }

      if (!id && checkDuplicate(formData.company, formData.position)) {
        setShowDuplicateModal(true);
        setIsSubmitting(false);
        return;
      }

      const payload = {
        company: formData.company,
        position: formData.position,
        status: formData.status,
        applicationDate: formData.date,
        link: formData.url || '',
        description: formData.notes || '',
        recruiterContact: formData.recruiterContact || '',
        sendCv: formData.sentCV,
        sendEmail: formData.sentEmail,
        userId: user.id,
      };

      if (id) {
        await updatePostulation(id, payload);
      } else {
        await addPostulation(payload);
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setErrors({ submit: 'Error al enviar el formulario' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData({
      company: '',
      position: '',
      status: 'applied',
      date: DateHelpers.getCurrentDateISO(),
      url: '',
      notes: '',
      recruiterContact: '',
      sentCV: true,
      sentEmail: true,
    });
    setErrors({});
    setFieldStatus({});
    setIsBlurred({});
  }, []);

  const handleContinueAnyway = useCallback(() => {
    if (!user || !user.id) {
      throw new Error('Usuario no autenticado');
    }
    setShowDuplicateModal(false);
    addPostulation({
      company: formData.company,
      position: formData.position,
      status: formData.status,
      applicationDate: formData.date,
      link: formData.url,
      description: formData.notes,
      recruiterContact: formData.recruiterContact,
      sendCv: formData.sentCV,
      sendEmail: formData.sentEmail,
      userId: user.id,
    });
    setIsSubmitting(false);
    navigate('/');
  }, [
    formData,
    addPostulation,
    navigate,
    user,
  ]);

  return {
    formData,
    fieldStatus,
    isBlurred,
    errors,
    isSubmitting,
    showDuplicateModal,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
    resetForm,
    setShowDuplicateModal,
    handleContinueAnyway,
    validateForm,
  };
};