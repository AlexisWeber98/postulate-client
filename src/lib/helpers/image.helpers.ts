export const compressImage = async (file: File, maxWidth = 800, maxHeight = 800, quality = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calcular nuevas dimensiones manteniendo la proporción
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No se pudo crear el contexto del canvas'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convertir a blob con calidad reducida
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Error al comprimir la imagen'));
            return;
          }
          // Crear nuevo archivo con el blob comprimido
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Error al cargar la imagen'));
    };
  });
};
