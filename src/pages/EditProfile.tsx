import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';
import { Input } from '../components/ui/input';
import { APP_COLORS } from '../styles/colors';
import { Check, Save, User } from 'lucide-react';

const avatarStyles = [
  "adventurer", "avataaars", "bottts", "funEmoji",
  "lorelei", "notionists", "openPeeps", "personas"
];

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState(user?.name || 'User');
  const [avatarStyle, setAvatarStyle] = useState('adventurer');
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);

  // Reset form if user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarSeed(user.name);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
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
    <div className="min-h-[calc(100vh-64px-56px)]" style={{ background: APP_COLORS.lightGray, fontFamily: 'Inter, sans-serif' }}>
      {/* Fondo decorativo */}
      <div className="relative h-72 w-full">
        <div className="absolute inset-0" style={{ background: APP_COLORS.blueGradient }} />
        <div className="absolute left-1/2 top-56 transform -translate-x-1/2">
          <div className="relative group">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button
              onClick={() => setIsChangingAvatar(!isChangingAvatar)}
              className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Avatar selection interface - conditionally displayed */}
      {isChangingAvatar && (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto mb-8 mt-32">
          <h3 className="text-lg font-semibold mb-4">Cambiar Avatar</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            {avatarStyles.map(style => (
              <button
                key={style}
                onClick={() => setAvatarStyle(style)}
                className={`relative rounded-full overflow-hidden border-2 ${
                  avatarStyle === style ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={`https://api.dicebear.com/7.x/${style}/svg?seed=${avatarSeed}`}
                  alt={`${style} style`}
                  className="w-16 h-16"
                />
                {avatarStyle === style && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={generateRandomAvatar}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition"
            >
              Aleatorio
            </button>
            <button
              onClick={() => setIsChangingAvatar(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-center gap-8 w-full max-w-3xl mx-auto px-4 sm:px-8 ${isChangingAvatar ? 'pt-8' : 'pt-32'}`}
      >
        <div className="w-full bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Tu Perfil</h2>

          {/* Nombre */}
          <div className="w-full mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="text-base"
              required
            />
          </div>

          {/* Email */}
          <div className="w-full mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold shadow-md hover:opacity-90 transition"
            style={{ background: APP_COLORS.blue }}
          >
            {success ? (
              <>
                <Check className="h-5 w-5" />
                Guardado
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
