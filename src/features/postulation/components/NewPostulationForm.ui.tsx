import React from 'react';
import FormField from './FormField.ui';
import { PostulationStatus, STATUS_LABELS } from '../../../types/interface/postulations/postulation';
import { NewPostulationFormProps, NewPostulationFormValues } from '../../../types';
import { useLanguageStore } from '../../../store';
import Button from '../../../components/atoms/Button/Button.ui';
import { Save } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import CheckboxGroup from '../../../components/molecules/CheckboxGroup';

interface UIProps extends Omit<NewPostulationFormProps, 'onSubmit'> {
  values: NewPostulationFormValues;
  errors: Partial<Record<keyof NewPostulationFormValues, string>>;
  touched: Partial<Record<keyof NewPostulationFormValues, boolean>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onStatusChange: (status: PostulationStatus) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

const statusOptions: PostulationStatus[] = ['applied', 'interview', 'technical', 'offer', 'rejected', 'accepted'];

const NewPostulationFormUI: React.FC<UIProps> = ({
  values,
  errors,
  touched,
  onChange,
  onStatusChange,
  onCheckboxChange,
  onSubmit,
  onReset,
  loading,
  error,
}) => {
  const { t } = useLanguageStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleSelectChange = (status: PostulationStatus) => {
    onStatusChange(status);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemKeyDown = (e: React.KeyboardEvent, status: PostulationStatus) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectChange(status);
    }
  };

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
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
              className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none flex justify-between items-center"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls="status-listbox"
              id="status-button"
            >
              <span>{values.status ? STATUS_LABELS[values.status] : t('selectStatus')}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div
                id="status-listbox"
                role="listbox"
                className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200"
                aria-labelledby="status-button"
              >
                <ul className="py-1 max-h-60 overflow-auto">
                  {statusOptions.map((status) => (
                    <li
                      key={status}
                      role="option"
                      aria-selected={values.status === status}
                      onClick={() => handleSelectChange(status)}
                      onKeyDown={(e) => handleItemKeyDown(e, status)}
                      tabIndex={0}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-900 focus:bg-blue-50 focus:outline-none"
                    >
                      {STATUS_LABELS[status]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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
      <CheckboxGroup
        className="mb-6 mt-2"
        options={[
          { name: 'sentCV', checked: values.sentCV ?? false, label: t('sentCV') || 'Envié CV' },
          { name: 'sentEmail', checked: values.sentEmail ?? false, label: t('sentEmail') || 'Envié Email' }
        ]}
        onChange={onCheckboxChange}
      />
{error && (
  <div
    className="text-red-400 bg-red-900/30 rounded-lg px-4 py-2 text-center mb-4"
    role="alert"
    aria-live="polite"
  >
    {error}
  </div>
)}
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onReset}
          className="w-full mt-2"
        >
          {t('common.reset')}
        </Button>
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
      </div>
    </form>
  );
};

export default NewPostulationFormUI;
