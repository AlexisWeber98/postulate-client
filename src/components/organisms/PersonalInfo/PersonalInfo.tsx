import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '../../ui/input';
import FieldWrapper from '../../molecules/FieldWrapper/FieldWrapper';
import type { TranslationKey } from '../../../i18n/types';

interface PersonalInfoProps {
  name: string;
  lastName: string;
  bio: string;
  website: string;
  location: string;
  onNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onWebsiteChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  fieldStatus: {
    name: { isValid: boolean; message?: string };
    lastName: { isValid: boolean; message?: string };
    [key: string]: { isValid: boolean; message?: string };
  };
  isBlurred: {
    name: boolean;
    lastName: boolean;
    [key: string]: boolean;
  };
  onFieldBlur: (field: string) => void;
  translate: (key: TranslationKey) => string;
  // Props opcionales para gestión de imagen y mensajes de error/success
  showProfileImage?: boolean;
  previewUrl?: string;
  isUploading?: boolean;
  handleImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  success?: boolean;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  name,
  lastName,
  bio,
  website,
  location,
  onNameChange,
  onLastNameChange,
  onBioChange,
  onWebsiteChange,
  onLocationChange,
  fieldStatus,
  isBlurred,
  onFieldBlur,
  translate,
  showProfileImage = false,
  previewUrl,
  isUploading = false,
  handleImageUpload,
  error,
  success,
}) => {
  return (
    <>
      {/* Tip profesional */}
      <div className="flex items-center w-full max-w-2xl mb-8 p-4 rounded-xl bg-yellow-50 border-l-4 border-yellow-400 shadow gap-3">
        <span className="bg-yellow-400 text-white rounded-full p-2 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div>
          <span className="font-bold text-yellow-800">Tip profesional</span>
          <p className="text-yellow-700 text-sm">Para mejores resultados, asegúrate de completar toda tu información personal con detalles precisos y actualizados.</p>
        </div>
      </div>

      {/* Imagen de perfil y errores (opcional) */}
      {showProfileImage && (
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
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg w-full max-w-xs"
            >
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium text-center">{translate(error as TranslationKey)}</p>
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg w-full max-w-xs"
            >
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm font-medium text-center">{translate('profile.success' as TranslationKey)}</p>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Formulario de información personal */}
      <div className="relative w-full max-w-2xl flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 w-full">
          {/* Nombre y Apellido */}
          <FieldWrapper
            name="name"
            label={translate('profile.fields.name' as TranslationKey)}
            tooltip={translate('profile.tooltips.fullName' as TranslationKey)}
            isBlurred={isBlurred.name}
            fieldStatus={fieldStatus.name}
          >
            <Input
              type="text"
              id="name"
              value={name}
              onChange={e => onNameChange(e.target.value)}
              onBlur={() => onFieldBlur('name')}
              placeholder={translate('profile.placeholders.name' as TranslationKey)}
              aria-invalid={!fieldStatus.name?.isValid}
              aria-describedby={!fieldStatus.name?.isValid ? 'name-error' : undefined}
              className="bg-white"
            />
          </FieldWrapper>
          <FieldWrapper
            name="lastName"
            label={translate('auth.lastName' as TranslationKey)}
            tooltip="Ingresa tu apellido"
            isBlurred={isBlurred.lastName}
            fieldStatus={fieldStatus.lastName}
          >
            <Input
              type="text"
              id="lastName"
              value={lastName}
              onChange={e => onLastNameChange(e.target.value)}
              onBlur={() => onFieldBlur('lastName')}
              placeholder="Tu apellido"
              aria-invalid={!fieldStatus.lastName?.isValid}
              aria-describedby={!fieldStatus.lastName?.isValid ? 'lastName-error' : undefined}
              className="bg-white"
            />
          </FieldWrapper>

          {/* Biografía */}
          <div className="md:col-span-2">
            <FieldWrapper
              name="bio"
              label="Biografía"
              tooltip="Cuéntanos sobre ti, tus intereses, experiencia profesional..."
              isBlurred={false}
              fieldStatus={{ isValid: true }}
            >
              <textarea
                id="bio"
                value={bio}
                onChange={e => onBioChange(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-normal text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition placeholder-gray-400 font-sans min-h-[120px]"
                placeholder="Cuéntanos sobre ti, tus intereses, experiencia profesional..."
              />
            </FieldWrapper>
          </div>

          {/* Sitio Web y Ubicación */}
          <FieldWrapper
            name="website"
            label="Sitio Web"
            tooltip="Agrega tu sitio web o portafolio (opcional)"
            isBlurred={false}
            fieldStatus={{ isValid: true }}
          >
            <Input
              type="url"
              id="website"
              value={website}
              onChange={e => onWebsiteChange(e.target.value)}
              placeholder="https://tuwebsite.com"
              className="bg-white"
            />
          </FieldWrapper>

          <FieldWrapper
            name="location"
            label="Ubicación"
            tooltip="Ciudad, País"
            isBlurred={false}
            fieldStatus={{ isValid: true }}
          >
            <Input
              type="text"
              id="location"
              value={location}
              onChange={e => onLocationChange(e.target.value)}
              placeholder="Ciudad, País"
              className="bg-white"
            />
          </FieldWrapper>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
