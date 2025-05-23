import React, { useState, useMemo } from 'react';
import { usePostulationsStore, useAuthStore } from '../store';
import ApplicationCard from '../components/organisms/ApplicationCard';
import SearchAndFilter from '../components/organisms/SearchAndFilter';
import ApplicationStats from '../components/organisms/ApplicationStats';
import { Postulation, PostulationStatus } from '../types/interface/postulations/postulation';
import { AlertCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useErrorHandler } from '../hooks/useErrorHandler';
import ActionModal from '../components/molecules/ActionModal';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import { MdAccountCircle } from 'react-icons/md';

const Dashboard: React.FC = () => {
  const { postulations, loading } = usePostulationsStore();
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PostulationStatus | 'all'>('all');
  const [companyFilter, setCompanyFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const { error, handleError } = useErrorHandler({
    defaultMessage: 'Ocurrió un error al cargar los datos. Por favor, recarga la página.'
  });

  // Manejadores de filtro seguros
  const handleSetCompanyFilter = (value: string) => {
    try {
      setCompanyFilter(value);
    } catch (error) {
      handleError(error as Error, 'Error al configurar el filtro de empresa');
      // Restablecer el filtro en caso de error
      setCompanyFilter('');
    }
  };

  const handleSetPositionFilter = (value: string) => {
    try {
      setPositionFilter(value);
    } catch (error) {
      handleError(error as Error, 'Error al configurar el filtro de puesto');
    }
  };

  // Get unique companies and positions for filters
  const companies = useMemo(() => {
    try {
      const uniqueCompanies = new Set(postulations.map((app: Postulation) => app.company));
      return Array.from(uniqueCompanies).sort();
    } catch (error) {
      handleError(error as Error, 'Error al obtener empresas únicas');
      return [];
    }
  }, [postulations]);

  const positions = useMemo(() => {
    try {
      const uniquePositions = new Set(postulations.map((app: Postulation) => app.position));
      return Array.from(uniquePositions).sort();
    } catch (error) {
      handleError(error as Error, 'Error al obtener puestos únicos');
      return [];
    }
  }, [postulations]);

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
      handleError(error as Error, 'Error al filtrar aplicaciones');
      return [];
    }
  }, [postulations, searchTerm, statusFilter, companyFilter, positionFilter]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <ActionModal
        isOpen={true}
        onClose={() => window.location.reload()}
        title="Error"
        message={error}
        onConfirm={() => window.location.reload()}
        confirmText="Recargar página"
        variant="danger"
        icon={<AlertCircle className="h-6 w-6" />}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 px-0 py-0 font-sans">
      <div className="container mx-auto px-4 sm:px-8 py-10">
        {/* Encabezado con bienvenida mejorado */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 p-6">
          <div className="flex items-center gap-4">
            <MdAccountCircle className="text-7xl text-blue-500 drop-shadow-lg bg-white/30 rounded-full p-1" />
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text mb-1">
                ¡Bienvenido de nuevo, {user?.name || 'Usuario'}!
              </h2>
              <span className="text-lg text-gray-700 font-semibold tracking-wide">Dashboard</span>
            </div>
          </div>
          <Link
            to="/dashboard/add"
            className="mt-6 md:mt-0 flex items-center px-6 py-3 rounded-xl shadow-lg text-white font-semibold text-lg transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)' }}
          >
            <PlusCircle className="mr-2 h-6 w-6" />
            Nueva Postulación
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
            <div className="bg-blue-200/30 border-l-4 border-blue-400 p-8 rounded-2xl shadow-md backdrop-blur-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-base text-blue-700">
                    No tienes postulaciones registradas. ¡Comienza agregando tu primera postulación!
                  </p>
                </div>
              </div>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="bg-yellow-200/30 border-l-4 border-yellow-400 p-8 rounded-2xl shadow-md backdrop-blur-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-base text-yellow-700">
                    No se encontraron resultados con los filtros actuales.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredApplications.map((application: Postulation) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          )}
        </section>

        {/* Sección de estadísticas */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Resumen</h2>
          <div className="rounded-2xl shadow-md bg-white/0 backdrop-blur-none">
            <ApplicationStats />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
