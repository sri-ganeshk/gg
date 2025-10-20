import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useCourse } from '../hooks/useCourse';
import Flashcards from '../components/Flashcards';
import QnA from '../components/QnA';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import TabNavigation from '../components/common/TabNavigation';
import CourseContent from '../components/CourseContent';
import LoadingContent from '../components/LoadingContent';
import { TAB_TYPES, LOADING_MESSAGES, ERROR_MESSAGES } from '../constants';

const Course = () => {
  const [activeTab, setActiveTab] = useState(TAB_TYPES.COURSE);
  const { id } = useParams();
  const { getToken } = useAuthStore();
  
  const { 
    courseData, 
    flashcardsData, 
    qnaData, 
    loading, 
    error,
    refetch 
  } = useCourse(id, getToken);

  // Memoized tab configuration
  const tabsConfig = useMemo(() => {
    const flashcardsCount = flashcardsData?.flashcards?.length;
    const qnaCount = qnaData?.questions?.length;
    
    return [
      {
        id: TAB_TYPES.COURSE,
        label: 'Course Content'
      },
      {
        id: TAB_TYPES.FLASHCARDS,
        label: 'Flashcards',
        disabled: !flashcardsData || flashcardsData === "loading",
        badge: flashcardsData === "loading" 
          ? '(Generating...)' 
          : flashcardsCount 
            ? `(${flashcardsCount})` 
            : '',
        badgeColor: flashcardsData === "loading" ? 'text-orange-500' : 'text-gray-500'
      },
      {
        id: TAB_TYPES.QNA,
        label: 'Q&A',
        disabled: !qnaData || qnaData === "loading",
        badge: qnaData === "loading" 
          ? '(Generating...)' 
          : qnaCount 
            ? `(${qnaCount})` 
            : '',
        badgeColor: qnaData === "loading" ? 'text-orange-500' : 'text-gray-500'
      }
    ];
  }, [flashcardsData, qnaData]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] bg-cream-200">
        <div className="bg-cream-50 p-8 rounded-xl shadow-lg border border-beige-300">
          <LoadingSpinner size="large" text={LOADING_MESSAGES.COURSE} />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-cream-200 min-h-screen py-8">
        <ErrorMessage 
          error={error} 
          onRetry={refetch}
          retryText="Reload Course"
        />
      </div>
    );
  }

  // No course data
  if (!courseData) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl bg-cream-200">
        <div className="bg-cream-50 p-8 rounded-xl shadow-lg border border-beige-300">
          <p className="text-blue-800 font-medium">{ERROR_MESSAGES.COURSE_NOT_FOUND}</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case TAB_TYPES.COURSE:
        return <CourseContent courseData={courseData} />;
      
      case TAB_TYPES.FLASHCARDS:
        if (flashcardsData === "loading") {
          return <LoadingContent message={LOADING_MESSAGES.FLASHCARDS} />;
        }
        return <Flashcards flashcardsData={flashcardsData} />;
      
      case TAB_TYPES.QNA:
        if (qnaData === "loading") {
          return <LoadingContent message={LOADING_MESSAGES.QNA} />;
        }
        return <QnA qnaData={qnaData} />;
      
      default:
        return <CourseContent courseData={courseData} />;
    }
  };

  return (
    <div className="bg-cream-200 min-h-screen">
      <div className="max-w-6xl mx-auto p-5 font-sans">
        {/* Course Header */}
        <header className="bg-gradient-to-br from-cream-50 to-beige-100 p-8 rounded-xl mb-8 text-center shadow-lg border-2 border-beige-300">
          <h1 className="text-blue-900 mb-4 text-4xl font-bold">
            {courseData.courseTitle}
          </h1>
          <p className="text-beige-800 text-lg leading-relaxed max-w-4xl mx-auto">
            {courseData.courseSummary}
          </p>
        </header>

        {/* Tabs Navigation */}
        <TabNavigation
          tabs={tabsConfig}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <main className="bg-cream-50 rounded-b-xl shadow-lg border-2 border-t-0 border-beige-300 p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Course