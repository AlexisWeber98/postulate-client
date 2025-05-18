import React, { useState, useMemo, useEffect } from 'react';
import { usePostulationsStore, useAuthStore } from '../store';
import ApplicationCard from '../components/organisms/ApplicationCard';
import SearchAndFilter from '../components/organisms/SearchAndFilter';
import ApplicationStats from '../components/organisms/ApplicationStats';
import { Postulation, PostulationStatus } from '../types/interface/postulations/postulation';
import { AlertCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_COLORS } from '../styles/colors';

const Dashboard: React.FC = () => {
  const { postulations } = usePostulationsStore();
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
      const [statusFilter, setStatusFilter] = useState<PostulationStatus | 'all'>('all');
  const [companyFilter, setCompanyFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // Estado para errores
  const [error, setError] = useState<string | null>(null);

  // Simulate loading state - reducido a 300ms para una mejor experiencia
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Manejadores de filtro seguros
  const handleSetCompanyFilter = (value: string) => {
    try {
      setCompanyFilter(value);
    } catch (error) {
      console.error("Error al configurar el filtro de empresa:", error);
      setError("Ocurrió un error con los filtros. Por favor, recarga la página.");
      // Restablecer el filtro en caso de error
      setCompanyFilter('');
    }
  };

  const handleSetPositionFilter = (value: string) => {
    try {
      setPositionFilter(value);
    } catch (error) {
      console.error("Error al configurar el filtro de puesto:", error);
      setError("Ocurrió un error con los filtros. Por favor, recarga la página.");
      // Restablecer el filtro en caso de error
      setPositionFilter('');
    }
  };

  // Get unique companies and positions for filters
  const companies = useMemo(() => {
    try {
      const uniqueCompanies = new Set(postulations.map((app: Postulation) => app.company));
      return Array.from(uniqueCompanies).sort();
    } catch (error) {
      console.error("Error al obtener empresas únicas:", error);
      return [];
    }
  }, [postulations]);

  const positions = useMemo(() => {
    try {
      const uniquePositions = new Set(postulations.map((app: Postulation) => app.position));
      return Array.from(uniquePositions).sort();
    } catch (error) {
      console.error("Error al obtener puestos únicos:", error);
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
      console.error("Error al filtrar aplicaciones:", error);
      setError("Ocurrió un error al filtrar. Por favor, recarga la página.");
      return [];
    }
  }, [postulations, searchTerm, statusFilter, companyFilter, positionFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // Si hay un error, mostrar mensaje de error
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-xl shadow-sm max-w-2xl">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-base text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Recargar página
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8 font-sans">
      {/* Encabezado con bienvenida */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">¡Bienvenido de nuevo, {user?.name || 'Usuario'}!</p>
        </div>

        <Link
          to="/add"
          className="mt-4 md:mt-0 flex items-center px-5 py-2.5 rounded-lg shadow-sm text-white font-medium"
          style={{ background: APP_COLORS.blue }}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Nueva Postulación
        </Link>
      </div>

      {/* Cards de postulaciones - NIVEL 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tus Postulaciones</h2>

        {/* Sección de búsqueda y filtros */}
        <div className="mb-6">
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

        {postulations.length === 0 ? (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-sm">
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
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-sm">
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
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredApplications.map((application: Postulation) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}
      </section>

      {/* Sección de estadísticas */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Resumen</h2>
        <ApplicationStats />
      </section>
    </div>
  );
};

export default Dashboard;
