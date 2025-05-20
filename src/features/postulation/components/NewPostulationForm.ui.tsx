import React from 'react';
import FormField from './FormField.ui';
import { PostulationStatus, STATUS_LABELS } from '../../../types/interface/postulations/postulation';
import { NewPostulationFormProps, NewPostulationFormValues } from '../../../types';
import { useLanguageStore } from '../../../store';
import Button from '../../../components/atoms/Button/Button.ui';
import { Save } from 'lucide-react';

interface UIProps extends Omit<NewPostulationFormProps, 'onSubmit'> {
  values: NewPostulationFormValues;
  errors: Partial<Record<keyof NewPostulationFormValues, string>>;
  touched: Partial<Record<keyof NewPostulationFormValues, boolean>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const statusOptions: PostulationStatus[] = ['applied', 'interview', 'technical', 'offer', 'rejected', 'accepted'];

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
  const { t } = useLanguageStore();
  return (
    <form
      onSubmit={onSubmit}
      className="relative bg-gradient-to-br from-blue-900/80 to-blue-800/60 border border-blue-400/20 rounded-3xl shadow-2xl p-8 max-w-lg mx-auto mt-10"
    >
      <h2 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow">{t('hero.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <FormField label={t('company') || 'Company'} htmlFor="company" required error={touched.company && errors.company ? errors.company : ''}>
          <input
            id="company"
            name="company"
            type="text"
            value={values.company}
            onChange={onChange}
            className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
            required
            placeholder={t('dashboard.companyPlaceholder') || 'Nombre de la empresa'}
          />
        </FormField>
        <FormField label={t('position') || 'Position'} htmlFor="position" required error={touched.position && errors.position ? errors.position : ''}>
          <input
            id="position"
            name="position"
            type="text"
            value={values.position}
            onChange={onChange}
            className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
            required
            placeholder={t('dashboard.positionPlaceholder') || 'Título del puesto'}
          />
        </FormField>
        <FormField label={t('status') || 'Status'} htmlFor="status" required error={touched.status && errors.status ? errors.status : ''}>
          <select
            id="status"
            name="status"
            value={values.status}
            onChange={onChange}
            className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none"
            required
          >
            <option value="" className="text-black bg-white">{t('selectStatus') || 'Seleccionar estado'}</option>
            {statusOptions.map((status) => (
              <option key={status} value={status} className="text-black bg-white">
                {STATUS_LABELS[status as PostulationStatus]}
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
            className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none"
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
          className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
          placeholder={t('referenceUrl.placeholder') || 'https://example.com/job'}
        />
      </FormField>
      <FormField label={t('notes') || 'Notes'} htmlFor="notes" error={touched.notes && errors.notes ? errors.notes : ''}>
        <textarea
          id="notes"
          name="notes"
          value={values.notes || ''}
          onChange={onChange}
          className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
          rows={3}
          placeholder={t('notes.placeholder') || 'Añade cualquier información relevante sobre esta postulación'}
        />
      </FormField>
      <FormField label={t('recruiterContact') || 'Recruiter or company contact'} htmlFor="recruiterContact" helperText={t('recruiterContact.helper') || 'Ejemplo: email@empresa.com o +1 123 456 7890'} error={touched.recruiterContact && errors.recruiterContact ? errors.recruiterContact : ''}>
        <input
          id="recruiterContact"
          name="recruiterContact"
          type="text"
          value={values.recruiterContact || ''}
          onChange={onChange}
          className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
          placeholder={t('recruiterContact.placeholder') || 'Ejemplo: email@empresa.com o +1 123 456 7890'}
        />
      </FormField>
      <div className="flex gap-6 justify-center mb-6 mt-2">
        <label className="flex items-center gap-2 text-white/90 text-base">
          <input
            type="checkbox"
            name="sentCV"
            checked={values.sentCV}
            onChange={onCheckboxChange}
            className="accent-blue-500 w-5 h-5"
          />
          {t('sentCV') || 'Envié CV'}
        </label>
        <label className="flex items-center gap-2 text-white/90 text-base">
          <input
            type="checkbox"
            name="sentEmail"
            checked={values.sentEmail}
            onChange={onCheckboxChange}
            className="accent-blue-500 w-5 h-5"
          />
          {t('sentEmail') || 'Envié Email'}
        </label>
      </div>
      {error && (
        <div className="text-red-400 bg-red-900/30 rounded-lg px-4 py-2 text-center mb-4">{error}</div>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mt-2"
        disabled={loading}
        icon={<Save className="w-5 h-5" />}
      >
        {loading ? t('dashboard.loading') : t('hero.cta.button')}
      </Button>
    </form>
  );
};

export default NewPostulationFormUI;
