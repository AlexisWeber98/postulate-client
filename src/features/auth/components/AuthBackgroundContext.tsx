import React, { createContext, useContext, useState } from 'react';

const AuthBackgroundContext = createContext<{
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
} | undefined>(undefined);

export const AuthBackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [index, setIndex] = useState(0);
  return (
    <AuthBackgroundContext.Provider value={{ index, setIndex }}>
      {children}
    </AuthBackgroundContext.Provider>
  );
};

export const useAuthBackground = () => {
  const ctx = useContext(AuthBackgroundContext);
  if (!ctx) throw new Error('useAuthBackground debe usarse dentro de AuthBackgroundProvider');
  return ctx;
};
