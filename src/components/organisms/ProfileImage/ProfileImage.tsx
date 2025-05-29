import React from 'react';
import { Loader2 } from 'lucide-react';
import { MdAccountCircle } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import { CloudinaryService } from '../../../services/cloudinary.service';

interface ProfileImageProps {
  previewUrl: string;
  isUploading: boolean;
  onImageUpload: (url: string) => void;
  onError: (error: string) => void;
  userName?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  previewUrl,
  isUploading,
  onImageUpload,
  onError,
  userName
}) => {
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await CloudinaryService.uploadImage(file);
      onImageUpload(imageUrl);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError('Error al subir la imagen');
      }
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <button type="button" className="relative group focus:outline-none">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="profile-image-input"
          disabled={isUploading}
        />
        <label htmlFor="profile-image-input" className="cursor-pointer">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
          ) : (
            <MdAccountCircle className="text-8xl text-blue-500 dark:text-blue-400 drop-shadow-lg bg-white/30 dark:bg-gray-800/30 rounded-full p-1 transition-all duration-200 group-hover:scale-105" />
          )}
          <span className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 text-xs shadow-lg group-hover:bg-blue-600 transition flex items-center justify-center">
            {isUploading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <FaCamera className="h-3 w-3" />
            )}
          </span>
        </label>
      </button>
      {userName && (
        <span className="text-2xl text-gray-700 dark:text-gray-200 font-semibold mt-2">
          {userName}
        </span>
      )}
    </div>
  );
};

export default ProfileImage;
