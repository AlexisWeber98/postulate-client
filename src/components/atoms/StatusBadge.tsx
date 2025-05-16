import React from 'react';
import { BadgeProps } from '@/interfaces/components/atoms/Badge.interfaces';


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
