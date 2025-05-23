import React, { useState, useMemo } from 'react';
import { usePostulationsStore, useAuthStore, useLanguageStore } from '../store';
import ApplicationCard from '../components/organisms/ApplicationCard';
import SearchAndFilter from '../components/organisms/SearchAndFilter';
import ApplicationStats from '../components/organisms/ApplicationStats';
import { Postulation, PostulationStatus } from '../types/interface/postulations/postulation';
import { AlertCircle, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useErrorHandler } from '../hooks/useErrorHandler';
import ActionModal from '../components/molecules/ActionModal';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import { MdAccountCircle } from 'react-icons/md';
import Footer from '../components/organisms/Footer';

const Dashboard: React.FC = () => {
  const { postulations, loading } = usePostulationsStore();
  const { user } = useAuthStore();
  const { translate } = useLanguageStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PostulationStatus | 'all'>('all');
  const [companyFilter, setCompanyFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { error, handleError } = useErrorHandler({
    defaultMessage: translate('dashboard.errorMessage')
  });

  // Manejadores de filtro seguros
  const handleSetCompanyFilter = (value: string) => {
    try {
      setCompanyFilter(value);
    } catch (error) {
      handleError(error as Error, translate('dashboard.errorCompanyFilter'));
      // Restablecer el filtro en caso de error
      setCompanyFilter('');
    }
  };

  const handleSetPositionFilter = (value: string) => {
    try {
      setPositionFilter(value);
    } catch (error) {
      handleError(error as Error, translate('dashboard.errorPositionFilter'));
    }
  };

  const companies = useMemo(() => {
    try {
      const uniqueCompanies = new Set(postulations.map((app: Postulation) => app.company));
      return Array.from(uniqueCompanies).sort();
    } catch (error) {
      handleError(error as Error, translate('dashboard.errorUniqueCompanies'));
      return [];
    }
  }, [postulations, handleError, translate]);

  const positions = useMemo(() => {
    try {
      const uniquePositions = new Set(postulations.map((app: Postulation) => app.position));
      return Array.from(uniquePositions).sort();
    } catch (error) {
      handleError(error as Error, translate('dashboard.errorUniquePositions'));
      return [];
    }
  }, [postulations, handleError, translate]);

  // Filter applications based on search and filters
  const filteredApplications = useMemo(() => {
    try {
      return postulations.filter((app: Postulation) => {
        // Text search
        const searchMatch = searchTerm === '' ||
          app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (app.notes && app.notes.toLowerCase().includes(searchTerm.toLowerCase()));

        // Status filter
        const statusMatch = statusFilter === 'all' || app.status === statusFilter;

        // Company filter
        const companyMatch = companyFilter === '' || app.company === companyFilter;

        // Position filter
        const positionMatch = positionFilter === '' || app.position === positionFilter;

        return searchMatch && statusMatch && companyMatch && positionMatch;
      });
    } catch (error) {
      handleError(error as Error, translate('dashboard.errorFilterApplications'));
      return [];
    }
  }, [postulations, searchTerm, statusFilter, companyFilter, positionFilter, handleError, translate]);

  // Calcular el total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(filteredApplications.length / itemsPerPage);
  }, [filteredApplications]);

  // Obtener las aplicaciones para la página actual
  const currentApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredApplications.slice(startIndex, endIndex);
  }, [filteredApplications, currentPage]);

  // Manejador para cambiar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <LoadingSpinner fullScreen message={translate('dashboard.loading')} />;
  }

  if (error) {
    return (
      <ActionModal
        isOpen={true}
        onClose={() => window.location.reload()}
        title={translate('dashboard.error')}
        message={error}
        onConfirm={() => window.location.reload()}
        confirmText={translate('dashboard.reload')}
        variant="danger"
        icon={<AlertCircle className="h-6 w-6" />}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-0 py-0 font-sans transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-8 py-10">
        {/* Encabezado con bienvenida mejorado */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 p-6">
          <div className="flex items-center gap-4">
            <MdAccountCircle className="text-7xl text-blue-500 dark:text-blue-400 drop-shadow-lg bg-white/30 dark:bg-gray-800/30 rounded-full p-1" />
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 text-transparent bg-clip-text mb-1">
                {translate('dashboard.welcome').replace('{name}', user?.name || 'Usuario')}
              </h2>
              <span className="text-lg text-gray-700 dark:text-gray-300 font-semibold tracking-wide">{translate('dashboard.title')}</span>
            </div>
          </div>
          {/* Botón de nueva postulación */}
          <Link
            to="add"
            className="mt-6 md:mt-0 flex items-center px-6 py-3 rounded-xl shadow-lg text-white font-semibold text-lg transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)' }}
          >
            <PlusCircle className="mr-2 h-6 w-6" />
            {translate('dashboard.newApplication')}
          </Link>
        </header>
        <div className="border-b border-white/30 mb-10" />

        {/* Cards de postulaciones - NIVEL 2 */}
        <section className="mb-12">
          {/* Sección de búsqueda y filtros */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full">
              <SearchAndFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                companyFilter={companyFilter}
                setCompanyFilter={handleSetCompanyFilter}
                positionFilter={positionFilter}
                setPositionFilter={handleSetPositionFilter}
                companies={companies as string[]}
                positions={positions as string[]}
              />
            </div>
          </div>

          {postulations.length === 0 ? (
            <div className="bg-blue-200/30 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-500 p-8 rounded-2xl shadow-md backdrop-blur-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-blue-400 dark:text-blue-300" />
                </div>
                <div className="ml-4">
                  <p className="text-base text-blue-700 dark:text-blue-300">
                    {translate('dashboard.noApplications')}
                  </p>
                </div>
              </div>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="bg-yellow-200/30 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-8 rounded-2xl shadow-md backdrop-blur-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-yellow-400 dark:text-yellow-300" />
                </div>
                <div className="ml-4">
                  <p className="text-base text-yellow-700 dark:text-yellow-300">
                    {translate('dashboard.noResults')}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {currentApplications.map((application: Postulation) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>

              {/* Componente de paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Sección de estadísticas */}
        <section className="mb-8">

          <div>
            <ApplicationStats />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
