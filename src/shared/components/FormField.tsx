import React from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="font-medium text-gray-800 dark:text-gray-200">
      {label}
    </label>
    <input
      id={id}
      className={`border rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition ${error ? 'border-red-500' : ''}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500 dark:text-red-400">{error}</span>}
  </div>
);

export default FormField;
