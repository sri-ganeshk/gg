import { useState, useCallback, useMemo } from 'react';
import { getUniqueValues, filterByMultipleCriteria } from '../utils/helpers';

/**
 * Custom hook for managing filter state and logic
 */
export const useFilters = (data, filterKeys) => {
  const [filters, setFilters] = useState(
    filterKeys.reduce((acc, key) => {
      acc[key] = 'all';
      return acc;
    }, {})
  );

  // Generate filter options
  const filterOptions = useMemo(() => {
    if (!data || !Array.isArray(data)) return {};
    
    return filterKeys.reduce((acc, key) => {
      acc[key] = ['all', ...getUniqueValues(data, key)];
      return acc;
    }, {});
  }, [data, filterKeys]);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return filterByMultipleCriteria(data, filters);
  }, [data, filters]);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(filterKeys.reduce((acc, key) => {
      acc[key] = 'all';
      return acc;
    }, {}));
  }, [filterKeys]);

  return {
    filters,
    filterOptions,
    filteredData,
    updateFilter,
    resetFilters
  };
};