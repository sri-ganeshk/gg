import React from 'react';
import LoadingSpinner from './common/LoadingSpinner';

/**
 * Loading Content Component for tab content that's being generated
 */
const LoadingContent = ({ message, subtitle }) => {
  const defaultSubtitle = "This usually takes a few moments. Please refresh the page in a minute.";
  
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center px-6 py-3 bg-sky-200 text-blue-800 rounded-xl border-2 border-sky-300 shadow-lg">
        <LoadingSpinner size="small" text="" />
        <div className="ml-3">
          <p className="font-semibold">{message}</p>
          <p className="text-sm text-blue-700 mt-1">
            {subtitle || defaultSubtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingContent;