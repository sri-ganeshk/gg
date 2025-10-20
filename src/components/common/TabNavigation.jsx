import React from 'react';

/**
 * Tab Navigation Component
 */
const TabNavigation = ({ 
  tabs = [], 
  activeTab, 
  onTabChange, 
  className = '' 
}) => {
  return (
    <div className={`flex border-b-2 border-beige-300 mb-8 bg-cream-100 rounded-t-lg overflow-hidden ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          disabled={tab.disabled}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-all duration-200 relative flex-1 ${
            activeTab === tab.id
              ? 'border-blue-500 text-blue-700 bg-sky-100'
              : 'border-transparent text-beige-700 hover:text-blue-700 hover:bg-cream-200'
          } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          {tab.label}
          {tab.badge && (
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              tab.badgeColor || 'bg-beige-200 text-beige-700'
            }`}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;