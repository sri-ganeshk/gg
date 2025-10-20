import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/dashboard/EmptyState';
import CoursesTable from '../components/dashboard/CoursesTable';
import { LOADING_MESSAGES } from '../constants';

const Dashboard = () => {
  const {
    courses,
    coursesLoading,
    coursesError,
    handleCreateNew,
    handleCourseClick,
    refetchCourses
  } = useDashboard();

  if (coursesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-200">
        <div className="bg-cream-50 p-8 rounded-xl shadow-lg border border-beige-300">
          <LoadingSpinner size="large" text={LOADING_MESSAGES.COURSES} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 bg-cream-50 p-6 rounded-xl shadow-lg border border-beige-300">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">My Courses</h1>
            <p className="text-beige-800 mt-2 text-lg">Manage and view your course materials</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-cream-50 rounded-xl hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Course
          </button>
        </header>

        {/* Error Message */}
        {coursesError && (
          <ErrorMessage 
            error={coursesError}
            onRetry={refetchCourses}
            retryText="Retry Loading Courses"
            className="mb-6 h-auto"
            showRetry={true}
          />
        )}

        {/* Main Content */}
        <main>
          {courses.length === 0 ? (
            <EmptyState onCreateNew={handleCreateNew} />
          ) : (
            <CoursesTable 
              courses={courses} 
              onCourseClick={handleCourseClick} 
            />
          )}

          {/* Course Count */}
          {courses.length > 0 && (
            <div className="mt-6 text-center bg-beige-200 p-4 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;