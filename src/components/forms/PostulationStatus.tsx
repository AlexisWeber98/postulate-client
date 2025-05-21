import { motion } from "framer-motion";
import { TranslationKey } from "../../i18n";

interface PostulationStatusFormProps {
  sentCV: boolean;
  sentEmail: boolean;
  onSendCvChange: (checked: boolean) => void;
  onSendEmailChange: (checked: boolean) => void;
  t: (key: TranslationKey, placeholders?: Record<string, string | number>) => string;
}

const PostulationStatusForm: React.FC<PostulationStatusFormProps> = ({
  sentCV,
  sentEmail,
  onSendCvChange,
  onSendEmailChange,
  t
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30"
  >
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      {t('dashboard.postulationStatus')}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
        <input
          type="checkbox"
          id="sentCV"
          checked={sentCV}
          onChange={(e) => onSendCvChange(e.target.checked)}
          className="accent-blue-500 w-5 h-5 rounded"
        />
        <label htmlFor="sentCV" className="text-gray-700 dark:text-white/90 text-base cursor-pointer">
          {t('dashboard.sentCV')}
        </label>
      </div>
      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
        <input
          type="checkbox"
          id="sentEmail"
          checked={sentEmail}
          onChange={(e) => onSendEmailChange(e.target.checked)}
          className="accent-blue-500 w-5 h-5 rounded"
        />
        <label htmlFor="sentEmail" className="text-gray-700 dark:text-white/90 text-base cursor-pointer">
          {t('dashboard.sentEmail')}
        </label>
      </div>
    </div>
  </motion.div>
);

export default PostulationStatusForm;
