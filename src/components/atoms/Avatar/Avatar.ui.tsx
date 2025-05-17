
import { AvatarProps } from "../../../interfaces/components/atoms/Avatar.interface";

export const Avatar = ({ src, alt, fallback, className }: AvatarProps) => {
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
