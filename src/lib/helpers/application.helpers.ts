import { Postulation, PostulationStatus } from '../../types/interface/postulations/postulation';

// Helper function to extract unique sorted values from postulations
export const getUniqueSortedValues = (
  postulations: Postulation[],
  key: keyof Postulation,
  handleError: (error: Error, message: string) => void,
  translate: (key: string) => string,
  errorKey: string
) => {
  try {
    if (!Array.isArray(postulations)) {
      console.warn(`⚠️ Dashboard: postulations no es un array:`, postulations);
      return [];
    }
    const uniqueValues = new Set(
      postulations
        .filter((app: Postulation) => app && app[key])
        .map((app: Postulation) => app[key] as string) // Cast to string, adjust if other types are needed
    );
    return Array.from(uniqueValues).sort();
  } catch (error) {
    handleError(error as Error, translate(errorKey));
    return [];
  }
};

// Helper function to filter applications
export const filterApplications = (
  postulations: Postulation[],
  searchTerm: string,
  statusFilter: PostulationStatus | 'all',
  companyFilter: string,
  positionFilter: string
): Postulation[] => {
  return postulations.filter((app: Postulation) => {
    if (!app) return false;

    const searchTermLower = searchTerm.toLowerCase();
    const searchMatch = searchTerm === '' ||
      (app.company?.toLowerCase().includes(searchTermLower) ?? false) ||
      (app.position?.toLowerCase().includes(searchTermLower) ?? false) ||
      (app.description?.toLowerCase().includes(searchTermLower) ?? false);

    const statusMatch = statusFilter === 'all' || app.status === statusFilter;
    const companyMatch = companyFilter === '' || app.company === companyFilter;
    const positionMatch = positionFilter === '' || app.position === positionFilter;

    return searchMatch && statusMatch && companyMatch && positionMatch;
  });
};

// Helper function for pagination
export const paginateApplications = (
  applications: Postulation[],
  currentPage: number,
  itemsPerPage: number
): Postulation[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return applications.slice(startIndex, endIndex);
};
