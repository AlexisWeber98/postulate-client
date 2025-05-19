import React from 'react';

interface SubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, disabled, children }) => (
  <button
    type="submit"
    className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
    disabled={disabled || loading}
  >
    {loading ? <span className="loader mr-2" /> : null}
    {children}
  </button>
);

export default SubmitButton;
