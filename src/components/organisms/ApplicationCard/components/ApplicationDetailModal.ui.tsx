import React from 'react';
import Modal from '../../../molecules/Modal';
import { ApplicationCardProps } from '../../../../interfaces/components/organisms/ApplicationCard.interface';
import { STATUS_LABELS, STATUS_COLORS } from '../../../../types/interface/postulations/postulation';
import { useLanguageStore } from '../../../../store/language/languageStore';

import StyledModalContainer from "../../../shared/components/StyledModalContainer/StyledModalContainer.ui";


// Si el proyecto es Next.js, descomenta la siguiente línea:
// import Link from 'next/link';

interface ApplicationDetailModalUIProps extends ApplicationCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationDetailModalUI: React.FC<ApplicationDetailModalUIProps> = ({
  application,
  isOpen,
  onClose,
}) => {
  const { t } = useLanguageStore();
  if (!application) return null;
  const { company, position, status, date, url, notes, createdAt, updatedAt, sentCV, sentEmail } = application;

 return (
  <Modal isOpen={isOpen} onClose={onClose}>
    <StyledModalContainer>

      {/* Botón de cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/30 text-white rounded-full p-2 transition-all"
        aria-label={t('common.closeModal')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Avatar + Puesto */}
      <div className="flex flex-col items-center gap-1 mb-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-white text-2xl font-bold border-4 border-blue-300/40 shadow-md">
          {company.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
        </div>
        <span className="text-white/60 text-sm">{position}</span>
      </div>

      {/* Badge de estado */}
      <div className="flex justify-center mb-5">
        <span
          className={`text-xs font-bold px-4 py-1 rounded-full shadow-sm uppercase tracking-wide ${STATUS_COLORS[status]}`}
        >
          {STATUS_LABELS[status]}
        </span>
      </div>

      {/* Stats */}
      <div className="flex justify-between mb-5 text-white text-sm gap-2">
        <div className="flex-1 text-center bg-white/10 py-2 rounded-xl">
          <div className="text-sm font-semibold">
            {new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: '2-digit' })}
          </div>
          <div className="text-white/50 text-[11px]">{t('dashboard.date')}</div>
        </div>
        <div className="flex-1 text-center bg-white/10 py-2 rounded-xl">
          <div className="text-sm font-semibold">{position}</div>
          <div className="text-white/50 text-[11px]">{t('dashboard.position')}</div>
        </div>
        <div className="flex-1 text-center bg-white/10 py-2 rounded-xl">
          <div className="text-sm font-semibold">{company}</div>
          <div className="text-white/50 text-[11px]">{t('dashboard.company')}</div>
        </div>
      </div>

      {/* Badges de envío de CV y Email */}
      {(sentCV || sentEmail) && (
        <div className="flex justify-center gap-2 mb-4">
          {sentCV && (
            <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {t('dashboard.sentCV')}
            </span>
          )}
          {sentEmail && (
            <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {t('dashboard.sentEmail')}
            </span>
          )}
        </div>
      )}

      {/* Notas */}
      <div className="text-white text-sm mb-4 min-h-[48px] whitespace-pre-wrap">
        {notes || t('dashboard.notes.none')}
      </div>

      {/* URL */}
      {url && (
        <div className="mb-3 text-xs">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-100 underline break-words"
          >
            {url}
          </a>
        </div>
      )}

      {/* Fechas */}
      <div className="flex justify-between text-blue-200 text-[11px]">
        <span>{t('dashboard.created')}: {new Date(createdAt).toLocaleDateString('es-ES')}</span>
        <span>{t('dashboard.updated')}: {new Date(updatedAt).toLocaleDateString('es-ES')}</span>
      </div>

    </StyledModalContainer>
  </Modal>
);
};

export default ApplicationDetailModalUI;
