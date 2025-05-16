import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';
import { Input } from '../components/ui/input';
import { Check, Save, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import { isValidEmail, hasContent } from '../lib/helpers/validation.helpers';

const avatarStyles = [
  "adventurer", "avataaars", "bottts", "funEmoji",
  "lorelei", "notionists", "openPeeps", "personas"
];

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState(user?.name || 'User');
  const [avatarStyle, setAvatarStyle] = useState('adventurer');
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      setAvatarSeed(user.name);
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
    } catch (err) {
      setError('Ocurrió un error al actualizar el perfil.');
    } finally {
      setIsLoading(false);
    }
  };

  // Create avatar URL
  const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${encodeURIComponent(avatarSeed)}`;

  const generateRandomAvatar = () => {
    // Generate a random avatar
    const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
    const randomSeed = Math.random().toString(36).substring(2, 10);
    setAvatarStyle(randomStyle);
    setAvatarSeed(randomSeed);
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px-56px)] bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 font-sans w-full max-w-none">
      {/* Fondo decorativo */}
      <div className="relative h-72 w-full flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-500 to-violet-500" />
        <div className="relative group">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover transition-all duration-300 group-hover:border-blue-400"
          />
          <button
            onClick={() => setIsChangingAvatar(!isChangingAvatar)}
            className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-full p-2 shadow-lg transition"
            aria-label="Cambiar avatar"
            title="Cambiar avatar"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* Avatar selection interface - conditionally displayed */}
      {isChangingAvatar && (
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-md p-6 max-w-3xl mx-auto mb-8 mt-32 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Cambiar Avatar</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            {avatarStyles.map(style => (
              <button
                key={style}
                onClick={() => setAvatarStyle(style)}
                className={`relative rounded-full overflow-hidden border-2 transition-all duration-200 ${avatarStyle === style ? 'border-blue-500' : 'border-gray-200'}`}
                aria-label={`Seleccionar estilo ${style}`}
              >
                <img
                  src={`https://api.dicebear.com/7.x/${style}/svg?seed=${avatarSeed}`}
                  alt={`${style} style`}
                  className="w-16 h-16"
                />
                {avatarStyle === style && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 animate-pulse">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={generateRandomAvatar}
              className="px-4 py-2 bg-white/70 hover:bg-white/90 rounded-md text-sm font-medium transition backdrop-blur-md"
            >
              Aleatorio
            </button>
            <button
              onClick={() => setIsChangingAvatar(false)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-md text-sm font-medium hover:from-blue-600 hover:to-violet-600 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-center gap-8 w-full max-w-3xl mx-auto px-4 sm:px-8 pt-8 animate-fade-in`}
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
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="mt-2 text-blue-700 hover:underline text-sm"
        >
          ← Volver al Dashboard
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
