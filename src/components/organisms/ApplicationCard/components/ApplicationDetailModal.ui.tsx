import React from 'react';
import Modal from '../../../molecules/Modal';
import { ApplicationCardProps } from '../../../../interfaces/components/organisms/ApplicationCard.interface';
import { STATUS_LABELS } from '../../../../types/interface/postulations/postulation';

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
  if (!application) return null;
  const { company, position, status, date, url, notes, createdAt, updatedAt } = application;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledModalContainer>
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 shadow-lg transition-all"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        {/* Avatar grande */}
        <div className="flex justify-center items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-blue-300/40">
            {company.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
          </div>
        </div>
        {/* Badge de estado */}
        <div className="flex justify-center mb-4">
          <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{STATUS_LABELS[status]}</span>
        </div>
        {/* Stats */}
        <div className="flex justify-center gap-2 mb-4">
          <div className="bg-white/10 rounded-xl px-3 py-2 text-center text-xs text-white">
            <div className="font-bold">{new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: '2-digit' })}</div>
            <div className="opacity-70">Fecha</div>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-2 text-center text-xs text-white">
            <div className="font-bold">{position}</div>
            <div className="opacity-70">Puesto</div>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-2 text-center text-xs text-white">
            <div className="font-bold">{company}</div>
            <div className="opacity-70">Empresa</div>
          </div>
        </div>
        {/* Descripción/notas */}
        <div className="text-white/90 text-sm mb-2 min-h-[48px]">
          {notes || 'Sin notas'}
        </div>
        {/* URL */}
        {url && (
          <div className="text-blue-200 text-xs truncate mb-2">
            <a href={url} target="_blank" rel="noopener noreferrer" className="underline">{url}</a>
          </div>
        )}
        {/* Fechas de creación y actualización */}
        <div className="flex justify-between text-blue-100 text-[10px] mb-2">
          <span>Creado: {new Date(createdAt).toLocaleDateString('es-ES')}</span>
          <span>Act: {new Date(updatedAt).toLocaleDateString('es-ES')}</span>
        </div>
      </StyledModalContainer>
    </Modal>
  );
};

export default ApplicationDetailModalUI;
