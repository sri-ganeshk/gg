import React from 'react';
import { capitalize, formatKebabToTitle } from '../../utils/helpers';

/**
 * Reusable Filter Select Component
 */
const FilterSelect = ({
  label,
  value,
  options = [],
  onChange,
  formatOptionLabel,
  className = '',
  ...props
}) => {
  const defaultFormatLabel = (option) => {
    if (option === 'all') {
      return `All ${label}s`;
    }
    if (label.toLowerCase() === 'type') {
      return formatKebabToTitle(option);
    }
    return capitalize(option);
  };

  const formatLabel = formatOptionLabel || defaultFormatLabel;

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-blue-800 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-3 border-2 border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-cream-100 text-blue-900 transition-all duration-200 min-w-[120px]"
        {...props}
      >
        {options.map(option => (
          <option key={option} value={option} className="py-2">
            {formatLabel(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;