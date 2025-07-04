import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguageStore } from "../store";
import { PostulationStatus, STATUS_LABELS } from "../types/index";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { DateHelpers } from "../lib/helpers";
import FieldWrapper from "../components/molecules/FieldWrapper/FieldWrapper"; // Importación añadida

import PostulationStatusForm from "../components/forms/PostulationStatus";
import DuplicateModal from "../components/forms/DuplicateModal";
import { useApplicationForm } from "../hooks/useApplicationForm";

const ApplicationForm: React.FC = () => {
  const { translate } = useLanguageStore();
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
    setSentCV,
    setSentEmail,
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
      <div className="max-w-4xl mx-auto w-full px-4 py-4 sm:py-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4 sm:mb-6"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 font-medium transition-all duration-200 hover:scale-105 text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {translate('dashboard.backToDashboard')}
          </Link>
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500 text-center mb-6 sm:mb-12 drop-shadow-lg"
        >
          {translate('dashboard.newApplication')}
        </motion.h1>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 sm:p-8 shadow-xl border border-gray-200 dark:border-gray-700/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
            <FieldWrapper
              name="company"
              label={translate('dashboard.company')}
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
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 text-sm sm:text-base ${!fieldStatus.company?.isValid && isBlurred.company ? 'ring-2 ring-red-400' : ''}`}
                placeholder={translate('dashboard.companyPlaceholder')}
                required
                aria-invalid={!fieldStatus.company?.isValid}
                aria-describedby={!fieldStatus.company?.isValid ? 'company-error' : undefined}
              />
            </FieldWrapper>

            <FieldWrapper
              name="position"
              label={translate('dashboard.position')}
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
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 text-sm sm:text-base ${!fieldStatus.position?.isValid && isBlurred.position ? 'ring-2 ring-red-400' : ''}`}
                placeholder={translate('dashboard.positionPlaceholder')}
                required
                aria-invalid={!fieldStatus.position?.isValid}
                aria-describedby={!fieldStatus.position?.isValid ? 'position-error' : undefined}
              />
            </FieldWrapper>

            <div className="space-y-1">
              <label htmlFor="status" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
                {translate('status')} *
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setStatus(e.target.value as PostulationStatus)}
                className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none text-sm sm:text-base"
                required
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value} className="text-black bg-white">
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="date" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
                {translate('dashboard.date')} *
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none text-sm sm:text-base ${errors.date ? 'ring-2 ring-red-400' : ''}`}
                required
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.date}</p>
              )}
            </div>

            <div className="lg:col-span-2">
              <FieldWrapper
                name="url"
                label={translate('referenceUrl')}
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
                  className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 text-sm sm:text-base ${!fieldStatus.url?.isValid && isBlurred.url ? 'ring-2 ring-red-400' : ''}`}
                  placeholder={translate('dashboard.referenceUrlPlaceholder')}
                />
              </FieldWrapper>
            </div>

            <div className="lg:col-span-2 space-y-1">
              <label htmlFor="notes" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
                {translate('notes')}
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 dark:placeholder:text-blue-100/60 shadow-inner appearance-none text-sm sm:text-base"
                placeholder={translate('dashboard.notesPlaceholder')}
              />
            </div>

            <div className="col-span-1 lg:col-span-2 space-y-1">
              <label htmlFor="recruiterContact" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
                {translate('recruiterContact')}
              </label>
              <input
                type="text"
                id="recruiterContact"
                value={formData.recruiterContact}
                onChange={(e) => setRecruiterContact(e.target.value)}
                placeholder={translate('dashboard.recruiterContactPlaceholder')}
                className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 dark:placeholder:text-blue-100/60 shadow-inner appearance-none text-sm sm:text-base"
              />
              <p className="mt-1 text-xs text-blue-200 p-1 sm:p-2">
                * {translate('dashboard.recruiterContactHelper')}
              </p>
            </div>

            <div className="lg:col-span-2">
              <PostulationStatusForm
                sentCV={formData.sentCV}
                sentEmail={formData.sentEmail}
                onSendCvChange={setSentCV}
                onSendEmailChange={setSentEmail}
                translate={translate}
              />
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-8"
          >
            <button
              type="button"
              onClick={resetForm}
              className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl text-gray-700 dark:text-gray-200 font-semibold text-sm sm:text-base border-0 transition-all duration-200"
            >
              {translate('common.reset')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-xl shadow-xl text-white font-semibold text-sm sm:text-base border-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? translate('dashboard.actions.save') : translate('hero.cta.button')}
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
