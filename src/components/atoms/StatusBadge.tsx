import React from 'react';
import { BadgeProps } from '../../types/components/atoms/Badge.interface';
import { STATUS_COLORS } from '../../types/interface/postulations/postulation';
import { useLanguageStore } from '../../store';
import { TranslationKey } from '../../i18n';

const StatusBadge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const { t } = useLanguageStore();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]} ${className}`}
    >
      {t(`application.status.${status}` as TranslationKey)}
    </span>
  );
};

export default StatusBadge;
