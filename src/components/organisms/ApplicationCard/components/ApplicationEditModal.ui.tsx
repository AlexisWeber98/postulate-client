import React from 'react';
import Modal from '../../../molecules/Modal';
import { ApplicationCardProps } from '../../../../interfaces/components/organisms/ApplicationCard.interface';
import { STATUS_LABELS, Postulation, PostulationStatus } from '../../../../types/interface/postulations/postulation';
import StyledModalContainer from "../../../shared/components/StyledModalContainer/StyledModalContainer.ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../../../ui/select';

interface ApplicationEditModalUIProps extends ApplicationCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedApplication: Postulation) => void;
  onDelete: () => Promise<void>;
  isLoading: boolean;
}

const ApplicationEditModalUI: React.FC<ApplicationEditModalUIProps> = ({
  application,
  isOpen,
  onClose,
  onSave,

}) => {
  const [estado, setEstado] = React.useState<PostulationStatus>(application?.status || 'applied');
  if (!application) return null;
  const { company, position, date, url, notes, recruiterContact, sentCV, sentEmail, id, userId } = application;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // Validación básica de campos requeridos
    const company = formData.get('company') as string;
    const position = formData.get('position') as string;
    const date = formData.get('date') as string;

    if (!company || !position || !date) {
      console.error('[ApplicationEditModal] Campos requeridos faltantes:', { company, position, date });
      return;
    }

    const updatedApplication: Postulation = {
      id,
      userId,
      company,
      position,
      status: estado,
      date,
      url: formData.get('url') as string || undefined,
      notes: formData.get('notes') as string || undefined,
      recruiterContact: formData.get('recruiterContact') as string || undefined,
      sentCV: formData.get('sentCV') === 'on',
      sentEmail: formData.get('sentEmail') === 'on',
      createdAt: application.createdAt,
      updatedAt: new Date().toISOString()
    };

    console.log('[ApplicationEditModal] Enviando actualización:', {
      id: updatedApplication.id,
      userId: updatedApplication.userId,
      company: updatedApplication.company,
      position: updatedApplication.position,
      status: updatedApplication.status,
      date: updatedApplication.date,
      sentCV: updatedApplication.sentCV,
      sentEmail: updatedApplication.sentEmail
    });

    onSave(updatedApplication);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledModalContainer>
        <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
          {/* Botón de cerrar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 shadow-lg transition-all"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Avatar más pequeño */}
          <div className="flex justify-center items-center mb-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-2 border-blue-300/40">
              {company ? company.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'NA'}
            </div>
          </div>

          {/* Campos del formulario */}
          <div className="space-y-2">
            <div>
              <label className="block text-white/90 text-xs mb-0.5">Empresa *</label>
              <input
                type="text"
                name="company"
                defaultValue={company}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">Puesto *</label>
              <input
                type="text"
                name="position"
                defaultValue={position}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">Estado *</label>
              <Select value={estado} onValueChange={value => setEstado(value as PostulationStatus)} name="status">
                <SelectTrigger className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">Fecha *</label>
              <input
                type="date"
                name="date"
                defaultValue={date}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">URL</label>
              <input
                type="url"
                name="url"
                defaultValue={url}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">Contacto del Reclutador</label>
              <input
                type="text"
                name="recruiterContact"
                defaultValue={recruiterContact}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">Notas</label>
              <textarea
                name="notes"
                defaultValue={notes}
                rows={2}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex items-center space-x-1.5">
                <input
                  type="checkbox"
                  name="sentCV"
                  defaultChecked={sentCV}
                  className="w-3.5 h-3.5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                />
                <label className="text-white/90 text-xs">CV Enviado</label>
              </div>
              <div className="flex items-center space-x-1.5">
                <input
                  type="checkbox"
                  name="sentEmail"
                  defaultChecked={sentEmail}
                  className="w-3.5 h-3.5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                />
                <label className="text-white/90 text-xs">Email Enviado</label>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
            >
              Guardar
            </button>
          </div>
        </form>
      </StyledModalContainer>
    </Modal>
  );
};

export default ApplicationEditModalUI;
