import { CLOUDINARY_CONFIG, CLOUDINARY_UPLOAD_URL, CLOUDINARY_DEFAULTS } from '../config/cloudinary.config';
import { compressImage } from '../lib/helpers/image.helpers';

export class CloudinaryService {
  static async uploadImage(file: File): Promise<string> {
    if (!this.validateFile(file)) {
      throw new Error('profile.errors.imageTooLarge');
    }

    try {
      // Comprimir la imagen antes de subirla
      const compressedFile = await compressImage(file);

      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

      // Agregar transformaciones
      Object.entries(CLOUDINARY_DEFAULTS.imageTransformations).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      console.log('Cloudinary Config:', {
        cloudName: CLOUDINARY_CONFIG.cloudName,
        uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
        uploadUrl: CLOUDINARY_UPLOAD_URL
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos de timeout

      try {
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('Cloudinary Upload Error:', {
            status: response.status,
            statusText: response.statusText,
            errorData
          });

          if (response.status === 401) {
            throw new Error('profile.errors.uploadError');
          } else if (response.status === 413) {
            throw new Error('profile.errors.imageTooLarge');
          } else {
            throw new Error('profile.errors.uploadFailed');
          }
        }

        const data = await response.json();
        return data.secure_url;
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new Error('profile.errors.uploadTimeout');
          } else if (error.name === 'TypeError') {
            throw new Error('profile.errors.uploadNetworkError');
          }
        }
        throw error;
      }
    } catch (error) {
      console.error('Error en CloudinaryService.uploadImage:', error);
      throw error;
    }
  }

  static validateFile(file: File): boolean {
    if (!file) return false;

    // Validar tamaño
    if (file.size > CLOUDINARY_DEFAULTS.maxFileSize) {
      throw new Error('profile.errors.imageTooLarge');
    }

    // Validar tipo
    if (!CLOUDINARY_DEFAULTS.allowedFileTypes.includes(file.type)) {
      throw new Error('profile.errors.invalidImageType');
    }

    return true;
  }

  static getImageUrl(publicId: string, transformations: Record<string, string> = {}): string {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
    const transformString = Object.entries(transformations)
      .map(([key, value]) => `${key}_${value}`)
      .join(',');

    return `${baseUrl}/${transformString}/${publicId}`;
  }
}
