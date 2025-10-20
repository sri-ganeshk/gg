import { DIFFICULTY_COLORS, QUESTION_TYPE_COLORS } from '../constants';

/**
 * Gets the appropriate color class for a difficulty level
 */
export const getDifficultyColor = (difficulty) => {
  return DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.default;
};

/**
 * Gets the appropriate color class for a question type
 */
export const getQuestionTypeColor = (type) => {
  return QUESTION_TYPE_COLORS[type] || QUESTION_TYPE_COLORS.default;
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a kebab-case string to Title Case
 */
export const formatKebabToTitle = (str) => {
  if (!str) return '';
  return str
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Safely parses JSON string
 */
export const safeJsonParse = (jsonString, fallback = null) => {
  if (!jsonString || jsonString === "loading") {
    return jsonString === "loading" ? "loading" : fallback;
  }
  
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return fallback;
  }
};

/**
 * Truncates text to specified length
 */
export const truncateText = (text, maxLength = 30) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Creates a debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Gets unique values from an array of objects by a specific key
 */
export const getUniqueValues = (array, key) => {
  return [...new Set(array.map(item => item[key]))];
};

/**
 * Filters array based on multiple criteria
 */
export const filterByMultipleCriteria = (array, filters) => {
  return array.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === 'all') return true;
      return item[key] === value;
    });
  });
};

/**
 * Form validation helpers
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password, minLength = 6) => {
  return password && password.length >= minLength;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

/**
 * File validation helpers
 */
export const validateFileSize = (file, maxSizeInBytes) => {
  return file.size <= maxSizeInBytes;
};

export const validateFileType = (file, allowedTypes) => {
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  return allowedTypes.includes(fileExtension);
};

/**
 * Format file size from bytes to human readable
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};