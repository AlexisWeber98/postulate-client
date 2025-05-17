import React from 'react';
import Modal from '../../../molecules/Modal';
import { ApplicationCardProps } from '../../../../interfaces/components/organisms/ApplicationCard.interface';
import { STATUS_LABELS, Postulation, PostulationStatus } from '../../../../types/interface/postulations/postulation';
import StyledModalContainer from "../../../shared/components/StyledModalContainer/StyledModalContainer.ui";

interface ApplicationEditModalUIProps extends ApplicationCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedApplication: Postulation) => void;
  onDelete: () => void;
}

const ApplicationEditModalUI: React.FC<ApplicationEditModalUIProps> = ({
  application,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  if (!application) return null;
  const { company, position, status, date, url, notes } = application;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedApplication: Postulation = {
      ...application,
      company: formData.get('company') as string,
      position: formData.get('position') as string,
      status: formData.get('status') as PostulationStatus,
      date: formData.get('date') as string,
      url: formData.get('url') as string,
      notes: formData.get('notes') as string,
    };
    onSave(updatedApplication);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledModalContainer>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Botón de cerrar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 shadow-lg transition-all"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Avatar grande */}
          <div className="flex justify-center items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-blue-300/40">
              {company.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
            </div>
          </div>

          {/* Campos del formulario */}
          <div className="space-y-4">
            <div>
              <label className="block text-white/90 text-sm mb-1">Empresa</label>
              <input
                type="text"
                name="company"
                defaultValue={company}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm mb-1">Puesto</label>
              <input
                type="text"
                name="position"
                defaultValue={position}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm mb-1">Estado</label>
              <select
                name="status"
                defaultValue={status}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key} className="bg-gray-800">
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/90 text-sm mb-1">Fecha</label>
              <input
                type="date"
                name="date"
                defaultValue={date}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm mb-1">URL</label>
              <input
                type="url"
                name="url"
                defaultValue={url}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm mb-1">Notas</label>
              <textarea
                name="notes"
                defaultValue={notes}
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
            >
              Eliminar
            </button>
          </div>
        </form>
      </StyledModalContainer>
    </Modal>
  );
};

export default ApplicationEditModalUI;
