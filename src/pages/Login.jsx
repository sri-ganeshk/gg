import React from 'react';
import { useAuthForm } from '../hooks/useAuthForm';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';

const Login = () => {
  const {
    isRegisterMode,
    formData,
    errors,
    loading,
    handleInputChange,
    handleSubmit,
    toggleMode
  } = useAuthForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-200 px-4">
      <div className="w-full max-w-md">
        <form
          className="bg-cream-50 rounded-xl p-8 space-y-6 shadow-lg border-2 border-beige-300"
          onSubmit={handleSubmit}
          noValidate
        >
          <header className="text-center">
            <div className="bg-blue-500 text-cream-50 p-4 rounded-xl font-bold text-2xl mb-4 mx-auto w-16 h-16 flex items-center justify-center">
              GG
            </div>
            <h1 className="text-3xl font-bold text-blue-900">
              {isRegisterMode ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="mt-3 text-beige-800 text-lg">
              {isRegisterMode 
                ? 'Join us to start creating courses' 
                : 'Sign in to your account'
              }
            </p>
          </header>
          
          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium">{errors.submit}</p>
            </div>
          )}

          <div className="space-y-5">
            <InputField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required
              autoComplete="email"
            />
            
            <InputField
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
              autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
            />
          </div>

          <div className="space-y-4 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="medium"
              loading={loading}
              disabled={loading}
              className="w-full"
              loadingText={isRegisterMode ? 'Creating Account...' : 'Signing In...'}
            >
              {isRegisterMode ? 'Create Account' : 'Sign In'}
            </Button>
            
            <button
              type="button"
              className="w-full text-sm text-blue-700 hover:text-blue-800 transition-colors focus:outline-none focus:underline bg-beige-200 py-3 rounded-lg hover:bg-beige-300 font-medium"
              onClick={toggleMode}
              disabled={loading}
            >
              {isRegisterMode
                ? 'Already have an account? Sign in'
                : "Don't have an account? Create one"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;