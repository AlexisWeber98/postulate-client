import React from 'react';
import { ApplicationStatus, STATUS_LABELS, STATUS_COLORS } from '@/interfaces/components/atoms/StatusBadge.interface';


const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]} ${className}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};

export default StatusBadge;
