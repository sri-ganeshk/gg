import React from 'react';
import Badge from './common/Badge';
import { capitalize, formatKebabToTitle } from '../utils/helpers';
import { QUESTION_TYPES } from '../constants';

/**
 * Individual Question Card Component
 */
const QuestionCard = ({ question, showAnswer, onToggleAnswer }) => {
  const renderMultipleChoiceOptions = () => {
    if (question.type !== QUESTION_TYPES.MULTIPLE_CHOICE || !question.options) {
      return null;
    }

    return (
      <div className="mt-4">
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                showAnswer && option === question.correct_option 
                  ? 'bg-sky-200 border-sky-400 shadow-sm' 
                  : 'bg-cream-100 border-beige-300 hover:bg-cream-200'
              }`}
            >
              <span className="font-bold mr-2 text-blue-800">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="text-blue-900">{option}</span>
              {showAnswer && option === question.correct_option && (
                <span className="ml-2 text-blue-700 font-bold bg-sky-300 px-2 py-1 rounded-full text-sm" aria-label="Correct answer">
                  ✓ Correct
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAnswer = () => {
    if (!showAnswer || !question.answer) return null;

    return (
      <section className="mt-4 p-4 bg-beige-200 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-bold text-blue-900 mb-2">Answer:</h4>
        <div className="text-blue-800 leading-relaxed">
          {question.answer.split('\\n').map((paragraph, index) => (
            <p key={index} className="mb-2 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    );
  };

  return (
    <article className="bg-cream-50 border-2 border-beige-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
      {/* Question Header */}
      <header className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge 
              type={question.difficulty} 
              variant="difficulty"
            >
              {capitalize(question.difficulty)}
            </Badge>
            <Badge 
              type={question.type} 
              variant="questionType"
            >
              {formatKebabToTitle(question.type)}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            Question {question.id}
          </h3>
        </div>
      </header>

      {/* Question Text */}
      <section className="mb-4">
        <p className="text-blue-800 leading-relaxed text-base font-medium bg-beige-100 p-4 rounded-lg border border-beige-300">
          {question.question}
        </p>
      </section>

      {/* Multiple Choice Options */}
      {renderMultipleChoiceOptions()}

      {/* Chapter Info */}
      <footer className="mt-4 mb-4">
        <span className="text-sm text-beige-800 bg-beige-200 px-3 py-1 rounded-full">
          <strong>Chapter:</strong> {question.chapter}
        </span>
      </footer>

      {/* Show/Hide Answer Button */}
      <div className="mb-4">
        <button
          onClick={onToggleAnswer}
          className="px-6 py-3 bg-blue-500 text-cream-50 rounded-lg hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-sm hover:shadow-md font-medium"
          aria-expanded={showAnswer}
          aria-controls={`answer-${question.id}`}
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
      </div>

      {/* Answer */}
      <div id={`answer-${question.id}`}>
        {renderAnswer()}
      </div>
    </article>
  );
};

export default QuestionCard;