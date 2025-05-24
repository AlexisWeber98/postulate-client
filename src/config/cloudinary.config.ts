export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '',
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET || '',
};

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;

export const CLOUDINARY_DEFAULTS = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  imageTransformations: {
    width: 400,
    height: 400,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  },
};
