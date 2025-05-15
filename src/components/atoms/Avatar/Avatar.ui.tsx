import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className = "" }) => {
  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-white text-base font-bold shadow border-2 border-blue-300/40 overflow-hidden ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
};

export default Avatar;
