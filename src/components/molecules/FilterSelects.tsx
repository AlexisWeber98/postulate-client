import React, { useCallback } from 'react';
import { Briefcase, Building2, ListFilter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/atoms/select';
import FilterDropdown from './FilterDropdown';
import { PostulationStatus } from '../../types/interface/postulations/postulation';
import { useLanguageStore } from '../../store';

interface FilterSelectsProps {
  statusFilter: PostulationStatus | 'all'; // "all" para mostrar todos
  setStatusFilter: (value: PostulationStatus | 'all') => void;
  companies: string[];
  companyFilter: string; // "" para mostrar todos
  setCompanyFilter: (value: string) => void;
  positions: string[];
  positionFilter: string; // "" para mostrar todos
  setPositionFilter: (value: string) => void;
}

// 'all' se maneja explícitamente en el SelectItem
const statusOptions: PostulationStatus[] = [
  'applied',
  'interview',
  'technical',
  'offer',
  'rejected',
  'accepted'
];

const FilterSelects: React.FC<FilterSelectsProps> = ({
  statusFilter,
  setStatusFilter,
  companies,
  companyFilter,
  setCompanyFilter,
  positions,
  positionFilter,
  setPositionFilter,
}) => {
  const translate = useLanguageStore(state => state.translate);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as PostulationStatus | 'all');
  };

  const handleCompanyChange = (value: string) => {
    // Si el valor es "all" (proveniente del SelectItem "Todos"), se establece el filtro a ""
    // De lo contrario, se usa el valor de la compañía seleccionada.
    setCompanyFilter(value === "all" ? "" : value);
  };

  const handlePositionChange = (value: string) => {
    // Si el valor es "all" (proveniente del SelectItem "Todos"), se establece el filtro a ""
    // De lo contrario, se usa el valor de la posición seleccionada.
    setPositionFilter(value === "all" ? "" : value);
  };

  const getBadgeCounter = useCallback((items: string[]) => {
    return items.length > 0 ? `(${items.length})` : '';
  }, []);

  // Para los FilterDropdown, si el filtro actual es "", pasamos "all" como valor
  // para que el SelectItem "Todos" aparezca seleccionado.
  // Si el filtro tiene un valor, ese es el que se pasa.
  const companyDropdownValue = companyFilter === "" ? "all" : companyFilter;
  const positionDropdownValue = positionFilter === "" ? "all" : positionFilter;

  const statusTranslations: Record<PostulationStatus, string> = {
    applied: translate('dashboard.filters.statusApplied'),
    interview: translate('dashboard.filters.statusInterview'),
    technical: translate('dashboard.filters.statusTechnical'),
    offer: translate('dashboard.filters.statusOffer'),
    rejected: translate('dashboard.filters.statusRejected'),
    accepted: translate('dashboard.filters.statusAccepted'),
  };


  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Status select */}
      <div className="w-full md:w-64">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <ListFilter className="h-4 w-4" />
          <span>{translate('dashboard.filters.status')}</span>
        </div>
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={translate('dashboard.filters.all')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translate('dashboard.filters.all')}</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {statusTranslations[status] || status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Company select */}
      <FilterDropdown
        icon={<Building2 className="h-4 w-4" />}
        label={translate('dashboard.filters.company')}
        value={companyDropdownValue} // Usar el valor preparado para el dropdown
        onValueChange={handleCompanyChange}
        options={companies} // Asumo que FilterDropdown internamente añade la opción "Todos" si es necesario o maneja "all"
        placeholder={translate('dashboard.filters.selectCompany')}
        noOptionsMessage={translate('dashboard.filters.noCompanies')}
        badgeCounter={getBadgeCounter(companies)}
      />

      {/* Position select */}
      <FilterDropdown
        icon={<Briefcase className="h-4 w-4" />}
        label={translate('dashboard.filters.position')}
        value={positionDropdownValue} // Usar el valor preparado para el dropdown
        onValueChange={handlePositionChange}
        options={positions} // Asumo que FilterDropdown internamente añade la opción "Todos" si es necesario o maneja "all"
        placeholder={translate('dashboard.filters.selectPosition')}
        noOptionsMessage={translate('dashboard.filters.noPositions')}
        badgeCounter={getBadgeCounter(positions)}
      />
    </div>
  );
};

export default FilterSelects;
