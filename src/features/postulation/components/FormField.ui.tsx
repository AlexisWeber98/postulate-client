import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, htmlFor, required, error, helperText, children }) => (
  <div className="mb-4">
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);

export default FormField;
