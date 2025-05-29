import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';
import { Save, Loader2, Mail, User } from 'lucide-react';
import { isValidEmail, hasContent } from '../lib/helpers/validation.helpers';
import Button from '../components/atoms/Button/Button.ui';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../store';
import FieldWrapper from '../components/molecules/FieldWrapper/FieldWrapper';
import type { TranslationKey } from '../i18n/types';
import Footer from '../components/organisms/Footer';
import { MdAccountCircle } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import { CloudinaryService } from '../services/cloudinary.service';
import { Input } from '../components/ui/input';
import { Button as DashboardButton } from '../components/ui/button';

type FieldName = 'name' | 'email' | 'lastName' | 'userName';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();

  const { translate } = useLanguageStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [userName, setUserName] = useState(user?.userName || '');
  /* if (!user?.userName) {
    console.warn('[EditProfile] userName está vacío o indefinido en user:', user);
  } */
  const [_profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(user?.profileImage || '');
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldStatus, setFieldStatus] = useState<
    Record<FieldName, { isValid: boolean; message?: string }>
  >({
    name: { isValid: false },
    email: { isValid: false },
    lastName: { isValid: false },
    userName: { isValid: false },
  });
  const [isBlurred, setIsBlurred] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    lastName: false,
    userName: false,
  });
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState<'personal' | 'account' | 'documents'>('personal');

  // Validación en tiempo real
  useEffect(() => {
    if (name && !hasContent(name)) {
      setFieldStatus(prev => ({
        ...prev,
        name: {
          isValid: false,
          message: translate('profile.validation.nameRequired'),
        },
      }));
    } else {
      setFieldStatus(prev => ({
        ...prev,
        name: { isValid: true },
      }));
    }

    if (email && !isValidEmail(email)) {
      setFieldStatus(prev => ({
        ...prev,
        email: {
          isValid: false,
          message: translate('profile.validation.emailInvalid'),
        },
      }));
    } else {
      setFieldStatus(prev => ({
        ...prev,
        email: { isValid: true },
      }));
    }

    if (lastName && !hasContent(lastName)) {
      setFieldStatus(prev => ({
        ...prev,
        lastName: {
          isValid: false,
          message: translate('auth.validation.lastName'),
        },
      }));
    } else {
      setFieldStatus(prev => ({
        ...prev,
        lastName: { isValid: true },
      }));
    }

    if (userName && !hasContent(userName)) {
      setFieldStatus(prev => ({
        ...prev,
        userName: {
          isValid: false,
          message: translate('auth.validation.userName'),
        },
      }));
    } else {
      setFieldStatus(prev => ({
        ...prev,
        userName: { isValid: true },
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
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(translate('profile.errors.uploadFailed'));
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      (name && !hasContent(name)) ||
      (email && !isValidEmail(email)) ||
      (lastName && !hasContent(lastName)) ||
      (userName && !hasContent(userName))
    ) {
      setError(translate('profile.validation.formInvalid'));
      return;
    }

    setIsLoading(true);
    try {
       await updateUser({
        name,
        lastName,
        email,
        userName,
        ...(previewUrl && { imageUrl: previewUrl })
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col items-center justify-center w-full"
      >
        <div className="max-w-2xl mx-auto w-full px-2 py-8 flex flex-col items-center justify-start min-h-[600px]">
          <motion.h1
            id="profile-title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500 text-center mb-2 drop-shadow-lg"
          >
            {translate('profile.title')}
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6 text-base">
            {translate('profile.description')}
          </p>

          {/* Tabs funcionales */}
          <div className="flex w-full max-w-2xl mb-6 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 shadow-lg">
            <button
              className={`flex-1 py-3 text-center font-bold transition-all ${activeTab === 'personal' ? 'text-blue-600 bg-white dark:bg-gray-900 shadow-inner' : 'text-gray-400 bg-transparent'}`}
              onClick={() => setActiveTab('personal')}
            >
              Información Personal
            </button>
            <button
              className={`flex-1 py-3 text-center font-bold transition-all ${activeTab === 'account' ? 'text-blue-600 bg-white dark:bg-gray-900 shadow-inner' : 'text-gray-400 bg-transparent'}`}
              onClick={() => setActiveTab('account')}
            >
              Detalles de Cuenta
            </button>
            <button
              className={`flex-1 py-3 text-center font-bold transition-all ${activeTab === 'documents' ? 'text-blue-600 bg-white dark:bg-gray-900 shadow-inner' : 'text-gray-400 bg-transparent'}`}
              onClick={() => setActiveTab('documents')}
            >
              Documentos
            </button>
          </div>

          {/* Contenido de cada tab */}
          {activeTab === 'personal' && (
            <>
              {/* Tip profesional */}
              <div className="flex items-center w-full max-w-2xl mb-8 p-4 rounded-xl bg-yellow-50 border-l-4 border-yellow-400 shadow gap-3">
                <span className="bg-yellow-400 text-white rounded-full p-2 flex items-center justify-center"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                <div>
                  <span className="font-bold text-yellow-800">Tip profesional</span>
                  <p className="text-yellow-700 text-sm">Para mejores resultados, asegúrate de completar toda tu información personal con detalles precisos y actualizados.</p>
                </div>
              </div>
              {/* Imagen de perfil y errores */}
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
                <span className="text-2xl text-gray-700 dark:text-gray-200 font-semibold mt-2">
                  {user?.name}
                </span>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg w-full max-w-xs"
                  >
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm font-medium text-center">
                        {translate(error as TranslationKey)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
              {/* Formulario de información personal (sin usuario ni email) */}
              <div className="relative w-full max-w-2xl flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 w-full">
                  {/* Nombre y Apellido */}
                  <FieldWrapper
                    name="name"
                    label={translate('profile.fields.name')}
                    tooltip={translate('profile.tooltips.fullName')}
                    isBlurred={isBlurred.name}
                    fieldStatus={fieldStatus.name}
                  >
                    <Input
                      type="text"
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onBlur={() => handleFieldBlur('name')}
                      placeholder={translate('profile.placeholders.name')}
                      aria-invalid={!fieldStatus.name?.isValid}
                      aria-describedby={!fieldStatus.name?.isValid ? 'name-error' : undefined}
                      className="bg-white"
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    name="lastName"
                    label={translate('auth.lastName')}
                    tooltip="Ingresa tu apellido"
                    isBlurred={isBlurred.lastName}
                    fieldStatus={fieldStatus.lastName}
                  >
                    <Input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      onBlur={() => handleFieldBlur('lastName')}
                      placeholder="Tu apellido"
                      aria-invalid={!fieldStatus.lastName?.isValid}
                      aria-describedby={!fieldStatus.lastName?.isValid ? 'lastName-error' : undefined}
                      className="bg-white"
                    />
                  </FieldWrapper>

                  {/* Biografía (textarea ocupa dos columnas) */}
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
                        onChange={e => setBio(e.target.value)}
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
                      onChange={e => setWebsite(e.target.value)}
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
                      onChange={e => setLocation(e.target.value)}
                      placeholder="Ciudad, País"
                      className="bg-white"
                    />
                  </FieldWrapper>
                </div>
              </div>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center flex items-center justify-center gap-2"
                >
                  <span className="inline-block bg-green-100 dark:bg-green-900/40 rounded-full p-1">
                    <svg
                      className="w-5 h-5 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    {translate('profile.messages.updated')}
                  </p>
                </motion.div>
              )}
            </>
          )}
          {activeTab === 'account' && (
            <>
              {/* Tip profesional Detalles de Cuenta */}
              <div className="flex items-center w-full max-w-2xl mb-8 p-4 rounded-xl bg-gradient-to-r from-yellow-50 via-white to-pink-100 border-l-4 border-orange-400 shadow gap-3">
                <span className="bg-orange-400 text-white rounded-full p-2 flex items-center justify-center"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                <div>
                  <span className="font-bold text-orange-800">Tip profesional</span>
                  <p className="text-orange-700 text-sm">Usa un correo electrónico profesional y un nombre de usuario que refleje tu identidad profesional.</p>
                </div>
              </div>
              <form className="w-full max-w-2xl flex flex-col gap-8 items-center">
                <div className="w-full flex flex-col gap-6">
                  <div>
                    <label className="flex items-center gap-2 font-semibold text-white/90 mb-2" htmlFor="userName">
                      <User className="w-5 h-5 text-blue-400" /> Nombre de Usuario
                    </label>
                    <Input
                      type="text"
                      id="userName"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      placeholder="Tu nombre de usuario único"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 font-semibold text-white/90 mb-2" htmlFor="email">
                      <Mail className="w-5 h-5 text-blue-400" /> Correo Electrónico
                    </label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="bg-white"
                    />
                  </div>
                </div>
              </form>
            </>
          )}
          {activeTab === 'documents' && (
            <div className="w-full max-w-2xl min-h-[200px] flex items-center justify-center text-gray-400 text-lg">
              Próximamente podrás subir tus documentos aquí.
            </div>
          )}
          {/* Botón Guardar Cambios global */}
          <div className="w-full flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={isLoading || Object.values(fieldStatus).some(f => !f.isValid)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-blue-700 dark:text-blue-300 font-semibold text-base transition bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[220px] text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? translate('common.saving') : translate('profile.actions.save')}
            </button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default EditProfile;
