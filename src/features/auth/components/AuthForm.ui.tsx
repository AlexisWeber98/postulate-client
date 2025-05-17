import React from 'react';
import { Link } from 'react-router-dom';
import FormField from '../../../shared/components/FormField';
import Button from '../../../shared/components/Button';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: { email: string; password: string; name?: string; userName?: string; lastName?: string }) => void;
  isLoading?: boolean;
  error?: string;
}

export const AuthForm = ({ type, onSubmit, isLoading, error }: AuthFormProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit({ email, password, name, userName, lastName });
    } else {
      onSubmit({ email, password });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">
        {type === 'login' ? 'Inicio de sesión' : 'Crear cuenta'}
      </h2>
      <p className="text-center text-gray-600 mb-4">
        {type === 'login'
          ? <>¿Eres un nuevo usuario? <Link to="/register" className="text-blue-600 hover:underline">Crear una cuenta</Link></>
          : <>¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 hover:underline">Iniciar sesión</Link></>
        }
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField
          id="email"
          label="Dirección de correo electrónico"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {type === 'register' && (
          <>
            <FormField
              id="name"
              label="Nombre"
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <FormField
              id="userName"
              label="Nombre de usuario"
              type="text"
              required
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <FormField
              id="lastName"
              label="Apellido"
              type="text"
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </>
        )}
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-2"
        >
          {type === 'login' ? 'Continuar' : 'Registrarse'}
        </Button>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </form>
      <div className="mt-6 text-center">
        <Link
          to="/landing"
          className="inline-block px-4 py-2 rounded-lg text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 transition"
        >
          ← Volver a la página principal
        </Link>
      </div>
    </div>
  );
};
