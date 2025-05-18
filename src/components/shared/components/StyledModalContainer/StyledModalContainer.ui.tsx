import React from 'react';

const StyledModalContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative bg-gradient-to-br from-blue-900/80 to-blue-800/60 rounded-3xl shadow-2xl p-8 overflow-hidden backdrop-blur-md border border-blue-400/20 max-w-lg mx-auto">
    {children}
  </div>
);

export default StyledModalContainer;
