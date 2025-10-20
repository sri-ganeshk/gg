import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth store slices for better organization
 */

// Auth slice
const createAuthSlice = (set, get) => ({
  // Auth State
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,

  // Auth Actions
  login: (token, userData = null) => {
    localStorage.setItem('token', token);
    set({
      isAuthenticated: true,
      token,
      user: userData,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      isAuthenticated: false,
      token: null,
      user: null,
      courses: [], // Clear courses on logout
    });
  },

  setLoading: (loading) => set({ loading }),

  // Initialize auth state from localStorage
  initializeAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({
        isAuthenticated: true,
        token,
      });
    }
  },

  // Check if user is authenticated
  checkAuth: () => {
    const { token } = get();
    return !!token && !!localStorage.getItem('token');
  },

  // Get auth token
  getToken: () => {
    const { token } = get();
    return token || localStorage.getItem('token');
  }
});

// Upload slice
const createUploadSlice = (set) => ({
  // Upload State
  uploadLoading: false,
  uploadError: null,
  uploadSuccess: null,

  // Upload Actions
  setUploadLoading: (loading) => set({ uploadLoading: loading }),
  setUploadError: (error) => set({ uploadError: error }),
  setUploadSuccess: (success) => set({ uploadSuccess: success }),
  clearUploadMessages: () => set({ uploadError: null, uploadSuccess: null })
});

// Courses slice
const createCoursesSlice = (set) => ({
  // Courses State
  courses: [],
  coursesLoading: false,
  coursesError: null,

  // Courses Actions
  setCourses: (courses) => set({ courses }),
  setCoursesLoading: (loading) => set({ coursesLoading: loading }),
  setCoursesError: (error) => set({ coursesError: error }),
  addCourse: (course) => set((state) => ({ 
    courses: [...state.courses, course] 
  })),
  clearCoursesError: () => set({ coursesError: null })
});

/**
 * Main auth store combining all slices
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      ...createAuthSlice(set, get),
      ...createUploadSlice(set),
      ...createCoursesSlice(set)
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user 
      }), // only persist these fields
    }
  )
);

export default useAuthStore;