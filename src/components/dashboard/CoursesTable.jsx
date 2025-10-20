import React from 'react';

/**
 * Course Table Component for Dashboard
 */
const CoursesTable = ({ courses, onCourseClick }) => {
  const getCourseTitle = (course) => {
    return course.title || course.courseTitle || 'Untitled Course';
  };

  return (
    <div className="bg-cream-50 rounded-xl shadow-lg border-2 border-beige-300 overflow-hidden">
      <table className="min-w-full divide-y divide-beige-300">
        <thead className="bg-gradient-to-r from-beige-200 to-cream-200">
          <tr>
            <th 
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider"
            >
              Course Title
            </th>
            <th 
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-cream-50 divide-y divide-beige-200">
          {courses.map((course) => (
            <tr 
              key={course._id} 
              className="hover:bg-sky-100 cursor-pointer transition-all duration-200 hover:shadow-sm"
              onClick={() => onCourseClick(course._id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12">
                    <div className="h-12 w-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-sm">
                      <svg 
                        className="w-6 h-6 text-cream-50" 
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
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-blue-900 truncate max-w-xs">
                      {getCourseTitle(course)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCourseClick(course._id);
                  }}
                  className="bg-blue-500 text-cream-50 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm hover:shadow-md"
                >
                  View Course
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;