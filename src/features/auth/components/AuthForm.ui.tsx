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
          className="flex items-center justify-center px-6 py-3 rounded-xl shadow-lg text-white font-semibold text-lg transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
          style={{ boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)' }}
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
