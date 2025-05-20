import React from 'react';
import { Search } from 'lucide-react';
import FilterSelects from './FilterSelects';
import { ApplicationStatus } from '../../types/interface/postulations/application-status';
import { APP_COLORS } from '../../styles/colors';
import { useLanguageStore } from '../../store';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: ApplicationStatus | 'all';
  setStatusFilter: (status: ApplicationStatus | 'all') => void;
  companyFilter: string;
  setCompanyFilter: (company: string) => void;
  positionFilter: string;
  setPositionFilter: (position: string) => void;
  companies: string[];
  positions: string[];
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  companyFilter,
  setCompanyFilter,
  positionFilter,
  setPositionFilter,
  companies,
  positions
}) => {
  const { t } = useLanguageStore();

  // Ensure we have arrays even if they're undefined
  const safeCompanies = Array.isArray(companies) ? companies : [];
  const safePositions = Array.isArray(positions) ? positions : [];

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <div className="flex flex-col space-y-6">
        {/* Barra de búsqueda */}
        <div className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={t('dashboard.filters.search')}
              style={{ borderColor: APP_COLORS.lightGray }}
            />
          </div>
        </div>

        {/* Filtros con FilterSelects component */}
        <FilterSelects
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          companies={safeCompanies}
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          positions={safePositions}
          positionFilter={positionFilter}
          setPositionFilter={setPositionFilter}
        />

        {/* Reset button */}
        {(searchTerm || statusFilter !== 'all' || companyFilter || positionFilter) && (
          <div className="flex justify-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCompanyFilter('');
                setPositionFilter('');
              }}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              {t('dashboard.filters.clear')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
