import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

interface FilterDropdownProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder: string;
  noOptionsMessage: string;
  badgeCounter?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  icon,
  label,
  value,
  onValueChange,
  options,
  placeholder,
  noOptionsMessage,
  badgeCounter,
}) => {
  return (
    <div className="w-full md:w-64">
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
        {icon}
        <span>{label} {badgeCounter}</span>
      </div>
      <Select
        value={value}
        onValueChange={onValueChange}
        defaultValue="all"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{placeholder}</SelectItem>
          {options && options.length > 0 ? (
            options.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))
          ) : (
            <SelectItem value="all" disabled>{noOptionsMessage}</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterDropdown;
