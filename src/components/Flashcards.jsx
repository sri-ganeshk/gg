import React, { useMemo } from 'react';
import { useFilters } from '../hooks/useFilters';
import { useFlashcards } from '../hooks/useFlashcards';
import FilterSelect from './common/FilterSelect';
import Badge from './common/Badge';
import FlashcardView from './FlashcardView';
import { ERROR_MESSAGES, DIFFICULTY_LEVELS } from '../constants';

const Flashcards = ({ flashcardsData }) => {
  // Early return for no data
  if (!flashcardsData?.flashcards?.length) {
    return (
      <div className="text-center text-beige-800 p-8 bg-beige-200 rounded-lg">
        <p className="text-lg font-medium">{ERROR_MESSAGES.FLASHCARDS_NOT_AVAILABLE}</p>
      </div>
    );
  }

  const flashcards = flashcardsData.flashcards;
  
  // Filter management
  const {
    filters,
    filterOptions,
    filteredData: filteredCards,
    updateFilter,
    resetFilters
  } = useFilters(flashcards, ['category', 'difficulty']);

  // Flashcard navigation
  const {
    currentCardIndex,
    isFlipped,
    currentCard,
    nextCard,
    prevCard,
    flipCard,
    resetToFirst,
    totalCards
  } = useFlashcards(filteredCards);

  // Reset to first card when filters change
  React.useEffect(() => {
    resetToFirst();
  }, [filteredCards.length, resetToFirst]);

  // No filtered results
  if (filteredCards.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center text-blue-800 p-8 bg-beige-200 rounded-xl border border-beige-300">
          <p className="mb-4 text-lg font-medium">{ERROR_MESSAGES.NO_MATCHING_FILTERS}</p>
          <button 
            onClick={resetFilters}
            className="px-6 py-3 bg-blue-500 text-cream-50 rounded-lg hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-sm hover:shadow-md font-medium"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <header className="text-center mb-8 bg-cream-50 p-6 rounded-xl border border-beige-300">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Flashcards</h2>
        <p className="text-beige-800 text-lg">Study with interactive flashcards</p>
      </header>

      {/* Filters */}
      <section className="mb-6 flex flex-wrap gap-4 justify-center bg-beige-200 p-4 rounded-xl" aria-label="Filter options">
        <FilterSelect
          label="Category"
          value={filters.category}
          options={filterOptions.category}
          onChange={(value) => updateFilter('category', value)}
        />
        <FilterSelect
          label="Difficulty"
          value={filters.difficulty}
          options={filterOptions.difficulty}
          onChange={(value) => updateFilter('difficulty', value)}
        />
      </section>

      {/* Card Counter */}
      <div className="text-center mb-4">
        <span className="text-blue-800 font-medium bg-sky-200 px-4 py-2 rounded-lg" aria-live="polite">
          Card {currentCardIndex + 1} of {totalCards}
        </span>
      </div>

      {/* Flashcard */}
      <FlashcardView
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={flipCard}
      />

      {/* Card Info */}
      <section className="text-center mb-6" aria-label="Card information">
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge 
            type={currentCard.difficulty} 
            variant="difficulty"
          >
            {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
          </Badge>
          <Badge variant="category">
            {currentCard.category}
          </Badge>
        </div>
        {currentCard.tags?.length > 0 && (
          <div className="mt-2 flex justify-center gap-2 flex-wrap">
            {currentCard.tags.map((tag, index) => (
              <Badge key={index} variant="tag" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </section>

      {/* Navigation */}
      <nav className="flex justify-center gap-4" aria-label="Flashcard navigation">
        <button
          onClick={prevCard}
          className="px-6 py-3 bg-beige-300 text-blue-800 rounded-lg hover:bg-beige-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-beige-400 focus:ring-offset-2 font-medium"
          disabled={totalCards <= 1}
          aria-label="Previous card"
        >
          Previous
        </button>
        <button
          onClick={flipCard}
          className="px-6 py-3 bg-blue-500 text-cream-50 rounded-lg hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-sm hover:shadow-md font-medium"
          aria-label={isFlipped ? 'Show question' : 'Show answer'}
        >
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </button>
        <button
          onClick={nextCard}
          className="px-6 py-3 bg-beige-300 text-blue-800 rounded-lg hover:bg-beige-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-beige-400 focus:ring-offset-2 font-medium"
          disabled={totalCards <= 1}
          aria-label="Next card"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Flashcards