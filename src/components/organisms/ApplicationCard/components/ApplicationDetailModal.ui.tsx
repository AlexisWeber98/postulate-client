import React from 'react';
import Modal from '../../../molecules/Modal';
import { ApplicationDetailModalUIProps } from '../../../../interfaces/components/organisms/ApplicationCard.interface';
import { STATUS_LABELS, STATUS_COLORS } from '../../../../types/interface/postulations/postulation';
import StyledModalContainer from "../../../shared/components/StyledModalContainer/StyledModalContainer.ui";
import { useLanguageStore } from '../../../../store/language/languageStore';

// Si el proyecto es Next.js, descomenta la siguiente línea:
// import Link from 'next/link';

const ApplicationDetailModalUI: React.FC<ApplicationDetailModalUIProps> = ({
  application,
  isOpen,
  onClose,
  onDelete,
}) => {
  const translate = useLanguageStore(state=>state.translate);
  if (!application) return null;
  const { company, position, status, date, url, notes, createdAt, updatedAt, sentCV, sentEmail } = application;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledModalContainer>
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/30 text-white rounded-full p-2 transition-all"
          aria-label={translate('common.closeModal')}
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
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-white/60 text-sm mb-1">{translate('dashboard.company')}</div>
            <div className="text-white font-semibold">{company}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-white/60 text-sm mb-1">{translate('dashboard.date')}</div>
            <div className="text-white font-semibold">{new Date(date).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Notas */}
        {notes && (
          <div className="mb-6">
            <h3 className="text-white/60 text-sm mb-2">{translate('dashboard.notes')}</h3>
            <p className="text-white/90 bg-white/10 rounded-xl p-4">{notes}</p>
          </div>
        )}

        {/* URL */}
        {url && (
          <div className="mb-6">
            <h3 className="text-white/60 text-sm mb-2">{translate('dashboard.url')}</h3>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 break-all bg-white/10 rounded-xl p-4 block"
            >
              {url}
            </a>
          </div>
        )}

        {/* Badges de envío */}
        {(sentCV || sentEmail) && (
          <div className="flex gap-2 mb-6">
            {sentCV && (
              <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {translate('dashboard.sentCV')}
              </span>
            )}
            {sentEmail && (
              <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {translate('dashboard.sentEmail')}
              </span>
            )}
          </div>
        )}

        {/* Fechas */}
        <div className="text-white/40 text-xs flex justify-between mb-6">
          <span>{translate('dashboard.created')}: {new Date(createdAt).toLocaleDateString()}</span>
          <span>{translate('dashboard.updated')}: {new Date(updatedAt).toLocaleDateString()}</span>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg transition-all duration-200"
          >
            {translate('dashboard.actions.delete')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </StyledModalContainer>
    </Modal>
  );
};

export default ApplicationDetailModalUI;
