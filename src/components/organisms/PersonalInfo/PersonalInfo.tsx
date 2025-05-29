import React from 'react';
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
  };
  isBlurred: {
    name: boolean;
    lastName: boolean;
  };
  onFieldBlur: (field: string) => void;
  translate: (key: TranslationKey) => string;
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
  translate
}) => {
  return (
    <>
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

      <div className="relative w-full max-w-2xl flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 w-full">
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
