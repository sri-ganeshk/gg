import React from 'react';

/**
 * Individual Flashcard View Component
 */
const FlashcardView = ({ card, isFlipped, onFlip }) => {
  if (!card) return null;

  return (
    <div className="relative mb-6">
      <div 
        className="w-full h-96 cursor-pointer perspective-1000"
        onClick={onFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onFlip();
          }
        }}
        aria-label={isFlipped ? 'Click to see question' : 'Click to reveal answer'}
      >
        <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front of card (Question) */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-sky-100 border-2 border-sky-300 rounded-xl p-6 flex flex-col justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-900 mb-4 bg-sky-200 px-4 py-2 rounded-lg">Question</h3>
              <p className="text-lg text-blue-800 leading-relaxed">{card.front}</p>
            </div>
            <div className="absolute bottom-4 text-sm text-beige-700 bg-beige-200 px-3 py-1 rounded-full">
              Click to reveal answer
            </div>
          </div>

          {/* Back of card (Answer) */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-cream-100 border-2 border-beige-400 rounded-xl p-6 flex flex-col justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-900 mb-4 bg-beige-300 px-4 py-2 rounded-lg">Answer</h3>
              <p className="text-lg text-blue-800 leading-relaxed">{card.back}</p>
            </div>
            <div className="absolute bottom-4 text-sm text-beige-700 bg-beige-200 px-3 py-1 rounded-full">
              Click to see question
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardView;