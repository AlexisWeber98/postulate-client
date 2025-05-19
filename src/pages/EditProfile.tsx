import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';
import { Input } from '../components/ui/input';
import { Check, Save } from 'lucide-react';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import { isValidEmail, hasContent } from '../lib/helpers/validation.helpers';
import Button from '../shared/components/Button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../components/ui/select';
import { STATUS_LABELS, PostulationStatus } from '../types/interface/postulations/postulation';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [estado, setEstado] = useState<PostulationStatus>('applied');

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
    <div className="flex flex-col items-center min-h-[calc(100vh-64px-56px)] bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans w-full max-w-none transition-colors duration-200">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-center gap-8 w-full max-w-3xl mx-auto px-4 sm:px-8 pt-32 animate-fade-in`}
        aria-label="Formulario de edición de perfil"
      >
        <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 transition-all duration-300">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900 dark:text-gray-100">Tu Perfil</h2>
          {/* Nombre */}
          <div className="w-full mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">Nombre</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              required
              aria-invalid={!!nameError}
              aria-describedby="name-error"
            />
            {nameError && <span id="name-error" className="text-red-500 dark:text-red-400 text-xs">{nameError}</span>}
          </div>
          {/* Email */}
          <div className="w-full mb-8">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              required
              aria-invalid={!!emailError}
              aria-describedby="email-error"
            />
            {emailError && <span id="email-error" className="text-red-500 dark:text-red-400 text-xs">{emailError}</span>}
          </div>
          <div className="w-full mb-8">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="estado">Estado</label>
            <Select value={estado} onValueChange={value => setEstado(value as PostulationStatus)}>
              <SelectTrigger className="text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 w-full">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed bg-blue-500 dark:bg-blue-600 text-white"
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
          </Button>
          {success && <p className="text-green-600 dark:text-green-400 text-center mt-4 animate-fade-in">¡Perfil actualizado correctamente!</p>}
          {error && <p className="text-red-600 dark:text-red-400 text-center mt-4 animate-fade-in">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
