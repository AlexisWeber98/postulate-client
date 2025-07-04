import React from 'react';
import Modal from '../../../molecules/Modal';
import { STATUS_LABELS, Postulation, PostulationStatus } from '../../../../types/interface/postulations/postulation';
import StyledModalContainer from "../../../shared/components/StyledModalContainer/StyledModalContainer.ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../../../ui/select';
import { ApplicationEditModalUIProps } from '../../../../interfaces/components/organisms/ApplicationCard/ApplicationEditModalUI.interface';

const ApplicationEditModalUI: React.FC<ApplicationEditModalUIProps> = ({
  application,
  isOpen,
  onClose,
  onSave,

  isLoading
}) => {
  const [formData, setFormData] = React.useState<Partial<Postulation>>({
    status: application?.status || 'applied',
    company: application?.company || '',
    position: application?.position || '',
    applicationDate: application?.applicationDate || '',
    link: application?.link || '',
    description: application?.description || '',
    recruiterContact: application?.recruiterContact || '',
    sendCv: application?.sendCv || false,
    sendEmail: application?.sendEmail || false
  });

  if (!application) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value as PostulationStatus
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica de campos requeridos
    if (!formData.company || !formData.position || !formData.applicationDate) {
      console.error('[ApplicationEditModal] Campos requeridos faltantes:', formData);
      return;
    }

    const updatedApplication: Postulation = {
      id: application.id,
      userId: application.userId,
      company: formData.company!,
      position: formData.position!,
      status: formData.status!,
      applicationDate: formData.applicationDate!,
      link: formData.link || '',
      description: formData.description || '',
      recruiterContact: formData.recruiterContact || '',
      sendCv: formData.sendCv || false,
      sendEmail: formData.sendEmail || false,
      createdAt: application.createdAt,
      updatedAt: new Date().toISOString()
    };

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
              {formData.company ? formData.company.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'NA'}
            </div>
          </div>

          {/* Campos del formulario */}
          <div className="space-y-2">
            <div>
              <label className="block text-white/90 text-xs mb-0.5">Empresa *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">Puesto *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">Estado *</label>
              <Select
                value={formData.status}
                onValueChange={handleStatusChange}
                defaultValue={formData.status}
              >
                <SelectTrigger
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <SelectItem
                      key={key}
                      value={key}
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">Fecha *</label>
              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">URL</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">Contacto del Reclutador</label>
              <input
                type="text"
                name="recruiterContact"
                value={formData.recruiterContact}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white/90 text-xs mb-0.5">Notas</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex items-center space-x-1.5">
                <input
                  type="checkbox"
                  name="sendCv"
                  checked={formData.sendCv}
                  onChange={handleInputChange}
                  className="w-3.5 h-3.5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                />
                <label className="text-white/90 text-xs">CV Enviado</label>
              </div>
              <div className="flex items-center space-x-1.5">
                <input
                  type="checkbox"
                  name="sendEmail"
                  checked={formData.sendEmail}
                  onChange={handleInputChange}
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
              disabled={isLoading}
              className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </StyledModalContainer>
    </Modal>
  );
};

export default ApplicationEditModalUI;
