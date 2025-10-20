import React from 'react';

/**
 * File Drop Zone Component
 */
const FileDropZone = ({
  file,
  dragActive,
  onFileChange,
  onDragEvents,
  onDrop,
  onRemoveFile,
  disabled = false,
  acceptedTypes = [],
  maxSize = '',
  formatFileSize
}) => {
  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
        dragActive 
          ? 'border-blue-400 bg-sky-100 scale-[1.02]' 
          : file 
          ? 'border-sky-400 bg-sky-50' 
          : 'border-beige-400 hover:border-blue-400 bg-cream-50 hover:bg-cream-100'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragEnter={onDragEvents}
      onDragLeave={onDragEvents}
      onDragOver={onDragEvents}
      onDrop={onDrop}
    >
      <input
        type="file"
        onChange={onFileChange}
        accept={acceptedTypes.join(',')}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={disabled}
        aria-label="File upload"
      />
      
      {file ? (
        <FilePreview 
          file={file} 
          onRemove={onRemoveFile} 
          formatFileSize={formatFileSize}
        />
      ) : (
        <DropZoneContent 
          dragActive={dragActive} 
          acceptedTypes={acceptedTypes}
          maxSize={maxSize}
        />
      )}
    </div>
  );
};

/**
 * File Preview Component
 */
const FilePreview = ({ file, onRemove, formatFileSize }) => (
  <div className="space-y-3">
    <div className="text-blue-600">
      <svg 
        className="w-12 h-12 mx-auto" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
    </div>
    <p className="text-sm font-medium text-blue-900">{file.name}</p>
    <p className="text-xs text-beige-700 bg-beige-200 px-3 py-1 rounded-full inline-block">
      {formatFileSize(file.size)} MB
    </p>
    <button
      type="button"
      onClick={onRemove}
      className="text-sm text-blue-700 hover:text-blue-800 transition-colors focus:outline-none focus:underline bg-blue-100 px-3 py-1 rounded-md hover:bg-blue-200"
    >
      Remove file
    </button>
  </div>
);

/**
 * Drop Zone Content Component
 */
const DropZoneContent = ({ dragActive, acceptedTypes, maxSize }) => (
  <div className="space-y-3">
    <div className="text-blue-500">
      <svg 
        className="w-12 h-12 mx-auto" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
        />
      </svg>
    </div>
    <p className="text-sm font-medium text-blue-900">
      {dragActive ? 'Drop your file here' : 'Click to upload or drag and drop'}
    </p>
    <p className="text-xs text-beige-700 bg-beige-200 px-3 py-1 rounded-full inline-block">
      {acceptedTypes.map(type => type.replace('.', '').toUpperCase()).join(', ')} up to {maxSize}
    </p>
  </div>
);

export default FileDropZone;