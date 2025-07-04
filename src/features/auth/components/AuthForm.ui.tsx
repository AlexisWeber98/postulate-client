import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useLanguageStore } from '../../../store';
import FieldWrapper from '@/components/molecules/FieldWrapper/FieldWrapper';
import { useAuthForm } from '../hooks/useAuthForm';
//import { TranslationKey } from '../../../i18n';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: {
    email: string;
    password: string;
    name?: string;
    userName?: string;
    lastName?: string;
  }) => void;
  isLoading?: boolean;
  generalErrors?: string[];
  fieldErrors?: Record<string, string>;
  isUserNotFoundError?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  isLoading,
  generalErrors = [],
  fieldErrors = {},
  isUserNotFoundError,
}) => {
  const translate = useLanguageStore(state => state.translate);
  const [showPassword, setShowPassword] = useState(false);
  const {
    formData,
    fieldStatus,
    isBlurred,
    handleFieldChange,
    handleFieldBlur,
    isFormValid,
    resetForm,
  } = useAuthForm(type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700/50 p-8 px-4 sm:mx-8 max-w-md w-full mx-auto"
    >
      {generalErrors.length > 0 && (
        <div className="mb-4">
          {generalErrors.map((err, idx) => (
            <div key={idx} className="text-red-600 dark:text-red-400 font-medium text-center">
              {err}
            </div>
          ))}
          {isUserNotFoundError && type === 'login' && (
            <div className="mt-3 text-center">
              <span className="text-gray-600 dark:text-gray-300">
                {translate('auth.error.userNotFound.register')}{' '}
              </span>
              <Link
                to="/register"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {translate('auth.error.userNotFound.registerLink')}
              </Link>
            </div>
          )}
        </div>
      )}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <FieldWrapper
          name="email"
          label={translate('auth.email')}
          required
          tooltip={translate('auth.email.tooltip')}
          isBlurred={isBlurred.email}
          fieldStatus={{
            ...fieldStatus.email,
            ...(fieldErrors.email ? { isValid: false, message: fieldErrors.email } : {}),
          }}
        >
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={e => handleFieldChange('email', e.target.value)}
            onBlur={() => handleFieldBlur('email')}
            className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.email?.isValid && isBlurred.email ? 'ring-2 ring-red-400' : ''}`}
            placeholder="tu@email.com"
            required
          />
        </FieldWrapper>

        {type === 'register' && (
          <>
            <FieldWrapper
              name="name"
              label={translate('auth.name')}
              required
              tooltip="Ingresa tu nombre completo"
              isBlurred={isBlurred.name}
              fieldStatus={{
                ...fieldStatus.name,
                ...(fieldErrors.name ? { isValid: false, message: fieldErrors.name } : {}),
              }}
            >
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={e => handleFieldChange('name', e.target.value)}
                onBlur={() => handleFieldBlur('name')}
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.name?.isValid && isBlurred.name ? 'ring-2 ring-red-400' : ''}`}
                placeholder="Tu nombre"
                required
              />
            </FieldWrapper>

            <FieldWrapper
              name="lastName"
              label={translate('auth.lastName')}
              required
              tooltip="Ingresa tu apellido"
              isBlurred={isBlurred.lastName}
              fieldStatus={{
                ...fieldStatus.lastName,
                ...(fieldErrors.lastName ? { isValid: false, message: fieldErrors.lastName } : {}),
              }}
            >
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={e => handleFieldChange('lastName', e.target.value)}
                onBlur={() => handleFieldBlur('lastName')}
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.lastName?.isValid && isBlurred.lastName ? 'ring-2 ring-red-400' : ''}`}
                placeholder="Tu apellido"
                required
              />
            </FieldWrapper>

            <FieldWrapper
              name="userName"
              label={translate('auth.userName')}
              required
              tooltip="Ingresa tu nombre de usuario"
              isBlurred={isBlurred.userName}
              fieldStatus={{
                ...fieldStatus.userName,
                ...(fieldErrors.userName ? { isValid: false, message: fieldErrors.userName } : {}),
              }}
            >
              <input
                type="text"
                id="userName"
                value={formData.userName}
                onChange={e => handleFieldChange('userName', e.target.value)}
                onBlur={() => handleFieldBlur('userName')}
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.userName?.isValid && isBlurred.userName ? 'ring-2 ring-red-400' : ''}`}
                placeholder="Tu nombre de usuario"
                required
              />
            </FieldWrapper>
          </>
        )}

        <FieldWrapper
          name="password"
          label={translate('auth.password')}
          required
          tooltip="Ingresa tu contraseña (mínimo 6 caracteres)"
          isBlurred={isBlurred.password}
          fieldStatus={{
            ...fieldStatus.password,
            ...(fieldErrors.password ? { isValid: false, message: fieldErrors.password } : {}),
          }}
        >
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={e => handleFieldChange('password', e.target.value)}
              onBlur={() => handleFieldBlur('password')}
              className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 ${isBlurred.password && fieldStatus.password ? 'pr-16' : 'pr-10'} ${!fieldStatus.password?.isValid && isBlurred.password ? 'ring-2 ring-red-400' : ''}`}
              placeholder="Tu contraseña"
              required
            />
            <button
              type="button"
              aria-label={
                showPassword ? translate('auth.hidePassword') : translate('auth.showPassword')
              }
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition-colors ${isBlurred.password && fieldStatus.password ? 'right-10' : 'right-3'}`}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </FieldWrapper>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl text-gray-700 dark:text-gray-200 font-semibold text-base border-0 transition-all duration-200"
              >
                {translate('common.reset')}
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-xl shadow-xl text-white font-semibold text-base border-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? translate('common.loading')
                  : type === 'login'
                    ? translate('auth.login')
                    : translate('auth.register')}
              </button>
            </div>

            <div className="text-center text-gray-600 dark:text-gray-300 mt-2">
              {type === 'login' ? (
                <>
                  {translate('auth.newUser')}{' '}
                  <Link
                    to="/register"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {translate('auth.createAccountLink')}
                  </Link>
                </>
              ) : (
                <>
                  {translate('auth.alreadyHaveAccount')}{' '}
                  <Link
                    to="/login"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {translate('auth.loginLink')}
                  </Link>
                </>
              )}
            </div>

            <Link
              to="/landing"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 font-medium transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {translate('auth.backToHome')}
            </Link>
          </div>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};
