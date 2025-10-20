import React, { useState } from 'react';
import { useFilters } from '../hooks/useFilters';
import FilterSelect from './common/FilterSelect';
import Badge from './common/Badge';
import QuestionCard from './QuestionCard';
import { ERROR_MESSAGES, QUESTION_TYPES } from '../constants';
import { capitalize, formatKebabToTitle, truncateText } from '../utils/helpers';

const QnA = ({ qnaData }) => {
  const [showAnswers, setShowAnswers] = useState({});

  // Early return for no data
  if (!qnaData?.questions?.length) {
    return (
      <div className="text-center text-beige-800 p-8 bg-beige-200 rounded-lg">
        <p className="text-lg font-medium">{ERROR_MESSAGES.QNA_NOT_AVAILABLE}</p>
      </div>
    );
  }

  const questions = qnaData.questions;

  // Filter management
  const {
    filters,
    filterOptions,
    filteredData: filteredQuestions,
    updateFilter
  } = useFilters(questions, ['difficulty', 'type', 'chapter']);

  const toggleAnswer = (questionId) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Custom format function for chapter options
  const formatChapterLabel = (chapter) => {
    if (chapter === 'all') return 'All Chapters';
    return truncateText(chapter, 30);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <header className="text-center mb-8 bg-cream-50 p-6 rounded-xl border border-beige-300">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Questions & Answers</h2>
        <p className="text-beige-800 text-lg">Test your knowledge with practice questions</p>
      </header>

      {/* Filters */}
      <section className="mb-6 flex flex-wrap gap-4 justify-center bg-beige-200 p-4 rounded-xl" aria-label="Filter options">
        <FilterSelect
          label="Difficulty"
          value={filters.difficulty}
          options={filterOptions.difficulty}
          onChange={(value) => updateFilter('difficulty', value)}
        />
        <FilterSelect
          label="Type"
          value={filters.type}
          options={filterOptions.type}
          onChange={(value) => updateFilter('type', value)}
        />
        <FilterSelect
          label="Chapter"
          value={filters.chapter}
          options={filterOptions.chapter}
          onChange={(value) => updateFilter('chapter', value)}
          formatOptionLabel={formatChapterLabel}
          className="max-w-xs"
        />
      </section>

      {/* Results Count */}
      <div className="text-center mb-6 text-blue-800 font-medium bg-sky-200 px-4 py-2 rounded-lg inline-block" aria-live="polite">
        Showing {filteredQuestions.length} of {questions.length} questions
      </div>

      {/* Questions List */}
      <main>
        {filteredQuestions.length === 0 ? (
          <div className="text-center text-blue-800 p-8 bg-beige-200 rounded-xl border border-beige-300">
            <p className="text-lg font-medium">{ERROR_MESSAGES.NO_MATCHING_FILTERS}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                showAnswer={showAnswers[question.id]}
                onToggleAnswer={() => toggleAnswer(question.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default QnA