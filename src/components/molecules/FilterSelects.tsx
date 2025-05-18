import React from 'react';

import { Briefcase, Building2, ListFilter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { ApplicationStatus } from '../../interfaces/components/atoms/badges/StatusBadge.interface';

interface FilterSelectsProps {
  statusFilter: ApplicationStatus | 'all';
  setStatusFilter: (value: ApplicationStatus | 'all') => void;
  companies: string[];
  companyFilter: string;
  setCompanyFilter: (value: string) => void;
  positions: string[];
  positionFilter: string;
  setPositionFilter: (value: string) => void;
}

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
  // Manejador tipado para statusFilter
  const handleStatusChange = (value: string) => {
    setStatusFilter(value as ApplicationStatus | 'all');
  };

  // Handlers para convertir valores "all" a cadenas vacías y viceversa
  const handleCompanyChange = (value: string) => {
    try {
      setCompanyFilter(value === "all" ? "" : value);
    } catch (error) {
      console.error("Error al cambiar el filtro de empresa:", error);
      // Restablecer el filtro en caso de error
      setCompanyFilter("");
    }
  };

  const handlePositionChange = (value: string) => {
    try {
      setPositionFilter(value === "all" ? "" : value);
    } catch (error) {
      console.error("Error al cambiar el filtro de puesto:", error);
      // Restablecer el filtro en caso de error
      setPositionFilter("");
    }
  };

  // Badge counter para mostrar cuántos elementos hay en cada categoría
  const getBadgeCounter = (items: string[]) => {
    return items.length > 0 ? `(${items.length})` : '';
  };

  // Valores seguros para los selects que nunca deben ser undefined
  const safeCompanyValue = companyFilter === "" ? "all" : companyFilter;
  const safePositionValue = positionFilter === "" ? "all" : positionFilter;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Status select */}
      <div className="w-full md:w-64">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <ListFilter className="h-4 w-4" />
          <span>Estado</span>
        </div>
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="applied">Aplicado</SelectItem>
            <SelectItem value="interview">Entrevista</SelectItem>
            <SelectItem value="technical">Prueba Técnica</SelectItem>
            <SelectItem value="offer">Oferta</SelectItem>
            <SelectItem value="rejected">Rechazado</SelectItem>
            <SelectItem value="accepted">Aceptado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Company select */}
      <div className="w-full md:w-64">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <Building2 className="h-4 w-4" />
          <span>Empresa {getBadgeCounter(companies)}</span>
        </div>
        <Select
          value={safeCompanyValue}
          onValueChange={handleCompanyChange}
          defaultValue="all"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas las empresas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las empresas</SelectItem>
            {companies && companies.length > 0 ? (
              companies.map((company) => (
                <SelectItem key={company} value={company}>{company}</SelectItem>
              ))
            ) : (
              <SelectItem value="all" disabled>No hay empresas disponibles</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Position select */}
      <div className="w-full md:w-64">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <Briefcase className="h-4 w-4" />
          <span>Puesto {getBadgeCounter(positions)}</span>
        </div>
        <Select
          value={safePositionValue}
          onValueChange={handlePositionChange}
          defaultValue="all"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todos los puestos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los puestos</SelectItem>
            {positions && positions.length > 0 ? (
              positions.map((position) => (
                <SelectItem key={position} value={position}>{position}</SelectItem>
              ))
            ) : (
              <SelectItem value="all" disabled>No hay puestos disponibles</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterSelects;
