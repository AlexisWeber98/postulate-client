import React from 'react';
import { z } from 'zod';
import { AuthForm } from './AuthForm.ui';
import { useAuthStore } from '../../../store/auth/authStore';
import { useNavigate } from 'react-router-dom';

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
  const [error, setError] = React.useState<string | undefined>(undefined);
  const { signIn, signUp } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (data: AuthData) => {
    console.log('handleSubmit llamado con:', data, 'tipo:', type);
    setError(undefined);
    const schema = type === 'register' ? registerSchema : loginSchema;
    const result = schema.safeParse(data);
    if (!result.success) {
      console.log('Error de validación:', result.error.errors);
      setError(result.error.errors[0].message);
      return;
    }
    setIsLoading(true);
    try {
      if (type === 'login') {
        console.log('Llamando signIn con:', data.email, data.password);
        await signIn(data.email, data.password);
      } else {
        const d = data as RegisterData;
        console.log('Llamando signUp con:', d.email, d.password, d.name, d.userName, d.lastName);
        await signUp(d.email, d.password, d.name, d.userName, d.lastName);
      }
      console.log('Navegando al home después de login/registro exitoso');
      navigate('/');
    } catch (e: unknown) {
      console.log('Error capturado en handleSubmit:', e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Ocurrió un error. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      type={type}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
};
