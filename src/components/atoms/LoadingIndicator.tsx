import React from 'react';

const LoadingIndicator: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
      <p className="text-gray-600">Cargando...</p>
    </div>
  </div>
);

export default LoadingIndicator;
