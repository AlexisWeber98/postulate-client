import React from 'react';
import { Link } from 'react-router-dom';

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
        <label htmlFor="email" className="font-medium">Dirección de correo electrónico</label>
        <input
          id="email"
          type="email"
          required
          className="border rounded px-3 py-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {type === 'register' && (
          <>
            <label htmlFor="name" className="font-medium">Nombre</label>
            <input
              id="name"
              type="text"
              required
              className="border rounded px-3 py-2"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="userName" className="font-medium">Nombre de usuario</label>
            <input
              id="userName"
              type="text"
              required
              className="border rounded px-3 py-2"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <label htmlFor="lastName" className="font-medium">Apellido</label>
            <input
              id="lastName"
              type="text"
              required
              className="border rounded px-3 py-2"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </>
        )}
        <label htmlFor="password" className="font-medium">Contraseña</label>
        <input
          id="password"
          type="password"
          required
          className="border rounded px-3 py-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
        >
          {type === 'login' ? 'Continuar' : 'Registrarse'}
        </button>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </form>
      <div className="mt-4 text-center">
        <Link to="#" className="text-sm text-blue-500 hover:underline">
          Obtener ayuda sobre cómo iniciar sesión
        </Link>
      </div>
    </div>
  );
};
