import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { PostulationStatus, STATUS_LABELS } from "../../../types";

interface ApplicationFormFieldsProps {
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
  onFieldChange: (name: string, value: string | boolean) => void;
  onFieldBlur: (name: string, value: string) => void;
  t: (key: string) => string;
}

const FieldWrapper: React.FC<{
  name: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  tooltip?: string;
  isValid?: boolean;
  isBlurred?: boolean;
  errorMessage?: string;
}> = ({ name, label, required, children, tooltip, isValid, isBlurred, errorMessage }) => (
  <div className="relative">
    <label htmlFor={name} className="text-base font-semibold text-gray-700 dark:text-white mb-2 drop-shadow flex items-center gap-2">
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
        {isBlurred && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            {isValid ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <AnimatePresence mode="wait">
      {isBlurred && errorMessage && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-sm text-red-500 dark:text-red-400 overflow-hidden"
        >
          {errorMessage}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

export const ApplicationFormFields: React.FC<ApplicationFormFieldsProps> = ({
  formData,
  fieldStatus,
  isBlurred,
  onFieldChange,
  onFieldBlur,
  t
}) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <FieldWrapper
        name="company"
        label={t('dashboard.company')}
        required
        tooltip={t('tooltip.company')}
        isValid={fieldStatus.company?.isValid}
        isBlurred={isBlurred.company}
        errorMessage={fieldStatus.company?.message}
      >
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => onFieldChange('company', e.target.value)}
          onBlur={(e) => onFieldBlur('company', e.target.value)}
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
        isValid={fieldStatus.position?.isValid}
        isBlurred={isBlurred.position}
        errorMessage={fieldStatus.position?.message}
      >
        <input
          type="text"
          id="position"
          value={formData.position}
          onChange={(e) => onFieldChange('position', e.target.value)}
          onBlur={(e) => onFieldBlur('position', e.target.value)}
          className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.position?.isValid && isBlurred.position ? 'ring-2 ring-red-400' : ''}`}
          placeholder={t('dashboard.positionPlaceholder')}
          required
          aria-invalid={!fieldStatus.position?.isValid}
          aria-describedby={!fieldStatus.position?.isValid ? 'position-error' : undefined}
        />
      </FieldWrapper>

      <div>
        <label htmlFor="status" className="text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
          {t('status')} *
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => onFieldChange('status', e.target.value as PostulationStatus)}
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
        <label htmlFor="date" className="text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
          {t('dashboard.date')} *
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => onFieldChange('date', e.target.value)}
          className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none"
          required
        />
      </div>

      <div className="md:col-span-2">
        <FieldWrapper
          name="url"
          label={t('referenceUrl')}
          tooltip="Ingresa la URL de la publicación o la página de la empresa"
          isValid={fieldStatus.url?.isValid}
          isBlurred={isBlurred.url}
          errorMessage={fieldStatus.url?.message}
        >
          <input
            type="url"
            id="url"
            value={formData.url}
            onChange={(e) => onFieldChange('url', e.target.value)}
            onBlur={(e) => onFieldBlur('url', e.target.value)}
            className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.url?.isValid && isBlurred.url ? 'ring-2 ring-red-400' : ''}`}
            placeholder={t('dashboard.referenceUrlPlaceholder')}
          />
        </FieldWrapper>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="notes" className="text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
          {t('notes')}
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => onFieldChange('notes', e.target.value)}
          rows={5}
          className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 dark:placeholder:text-blue-100/60 shadow-inner appearance-none"
          placeholder={t('dashboard.notesPlaceholder')}
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="recruiterContact" className="text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow">
          {t('recruiterContact')}
        </label>
        <input
          type="text"
          id="recruiterContact"
          value={formData.recruiterContact}
          onChange={(e) => onFieldChange('recruiterContact', e.target.value)}
          placeholder={t('dashboard.recruiterContactPlaceholder')}
          className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 dark:placeholder:text-blue-100/60 shadow-inner appearance-none"
        />
        <p className="mt-1 text-xs text-blue-200 p-2">
          {t('dashboard.recruiterContactHelper')}
        </p>
      </div>

      <div className="md:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dashboard.applicationStatus')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <input
                type="checkbox"
                id="sendCv"
                checked={formData.sendCv}
                onChange={(e) => onFieldChange('sendCv', e.target.checked)}
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
                checked={formData.sendEmail}
                onChange={(e) => onFieldChange('sendEmail', e.target.checked)}
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
  );
};
