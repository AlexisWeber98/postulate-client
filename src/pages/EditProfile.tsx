import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';
import { Input } from '../components/ui/input';
import { Check, Save } from 'lucide-react';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import { isValidEmail, hasContent } from '../lib/helpers/validation.helpers';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Validación en tiempo real
  useEffect(() => {
    if (!hasContent(name)) {
      setNameError('El nombre es obligatorio');
    } else {
      setNameError(null);
    }
    if (!isValidEmail(email)) {
      setEmailError('El email no es válido');
    } else {
      setEmailError(null);
    }
  }, [name, email]);

  // Reset form if user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!hasContent(name)) {
      setNameError('El nombre es obligatorio');
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError('El email no es válido');
      return;
    }
    setIsLoading(true);
    try {
      await updateUser({ name, email });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      setError('Ocurrió un error al actualizar el perfil.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px-56px)] bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 font-sans w-full max-w-none">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-center gap-8 w-full max-w-3xl mx-auto px-4 sm:px-8 pt-32 animate-fade-in`}
        aria-label="Formulario de edición de perfil"
      >
        <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 transition-all duration-300">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">Tu Perfil</h2>
          {/* Nombre */}
          <div className="w-full mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">Nombre</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="text-base"
              required
              aria-invalid={!!nameError}
              aria-describedby="name-error"
            />
            {nameError && <span id="name-error" className="text-red-500 text-xs">{nameError}</span>}
          </div>
          {/* Email */}
          <div className="w-full mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="text-base"
              required
              aria-invalid={!!emailError}
              aria-describedby="email-error"
            />
            {emailError && <span id="email-error" className="text-red-500 text-xs">{emailError}</span>}
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading || !!nameError || !!emailError}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2"><LoadingSpinner size="sm" message="" /> Guardando...</span>
            ) : success ? (
              <>
                <Check className="h-5 w-5 animate-bounce" />
                Guardado
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Guardar Cambios
              </>
            )}
          </button>
          {success && <p className="text-green-600 text-center mt-4 animate-fade-in">¡Perfil actualizado correctamente!</p>}
          {error && <p className="text-red-600 text-center mt-4 animate-fade-in">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
