import React, { useCallback } from 'react';
import { Briefcase, Building2, ListFilter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { PostulationStatus } from '../../types/interface/postulations/postulation';
import { useLanguageStore } from '../../store';

interface FilterSelectsProps {
  statusFilter: PostulationStatus | 'all';
  setStatusFilter: (value: PostulationStatus | 'all') => void;
  companies: string[];
  companyFilter: string;
  setCompanyFilter: (value: string) => void;
  positions: string[];
  positionFilter: string;
  setPositionFilter: (value: string) => void;
}

const statusOptions: (PostulationStatus | 'all')[] = [
  'all',
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
  const translate = useLanguageStore(state=>state.translate);

  // Manejador tipado para statusFilter
  const handleStatusChange = (value: string) => {
    setStatusFilter(value as PostulationStatus | 'all');
  };

  // Handlers para convertir valores "all" a cadenas vacías y viceversa
  const handleCompanyChange = (value: string) => {
    try {
      setCompanyFilter(value === "all" ? "" : value);
    } catch (error) {
      console.error("Error al cambiar el filtro de empresa:", error);
      setCompanyFilter("");
    }
  };

  const handlePositionChange = (value: string) => {
    try {
      setPositionFilter(value === "all" ? "" : value);
    } catch (error) {
      console.error("Error al cambiar el filtro de posición:", error);
      setPositionFilter("");
    }
  };

  // Badge counter para mostrar cuántos elementos hay en cada categoría
  const getBadgeCounter = useCallback((items: string[]) => {
    return items.length > 0 ? `(${items.length})` : '';
  }, []);

  // Valores seguros para los selects que nunca deben ser undefined
  const safeCompanyValue = companyFilter === "" ? "all" : companyFilter;
  const safePositionValue = positionFilter === "" ? "all" : positionFilter;

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
            {statusOptions.filter(status => status !== 'all').map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Company select */}
      <div className="w-full md:w-64">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <Building2 className="h-4 w-4" />
          <span>{translate('dashboard.filters.company')} {getBadgeCounter(companies)}</span>
        </div>
        <Select
          value={safeCompanyValue}
          onValueChange={handleCompanyChange}
          defaultValue="all"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={translate('dashboard.filters.selectCompany')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translate('dashboard.filters.selectCompany')}</SelectItem>
            {companies && companies.length > 0 ? (
              companies.map((company) => (
                <SelectItem key={company} value={company}>{company}</SelectItem>
              ))
            ) : (
              <SelectItem value="all" disabled>{translate('dashboard.filters.noCompanies')}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Position select */}
      <div className="w-full md:w-64">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <Briefcase className="h-4 w-4" />
          <span>{translate('dashboard.filters.position')} {getBadgeCounter(positions)}</span>
        </div>
        <Select
          value={safePositionValue}
          onValueChange={handlePositionChange}
          defaultValue="all"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={translate('dashboard.filters.selectPosition')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translate('dashboard.filters.selectPosition')}</SelectItem>
            {positions && positions.length > 0 ? (
              positions.map((position) => (
                <SelectItem key={position} value={position}>{position}</SelectItem>
              ))
            ) : (
              <SelectItem value="all" disabled>{translate('dashboard.filters.noPositions')}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterSelects;
