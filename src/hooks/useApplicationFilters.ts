import { useState, useMemo, useCallback } from 'react';
import { Postulation, PostulationStatus } from '../types/interface/postulations/postulation';
import { useErrorHandler } from './useErrorHandler';
import { useLanguageStore } from '../store';
import {
  getUniqueSortedValues,
  filterApplications,
  paginateApplications,
} from '../lib/helpers/application.helpers';

const ITEMS_PER_PAGE = 6;

export const useApplicationFilters = (initialApplications: Postulation[] = []) => {
  const { translate } = useLanguageStore();
  const { error, handleError, clearError } = useErrorHandler({
    defaultMessage: translate('dashboard.errorMessage'),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PostulationStatus | 'all'>('all');
  const [companyFilter, setCompanyFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSetCompanyFilter = useCallback((value: string) => {
    try {
      setCompanyFilter(value);
      setCurrentPage(1); // Reset page when filter changes
    } catch (err) {
      handleError(err as Error, translate('dashboard.errorCompanyFilter'));
      setCompanyFilter('');
    }
  }, [setCompanyFilter, setCurrentPage, handleError, translate]);

  const handleSetPositionFilter = useCallback((value: string) => {
    try {
      setPositionFilter(value);
      setCurrentPage(1); // Reset page when filter changes
    } catch (err) {
      handleError(err as Error, translate('dashboard.errorPositionFilter'));
      setPositionFilter('');
    }
  }, [setPositionFilter, setCurrentPage, handleError, translate]);

  const handleSetStatusFilter = useCallback((value: PostulationStatus | 'all') => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset page when filter changes
  }, [setStatusFilter, setCurrentPage]);

  const handleSetSearchTerm = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset page when search term changes
  }, [setSearchTerm, setCurrentPage]);

  const companies = useMemo(
    () =>
      getUniqueSortedValues(
        initialApplications,
        'company',
        handleError,
        translate as (key: string) => string,
        'dashboard.errorUniqueCompanies'
      ),
    [initialApplications, handleError, translate]
  );

  const positions = useMemo(
    () =>
      getUniqueSortedValues(
        initialApplications,
        'position',
        handleError,
        translate as (key: string) => string,
        'dashboard.errorUniquePositions'
      ),
    [initialApplications, handleError, translate]
  );

  const filteredApplications = useMemo(() => {
    try {
      if (!Array.isArray(initialApplications)) {
        return [];
      }
      return filterApplications(initialApplications, searchTerm, statusFilter, companyFilter, positionFilter);
    } catch (err) {
      handleError(err as Error, translate('dashboard.errorFilterApplications'));
      return [];
    }
  }, [initialApplications, searchTerm, statusFilter, companyFilter, positionFilter, handleError, translate]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  }, [filteredApplications]);

  const currentApplications = useMemo(
    () => paginateApplications(filteredApplications, currentPage, ITEMS_PER_PAGE),
    [filteredApplications, currentPage]
  );

  const handlePageChange = useCallback((page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages, setCurrentPage]);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('all');
    setCompanyFilter('');
    setPositionFilter('');
    setCurrentPage(1);
    clearError();
  }, [setSearchTerm, setStatusFilter, setCompanyFilter, setPositionFilter, setCurrentPage, clearError]);

  return {
    // State
    searchTerm,
    statusFilter,
    companyFilter,
    positionFilter,
    currentPage,
    // Setters
    setSearchTerm: handleSetSearchTerm,
    setStatusFilter: handleSetStatusFilter,
    setCompanyFilter: handleSetCompanyFilter,
    setPositionFilter: handleSetPositionFilter,
    // Derived data
    companies,
    positions,
    filteredApplications,
    totalPages,
    currentApplications,
    // Actions
    handlePageChange,
    resetFilters,
    // Error handling
    error,
    handleError,
    clearError,
    // Constants
    itemsPerPage: ITEMS_PER_PAGE,
  };
};