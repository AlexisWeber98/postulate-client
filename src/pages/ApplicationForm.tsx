import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguageStore } from "../store";
import { PostulationStatus, STATUS_LABELS } from "../types/index";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { DateHelpers } from "../lib/helpers";
import FieldWrapper from "../components/forms/FieldWrapper";
import PostulationStatusForm from "../components/forms/PostulationStatus";
import DuplicateModal from "../components/forms/DuplicateModal";
import { useApplicationForm } from "../hooks/useApplicationForm";

const ApplicationForm: React.FC = () => {
  const { t } = useLanguageStore();
  const {
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
    setStatus,
    setDate,
    setNotes,
    setRecruiterContact,
    setSendCv,
    setSendEmail,
    validateForm,
  } = useApplicationForm();

  useEffect(() => {
    if (!formData.date) {
      setDate(DateHelpers.getCurrentDateISO());
    }
  }, [formData.date, setDate]);

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
          {t('dashboard.newApplication')}
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
              isBlurred={isBlurred.company}
              fieldStatus={fieldStatus.company}
            >
              <input
                type="text"
                id="company"
                value={formData.company}
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
              isBlurred={isBlurred.position}
              fieldStatus={fieldStatus.position}
            >
              <input
                type="text"
                id="position"
                value={formData.position}
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
                value={formData.status}
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
                value={formData.date}
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
                isBlurred={isBlurred.url}
                fieldStatus={fieldStatus.url}
              >
                <input
                  type="url"
                  id="url"
                  value={formData.url}
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
                value={formData.notes}
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
                value={formData.recruiterContact}
                onChange={(e) => setRecruiterContact(e.target.value)}
                placeholder={t('dashboard.recruiterContactPlaceholder')}
                className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 dark:placeholder:text-blue-100/60 shadow-inner appearance-none"
              />
              <p className="mt-1 text-xs text-blue-200 p-2">
                * {t('dashboard.recruiterContactHelper')}
              </p>
            </div>

            <div className="md:col-span-2">
              <PostulationStatusForm
                sendCv={formData.sendCv}
                sendEmail={formData.sendEmail}
                onSendCvChange={setSendCv}
                onSendEmailChange={setSendEmail}
                t={t}
              />
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end gap-4 mt-8"
          >
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl text-gray-700 dark:text-gray-200 font-semibold text-base border-0 transition-all duration-200"
            >
              {t('common.reset')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !validateForm()}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-xl shadow-xl text-white font-semibold text-base border-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('dashboard.actions.save') : t('hero.cta.button')}
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
