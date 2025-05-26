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
    <label htmlFor={htmlFor} className="block text-base font-semibold text-white mb-1 drop-shadow">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
    {helperText && !error && <p className="text-xs text-blue-200 mt-1">{helperText}</p>}
    {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
  </div>
);

export default FormField;
