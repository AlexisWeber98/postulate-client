import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguageStore } from '../../../store/language/languageStore';
import { TranslationKey } from '../../../i18n/types';

interface ApplicationFormHeaderProps {
  id?: string;
}

export const ApplicationFormHeader: React.FC<ApplicationFormHeaderProps> = ({ id }) => {
  const translate = useLanguageStore(
    (state: { translate: (key: TranslationKey) => string }) => state.translate
  );

  return (
    <>
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
          {translate('dashboard.backToDashboard')}
        </Link>
      </motion.div>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-12 drop-shadow-lg"
      >
        {id ? translate('dashboard.editApplication') : translate('dashboard.newApplication')}
      </motion.h1>
    </>
  );
};
