import React, { useState } from 'react';
import { isValidEmail } from '../../lib/helpers/validation.helpers';
import { Button } from '@/components/atoms';

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
    } catch (_err) {
      console.error(_err);
      setError('Error de red. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
      tabIndex={0}
      aria-label="Modal de lista de espera"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-auto flex flex-col items-center gap-4 p-8 sm:p-10 relative mx-4"
      >
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent text-center mb-6">
          Déjanos tu mail
        </h2>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg py-3 px-5 mb-2 text-gray-800 placeholder-gray-400 shadow-md focus:outline-none focus:border-blue-500 transition"
          aria-label="Campo para ingresar tu email"
          disabled={loading}
          required
        />
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full font-bold mb-2"
          aria-label="Anotarme en la lista de espera"
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Anotarme en la lista de espera'}
        </Button>
        {success && <p className="text-green-500 font-medium text-center">{success}</p>}
        {error && <p className="text-red-500 font-medium text-center">{error}</p>}
        <p className="text-gray-500 text-sm text-center mt-2">
          Solo te contactaremos para avisarte sobre el lanzamiento y novedades importantes. ¡No spam!
        </p>
      </form>
    </div>
  );
};

export default WaitlistForm;
