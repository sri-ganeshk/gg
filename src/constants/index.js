// UI Constants
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  ALL: 'all'
};

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  SHORT_ANSWER: 'short-answer',
  ESSAY: 'essay',
  ALL: 'all'
};

export const TAB_TYPES = {
  COURSE: 'course',
  FLASHCARDS: 'flashcards',
  QNA: 'qna'
};

export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Style Constants - Updated for custom color palette
export const DIFFICULTY_COLORS = {
  [DIFFICULTY_LEVELS.EASY]: 'bg-sky-200 text-blue-800 border border-sky-300',
  [DIFFICULTY_LEVELS.MEDIUM]: 'bg-beige-300 text-blue-900 border border-beige-400',
  [DIFFICULTY_LEVELS.HARD]: 'bg-blue-200 text-blue-900 border border-blue-300',
  default: 'bg-cream-100 text-blue-800 border border-cream-300'
};

export const QUESTION_TYPE_COLORS = {
  [QUESTION_TYPES.MULTIPLE_CHOICE]: 'bg-blue-100 text-blue-800 border border-blue-200',
  [QUESTION_TYPES.SHORT_ANSWER]: 'bg-sky-200 text-blue-800 border border-sky-300',
  [QUESTION_TYPES.ESSAY]: 'bg-beige-200 text-blue-800 border border-beige-300',
  default: 'bg-cream-100 text-blue-800 border border-cream-300'
};

// Messages
export const ERROR_MESSAGES = {
  COURSE_NOT_FOUND: 'No course data found',
  FLASHCARDS_NOT_AVAILABLE: 'No flashcards available for this course.',
  QNA_NOT_AVAILABLE: 'No Q&A available for this course.',
  COURSE_FETCH_ERROR: 'Error fetching course',
  NO_MATCHING_FILTERS: 'No items match the selected filters.',
  UNAUTHORIZED: 'Unauthorized access',
  NETWORK_ERROR: 'Network error occurred'
};

export const LOADING_MESSAGES = {
  COURSE: 'Loading course...',
  FLASHCARDS: 'Flashcards are being generated...',
  QNA: 'Questions & Answers are being generated...',
  COURSES: 'Loading your courses...'
};

// API Constants
export const API_ENDPOINTS = {
  COURSES: '/courses',
  COURSE_BY_ID: (id) => `/courses/${id}`,
  LOGIN: '/login',
  REGISTER: '/register',
  UPLOAD: '/upload'
};

// Form validation
export const FORM_VALIDATION = {
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters'
};

// File upload constants
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_TYPES: ['.pdf', '.doc', '.docx', '.txt', '.md'],
  ACCEPTED_MIME_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/markdown'
  ]
};

// Auth form modes
export const AUTH_MODES = {
  LOGIN: 'login',
  REGISTER: 'register'
};