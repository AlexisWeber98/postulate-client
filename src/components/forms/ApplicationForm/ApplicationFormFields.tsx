import { motion } from 'framer-motion';
import { PostulationStatus, STATUS_LABELS } from '../../../types';
import FieldWrapper from '../../molecules/FieldWrapper/FieldWrapper';

interface ApplicationFormFieldsProps {
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
  onFieldChange: (name: string, value: string | boolean) => void;
  onFieldBlur: (name: string, value: string) => void;
  translate: (key: string) => string;
}

//const translate = useLanguageStore((state: { translate: (key: TranslationKey) => string }) => state.translate);



export const ApplicationFormFields: React.FC<ApplicationFormFieldsProps> = ({
  formData,
  fieldStatus,
  isBlurred,
  onFieldChange,
  onFieldBlur,
  translate,
}) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <FieldWrapper
        name="company"
        label={translate('dashboard.company')}
        required
        tooltip={translate('tooltip.company')}
        isBlurred={isBlurred.company}
        fieldStatus={fieldStatus.company}
      >
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={e => onFieldChange('company', e.target.value)}
          onBlur={e => onFieldBlur('company', e.target.value)}
          className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.company?.isValid && isBlurred.company ? 'ring-2 ring-red-400' : ''}`}
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
        tooltip={translate('tooltip.position')}
        isBlurred={isBlurred.position}
        fieldStatus={fieldStatus.position}
      >
        <input
          type="text"
          id="position"
          value={formData.position}
          onChange={e => onFieldChange('position', e.target.value)}
          onBlur={e => onFieldBlur('position', e.target.value)}
          className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.position?.isValid && isBlurred.position ? 'ring-2 ring-red-400' : ''}`}
          placeholder={translate('dashboard.positionPlaceholder')}
          required
          aria-invalid={!fieldStatus.position?.isValid}
          aria-describedby={!fieldStatus.position?.isValid ? 'position-error' : undefined}
        />
      </FieldWrapper>

      <div>
        <label
          htmlFor="status"
          className="text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow"
        >
          {translate('status')} *
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={e => onFieldChange('status', e.target.value as PostulationStatus)}
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
        <label
          htmlFor="date"
          className="text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow"
        >
          {translate('dashboard.date')} *
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={e => onFieldChange('date', e.target.value)}
          className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none"
          required
        />
      </div>

      <div className="md:col-span-2">
        <FieldWrapper
          name="url"
          label={translate('referenceUrl')}
          tooltip={translate('tooltip.url')}
          isBlurred={isBlurred.url}
          fieldStatus={fieldStatus.url}
        >
          <input
            type="url"
            id="url"
            value={formData.url}
            onChange={e => onFieldChange('url', e.target.value)}
            onBlur={e => onFieldBlur('url', e.target.value)}
            className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.url?.isValid && isBlurred.url ? 'ring-2 ring-red-400' : ''}`}
            placeholder={translate('dashboard.referenceUrlPlaceholder')}
          />
        </FieldWrapper>
      </div>

      <div className="md:col-span-2">
        <label
          htmlFor="notes"
          className="text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow"
        >
          {translate('notes')}
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={e => onFieldChange('notes', e.target.value)}
          rows={5}
          className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 dark:placeholder:text-blue-100/60 shadow-inner appearance-none"
          placeholder={translate('dashboard.notesPlaceholder')}
        />
      </div>

      <div className="col-span-2">
        <label
          htmlFor="recruiterContact"
          className="text-base font-semibold text-gray-700 dark:text-white mb-1 drop-shadow"
        >
          {translate('recruiterContact')}
        </label>
        <input
          type="text"
          id="recruiterContact"
          value={formData.recruiterContact}
          onChange={e => onFieldChange('recruiterContact', e.target.value)}
          placeholder={translate('dashboard.recruiterContactPlaceholder')}
          className="w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 dark:placeholder:text-blue-100/60 shadow-inner appearance-none"
        />
        <p className="mt-1 text-xs text-blue-200 p-2">
          {translate('dashboard.recruiterContactHelper')}
        </p>
      </div>

      <div className="md:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {translate('dashboard.applicationStatus')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <input
                type="checkbox"
                id="sendCv"
                checked={formData.sentCV}
                onChange={e => onFieldChange('sentCV', e.target.checked)}
                className="accent-blue-500 w-5 h-5 rounded"
              />
              <label
                htmlFor="sendCv"
                className="text-gray-700 dark:text-white/90 text-base cursor-pointer"
              >
                {translate('dashboard.sentCV')}
              </label>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <input
                type="checkbox"
                id="sendEmail"
                checked={formData.sentEmail}
                onChange={e => onFieldChange('sentEmail', e.target.checked)}
                className="accent-blue-500 w-5 h-5 rounded"
              />
              <label
                htmlFor="sendEmail"
                className="text-gray-700 dark:text-white/90 text-base cursor-pointer"
              >
                {translate('dashboard.sentEmail')}
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
