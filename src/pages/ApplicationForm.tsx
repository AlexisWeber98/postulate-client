import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { usePostulationsStore, useLanguageStore } from "../store";
import { PostulationStatus, STATUS_LABELS } from "../types/index";
import Modal from "../components/molecules/Modal";
import { Save, AlertCircle, ArrowLeft, Info, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { ValidationHelpers, DateHelpers } from "../lib/helpers";
import Button from '../components/atoms/Button/Button.ui';
import { motion, AnimatePresence } from "framer-motion";

const ApplicationForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPostulation, updatePostulation, getPostulation, checkDuplicate } =
    usePostulationsStore();
  const { t } = useLanguageStore();

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

  useEffect(() => {
    if (!date) {
      setDate(DateHelpers.getCurrentDateISO());
    }
  }, [date]);

  // Load existing application if editing
  useEffect(() => {
    if (id) {
      const postulation = getPostulation(id);
      if (postulation) {
        setCompany(postulation.company);
        setPosition(postulation.position);
        setStatus(postulation.status);
        setDate(postulation.date.split("T")[0]);
        setUrl(postulation.url || "");
        setNotes(postulation.notes || "");
      } else {
        navigate("/");
      }
    }
  }, [id, getPostulation, navigate]);

  const validateField = useCallback((name: string, value: string) => {
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
      // ... otros casos
    }
  }, []);

  const handleFieldBlur = useCallback((name: string, value: string) => {
    setIsBlurred(prev => ({ ...prev, [name]: true }));
    setFieldStatus(prev => ({ ...prev, [name]: validateField(name, value) }));
  }, [validateField]);

  const FieldWrapper: React.FC<{
    name: string;
    label: string;
    required?: boolean;
    children: React.ReactNode;
    tooltip?: string;
  }> = useCallback(({ name, label, required, children, tooltip }) => (
    <div className="relative">
      <label htmlFor={name} className=" text-base font-semibold text-gray-700 dark:text-white mb-2 drop-shadow flex items-center gap-2">
        {label} {required && <span className="text-red-500">*</span>}
        {tooltip && (
          <div className="group relative">
            <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-48 shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              {tooltip}
            </div>
          </div>
        )}
      </label>
      <div className="relative">
        {children}
        <AnimatePresence mode="wait">
          {isBlurred[name] && fieldStatus[name] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              {fieldStatus[name].isValid ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        {isBlurred[name] && fieldStatus[name]?.message && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-sm text-red-500 dark:text-red-400 overflow-hidden"
          >
            {fieldStatus[name].message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  ), [isBlurred, fieldStatus]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!ValidationHelpers.hasContent(company)) {
      newErrors.company = "La empresa es requerida";
    }

    if (!ValidationHelpers.hasContent(position)) {
      newErrors.position = "El puesto es requerido";
    }

    if (!date) {
      newErrors.date = "La fecha es requerida";
    }

    if (url && !ValidationHelpers.isValidUrl(url)) {
      newErrors.url = "La URL debe ser válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleContinueAnyway = () => {
    setShowDuplicateModal(false);

    addPostulation({
      company,
      position,
      status,
      date,
      url,
      notes,
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
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 font-medium transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('dashboard.backToDashboard')}
          </Link>
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-12 drop-shadow-lg"
        >
          {id ? t('dashboard.editApplication') : t('dashboard.newApplication')}
        </motion.h1>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700/50"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FieldWrapper
              name="company"
              label={t('dashboard.company')}
              required
              tooltip="Ingresa el nombre de la empresa donde te postulaste"
            >
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => handleFieldChange('company', e.target.value)}
                onBlur={(e) => handleFieldBlur('company', e.target.value)}
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.company?.isValid && isBlurred.company ? 'ring-2 ring-red-400' : ''}`}
                placeholder={t('dashboard.companyPlaceholder')}
                required
                aria-invalid={!fieldStatus.company?.isValid}
                aria-describedby={!fieldStatus.company?.isValid ? 'company-error' : undefined}
              />
            </FieldWrapper>

            <FieldWrapper
              name="position"
              label={t('dashboard.position')}
              required
              tooltip="Ingresa el título del puesto al que te postulaste"
            >
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => handleFieldChange('position', e.target.value)}
                onBlur={(e) => handleFieldBlur('position', e.target.value)}
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.position?.isValid && isBlurred.position ? 'ring-2 ring-red-400' : ''}`}
                placeholder={t('dashboard.positionPlaceholder')}
                required
                aria-invalid={!fieldStatus.position?.isValid}
                aria-describedby={!fieldStatus.position?.isValid ? 'position-error' : undefined}
              />
            </FieldWrapper>

            <div>
              <label htmlFor="status" className="block text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
                {t('status')} *
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as PostulationStatus)}
                className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none"
                required
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value} className="text-black bg-white">
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
                {t('dashboard.date')} *
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none ${errors.date ? 'ring-2 ring-red-400' : ''}`}
                required
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.date}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <FieldWrapper
                name="url"
                label={t('referenceUrl')}
                tooltip="Ingresa la URL de la publicación o la página de la empresa"
              >
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => handleFieldChange('url', e.target.value)}
                  onBlur={(e) => handleFieldBlur('url', e.target.value)}
                  className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.url?.isValid && isBlurred.url ? 'ring-2 ring-red-400' : ''}`}
                  placeholder={t('dashboard.referenceUrlPlaceholder')}
                />
              </FieldWrapper>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
                {t('notes')}
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 dark:placeholder:text-blue-100/60 shadow-inner appearance-none"
                placeholder={t('dashboard.notesPlaceholder')}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="recruiterContact" className="block text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
                {t('recruiterContact')}
              </label>
              <input
                type="text"
                id="recruiterContact"
                value={recruiterContact}
                onChange={(e) => setRecruiterContact(e.target.value)}
                placeholder={t('dashboard.recruiterContactPlaceholder')}
                className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 dark:placeholder:text-blue-100/60 shadow-inner appearance-none"
              />
              <p className="mt-1 text-xs text-blue-200 p-2">
                * {t('dashboard.recruiterContactHelper')}
              </p>
            </div>
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Estado de la Postulación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
                    <input
                      type="checkbox"
                      id="sendCv"
                      checked={sendCv}
                      onChange={(e) => setSendCv(e.target.checked)}
                      className="accent-blue-500 w-5 h-5 rounded"
                    />
                    <label htmlFor="sendCv" className="text-gray-700 dark:text-white/90 text-base cursor-pointer">
                      {t('dashboard.sentCV')}
                    </label>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
                    <input
                      type="checkbox"
                      id="sendEmail"
                      checked={sendEmail}
                      onChange={(e) => setSendEmail(e.target.checked)}
                      className="accent-blue-500 w-5 h-5 rounded"
                    />
                    <label htmlFor="sendEmail" className="text-gray-700 dark:text-white/90 text-base cursor-pointer">
                      {t('dashboard.sentEmail')}
                    </label>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end mt-8"
          >
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting || Object.values(fieldStatus).some(f => !f.isValid)}
              className="w-full md:w-auto px-8 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-xl shadow-xl text-white font-semibold text-base border-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              icon={isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            >
              {isSubmitting ? 'Guardando...' : (id ? t('dashboard.editApplication') : t('hero.cta.button'))}
            </Button>
          </motion.div>
        </motion.form>
      </div>

      <Modal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        title="Postulación Duplicada"
      >
        <div className="flex items-start p-4">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Ya existe una postulación para <strong>{position}</strong> en{" "}
              <strong>{company}</strong>. ¿Deseas continuar de todos modos?
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowDuplicateModal(false)}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleContinueAnyway}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-lg shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
              >
                Continuar de todos modos
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default ApplicationForm;
