import React, { useState } from 'react';
import { isValidEmail } from '../../lib/helpers/validation.helpers';
import { useLanguageStore } from '../../store';
import { whitelistApi } from '../../api';

interface WaitlistFormProps {
  onClose: () => void;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ onClose }) => {
  const { translate } = useLanguageStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    if (!isValidEmail(email)) {
      setError(translate('auth.validation.email'));
      return;
    }

    setLoading(true);
    try {
      const response = await whitelistApi.addEmailToWhitelist({ email });

      if (response.statusResponse === 'Ok') {
        setSuccess(translate('waitlist.success'));
        setEmail('');
      } else {
        setError(translate('waitlist.error'));
      }
    } catch (err) {
      console.error('Error al añadir email a la whitelist:', err);
      setError(translate('auth.error.network'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 relative max-w-lg w-full mx-4 flex flex-col items-center gap-4"
    >
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl font-bold">&times;</button>
      <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
        {translate('waitlist.title')}
      </h4>
      <input
        type="email"
        placeholder={translate('placeholder.waitlistEmail')}
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10 text-gray-900 dark:bg-white/5 dark:text-white"
        disabled={loading}
        required
      />
      <button
        type="submit"
        className="w-full group inline-flex items-center justify-center rounded-2xl shadow-lg text-white font-extrabold transition-all duration-300 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap gap-3 hover:scale-105 hover:shadow-xl py-4 px-6 text-lg md:text-xl"
        disabled={loading}
      >
        {loading ? translate('waitlist.sending') : translate('waitlist.submit')}
      </button>
      {success && <p className="text-green-600 font-medium">{success}</p>}
      {error && <p className="text-red-500 font-medium">{error}</p>}
      <p className="text-xs text-gray-500 mt-2 text-center">{translate('waitlist.disclaimer')}</p>
    </form>
  );
};

export default WaitlistForm;
