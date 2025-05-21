import React from 'react';

interface AuthBackgroundProps {
  imagePath: string;
  children: React.ReactNode;
}

const AuthBackground: React.FC<AuthBackgroundProps> = ({ imagePath, children }) => {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${imagePath}")`
      }}
    >
      {children}
    </div>
  );
};

export default AuthBackground;
