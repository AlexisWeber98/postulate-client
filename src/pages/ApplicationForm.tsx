import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApplicationStore } from '../store';
import { ApplicationStatus  , STATUS_LABELS} from '../types/index';
import Modal from '../components/Modal';
import { Save, AlertCircle } from 'lucide-react';

const ApplicationForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addApplication, updateApplication, getApplication, checkDuplicate } = useApplicationStore();

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('applied');
  const [date, setDate] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!date) {
      setDate(today);
    }
  }, [date]);

  // Load existing application if editing
  useEffect(() => {
    if (id) {
      const application = getApplication(id);
      if (application) {
        setCompany(application.company);
        setPosition(application.position);
        setStatus(application.status);
        setDate(application.date.split('T')[0]);
        setUrl(application.url);
        setNotes(application.notes || '');
      } else {
        navigate('/');
      }
    }
  }, [id, getApplication, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!company.trim()) {
      newErrors.company = 'La empresa es requerida';
    }

    if (!position.trim()) {
      newErrors.position = 'El puesto es requerido';
    }

    if (!date) {
      newErrors.date = 'La fecha es requerida';
    }

    if (url && !isValidUrl(url)) {
      newErrors.url = 'La URL debe ser válida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      console.log(error);
      return false;

    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check for duplicates only when creating new application
    if (!id && checkDuplicate(company, position)) {
      setShowDuplicateModal(true);
      return;
    }

    if (id) {
      updateApplication(id, {
        company,
        position,
        status,
        date,
        url,
        notes
      });
    } else {
      addApplication({
        company,
        position,
        status,
        date,
        url,
        notes
      });
    }

    navigate('/');
  };

  const handleContinueAnyway = () => {
    setShowDuplicateModal(false);

    addApplication({
      company,
      position,
      status,
      date,
      url,
      notes
    });

    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {id ? 'Editar Postulación' : 'Nueva Postulación'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Empresa *
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={`block w-full px-3 py-2 border ${
                errors.company ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Nombre de la empresa"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Puesto *
            </label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={`block w-full px-3 py-2 border ${
                errors.position ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Título del puesto"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Estado *
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Fecha de Postulación *
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`block w-full px-3 py-2 border ${
                errors.date ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              URL de Referencia
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`block w-full px-3 py-2 border ${
                errors.url ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="https://ejemplo.com/trabajo"
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-600">{errors.url}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notas
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Información adicional, contactos, datos relevantes..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-1" />
            Guardar
          </button>
        </div>
      </form>

      <Modal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        title="Postulación Duplicada"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              Ya existe una postulación para <strong>{position}</strong> en <strong>{company}</strong>.
              ¿Deseas continuar de todos modos?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowDuplicateModal(false)}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleContinueAnyway}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Continuar de todos modos
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationForm;
