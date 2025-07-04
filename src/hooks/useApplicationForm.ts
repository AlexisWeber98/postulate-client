import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostulationsStore } from '../store';
import { useAuthStore } from '../store/auth/authStore';
import { PostulationStatus } from '../types/index';
import { ValidationHelpers, DateHelpers } from '../lib/helpers';

interface UseApplicationFormReturn {
  formData: {
    company: string;
    position: string;
    status: PostulationStatus;
    date: string;
    url: string;
    notes: string;
    recruiterContact: string;
    sentCV: boolean;
    sentEmail: boolean;
  };
  fieldStatus: Record<string, { isValid: boolean; message?: string }>;
  isBlurred: Record<string, boolean>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  showDuplicateModal: boolean;
  handleFieldChange: (name: string, value: string) => void;
  handleFieldBlur: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setShowDuplicateModal: (show: boolean) => void;
  handleContinueAnyway: () => void;
  setStatus: (status: PostulationStatus) => void;
  setDate: (date: string) => void;
  setNotes: (notes: string) => void;
  setRecruiterContact: (contact: string) => void;
  setSentCV: (send: boolean) => void;
  setSentEmail: (send: boolean) => void;
  validateForm: () => boolean;
}

export const useApplicationForm = (): UseApplicationFormReturn => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPostulation, updatePostulation, checkDuplicate } = usePostulationsStore();
  const { user } = useAuthStore();

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState<PostulationStatus>('applied');
  const [date, setDate] = useState('');
  const [url, setUrl] = useState('');
  const [sentCV, setSentCV] = useState(true);
  const [sentEmail, setSentEmail] = useState(true);
  const [notes, setNotes] = useState('');
  const [recruiterContact, setRecruiterContact] = useState('');

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fieldStatus, setFieldStatus] = useState<
    Record<string, { isValid: boolean; message?: string }>
  >({});
  const [isBlurred, setIsBlurred] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: string, value: string) => {
    switch (name) {
      case 'company':
        return {
          isValid: ValidationHelpers.hasContent(value),
          message: !ValidationHelpers.hasContent(value)
            ? 'dashboard.validation.companyRequired'
            : undefined,
        };
      case 'position':
        return {
          isValid: ValidationHelpers.hasContent(value),
          message: !ValidationHelpers.hasContent(value)
            ? 'dashboard.validation.positionRequired'
            : undefined,
        };
      case 'url':
        return {
          isValid: !value || ValidationHelpers.isValidUrl(value),
          message:
            value && !ValidationHelpers.isValidUrl(value)
              ? 'dashboard.validation.urlInvalid'
              : undefined,
        };
      case 'date':
        return {
          isValid: ValidationHelpers.hasContent(value),
          message: !ValidationHelpers.hasContent(value)
            ? 'dashboard.validation.dateRequired'
            : undefined,
        };
      default:
        return { isValid: true };
    }
  }, []);

  const handleFieldChange = useCallback(
    (name: string, value: string) => {
      switch (name) {
        case 'company':
          setCompany(value);
          break;
        case 'position':
          setPosition(value);
          break;
        case 'url':
          setUrl(value);
          break;
      }
      setFieldStatus(prev => ({ ...prev, [name]: validateField(name, value) }));
    },
    [validateField]
  );

  const handleFieldBlur = useCallback(
    (name: string, value: string) => {
      setIsBlurred(prev => ({ ...prev, [name]: true }));
      setFieldStatus(prev => ({ ...prev, [name]: validateField(name, value) }));
    },
    [validateField]
  );

  useEffect(() => {
    const initialValidation = {
      company: validateField('company', company),
      position: validateField('position', position),
      date: validateField('date', date),
      url: validateField('url', url),
    };

    const hasChanges = Object.keys(initialValidation).some(key => {
      const typedKey = key as keyof typeof initialValidation;
      return JSON.stringify(initialValidation[typedKey]) !== JSON.stringify(fieldStatus[typedKey]);
    });

    if (hasChanges) {
      setFieldStatus(initialValidation);
    }
  }, [company, position, date, url, validateField, fieldStatus]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    const newFieldStatus: Record<string, { isValid: boolean; message?: string }> = {};

    newFieldStatus.company = validateField('company', company);
    newFieldStatus.position = validateField('position', position);
    newFieldStatus.date = validateField('date', date);
    newFieldStatus.url = validateField('url', url);

    if (!newFieldStatus.company.isValid) {
      newErrors.company = newFieldStatus.company.message || 'La empresa es requerida';
    }
    if (!newFieldStatus.position.isValid) {
      newErrors.position = newFieldStatus.position.message || 'El puesto es requerido';
    }
    if (!newFieldStatus.date.isValid) {
      newErrors.date = newFieldStatus.date.message || 'La fecha es requerida';
    }
    if (!newFieldStatus.url.isValid) {
      newErrors.url = newFieldStatus.url.message || 'La URL debe ser válida';
    }

    const hasErrors = Object.keys(newErrors).length > 0;
    const hasStatusChanges = Object.keys(newFieldStatus).some(
      key => JSON.stringify(newFieldStatus[key]) !== JSON.stringify(fieldStatus[key])
    );

    if (hasErrors || hasStatusChanges) {
      setErrors(newErrors);
      setFieldStatus(newFieldStatus);
    }

    return !hasErrors;
  }, [company, position, date, url, validateField, fieldStatus]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);


    if (!validateForm()) {

      setIsSubmitting(false);
      return;
    }

    try {
      if (!user || !user.id) {
        throw new Error('Usuario no autenticado');
      }

      if (!id && checkDuplicate(company, position)) {

        setShowDuplicateModal(true);
        setIsSubmitting(false);
        return;
      }

      const formattedDate = date ? date : DateHelpers.getCurrentDateISO();

      const payload = {
        company,
        position,
        status,
        applicationDate: formattedDate,
        link: url || '',
        description: notes || '',
        recruiterContact: recruiterContact || '',
        sendCv: sentCV,
        sendEmail: sentEmail,
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
  }, [addPostulation, checkDuplicate, company, date, id, navigate, notes, position, recruiterContact, sentCV, sentEmail, setErrors, setShowDuplicateModal, setIsSubmitting, status, updatePostulation, url, user, validateForm]);

  const resetForm = useCallback(() => {
    setCompany('');
    setPosition('');
    setStatus('applied');
    setDate(DateHelpers.getCurrentDateISO());
    setUrl('');
    setNotes('');
    setRecruiterContact('');
    setSentCV(true);
    setSentEmail(true);
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
      company,
      position,
      status,
      applicationDate: date,
      link: url,
      description: notes,
      recruiterContact,
      sendCv: sentCV,
      sendEmail: sentEmail,
      userId: user.id,
    });
    setIsSubmitting(false);
    navigate('/');
  }, [
    company,
    position,
    status,
    date,
    url,
    notes,
    recruiterContact,
    sentCV,
    sentEmail,
    addPostulation,
    navigate,
    user,
  ]);

  return {
    formData: {
      company,
      position,
      status,
      date,
      url,
      notes,
      recruiterContact,
      sentCV,
      sentEmail,
    },
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
    setStatus,
    setDate,
    setNotes,
    setRecruiterContact,
    setSentCV,
    setSentEmail,
    validateForm,
  };
};
