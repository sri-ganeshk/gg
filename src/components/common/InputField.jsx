import React from 'react';

/**
 * Reusable Input Field Component
 */
const InputField = ({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  autoComplete,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          className="block text-sm font-medium text-blue-800 mb-2"
          htmlFor={id}
        >
          {label}
          {required && <span className="text-blue-600 ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
          error 
            ? 'border-blue-400 focus:ring-blue-300 bg-blue-50' 
            : 'border-beige-300 focus:ring-blue-200 focus:border-blue-400 bg-cream-100'
        } ${disabled ? 'bg-beige-200 cursor-not-allowed text-beige-600' : 'text-blue-900'} placeholder-beige-600`}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p 
          id={`${id}-error`}
          className="mt-2 text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded-md border border-blue-200"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;