import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="text-center">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-text-muted">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;