import React from 'react';
import Button from './Button';

/**
 * Example Card Component demonstrating the custom color palette
 * This showcases how to use all the custom colors effectively
 */
const ExampleCard = ({ 
  title = "Course Analytics", 
  description = "Track your learning progress with detailed insights and performance metrics.", 
  stats = [
    { label: "Completed", value: "24", color: "success" },
    { label: "In Progress", value: "8", color: "warning" },
    { label: "Total Points", value: "1,247", color: "info" }
  ],
  featured = false 
}) => {
  return (
    <div className={`
      relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl
      ${featured 
        ? 'bg-gradient-to-br from-blue-50 to-sky-100 border-2 border-blue-300' 
        : 'bg-cream-50 border border-beige-300'
      }
      hover:transform hover:-translate-y-1
    `}>
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-cream-50">
            Featured
          </span>
        </div>
      )}
      
      {/* Card header */}
      <div className="p-6 pb-4">
        <h3 className="text-xl font-bold text-blue-900 mb-2">
          {title}
        </h3>
        <p className="text-beige-800 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Stats section */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`
                text-center p-3 rounded-lg
                ${stat.color === 'success' ? 'bg-sky-200 border border-sky-300' : ''}
                ${stat.color === 'warning' ? 'bg-beige-200 border border-beige-400' : ''}
                ${stat.color === 'info' ? 'bg-blue-100 border border-blue-200' : ''}
              `}
            >
              <div className="text-2xl font-bold text-blue-800">
                {stat.value}
              </div>
              <div className="text-sm text-beige-700 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Action section */}
      <div className="px-6 py-4 bg-gradient-to-r from-cream-100 to-beige-100 border-t border-beige-300">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="primary" size="small">
              View Details
            </Button>
            <Button variant="secondary" size="small">
              Share
            </Button>
          </div>
          <button className="text-blue-600 hover:text-blue-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Example Navbar Component demonstrating navigation styling
 */
export const ExampleNavbar = () => {
  const navItems = ['Dashboard', 'Courses', 'Analytics', 'Settings'];
  
  return (
    <nav className="bg-gradient-to-r from-cream-200 to-beige-200 border-b-2 border-blue-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-blue-500 text-cream-50 p-2 rounded-lg font-bold text-lg">
              GG
            </div>
            <span className="ml-3 text-blue-800 font-semibold text-lg">
              Learning Platform
            </span>
          </div>
          
          {/* Navigation links */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${index === 0 
                      ? 'bg-blue-500 text-cream-50 shadow-sm' 
                      : 'text-blue-700 hover:bg-sky-200 hover:text-blue-800'
                    }
                  `}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="small">
              Profile
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

/**
 * Example Form Component demonstrating input styling
 */
export const ExampleForm = () => {
  return (
    <div className="max-w-md mx-auto bg-cream-50 p-8 rounded-xl shadow-lg border border-beige-300">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        Join Our Platform
      </h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-2">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-beige-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-cream-100 text-blue-900 placeholder-beige-600 transition-colors"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border-2 border-beige-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-cream-100 text-blue-900 placeholder-beige-600 transition-colors"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-2">
            Learning Goals
          </label>
          <select className="w-full px-4 py-3 rounded-lg border-2 border-beige-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-cream-100 text-blue-900">
            <option>Select your primary goal</option>
            <option>Professional Development</option>
            <option>Academic Study</option>
            <option>Personal Interest</option>
          </select>
        </div>
        
        <div className="pt-4">
          <Button variant="primary" className="w-full">
            Get Started
          </Button>
        </div>
        
        <p className="text-center text-sm text-beige-700">
          Already have an account?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Sign in here
          </a>
        </p>
      </form>
    </div>
  );
};

export default ExampleCard;