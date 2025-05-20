import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostulationsStore, useLanguageStore } from "../../../store";
import { PostulationStatus } from "../../../types/index";
import { ValidationHelpers, DateHelpers } from "../../../lib/helpers";
import { ApplicationFormFields, ApplicationFormHeader, DuplicateModal } from ".";
import { motion } from "framer-motion";

const ApplicationForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPostulation, updatePostulation, getPostulation, checkDuplicate } = usePostulationsStore();
  const { t } = useLanguageStore();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "applied" as PostulationStatus,
    date: "",
    url: "",
    notes: "",
    recruiterContact: "",
    sendCv: true,
    sendEmail: true
  });

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldStatus, setFieldStatus] = useState<Record<string, { isValid: boolean; message?: string }>>({});
  const [isBlurred, setIsBlurred] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!formData.date) {
      setFormData(prev => ({ ...prev, date: DateHelpers.getCurrentDateISO() }));
    }
  }, [formData.date]);

  useEffect(() => {
    if (id) {
      const postulation = getPostulation(id);
      if (postulation) {
        setFormData({
          company: postulation.company,
          position: postulation.position,
          status: postulation.status,
          date: postulation.date.split("T")[0],
          url: postulation.url || "",
          notes: postulation.notes || "",
          recruiterContact: "",
          sendCv: true,
          sendEmail: true
        });
      } else {
        navigate("/");
      }
    }
  }, [id, getPostulation, navigate]);

  const handleFieldChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFieldBlur = (name: string, value: string) => {
    setIsBlurred(prev => ({ ...prev, [name]: true }));
    setFieldStatus(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'company':
        return {
          isValid: ValidationHelpers.hasContent(value),
          message: !ValidationHelpers.hasContent(value) ? 'La empresa es requerida' : undefined
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
      default:
        return { isValid: true };
    }
  };

  const validateForm = () => {
    const newFieldStatus: Record<string, { isValid: boolean; message?: string }> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const validation = validateField(key, value);
        newFieldStatus[key] = validation;
        if (!validation.isValid) isValid = false;
      }
    });

    setFieldStatus(newFieldStatus);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (!id && checkDuplicate(formData.company, formData.position)) {
        setShowDuplicateModal(true);
        return;
      }

      if (id) {
        await updatePostulation(id, {
          company: formData.company,
          position: formData.position,
          status: formData.status,
          date: formData.date,
          url: formData.url,
          notes: formData.notes,
        });
      } else {
        await addPostulation({
          company: formData.company,
          position: formData.position,
          status: formData.status,
          date: formData.date,
          url: formData.url,
          notes: formData.notes,
        });
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueAnyway = () => {
    setShowDuplicateModal(false);
    addPostulation({
      company: formData.company,
      position: formData.position,
      status: formData.status,
      date: formData.date,
      url: formData.url,
      notes: formData.notes,
    });
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-[calc(100vh-200px)] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        <ApplicationFormHeader id={id} t={t as (key: string) => string} />

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700/50"
        >
          <ApplicationFormFields
            formData={formData}
            fieldStatus={fieldStatus}
            isBlurred={isBlurred}
            onFieldChange={handleFieldChange}
            onFieldBlur={handleFieldBlur}
            t={t as (key: string) => string}
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end mt-8"
          >
            <button
              type="submit"
              disabled={isSubmitting || Object.values(fieldStatus).some(f => !f.isValid)}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-xl shadow-xl text-white font-semibold text-base border-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : (id ? t('dashboard.editApplication') : t('hero.cta.button'))}
            </button>
          </motion.div>
        </motion.form>
      </div>

      <DuplicateModal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        onContinue={handleContinueAnyway}
        company={formData.company}
        position={formData.position}
      />
    </motion.div>
  );
};

export default ApplicationForm;
