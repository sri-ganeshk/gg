import React from 'react';
import LoadingSpinner from './LoadingSpinner';

/**
 * Reusable Button Component
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  loadingText = 'Loading...',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-500 text-cream-50 hover:bg-blue-600 focus:ring-blue-400 shadow-sm hover:shadow-md',
    secondary: 'bg-beige-200 text-blue-800 hover:bg-beige-300 focus:ring-beige-400 border border-beige-400',
    accent: 'bg-sky-200 text-blue-700 hover:bg-sky-300 focus:ring-sky-400 border border-sky-400',
    outline: 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:ring-blue-400 bg-cream-50',
    minimal: 'bg-cream-100 text-blue-700 hover:bg-cream-200 hover:text-blue-800 focus:ring-cream-300'
  };
  
  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-6 py-4 text-lg'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <LoadingSpinner size="small" text="" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;