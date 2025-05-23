import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';
import { Save, Loader2 } from 'lucide-react';
import { isValidEmail, hasContent } from '../lib/helpers/validation.helpers';
import Button from '../components/atoms/Button/Button.ui';
import { motion } from "framer-motion";
import { useLanguageStore } from '../store';
import FieldWrapper from '../components/molecules/FieldWrapper/FieldWrapper';
import { TranslationKey } from '../i18n';
import Footer from '../components/organisms/Footer';
import { MdAccountCircle } from 'react-icons/md';

type FieldName = 'name' | 'email';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { translate } = useLanguageStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldStatus, setFieldStatus] = useState<Record<FieldName, { isValid: boolean; message?: string }>>({
    name: { isValid: false },
    email: { isValid: false },
  });
  const [isBlurred, setIsBlurred] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
  });

  // Validación en tiempo real
  useEffect(() => {
    if (!hasContent(name)) {
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

    if (!isValidEmail(email)) {
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
  }, [name, email, translate]);

  // Reset form if user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleFieldBlur = (name: string) => {
    setIsBlurred(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hasContent(name) || !isValidEmail(email)) {
      setError(translate('profile.validation.formInvalid'));
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({ name, email });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch {
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
      className="flex flex-col min-h-[calc(100vh-200px)] bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        <motion.h1
          id="profile-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-12 drop-shadow-lg"
        >
          {translate('profile.title')}
        </motion.h1>

        <div className="flex flex-col items-center mb-8">
          <MdAccountCircle className="text-7xl text-blue-500 dark:text-blue-400 drop-shadow-lg bg-white/30 dark:bg-gray-800/30 rounded-full p-1" />
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700/50"
        >
          <div className="grid grid-cols-1 gap-8">
            <FieldWrapper
              name="name"
              label={translate('profile.fields.name')}
              required
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
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.name?.isValid && isBlurred.name ? 'ring-2 ring-red-400' : ''}`}
                placeholder={translate('profile.placeholders.name')}
                required
                aria-invalid={!fieldStatus.name?.isValid}
                aria-describedby={!fieldStatus.name?.isValid ? 'name-error' : undefined}
              />
            </FieldWrapper>

            <FieldWrapper
              name="email"
              label={translate('profile.fields.email')}
              required
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
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.email?.isValid && isBlurred.email ? 'ring-2 ring-red-400' : ''}`}
                placeholder={translate('profile.placeholders.email')}
                required
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
              className="w-full md:w-auto px-8 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-xl shadow-xl text-white font-semibold text-base border-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              icon={isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            >
              {isLoading ? translate('common.saving') : translate('profile.actions.save')}
            </Button>
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <p className="text-green-600 dark:text-green-400 font-medium">
                {translate('profile.messages.updated')}
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
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
