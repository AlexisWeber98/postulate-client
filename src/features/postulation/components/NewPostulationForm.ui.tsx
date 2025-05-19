import React from 'react';
import FormField from './FormField.ui';
import SubmitButton from './SubmitButton.ui';
import { ApplicationStatus, STATUS_LABELS } from '../../../types/interface/postulations/application-status';
import { NewPostulationFormProps, NewPostulationFormValues } from '../../../types';
import { useLanguage } from '../../../context/LanguageContext';

interface UIProps extends Omit<NewPostulationFormProps, 'onSubmit'> {
  values: NewPostulationFormValues;
  errors: Partial<Record<keyof NewPostulationFormValues, string>>;
  touched: Partial<Record<keyof NewPostulationFormValues, boolean>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const statusOptions = Object.values(ApplicationStatus);

const NewPostulationFormUI: React.FC<UIProps> = ({
  values,
  errors,
  touched,
  onChange,
  onCheckboxChange,
  onSubmit,
  loading,
  error,
}) => {
  const { t } = useLanguage();
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">{t('hero.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={t('company') || 'Company'} htmlFor="company" required error={touched.company && errors.company ? errors.company : ''}>
          <input
            id="company"
            name="company"
            type="text"
            value={values.company}
            onChange={onChange}
            className="input"
            required
          />
        </FormField>
        <FormField label={t('position') || 'Position'} htmlFor="position" required error={touched.position && errors.position ? errors.position : ''}>
          <input
            id="position"
            name="position"
            type="text"
            value={values.position}
            onChange={onChange}
            className="input"
            required
          />
        </FormField>
        <FormField label={t('status') || 'Status'} htmlFor="status" required error={touched.status && errors.status ? errors.status : ''}>
          <select
            id="status"
            name="status"
            value={values.status}
            onChange={onChange}
            className="input"
            required
          >
            <option value="">{t('selectStatus') || 'Select status'}</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status as ApplicationStatus]}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label={t('date') || 'Date'} htmlFor="date" required error={touched.date && errors.date ? errors.date : ''}>
          <input
            id="date"
            name="date"
            type="date"
            value={values.date}
            onChange={onChange}
            className="input"
            required
          />
        </FormField>
      </div>
      <FormField label={t('referenceUrl') || 'Reference URL'} htmlFor="referenceUrl" error={touched.referenceUrl && errors.referenceUrl ? errors.referenceUrl : ''}>
        <input
          id="referenceUrl"
          name="referenceUrl"
          type="url"
          value={values.referenceUrl || ''}
          onChange={onChange}
          className="input"
          placeholder={t('referenceUrl.placeholder') || 'https://example.com/job'}
        />
      </FormField>
      <FormField label={t('notes') || 'Notes'} htmlFor="notes" error={touched.notes && errors.notes ? errors.notes : ''}>
        <textarea
          id="notes"
          name="notes"
          value={values.notes || ''}
          onChange={onChange}
          className="input"
          rows={3}
          placeholder={t('notes.placeholder') || 'Add any relevant information about this application'}
        />
      </FormField>
      <FormField label={t('recruiterContact') || 'Recruiter or company contact'} htmlFor="recruiterContact" helperText={t('recruiterContact.helper') || 'Example: email@company.com or +1 123 456 7890'} error={touched.recruiterContact && errors.recruiterContact ? errors.recruiterContact : ''}>
        <input
          id="recruiterContact"
          name="recruiterContact"
          type="text"
          value={values.recruiterContact || ''}
          onChange={onChange}
          className="input"
          placeholder={t('recruiterContact.placeholder') || 'Example: email@company.com or +1 123 456 7890'}
        />
      </FormField>
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="sentCV"
            checked={values.sentCV}
            onChange={onCheckboxChange}
          />
          {t('sentCV') || 'Sent CV'}
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="sentEmail"
            checked={values.sentEmail}
            onChange={onCheckboxChange}
          />
          {t('sentEmail') || 'Sent Email'}
        </label>
      </div>
      {error && <div className="text-red-600 text-sm mb-2 text-center">{error}</div>}
      <SubmitButton loading={loading} disabled={loading}>
        {t('hero.cta.button') || 'Save application'}
      </SubmitButton>
    </form>
  );
};

export default NewPostulationFormUI;
