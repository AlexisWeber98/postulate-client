import React, { useState } from 'react';
import { isValidEmail } from '../../lib/helpers/validation.helpers';

// Remove these constants and handle email sending through your backend API

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    if (!isValidEmail(email)) {
      setError('Por favor, ingresa un email válido.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess('¡Te has unido a la waitlist! Pronto recibirás novedades.');
        setEmail('');
      } else {
        setError('Hubo un error al enviar tu email. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Error de red. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-8 max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 p-6 rounded-2xl shadow-lg">
      <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">Déjanos tu mail</h4>
      <input
        type="email"
        placeholder="Tu email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={loading}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Anotarme en la lista de espera'}
      </button>
      {success && <p className="text-green-600 font-medium">{success}</p>}
      {error && <p className="text-red-500 font-medium">{error}</p>}
      <p className="text-xs text-gray-500 mt-2 text-center">Solo te contactaremos para avisarte sobre el lanzamiento y novedades importantes. ¡No spam!</p>
    </form>
  );
};

export default WaitlistForm;
