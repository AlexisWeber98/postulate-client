import React from 'react';
import FormField from './FormField.ui';
import {
  PostulationStatus,
  STATUS_LABELS,
} from '../../../types/interface/postulations/postulation';
import { NewPostulationFormProps, NewPostulationFormValues } from '../../../types';
import { useLanguageStore } from '../../../store';
import { Button } from '@/components';
import { Save } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import CheckboxGroup from '../../../components/molecules/CheckboxGroup';

interface UIProps extends Omit<NewPostulationFormProps, 'onSubmit'> {
  values: NewPostulationFormValues;
  errors: Partial<Record<keyof NewPostulationFormValues, string>>;
  touched: Partial<Record<keyof NewPostulationFormValues, boolean>>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onStatusChange: (status: PostulationStatus) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

const statusOptions: PostulationStatus[] = [
  'applied',
  'interview',
  'technical',
  'offer',
  'rejected',
  'accepted',
];

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

  const translate = useLanguageStore(state => state.translate);
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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    onChange(e);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    onCheckboxChange(e);
  };

  const handleFormSubmit = (e: React.FormEvent) => {

    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative bg-gradient-to-br from-blue-900/80 to-blue-800/60 border border-blue-400/20 rounded-3xl shadow-2xl p-8 max-w-lg mx-auto mt-10"
    >
      <h2 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow">
        {translate('hero.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <FormField
          label={translate('company') || 'Company'}
          htmlFor="company"
          required
          error={touched.company && errors.company ? errors.company : ''}
        >
          <input
            id="company"
            name="company"
            type="text"
            value={values.company}
            onChange={handleFormChange}
            className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
            required
            placeholder={translate('dashboard.companyPlaceholder') || 'Nombre de la empresa'}
          />
        </FormField>
        <FormField
          label={translate('position') || 'Position'}
          htmlFor="position"
          required
          error={touched.position && errors.position ? errors.position : ''}
        >
          <input
            id="position"
            name="position"
            type="text"
            value={values.position}
            onChange={handleFormChange}
            className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
            required
            placeholder={translate('dashboard.positionPlaceholder') || 'Título del puesto'}
          />
        </FormField>
        <FormField
          label={translate('status') || 'Status'}
          htmlFor="status"
          required
          error={touched.status && errors.status ? errors.status : ''}
        >
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
              <span>
                {values.status ? STATUS_LABELS[values.status] : translate('selectStatus')}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div
                id="status-listbox"
                role="listbox"
                className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200"
                aria-labelledby="status-button"
              >
                <ul className="py-1 max-h-60 overflow-auto">
                  {statusOptions.map(status => (
                    <li
                      key={status}
                      role="option"
                      aria-selected={values.status === status}
                      onClick={() => handleSelectChange(status)}
                      onKeyDown={e => handleItemKeyDown(e, status)}
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
        <FormField
          label={translate('date') || 'Date'}
          htmlFor="date"
          required
          error={touched.applicationDate && errors.applicationDate ? errors.applicationDate : ''}
        >
          <input
            id="date"
            name="date"
            type="date"
            value={values.applicationDate}
            onChange={handleFormChange}
            className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none"
            required
            pattern="\d{4}-\d{2}-\d{2}"
            max={new Date().toISOString().split('T')[0]}
          />
        </FormField>
        <FormField
          label={translate('dashboard.url') || 'URL'}
          htmlFor="url"
          error={touched.link && errors.link ? errors.link : ''}
        >
          <input
            id="url"
            name="url"
            type="url"
            value={values.link}
            onChange={handleFormChange}
            className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
            placeholder={translate('dashboard.urlPlaceholder') || 'URL de la oferta'}
          />
        </FormField>
        <FormField
          label={translate('notes') || 'Notes'}
          htmlFor="notes"
          error={touched.description && errors.description ? errors.description : ''}
        >
          <textarea
            id="notes"
            name="notes"
            value={values.description}
            onChange={handleFormChange}
            className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
            placeholder={translate('dashboard.notesPlaceholder') || 'Notas adicionales'}
            rows={3}
          />
        </FormField>
      </div>

      {/* Acá podés agregar otros campos como notes, recruiterContact, etc. con los mismos handlers */}

      <CheckboxGroup values={values} onChange={handleCheckboxChange} />

      <div className="flex justify-between mt-6">
        <Button type="reset" onClick={onReset} variant="secondary">
          {translate('reset') || 'Reset'}
        </Button>
        <Button type="submit" loading={loading} icon={<Save />}>
          {translate('submit') || 'Submit'}
        </Button>
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </form>
  );
};

export default NewPostulationFormUI;
