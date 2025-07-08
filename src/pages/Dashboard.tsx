import React, { useEffect, useCallback } from 'react';
import { usePostulationsStore } from '../store/postulations/postulationsStore';
import { useLanguageStore } from '../store/language/languageStore';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useApplicationFilters } from '../hooks/useApplicationFilters';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import DashboardHeader from '../components/organisms/DashboardHeader';
import SearchAndFilter from '../components/organisms/SearchAndFilter';
import ApplicationGrid from '../components/organisms/ApplicationGrid';
import ApplicationStats from '../components/organisms/ApplicationStats';
import { AlertCircle } from 'lucide-react';
import ActionModal from '../components/molecules/ActionModal';


const Dashboard: React.FC = () => {
  const getAllPostulations = usePostulationsStore(state => state.getAllPostulations);
  const postulations = usePostulationsStore(state => state.postulations) || [];
  const postulationsLoading = usePostulationsStore(state => state.loading);

  const { translate } = useLanguageStore();

  const { error: localError, handleError: localHandleError, clearError: clearLocalError } = useErrorHandler({
     defaultMessage: translate('dashboard.errorMessage'),
  });

  const {
    searchTerm,
    statusFilter,
    companyFilter,
    positionFilter,
    currentPage,
    setSearchTerm,
    setStatusFilter,
    setCompanyFilter,
    setPositionFilter,
    companies,
    positions,
    filteredApplications,
    totalPages,
    currentApplications,
    handlePageChange,
    error: filterHookError,
    clearError: clearFilterHookError,
  } = useApplicationFilters(postulations);

  // Estabilizar la función de manejo de errores
  const handleGetAllPostulations = useCallback(async () => {
    try {
      await getAllPostulations();
    } catch (err) {
      localHandleError(err as Error, translate('dashboard.errorMessage'));
    }
  }, [getAllPostulations, localHandleError, translate]);

  useEffect(() => {
    handleGetAllPostulations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = postulationsLoading;

  // Combine error states: localError (from getAllPostulations) or filterHookError (from useApplicationFilters)
  const displayError = localError || filterHookError;

  if (isLoading) {
    return <LoadingSpinner fullScreen message={translate('dashboard.loading')} />;
  }

  if (displayError) {
    return (
      <ActionModal
        isOpen={true}
        onClose={() => {
          if (localError) clearLocalError();
          if (filterHookError) clearFilterHookError();
          // Consider if reload is always the best option, or if specific errors need different handling
          // For now, keeping reload as per original logic for general errors.
          window.location.reload();
        }}
        title={translate('dashboard.error')}
        message={typeof displayError === 'string' ? displayError : translate('dashboard.errorMessage')}
        onConfirm={() => {
          if (localError) clearLocalError();
          if (filterHookError) clearFilterHookError();
          window.location.reload();
        }}
        confirmText={translate('dashboard.reload')}
        variant="danger"
        icon={<AlertCircle className="h-6 w-6" />}
      />
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-violet-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-0 py-0 font-sans transition-colors duration-200" role="main">
      <div className="container mx-auto px-3 sm:px-1 md:px-2 py-8">
        <header>
          <DashboardHeader />
        </header>
        <div className="border-b border-white/30 mb-8" role="separator" aria-hidden="true" />

        <section className="mb-10" aria-labelledby="search-section">
          <h2 id="search-section" className="sr-only">Búsqueda y filtros</h2>
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full">
              <SearchAndFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                companyFilter={companyFilter}
                setCompanyFilter={setCompanyFilter}
                positionFilter={positionFilter}
                setPositionFilter={setPositionFilter}
                companies={companies as string[]}
                positions={positions as string[]}
              />
            </div>
          </div>

          <ApplicationGrid
            applications={currentApplications}
            allPostulationsCount={postulations.length}
            filteredApplicationsCount={filteredApplications.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </section>

        <section className="mb-6" aria-labelledby="stats-section">
          <h2 id="stats-section" className="sr-only">Estadísticas de aplicaciones</h2>
          <div>
            <ApplicationStats />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
