import React from 'react';

interface CheckboxOption {
  name: string;
  label: string;
  checked: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange, className = '' }) => {
  return (
    <div className={`flex gap-6 justify-center ${className}`}>
      {options.map((option) => (
        <label key={option.name} className="flex items-center gap-2 text-white/90 text-base">
          <input
            type="checkbox"
            name={option.name}
            checked={option.checked}
            onChange={onChange}
            className="accent-blue-500 w-5 h-5"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
