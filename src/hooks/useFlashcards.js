import { useState, useCallback } from 'react';

/**
 * Custom hook for managing flashcard navigation and flip state
 */
export const useFlashcards = (flashcards = []) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const resetCard = useCallback(() => {
    setIsFlipped(false);
  }, []);

  const nextCard = useCallback(() => {
    if (flashcards.length === 0) return;
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    resetCard();
  }, [flashcards.length, resetCard]);

  const prevCard = useCallback(() => {
    if (flashcards.length === 0) return;
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    resetCard();
  }, [flashcards.length, resetCard]);

  const flipCard = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const goToCard = useCallback((index) => {
    if (index >= 0 && index < flashcards.length) {
      setCurrentCardIndex(index);
      resetCard();
    }
  }, [flashcards.length, resetCard]);

  const resetToFirst = useCallback(() => {
    setCurrentCardIndex(0);
    resetCard();
  }, [resetCard]);

  return {
    currentCardIndex,
    isFlipped,
    currentCard: flashcards[currentCardIndex] || null,
    nextCard,
    prevCard,
    flipCard,
    goToCard,
    resetToFirst,
    hasCards: flashcards.length > 0,
    totalCards: flashcards.length
  };
};