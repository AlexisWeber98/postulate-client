import React from 'react';
import { z } from 'zod';
import { AuthForm } from './AuthForm.ui';
import { useAuthStore } from '../../../store/auth/authStore';
import { useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../../../store/language/languageStore';
import { TranslationKey } from '../../../i18n';

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [generalErrors, setGeneralErrors] = React.useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const { signIn, signUp } = useAuthStore();
  const navigate = useNavigate();
  const translate = useLanguageStore(state => state.translate);

  const mapBackendError = (msg: string) => {
    if (msg.toLowerCase().includes('existe')) return 'auth.error.userExists';
    if (msg.toLowerCase().includes('email')) return 'auth.error.email';
    if (msg.toLowerCase().includes('network') || msg.toLowerCase().includes('timeout')) return 'auth.error.network';
    if (msg.toLowerCase().includes('credencial') || msg.toLowerCase().includes('incorrecta')) return 'auth.error.invalidCredentials';
    return msg;
  };

  const handleSubmit = async (data: AuthData) => {
    setGeneralErrors([]);
    setFieldErrors({});

    const schema = type === 'register' ? registerSchema : loginSchema;
    const result = schema.safeParse(data);

    if (!result.success) {
      const errors: string[] = [];
      const fieldErrs: Record<string, string> = {};
      result.error.errors.forEach(err => {
        errors.push(err.message);
        if (err.path && err.path.length > 0) {
          fieldErrs[err.path[0]] = err.message;
        }
      });
      setGeneralErrors(errors.map(e => translate(e as TranslationKey)));
      Object.keys(fieldErrs).forEach(key => {
        fieldErrs[key] = translate(fieldErrs[key] as TranslationKey);
      });
      setFieldErrors(fieldErrs);
      return;
    }

    setIsLoading(true);

    try {
      if (type === 'login') {
        const { email, password } = data as LoginData;
        await signIn(email, password);
      } else {
        const { email, password, name, userName, lastName } = data as RegisterData;
        await signUp(email, password, name, userName, lastName);
        navigate('/login');
        return;
      }
    } catch (e: unknown) {
      let msg = 'Ocurrió un error. Intenta nuevamente.';
      if (e instanceof Error) {
        msg = mapBackendError(e.message);
      }
      if (msg === 'auth.error.userExists') {
        setGeneralErrors([translate('auth.error.userExists' as TranslationKey)]);
        setFieldErrors({
          email: translate('auth.error.userExists' as TranslationKey),
          userName: translate('auth.error.userExists' as TranslationKey)
        });
      } else if (msg === 'auth.error.email') {
        setGeneralErrors([translate('auth.error.email' as TranslationKey)]);
        setFieldErrors({ email: translate('auth.error.email' as TranslationKey) });
      } else if (msg === 'auth.error.network') {
        setGeneralErrors([translate('auth.error.network' as TranslationKey)]);
      } else if (msg === 'auth.error.invalidCredentials') {
        setGeneralErrors([translate('auth.error.invalidCredentials' as TranslationKey)]);
        setFieldErrors({
          email: translate('auth.error.invalidCredentials' as TranslationKey),
          password: translate('auth.error.invalidCredentials' as TranslationKey)
        });
      } else {
        setGeneralErrors([typeof msg === 'string' ? translate(msg as TranslationKey) : msg]);
      }
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <AuthForm
      type={type}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      generalErrors={generalErrors}
      fieldErrors={fieldErrors}
    />
  );
};
