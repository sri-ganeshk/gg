import React from 'react';
import { useFileUpload } from '../hooks/useFileUpload';
import FileDropZone from '../components/common/FileDropZone';
import Button from '../components/common/Button';
import { FILE_UPLOAD } from '../constants';

const Upload = () => {
  const {
    file,
    dragActive,
    uploadLoading,
    uploadError,
    uploadSuccess,
    handleFileChange,
    handleDragEvents,
    handleDrop,
    handleSubmit,
    removeFile,
    formatFileSize
  } = useFileUpload();

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-200 px-4 py-8">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-cream-50 rounded-xl p-8 space-y-6 shadow-lg border-2 border-beige-300">
          <header className="text-center">
            <div className="bg-blue-500 text-cream-50 p-4 rounded-xl font-bold text-2xl mb-4 mx-auto w-16 h-16 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-blue-900">
              Upload Course Material
            </h1>
            <p className="mt-3 text-beige-800 text-lg leading-relaxed">
              Upload a PDF, document, or text file to generate a course summary and chapters
            </p>
          </header>

          {/* File Upload Area */}
          <FileDropZone
            file={file}
            dragActive={dragActive}
            onFileChange={handleFileChange}
            onDragEvents={handleDragEvents}
            onDrop={handleDrop}
            onRemoveFile={removeFile}
            disabled={uploadLoading}
            acceptedTypes={FILE_UPLOAD.ACCEPTED_TYPES}
            maxSize="10MB"
            formatFileSize={formatFileSize}
          />

          {/* Error Message */}
          {uploadError && (
            <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4" role="alert">
              <p className="text-sm text-blue-800 font-medium">{uploadError}</p>
            </div>
          )}

          {/* Success Message */}
          {uploadSuccess && (
            <div className="bg-sky-200 border-2 border-sky-300 rounded-lg p-4" role="alert">
              <p className="text-sm text-blue-800 font-medium">{uploadSuccess}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="medium"
            loading={uploadLoading}
            disabled={!file || uploadLoading}
            className="w-full"
            loadingText="Analyzing file..."
          >
            Upload and Analyze
          </Button>

          {/* File Requirements */}
          <div className="text-center bg-beige-200 p-4 rounded-lg">
            <p className="text-xs text-beige-800 font-medium">
              Supported formats: {FILE_UPLOAD.ACCEPTED_TYPES.join(', ').replace(/\./g, '').toUpperCase()} • 
              Maximum size: {FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;