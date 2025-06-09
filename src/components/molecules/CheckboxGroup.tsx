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
    <div className={`space-y-4 ${className}`}>
      {checkboxOptions.map((option) => (
        <div key={option.id} className="flex items-center">
          <input
            type="checkbox"
            id={option.id}
            name={option.name}
            checked={values[option.name]}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor={option.id} className="ml-2 block text-sm text-gray-700">
            {t(option.labelKey)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
