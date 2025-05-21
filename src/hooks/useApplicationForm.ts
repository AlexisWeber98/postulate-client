import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostulationsStore } from "../store";
import { PostulationStatus } from "../types/index";
import { ValidationHelpers, DateHelpers } from "../lib/helpers";

interface UseApplicationFormReturn {
  formData: {
    company: string;
    position: string;
    status: PostulationStatus;
    date: string;
    url: string;
    notes: string;
    recruiterContact: string;
    sendCv: boolean;
    sendEmail: boolean;
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
  setSendCv: (send: boolean) => void;
  setSendEmail: (send: boolean) => void;
  validateForm: () => boolean;
}

export const useApplicationForm = (): UseApplicationFormReturn => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPostulation, updatePostulation, checkDuplicate } = usePostulationsStore();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<PostulationStatus>("applied");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [sendCv, setSendCv] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [notes, setNotes] = useState("");
  const [recruiterContact, setRecruiterContact] = useState("");

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fieldStatus, setFieldStatus] = useState<Record<string, { isValid: boolean; message?: string }>>({});
  const [isBlurred, setIsBlurred] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: string, value: string) => {
    switch (name) {
      case 'company':
        return {
          isValid: ValidationHelpers.hasContent(value),
          message: !ValidationHelpers.hasContent(value) ? 'dashboard.validation.companyRequired' : undefined
        };
      case 'position':
        return {
          isValid: ValidationHelpers.hasContent(value),
          message: !ValidationHelpers.hasContent(value) ? 'El puesto es requerido' : undefined
        };
      case 'url':
        return {
          isValid: !value || ValidationHelpers.isValidUrl(value),
          message: value && !ValidationHelpers.isValidUrl(value) ? 'La URL debe ser válida' : undefined
        };
      case 'date':
        return {
          isValid: ValidationHelpers.hasContent(value),
          message: !ValidationHelpers.hasContent(value) ? 'La fecha es requerida' : undefined
        };
      default:
        return { isValid: true };
    }
  }, []);

  const handleFieldChange = useCallback((name: string, value: string) => {
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
  }, [validateField]);

  const handleFieldBlur = useCallback((name: string, value: string) => {
    setIsBlurred(prev => ({ ...prev, [name]: true }));
    setFieldStatus(prev => ({ ...prev, [name]: validateField(name, value) }));
  }, [validateField]);

  useEffect(() => {
    const initialValidation = {
      company: validateField('company', company),
      position: validateField('position', position),
      date: validateField('date', date),
      url: validateField('url', url)
    };
    setFieldStatus(initialValidation);
  }, [company, position, date, url, validateField]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    const newFieldStatus: Record<string, { isValid: boolean; message?: string }> = {};

    newFieldStatus.company = validateField('company', company);
    newFieldStatus.position = validateField('position', position);
    newFieldStatus.date = validateField('date', date);
    newFieldStatus.url = validateField('url', url);

    setFieldStatus(newFieldStatus);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [company, position, date, url, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (!id && checkDuplicate(company, position)) {
        setShowDuplicateModal(true);
        setIsSubmitting(false);
        return;
      }

      if (id) {
        await updatePostulation(id, {
          company,
          position,
          status,
          date,
          url,
          notes,
        });
      } else {
        await addPostulation({
          company,
          position,
          status,
          date,
          url,
          notes,
        });
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = useCallback(() => {
    setCompany("");
    setPosition("");
    setStatus("applied");
    setDate(DateHelpers.getCurrentDateISO());
    setUrl("");
    setNotes("");
    setRecruiterContact("");
    setSendCv(true);
    setSendEmail(true);
    setErrors({});
    setFieldStatus({});
    setIsBlurred({});
  }, []);

  const handleContinueAnyway = useCallback(() => {
    setShowDuplicateModal(false);
    addPostulation({
      company,
      position,
      status,
      date,
      url,
      notes,
    });
    setIsSubmitting(false);
    navigate("/");
  }, [company, position, status, date, url, notes, addPostulation, navigate]);

  return {
    formData: {
      company,
      position,
      status,
      date,
      url,
      notes,
      recruiterContact,
      sendCv,
      sendEmail,
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
    setSendCv,
    setSendEmail,
    validateForm,
  };
};
