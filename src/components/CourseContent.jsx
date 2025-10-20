import React from 'react';

/**
 * Course Content Component - Displays course chapters and topics
 */
const CourseContent = ({ courseData }) => {
  if (!courseData?.chapters?.length) {
    return (
      <div className="text-center text-beige-800 p-8 bg-beige-200 rounded-lg">
        <p className="text-lg font-medium">No course content available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-blue-900 mb-6 text-3xl text-center font-bold">
        Course Chapters ({courseData.chapters.length})
      </h2>
      
      {courseData.chapters.map((chapter, index) => (
        <article 
          key={index} 
          className="bg-cream-50 border-2 border-beige-300 rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          {/* Chapter Header */}
          <header className="flex items-center mb-4">
            <span className="text-3xl mr-4" role="img" aria-label="Chapter emoji">
              {chapter.emoji}
            </span>
            <div>
              <h3 className="text-blue-700 m-0 text-xl font-bold">
                Chapter {index + 1}: {chapter.chapterTitle}
              </h3>
            </div>
          </header>

          {/* Chapter Summary */}
          <p className="text-beige-800 mb-5 text-base leading-relaxed italic bg-beige-100 p-4 rounded-lg border border-beige-300">
            {chapter.chapterSummary}
          </p>

          {/* Topics */}
          {chapter.topics?.length > 0 && (
            <section>
              <h4 className="text-blue-800 mb-4 text-lg font-semibold">
                Key Topics:
              </h4>
              <ul className="list-none p-0 space-y-2" role="list">
                {chapter.topics.map((topic, topicIndex) => (
                  <li 
                    key={topicIndex} 
                    className="bg-sky-100 p-3 rounded-lg border-l-4 border-blue-500 text-sm text-blue-900 hover:bg-sky-200 transition-colors duration-200"
                    role="listitem"
                  >
                    • {topic}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      ))}
    </div>
  );
};

export default CourseContent;