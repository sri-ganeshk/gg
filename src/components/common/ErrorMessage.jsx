import React from 'react';

/**
 * Reusable Error Message Component
 */
const ErrorMessage = ({ 
  error, 
  onRetry, 
  retryText = 'Try Again',
  className = '',
  showRetry = true 
}) => {
  return (
    <div 
      className={`flex justify-center items-center h-[50vh] text-blue-800 text-xl ${className}`}
      role="alert"
    >
      <div className="text-center bg-cream-50 p-8 rounded-xl border-2 border-blue-300 shadow-lg">
        <div className="mb-4">
          <svg 
            className="w-16 h-16 mx-auto text-blue-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        <p className="mb-4 text-blue-900 font-medium">Error: {error}</p>
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-blue-500 text-cream-50 rounded-lg hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-sm hover:shadow-md font-medium"
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;