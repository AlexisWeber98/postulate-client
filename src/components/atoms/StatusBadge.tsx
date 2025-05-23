import React from 'react';
import { BadgeProps } from '../../interfaces/components/atoms/Badge.interface';
import { STATUS_COLORS, STATUS_LABELS } from '../../interfaces/types/ApplicationStatus.type';

const StatusBadge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]} ${className}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};

export default StatusBadge;
