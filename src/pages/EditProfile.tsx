import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';
import { Save, Loader2 } from 'lucide-react';
import { isValidEmail, hasContent } from '../lib/helpers/validation.helpers';
import Button from '../components/atoms/Button/Button.ui';
import { motion } from "framer-motion";
import { useLanguageStore } from '../store';
import FieldWrapper from '../components/molecules/FieldWrapper/FieldWrapper';
import type { TranslationKey } from '../i18n/types';
import Footer from '../components/organisms/Footer';
import { MdAccountCircle } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import { CloudinaryService } from '../services/cloudinary.service';

type FieldName = 'name' | 'email' | 'lastName' | 'userName';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { translate } = useLanguageStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [userName, setUserName] = useState(user?.userName || '');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(user?.profileImage || '');
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldStatus, setFieldStatus] = useState<Record<FieldName, { isValid: boolean; message?: string }>>({
    name: { isValid: false },
    email: { isValid: false },
    lastName: { isValid: false },
    userName: { isValid: false }
  });
  const [isBlurred, setIsBlurred] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    lastName: false,
    userName: false
  });

  // Validación en tiempo real
  useEffect(() => {
    if (name && !hasContent(name)) {
      setFieldStatus(prev => ({
        ...prev,
        name: {
          isValid: false,
          message: translate('profile.validation.nameRequired')
        }
      }));
    } else {
      setFieldStatus(prev => ({
        ...prev,
        name: { isValid: true }
      }));
    }

    if (email && !isValidEmail(email)) {
      setFieldStatus(prev => ({
        ...prev,
        email: {
          isValid: false,
          message: translate('profile.validation.emailInvalid')
        }
      }));
    } else {
      setFieldStatus(prev => ({
        ...prev,
        email: { isValid: true }
      }));
    }

    if (lastName && !hasContent(lastName)) {
      setFieldStatus(prev => ({
        ...prev,
        lastName: {
          isValid: false,
          message: translate('auth.validation.lastName')
        }
      }));
    } else {
      setFieldStatus(prev => ({
        ...prev,
        lastName: { isValid: true }
      }));
    }

    if (userName && !hasContent(userName)) {
      setFieldStatus(prev => ({
        ...prev,
        userName: {
          isValid: false,
          message: translate('auth.validation.userName')
        }
      }));
    } else {
      setFieldStatus(prev => ({
        ...prev,
        userName: { isValid: true }
      }));
    }
  }, [name, email, lastName, userName, translate]);

  // Reset form if user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setLastName(user.lastName || '');
      setUserName(user.userName || '');
    }
  }, [user]);

  const handleFieldBlur = (name: string) => {
    setIsBlurred(prev => ({ ...prev, [name]: true }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const imageUrl = await CloudinaryService.uploadImage(file);
      setPreviewUrl(imageUrl);
      setProfileImage(file);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setError(error instanceof Error ? error.message : translate('profile.errors.uploadFailed'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if ((name && !hasContent(name)) || (email && !isValidEmail(email)) || (lastName && !hasContent(lastName)) || (userName && !hasContent(userName))) {
      setError(translate('profile.validation.formInvalid'));
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({
        name,
        email,
        lastName,
        userName,
        profileImage: previewUrl
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setError(translate('profile.errors.updateFail'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-[calc(100vh-200px)] bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 justify-center"
    >
      <div className="max-w-xl mx-auto w-full px-2 py-8 flex flex-col items-center justify-center">
        <motion.h1
          id="profile-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500 text-center mb-2 drop-shadow-lg"
        >
          {translate('profile.title')}
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6 text-base">{translate('profile.description')}</p>

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
          <span className="text-2xl text-gray-700 dark:text-gray-200 font-semibold mt-2">{user?.name}</span>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-200 dark:border-gray-700/50 w-full"
        >
          <div className="grid grid-cols-1 gap-6">
            <FieldWrapper
              name="name"
              label={translate('profile.fields.name')}
              tooltip={translate('profile.tooltips.fullName')}
              isBlurred={isBlurred.name}
              fieldStatus={fieldStatus.name}
            >
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleFieldBlur('name')}
                className={`w-full bg-white/80 dark:bg-white/10 text-gray-900 dark:text-white rounded-2xl px-5 py-4 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner transition-all duration-200 ${!fieldStatus.name?.isValid && isBlurred.name ? 'ring-2 ring-red-400' : ''}`}
                placeholder={translate('profile.placeholders.name')}
                aria-invalid={!fieldStatus.name?.isValid}
                aria-describedby={!fieldStatus.name?.isValid ? 'name-error' : undefined}
              />
            </FieldWrapper>

            <FieldWrapper
              name="lastName"
              label={translate('auth.lastName')}
              tooltip="Ingresa tu apellido"
              isBlurred={isBlurred.lastName}
              fieldStatus={fieldStatus.lastName}
            >
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => handleFieldBlur('lastName')}
                className={`w-full bg-white/80 dark:bg-white/10 text-gray-900 dark:text-white rounded-2xl px-5 py-4 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner transition-all duration-200 ${!fieldStatus.lastName?.isValid && isBlurred.lastName ? 'ring-2 ring-red-400' : ''}`}
                placeholder="Tu apellido"
                aria-invalid={!fieldStatus.lastName?.isValid}
                aria-describedby={!fieldStatus.lastName?.isValid ? 'lastName-error' : undefined}
              />
            </FieldWrapper>

            <FieldWrapper
              name="userName"
              label={translate('auth.userName')}
              tooltip="Ingresa tu nombre de usuario"
              isBlurred={isBlurred.userName}
              fieldStatus={fieldStatus.userName}
            >
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => handleFieldBlur('userName')}
                className={`w-full bg-white/80 dark:bg-white/10 text-gray-900 dark:text-white rounded-2xl px-5 py-4 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner transition-all duration-200 ${!fieldStatus.userName?.isValid && isBlurred.userName ? 'ring-2 ring-red-400' : ''}`}
                placeholder="Tu nombre de usuario"
                aria-invalid={!fieldStatus.userName?.isValid}
                aria-describedby={!fieldStatus.userName?.isValid ? 'userName-error' : undefined}
              />
            </FieldWrapper>

            <FieldWrapper
              name="email"
              label={translate('profile.fields.email')}
              tooltip={translate('profile.tooltips.email')}
              isBlurred={isBlurred.email}
              fieldStatus={fieldStatus.email}
            >
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                className={`w-full bg-white/80 dark:bg-white/10 text-gray-900 dark:text-white rounded-2xl px-5 py-4 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner transition-all duration-200 ${!fieldStatus.email?.isValid && isBlurred.email ? 'ring-2 ring-red-400' : ''}`}
                placeholder={translate('profile.placeholders.email')}
                aria-invalid={!fieldStatus.email?.isValid}
                aria-describedby={!fieldStatus.email?.isValid ? 'email-error' : undefined}
              />
            </FieldWrapper>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end mt-8"
          >
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading || Object.values(fieldStatus).some(f => !f.isValid)}
              className="w-full md:w-auto px-10 py-3 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl shadow-xl text-white font-bold text-lg border-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              icon={isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            >
              {isLoading ? translate('common.saving') : translate('profile.actions.save')}
            </Button>
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center flex items-center justify-center gap-2"
            >
              <span className="inline-block bg-green-100 dark:bg-green-900/40 rounded-full p-1"><svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>
              <p className="text-green-600 dark:text-green-400 font-medium">
                {translate('profile.messages.updated')}
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center flex items-center justify-center gap-2"
            >
              <span className="inline-block bg-red-100 dark:bg-red-900/40 rounded-full p-1"><svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></span>
              <p className="text-red-600 dark:text-red-400 font-medium">
                {translate(error as TranslationKey)}
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
      <Footer />
    </motion.div>
  );
};

export default EditProfile;
