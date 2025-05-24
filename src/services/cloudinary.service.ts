import { CLOUDINARY_CONFIG, CLOUDINARY_UPLOAD_URL, CLOUDINARY_DEFAULTS } from '../config/cloudinary.config';

export class CloudinaryService {
  static async uploadImage(file: File): Promise<string> {
    if (!this.validateFile(file)) {
      throw new Error('Archivo no válido');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    // Agregar transformaciones
    Object.entries(CLOUDINARY_DEFAULTS.imageTransformations).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error en CloudinaryService.uploadImage:', error);
      throw error;
    }
  }

  static validateFile(file: File): boolean {
    if (!file) return false;

    // Validar tamaño
    if (file.size > CLOUDINARY_DEFAULTS.maxFileSize) {
      throw new Error('El archivo es demasiado grande');
    }

    // Validar tipo
    if (!CLOUDINARY_DEFAULTS.allowedFileTypes.includes(file.type)) {
      throw new Error('Tipo de archivo no permitido');
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
