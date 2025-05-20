import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle2, XCircle } from 'lucide-react';
import { FieldWrapperProps } from '../types/auth.types';

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  name,
  label,
  required,
  children,
  tooltip,
  isValid,
  isBlurred,
  errorMessage
}) => (
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
        {isBlurred && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            {isValid ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <AnimatePresence mode="wait">
      {isBlurred && errorMessage && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-sm text-red-500 dark:text-red-400 overflow-hidden"
        >
          {errorMessage}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);
