import React from 'react';
import { Link } from 'react-router-dom';
import FormField from '../../../shared/components/FormField';
import Button from '../../../shared/components/Button';
import { useLanguage } from '../../../context/LanguageContext';

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
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit({ email, password, name, userName, lastName });
    } else {
      onSubmit({ email, password });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:bg-opacity-90 rounded-2xl shadow-lg p-8 max-w-md w-full mx-auto transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-2 text-center text-blue-600 dark:text-blue-400">
        {type === 'login' ? t('auth.loginTitle') : t('auth.registerTitle')}
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
        {type === 'login'
          ? <>
              {t('auth.newUser')}{' '}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">{t('auth.createAccountLink')}</Link>
            </>
          : <>
              {t('auth.alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">{t('auth.loginLink')}</Link>
            </>
        }
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField
          id="email"
          label={t('auth.email')}
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {type === 'register' && (
          <>
            <FormField
              id="name"
              label={t('auth.name')}
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <FormField
              id="userName"
              label={t('auth.userName')}
              type="text"
              required
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <FormField
              id="lastName"
              label={t('auth.lastName')}
              type="text"
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </>
        )}
        <FormField
          id="password"
          label={t('auth.password')}
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
          {type === 'login' ? t('auth.continue') : t('auth.register')}
        </Button>
        {error && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>}
      </form>
      <div className="mt-6 text-center">
        <Link
          to="/landing"
          className="inline-block px-4 py-2 rounded-lg text-blue-700 dark:text-blue-400 font-semibold bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 transition"
        >
          ← {t('auth.backToHome')}
        </Link>
      </div>
    </div>
  );
};
