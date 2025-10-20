import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { uploadService } from '../services/uploadService';

const Upload = () => {
  const navigate = useNavigate();
  const { 
    getToken, 
    logout,
    uploadLoading,
    uploadError,
    uploadSuccess,
    setUploadLoading,
    setUploadError,
    setUploadSuccess,
    clearUploadMessages
  } = useAuthStore();
  
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    clearUploadMessages();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      clearUploadMessages();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadError('Please select a file to upload');
      return;
    }

    const token = getToken();
    if (!token) {
      setUploadError('Please login first');
      navigate('/login');
      return;
    }

    setUploadLoading(true);
    clearUploadMessages();

    try {
      const response = await uploadService.uploadFile(file, token);
      
      setUploadSuccess('File uploaded and analyzed successfully!');
      setFile(null);

      navigate(`/course/${response.courseId}`);

    } catch (err) {
      console.error('Upload error:', err);
      
      if (err.response?.status === 401) {
        setUploadError('Authentication failed. Please login again.');
        logout();
        navigate('/login');
      } else {
        setUploadError(err.response?.data?.error || 'Upload failed. Please try again.');
      }
    } finally {
      setUploadLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    clearUploadMessages();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 space-y-6">
          <h1 className="text-3xl font-light text-center text-gray-900">
            Upload Course Material
          </h1>
          
          <p className="text-center text-gray-600 text-sm">
            Upload a PDF, document, or text file to generate a course summary and chapters
          </p>

          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : file 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.md"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploadLoading}
            />
            
            {file ? (
              <div className="space-y-2">
                <div className="text-green-600">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-gray-400">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {dragActive ? 'Drop your file here' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT, MD up to 10MB</p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {uploadError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{uploadError}</p>
            </div>
          )}

          {/* Success Message */}
          {uploadSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-sm text-green-600">{uploadSuccess}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!file || uploadLoading}
            className={`w-full py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              !file || uploadLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {uploadLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing file...</span>
              </div>
            ) : (
              'Upload and Analyze'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;