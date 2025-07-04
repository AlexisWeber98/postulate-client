import React from 'react';
import { Search, X } from 'lucide-react';
import { PostulationStatus } from '../../types/interface/postulations/postulation';
import { useLanguageStore } from '../../store';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: PostulationStatus | 'all';
  setStatusFilter: (status: PostulationStatus | 'all') => void;
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
  const  translate  = useLanguageStore(state=>state.translate);

  const statusOptions: { value: PostulationStatus | 'all'; label: string }[] = [
    { value: 'all', label: translate('dashboard.filters.status') },
    { value: 'applied', label: translate('dashboard.stats.status.applied') },
    { value: 'interview', label: translate('dashboard.stats.status.interview') },
    { value: 'technical', label: translate('dashboard.stats.status.technical') },
    { value: 'offer', label: translate('dashboard.stats.status.offer') },
    { value: 'rejected', label: translate('dashboard.stats.status.rejected') },
    { value: 'accepted', label: translate('dashboard.stats.status.accepted') }
  ];

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Barra de búsqueda */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={translate('dashboard.filters.search')}
          className="block w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-blue-200 bg-white/80 shadow-lg sm:shadow-xl focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-gray-800 placeholder-gray-600 transition-all duration-200 hover:shadow-xl sm:hover:shadow-2xl text-sm sm:text-base"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition" />
          </button>
        )}
      </div>

      {/* Filtros - Layout responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {/* Filtro de estado */}
        <div className="relative w-full">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PostulationStatus | 'all')}
            className="appearance-none block w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-gray-200 bg-white/80 shadow-md sm:shadow-lg focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-gray-800 transition-all duration-200 hover:shadow-lg sm:hover:shadow-xl cursor-pointer text-sm sm:text-base"
          >
            {statusOptions.map(option => (
              <option key={`status-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-2 sm:right-3 flex items-center text-gray-400">
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>

        {/* Filtro de empresa */}
        <div className="relative w-full">
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="appearance-none block w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-gray-200 bg-white/80 shadow-md sm:shadow-lg focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-gray-800 transition-all duration-200 hover:shadow-lg sm:hover:shadow-xl cursor-pointer text-sm sm:text-base"
          >
            <option key="default-company" value="">{translate('dashboard.filters.selectCompany')}</option>
            {companies.map((company, index) => (
              <option key={`company-${company}-${index}`} value={company}>
                {company}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-2 sm:right-3 flex items-center text-gray-400">
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>

        {/* Filtro de puesto */}
        <div className="relative w-full">
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="appearance-none block w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-gray-200 bg-white/80 shadow-md sm:shadow-lg focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-gray-800 transition-all duration-200 hover:shadow-lg sm:hover:shadow-xl cursor-pointer text-sm sm:text-base"
          >
            <option key="default-position" value="">{translate('dashboard.filters.selectPosition')}</option>
            {positions.map((position, index) => (
              <option key={`position-${position}-${index}`} value={position}>
                {position}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-2 sm:right-3 flex items-center text-gray-400">
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>

        {/* Botón de reset */}
        <div className="w-full flex items-center">
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setCompanyFilter('');
              setPositionFilter('');
            }}
            className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-violet-600 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {translate('dashboard.filters.clear')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
