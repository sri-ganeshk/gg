import React from 'react';

/**
 * Empty State Component for Dashboard when no courses exist
 */
const EmptyState = ({ onCreateNew }) => {
  return (
    <div className="bg-gradient-to-br from-cream-50 to-beige-100 rounded-xl shadow-lg border-2 border-beige-300 p-12 text-center">
      <div className="w-24 h-24 mx-auto mb-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
        <svg 
          className="w-12 h-12 text-cream-50" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-blue-900 mb-3">No courses yet</h3>
      <p className="text-beige-800 mb-8 text-lg max-w-md mx-auto leading-relaxed">
        Get started by uploading your first course material and begin your learning journey
      </p>
      <button
        onClick={onCreateNew}
        className="inline-flex items-center px-8 py-4 bg-blue-500 text-cream-50 rounded-xl hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
      >
        <svg 
          className="w-5 h-5 mr-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Upload First Course
      </button>
    </div>
  );
};

export default EmptyState;