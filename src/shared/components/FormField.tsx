import React from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="font-medium">
      {label}
    </label>
    <input
      id={id}
      className={`border rounded px-3 py-2 ${error ? 'border-red-500' : ''}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default FormField;
