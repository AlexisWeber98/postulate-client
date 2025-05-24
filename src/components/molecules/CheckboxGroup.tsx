import React from 'react';
import { NewPostulationFormValues } from '../../types';

interface CheckboxGroupProps {
  values: NewPostulationFormValues;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ values, onChange, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="sentCV"
          name="sentCV"
          checked={values.sentCV}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="sentCV" className="ml-2 block text-sm text-gray-700">
          CV Enviado
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="sentEmail"
          name="sentEmail"
          checked={values.sentEmail}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="sentEmail" className="ml-2 block text-sm text-gray-700">
          Email Enviado
        </label>
      </div>
    </div>
  );
};

export default CheckboxGroup;
