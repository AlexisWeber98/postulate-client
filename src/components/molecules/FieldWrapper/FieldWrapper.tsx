import React from 'react';
import { Info, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { FieldWrapperProps } from '../../../interfaces/components/molecules/FieldWrapper.interface';

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  name,
  label,
  required,
  children,
  tooltip,
  isBlurred,
  fieldStatus
}) => (
  <div className="relative">
    <label htmlFor={name} className="text-base font-semibold text-gray-700 dark:text-white mb-2 drop-shadow flex items-center gap-2">
      {label} {required && <span className="text-red-500">*</span>}
      {tooltip && (
        <div className="group relative">
          <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 cursor-help" aria-hidden="true" />
          <button
            type="button"
            className="sr-only focus:not-sr-only focus:absolute focus:z-10"
            aria-label={`Show tooltip information for ${label}`}
            aria-describedby={`${name}-tooltip`}
            onFocus={() => {
              const tooltipEl = document.getElementById(`${name}-tooltip`);
              if (tooltipEl) tooltipEl.classList.add('opacity-100');
            }}
            onBlur={() => {
              const tooltipEl = document.getElementById(`${name}-tooltip`);
              if (tooltipEl) tooltipEl.classList.remove('opacity-100');
            }}
          >
            Show information
          </button>
          <div
            id={`${name}-tooltip`}
            role="tooltip"
            // Estilos del tooltip tomados de features/auth/components/FieldWrapper.tsx y ajustados
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-gray-800/95 dark:bg-gray-900/95 text-white text-sm font-semibold rounded-xl opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 w-56 shadow-2xl border border-blue-400 z-20"
            aria-hidden="true" // Se maneja con JS y hover/focus
          >
            {tooltip}
          </div>
        </div>
      )}
    </label>
    <div className="relative">
      {children}
      <AnimatePresence mode="wait">
        {isBlurred && fieldStatus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            // Ajuste de posicionamiento del ícono de estado (tomado de features/auth)
            className="absolute right-3 top-1/2 -translate-y-[35%] pointer-events-none"
          >
            {fieldStatus.isValid ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <AnimatePresence mode="wait">
      {isBlurred && fieldStatus?.message && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-sm text-red-500 dark:text-red-400 overflow-hidden"
        >
          {fieldStatus.message}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

export default FieldWrapper;
