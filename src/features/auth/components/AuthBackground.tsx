import React from 'react';

interface AuthBackgroundProps {
  imagePath: string;
  children: React.ReactNode;
}

const AuthBackground: React.FC<AuthBackgroundProps> = ({ imagePath, children }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!imagePath) {
      setImageLoaded(false);
      return;
    }

    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
    img.src = imagePath;
  }, [imagePath]);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundColor: '#f7fafc',
        ...(imageLoaded && imagePath ? { backgroundImage: `url("${imagePath}")` } : {})
      }}
    >
      {children}
    </div>
  );
};

export default AuthBackground;
