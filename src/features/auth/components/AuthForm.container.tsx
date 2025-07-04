import React from 'react';
import { z } from 'zod';
import { AuthForm } from './AuthForm.ui';
import { useAuthStore } from '../../../store/auth/authStore';
import { useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../../../store/language/languageStore';
import { TranslationKey } from '../../../i18n';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../../api';

const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const registerSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name: z.string().min(1, 'El nombre es obligatorio'),
  userName: z.string().min(1, 'El nombre de usuario es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

type AuthData = LoginData | RegisterData;

interface AuthFormContainerProps {
  type: 'login' | 'register';
}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ type }) => {
  const [generalErrors, setGeneralErrors] = React.useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [isUserNotFoundError, setIsUserNotFoundError] = React.useState(false);
  const { signIn: authStoreSignIn, signUp: authStoreSignUp } = useAuthStore();
  const navigate = useNavigate();
  const translate = useLanguageStore(state => state.translate);

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: LoginData) => authApi.login({ email, password }),
    onSuccess: (data) => {
      authStoreSignIn(data.result);
      navigate('/dashboard');
    },
    onError: (error: any) => {
      let msg = 'Ocurrió un error. Intenta nuevamente.';
      if (error instanceof Error) {
        msg = mapBackendError(error.message);
      }
      if (msg === 'auth.error.userExists') {
        setGeneralErrors([translate('auth.error.userExists' as TranslationKey)]);
        setFieldErrors({
          email: translate('auth.error.userExists' as TranslationKey),
          userName: translate('auth.error.userExists' as TranslationKey),
        });
      } else if (msg === 'auth.error.userNotFound') {
        setGeneralErrors([translate('auth.error.userNotFound' as TranslationKey)]);
        setIsUserNotFoundError(true);
      } else if (msg === 'auth.error.email') {
        setGeneralErrors([translate('auth.error.email' as TranslationKey)]);
        setFieldErrors({ email: translate('auth.error.email' as TranslationKey) });
      } else if (msg === 'auth.error.network') {
        setGeneralErrors([translate('auth.error.network' as TranslationKey)]);
      } else if (msg === 'auth.error.invalidCredentials') {
        setGeneralErrors([translate('auth.error.invalidCredentials' as TranslationKey)]);
      } else {
        setGeneralErrors([translate('auth.error.generic' as TranslationKey)]);
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: ({ email, password, name, userName, lastName }: RegisterData) =>
      authApi.register({ email, password, name, userName, lastName }),
    onSuccess: (data) => {
      authStoreSignUp(data.result);
      navigate('/login');
    },
    onError: (error: any) => {
      let msg = 'Ocurrió un error. Intenta nuevamente.';
      if (error instanceof Error) {
        msg = mapBackendError(error.message);
      }
      if (msg === 'auth.error.userExists') {
        setGeneralErrors([translate('auth.error.userExists' as TranslationKey)]);
        setFieldErrors({
          email: translate('auth.error.userExists' as TranslationKey),
          userName: translate('auth.error.userExists' as TranslationKey),
        });
      } else if (msg === 'auth.error.userNotFound') {
        setGeneralErrors([translate('auth.error.userNotFound' as TranslationKey)]);
        setIsUserNotFoundError(true);
      } else if (msg === 'auth.error.email') {
        setGeneralErrors([translate('auth.error.email' as TranslationKey)]);
        setFieldErrors({ email: translate('auth.error.email' as TranslationKey) });
      } else if (msg === 'auth.error.network') {
        setGeneralErrors([translate('auth.error.network' as TranslationKey)]);
      } else if (msg === 'auth.error.invalidCredentials') {
        setGeneralErrors([translate('auth.error.invalidCredentials' as TranslationKey)]);
      } else {
        setGeneralErrors([translate('auth.error.generic' as TranslationKey)]);
      }
    },
  });
