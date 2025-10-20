import React from 'react';
import { getDifficultyColor, getQuestionTypeColor } from '../../utils/helpers';

/**
 * Reusable Badge Component for displaying tags, difficulty, etc.
 */
const Badge = ({ 
  type = 'default', 
  variant = 'difficulty', 
  children, 
  className = '' 
}) => {
  const getVariantColor = () => {
    switch (variant) {
      case 'difficulty':
        return getDifficultyColor(type);
      case 'questionType':
        return getQuestionTypeColor(type);
      case 'category':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'tag':
        return 'bg-beige-200 text-beige-800 border border-beige-300';
      case 'success':
        return 'bg-sky-200 text-blue-800 border border-sky-300';
      case 'warning':
        return 'bg-beige-300 text-blue-900 border border-beige-400';
      case 'error':
        return 'bg-blue-200 text-blue-900 border border-blue-300';
      case 'featured':
        return 'bg-blue-500 text-cream-50 shadow-sm';
      case 'primary':
        return 'bg-blue-100 text-blue-900 border border-blue-200';
      default:
        return 'bg-cream-100 text-blue-800 border border-cream-300';
    }
  };

  const colorClass = getVariantColor();

  return (
    <span 
      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;