import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';
import { isValidEmail, hasContent } from '../lib/helpers/validation.helpers';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../store';
import Footer from '../components/organisms/Footer';
import { CloudinaryService } from '../services/cloudinary.service';
import PersonalInfo from '../components/organisms/PersonalInfo/PersonalInfo';
import AccountDetails from '../components/organisms/Profile/AccountDetails';
import Documents from '../components/organisms/Profile/Documents';

type FieldName = 'name' | 'email' | 'lastName' | 'userName';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { translate } = useLanguageStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [userName, setUserName] = useState(user?.userName || '');

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
              {translate('profile.tabs.personal')}
            </button>
            <button
              className={`flex-1 py-3 text-center font-bold transition-all ${activeTab === 'account' ? 'text-blue-600 bg-white dark:bg-gray-900 shadow-inner' : 'text-gray-400 bg-transparent'}`}
              onClick={() => setActiveTab('account')}
            >
              {translate('profile.tabs.account')}
            </button>
            <button
              className={`flex-1 py-3 text-center font-bold transition-all ${activeTab === 'documents' ? 'text-blue-600 bg-white dark:bg-gray-900 shadow-inner' : 'text-gray-400 bg-transparent'}`}
              onClick={() => setActiveTab('documents')}
            >
              {translate('profile.tabs.documents')}
            </button>
          </div>

          {/* Contenido de cada tab */}
          {activeTab === 'personal' && (
            <PersonalInfo
              name={name}
              lastName={lastName}
              bio={bio}
              website={website}
              location={location}
              onNameChange={setName}
              onLastNameChange={setLastName}
              onBioChange={setBio}
              onWebsiteChange={setWebsite}
              onLocationChange={setLocation}
              fieldStatus={fieldStatus}
              isBlurred={isBlurred}
              onFieldBlur={handleFieldBlur}
              translate={translate}
              showProfileImage={true}
              previewUrl={previewUrl}
              isUploading={isUploading}
              handleImageUpload={handleImageUpload}
              error={error}
              success={success}
            />
          )}
          {activeTab === 'account' && (
            <AccountDetails
              userName={userName}
              setUserName={setUserName}
              email={email}
              setEmail={setEmail}
            />
          )}
          {activeTab === 'documents' && <Documents />}

          {/* Botón Guardar Cambios global */}
          <div className="w-full flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={isLoading || Object.values(fieldStatus).some(f => !f.isValid)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl shadow-xl text-white font-semibold transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[220px] text-lg  disabled:opacity-50 disabled:cursor-not-allowed"
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
