import { motion } from "framer-motion";
import { es } from "../../i18n/translations/es";
import { TranslationKey } from '../../i18n/types';

// Helper type to extract placeholder keys from a translation string
type PlaceholderKeys<T extends string> = T extends `${string}{${infer K}}${infer Rest}`
  ? K | PlaceholderKeys<Rest>
  : never;

// Type to get the translation string for a given key
type TranslationFor<K extends TranslationKey> =
  K extends keyof typeof es
    ? (typeof es)[K] extends string
      ? (typeof es)[K]
      : never
    : never;

interface PostulationStatusFormProps {
  sentCV: boolean;
  sentEmail: boolean;
  onSendCvChange: (checked: boolean) => void;
  onSendEmailChange: (checked: boolean) => void;
  translate: <K extends TranslationKey>(
    key: K,
    placeholders?: Record<PlaceholderKeys<TranslationFor<K>>, string>
  ) => string;
}

const PostulationStatusForm: React.FC<PostulationStatusFormProps> = ({
  sentCV,
  sentEmail,
  onSendCvChange,
  onSendEmailChange,
  translate
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 sm:p-6 border border-blue-100 dark:border-blue-800/30"
  >
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
      {translate('dashboard.postulationStatus')}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
        <input
          type="checkbox"
          id="sentCV"
          checked={sentCV}
          onChange={(e) => onSendCvChange(e.target.checked)}
          className="accent-blue-500 w-4 h-4 sm:w-5 sm:h-5 rounded"
        />
        <label htmlFor="sentCV" className="text-sm sm:text-base text-gray-700 dark:text-white/90 cursor-pointer">
          {translate('dashboard.sentCV')}
        </label>
      </div>
      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
        <input
          type="checkbox"
          id="sentEmail"
          checked={sentEmail}
          onChange={(e) => onSendEmailChange(e.target.checked)}
          className="accent-blue-500 w-4 h-4 sm:w-5 sm:h-5 rounded"
        />
        <label htmlFor="sentEmail" className="text-sm sm:text-base text-gray-700 dark:text-white/90 cursor-pointer">
          {translate('dashboard.sentEmail')}
        </label>
      </div>
    </div>
  </motion.div>
);

export default PostulationStatusForm;
