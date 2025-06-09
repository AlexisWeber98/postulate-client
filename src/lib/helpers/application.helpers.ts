import { Postulation, PostulationStatus } from '../../types/interface/postulations/postulation';

const cache = new WeakMap<Postulation[], Map<keyof Postulation, string[]>>();

/**
 * Extracts unique and sorted string values from an array of postulations for a given key.
 * Uses a WeakMap for caching results to improve performance.
 *
 * @param postulations - An array of Postulation objects.
 * @param key - The key of Postulation to extract values from.
 * @param handleError - A function to handle errors.
 * @param translate - A function to translate error messages.
 * @param errorKey - The key for the error message to be translated.
 * @returns An array of unique, sorted string values, or an empty array in case of an error or invalid input.
 */
export const getUniqueSortedValues = (
  postulations: Postulation[],
  key: keyof Postulation,
  handleError: (error: Error, message: string) => void,
  translate: (key: string) => string,
  errorKey: string
): string[] => {
  try {
    const cached = cache.get(postulations)?.get(key);
    if (cached) return cached;

    if (!Array.isArray(postulations)) {
      console.warn(`⚠️ getUniqueSortedValues: postulations is not an array:`, postulations);
      return [];
    }

    const uniqueValues = new Set<string>();
    postulations.forEach((app: Postulation) => {
      if (app && app[key] !== undefined && app[key] !== null) {
        const value = app[key];
        if (typeof value === 'string') {
          uniqueValues.add(value);
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          uniqueValues.add(String(value));
        } else {
          // Optionally handle other types or log a warning
          console.warn(`⚠️ getUniqueSortedValues: Value for key '${String(key)}' is not a string, number, or boolean:`, value);
        }
      }
    });

    const result = Array.from(uniqueValues).sort();
    cache.set(postulations, (cache.get(postulations) || new Map()).set(key, result));
    return result;
  } catch (error) {
    handleError(error as Error, translate(errorKey));
    return [];
  }
};

/**
 * Filters an array of postulations based on search term, status, company, and position.
 *
 * @param postulations - An array of Postulation objects to filter.
 * @param searchTerm - The term to search for in company, position, or description.
 * @param statusFilter - The status to filter by. 'all' means no status filter.
 * @param companyFilter - The company name to filter by. Empty string means no company filter.
 * @param positionFilter - The position title to filter by. Empty string means no position filter.
 * @returns A new array containing only the postulations that match all filter criteria.
 */
export const filterApplications = (
  postulations: Postulation[],
  searchTerm: string,
  statusFilter: PostulationStatus | 'all',
  companyFilter: string,
  positionFilter: string
): Postulation[] => {
  if (!Array.isArray(postulations)) {
    console.warn(`⚠️ filterApplications: postulations is not an array:`, postulations);
    return [];
  }

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

/**
 * Paginates an array of applications.
 *
 * @param applications - An array of Postulation objects to paginate.
 * @param currentPage - The current page number (1-indexed).
 * @param itemsPerPage - The number of items to display per page.
 * @returns A new array containing the applications for the current page.
 *          Returns an empty array if inputs are invalid or no items for the page.
 */
export const paginateApplications = (
  applications: Postulation[],
  currentPage: number,
  itemsPerPage: number
): Postulation[] => {
  if (!Array.isArray(applications)) {
    console.warn(`⚠️ paginateApplications: applications is not an array:`, applications);
    return [];
  }
  if (typeof currentPage !== 'number' || currentPage < 1) {
    console.warn(`⚠️ paginateApplications: currentPage must be a positive number. Received:`, currentPage);
    return []; // Or handle as appropriate, e.g., default to page 1
  }
  if (typeof itemsPerPage !== 'number' || itemsPerPage <= 0) {
    console.warn(`⚠️ paginateApplications: itemsPerPage must be a positive number. Received:`, itemsPerPage);
    return []; // Or handle as appropriate, e.g., return all items or a default number
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  // Ensure startIndex is not out of bounds (e.g., if currentPage is too high)
  if (startIndex >= applications.length) {
    return [];
  }
  const endIndex = startIndex + itemsPerPage;
  return applications.slice(startIndex, endIndex);
};
