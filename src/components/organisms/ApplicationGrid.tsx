import React from 'react';
import { Postulation } from '../../types/interface/postulations/postulation';
import ApplicationCard from './ApplicationCard';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguageStore } from '../../store';

interface ApplicationGridProps {
  applications: Postulation[];
  allPostulationsCount: number; // Total de postulaciones antes de filtrar
  filteredApplicationsCount: number; // Total después de filtrar
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean; // Para mostrar un spinner si es necesario mientras carga inicial o filtros
}

const ApplicationGrid: React.FC<ApplicationGridProps> = ({
  applications,
  allPostulationsCount,
  filteredApplicationsCount,
  currentPage,
  totalPages,
  onPageChange,
  isLoading, // Aún no se usa, pero podría ser útil
}) => {
  const { translate } = useLanguageStore();

  if (isLoading) {
    // Podríamos tener un spinner más pequeño aquí si es preferible
    // en lugar del fullScreen que se usa en Dashboard.tsx
    return null;
  }

  if (allPostulationsCount === 0) {
    return (
      <div className="bg-blue-200/30 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-500 p-8 rounded-2xl shadow-md backdrop-blur-md" role="alert" aria-live="polite">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-blue-400 dark:text-blue-300" aria-hidden="true" />
          </div>
          <div className="ml-4">
            <p className="text-base sm:text-sm lg:text-base text-blue-700 dark:text-blue-300">
              {translate('dashboard.noApplications')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (filteredApplicationsCount === 0) {
    return (
      <div className="bg-yellow-200/30 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-8 rounded-2xl shadow-md backdrop-blur-md" role="alert" aria-live="polite">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-yellow-400 dark:text-yellow-300" aria-hidden="true" />
          </div>
          <div className="ml-4">
            <p className="text-base sm:text-sm lg:text-base text-yellow-700 dark:text-yellow-300">
              {translate('dashboard.noResults')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key="applications-grid-container">
      <div className="grid gap-3.5 sm:gap-2.5 md:gap-2 lg:gap-4 xl:gap-6 2xl:gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7" role="list" aria-label="Lista de aplicaciones">
        {applications.map((application: Postulation) =>
          application && application.id ? (
            <div key={application.id} role="listitem">
              <ApplicationCard application={application} />
            </div>
          ) : null
        )}
      </div>

      {totalPages > 1 && (
        <nav className="flex justify-center items-center mt-8 gap-2" aria-label="Navegación de páginas">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={translate('pagination.previousPage') || "Página anterior"}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div role="list" aria-label="Páginas disponibles">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
                aria-label={`${translate('pagination.goToPage') || "Ir a la página"} ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                role="listitem"
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={translate('pagination.nextPage') || "Página siguiente"}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
};

export default ApplicationGrid;
