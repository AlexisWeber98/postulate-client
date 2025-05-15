import React from 'react';
import Modal from '../../../molecules/Modal';
import { ApplicationCardProps } from '../../../../interfaces/components/cards/ApplicationCardProps.interface';
import { STATUS_LABELS } from '../../../../types/interface/postulations/postulation';
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
    <Modal isOpen={isOpen} onClose={onClose} title={`Detalle de postulación`}>
      <div className="space-y-3">
        <div>
          <span className="font-semibold">Empresa:</span> {company}
        </div>
        <div>
          <span className="font-semibold">Puesto:</span> {position}
        </div>
        <div>
          <span className="font-semibold">Estado:</span> {STATUS_LABELS[status]}
        </div>
        <div>
          <span className="font-semibold">Fecha de aplicación:</span> {new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
        {url && (
          <div>
            <span className="font-semibold">URL:</span> {/* Si usás Next.js, reemplazá <a> por <Link> */}
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{url}</a>
          </div>
        )}
        {notes && (
          <div>
            <span className="font-semibold">Notas:</span> {notes}
          </div>
        )}
        <div>
          <span className="font-semibold">Creado:</span> {new Date(createdAt).toLocaleString('es-ES')}
        </div>
        <div>
          <span className="font-semibold">Actualizado:</span> {new Date(updatedAt).toLocaleString('es-ES')}
        </div>
      </div>
    </Modal>
  );
};

export default ApplicationDetailModalUI;
