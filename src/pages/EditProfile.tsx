import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';
import { Save, ArrowLeft, Info, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { isValidEmail, hasContent } from '../lib/helpers/validation.helpers';
import Button from '../components/atoms/Button/Button.ui';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../store';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { t } = useLanguageStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldStatus, setFieldStatus] = useState<Record<string, { isValid: boolean; message?: string }>>({});
  const [isBlurred, setIsBlurred] = useState<Record<string, boolean>>({});

  // Validación en tiempo real
  useEffect(() => {
    if (!hasContent(name)) {
      setFieldStatus(prev => ({
        ...prev,
        name: {
          isValid: false,
          message: 'El nombre es obligatorio'
        }
      }));
    } else {
      setFieldStatus(prev => ({
        ...prev,
        name: { isValid: true }
      }));
    }

    if (!isValidEmail(email)) {
      setFieldStatus(prev => ({
        ...prev,
        email: {
          isValid: false,
          message: 'El email no es válido'
        }
      }));
    } else {
      setFieldStatus(prev => ({
        ...prev,
        email: { isValid: true }
      }));
    }
  }, [name, email]);

  // Reset form if user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleFieldBlur = (name: string) => {
    setIsBlurred(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hasContent(name) || !isValidEmail(email)) {
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

  const FieldWrapper: React.FC<{
    name: string;
    label: string;
    required?: boolean;
    children: React.ReactNode;
    tooltip?: string;
  }> = ({ name, label, required, children, tooltip }) => (
    <div className="relative">
      <label htmlFor={name} className="block text-base font-semibold text-gray-700 dark:text-white mb-2 drop-shadow flex items-center gap-2">
        {label} {required && <span className="text-red-500">*</span>}
        {tooltip && (
          <div className="group relative">
            <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-48 shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              {tooltip}
            </div>
          </div>
        )}
      </label>
      <div className="relative">
        {children}
        <AnimatePresence mode="wait">
          {isBlurred[name] && fieldStatus[name] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              {fieldStatus[name].isValid ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        {isBlurred[name] && fieldStatus[name]?.message && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-sm text-red-500 dark:text-red-400 overflow-hidden"
          >
            {fieldStatus[name].message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-[calc(100vh-200px)] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 font-medium transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('dashboard.backToDashboard')}
          </Link>
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-12 drop-shadow-lg"
        >
          Editar Perfil
        </motion.h1>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700/50"
        >
          <div className="grid grid-cols-1 gap-8">
            <FieldWrapper
              name="name"
              label="Nombre"
              required
              tooltip="Ingresa tu nombre completo"
            >
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleFieldBlur('name')}
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.name?.isValid && isBlurred.name ? 'ring-2 ring-red-400' : ''}`}
                placeholder="Tu nombre"
                required
                aria-invalid={!fieldStatus.name?.isValid}
                aria-describedby={!fieldStatus.name?.isValid ? 'name-error' : undefined}
              />
            </FieldWrapper>

            <FieldWrapper
              name="email"
              label="Email"
              required
              tooltip="Ingresa tu correo electrónico"
            >
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                className={`w-full bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-blue-100/40 shadow-inner appearance-none transition-all duration-200 pr-10 ${!fieldStatus.email?.isValid && isBlurred.email ? 'ring-2 ring-red-400' : ''}`}
                placeholder="tu@email.com"
                required
                aria-invalid={!fieldStatus.email?.isValid}
                aria-describedby={!fieldStatus.email?.isValid ? 'email-error' : undefined}
              />
            </FieldWrapper>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end mt-8"
          >
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading || Object.values(fieldStatus).some(f => !f.isValid)}
              className="w-full md:w-auto px-8 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-xl shadow-xl text-white font-semibold text-base border-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              icon={isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            >
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <p className="text-green-600 dark:text-green-400 font-medium">
                ¡Perfil actualizado correctamente!
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <p className="text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </motion.div>
  );
};

export default EditProfile;
