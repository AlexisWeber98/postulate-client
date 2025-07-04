import React from 'react';
import { useTranslation } from 'react-i18next';
// Se eliminó la importación de NewPostulationFormValues ya que se define una interfaz local más específica.

interface CheckboxOption {
  id: string;
  name: keyof CheckboxGroupValues; // Usar claves de la interfaz de valores
  labelKey: string; // Cambiado de label a labelKey para usar con i18n
}

interface CheckboxGroupValues {
  sentCV: boolean; // Cambiado de sendCv a sentCV
  sentEmail: boolean; // Cambiado de sendEmail a sentEmail
}

interface CheckboxGroupProps {
  values: CheckboxGroupValues;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const checkboxOptions: CheckboxOption[] = [
  { id: 'sentCVCheckbox', name: 'sentCV', labelKey: 'checkboxes.sentCV' },
  { id: 'sentEmailCheckbox', name: 'sentEmail', labelKey: 'checkboxes.sentEmail' },
];

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ values, onChange, className = '' }) => {
  const { t } = useTranslation();

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${className}`}>
      {checkboxOptions.map((option) => (
        <div key={option.id} className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20">
          <input
            type="checkbox"
            id={option.id}
            name={option.name}
            checked={values[option.name]}
            onChange={onChange}
            className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor={option.id} className="ml-2 sm:ml-3 block text-sm sm:text-base text-white cursor-pointer">
            {t(option.labelKey)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
