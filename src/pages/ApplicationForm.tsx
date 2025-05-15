import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostulationsStore } from "../store";
import { PostulationStatus, STATUS_LABELS } from "../types/index";
import Modal from "../components/molecules/Modal";
import { Save, AlertCircle } from "lucide-react";
import { ValidationHelpers, DateHelpers } from "../lib/helpers";

const ApplicationForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPostulation, updatePostulation, getPostulation, checkDuplicate } =
    usePostulationsStore();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<PostulationStatus>("applied");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [sendCv, setSendCv] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [notes, setNotes] = useState("");
  const [recruiterContact, setRecruiterContact] = useState("");

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Set today's date as default
  useEffect(() => {
    if (!date) {
      setDate(DateHelpers.getCurrentDateISO());
    }
  }, [date]);

  // Load existing application if editing
  useEffect(() => {
    if (id) {
      const postulation = getPostulation(id);
      if (postulation) {
        setCompany(postulation.company);
        setPosition(postulation.position);
        setStatus(postulation.status);
        setDate(postulation.date.split("T")[0]);
        setUrl(postulation.url || "");
        setNotes(postulation.notes || "");
      } else {
        navigate("/");
      }
    }
  }, [id, getPostulation, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!ValidationHelpers.hasContent(company)) {
      newErrors.company = "La empresa es requerida";
    }

    if (!ValidationHelpers.hasContent(position)) {
      newErrors.position = "El puesto es requerido";
    }

    if (!date) {
      newErrors.date = "La fecha es requerida";
    }

    if (url && !ValidationHelpers.isValidUrl(url)) {
      newErrors.url = "La URL debe ser válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      updatePostulation(id, {
        company,
        position,
        status,
        date,
        url,
        notes,
        sendCv,
        sendEmail,
        recruiterContact,
      });
    } else {
      addPostulation({
        company,
        position,
        status,
        date,
        url,
        notes,
        sendCv,
        sendEmail,
        recruiterContact,
      });
    }

    navigate("/");
  };

  const handleContinueAnyway = () => {
    setShowDuplicateModal(false);

    addPostulation({
      company,
      position,
      status,
      date,
      url,
      notes,
    });

    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)]">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {id ? "Editar Postulación" : "Nueva Postulación"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 mb-8"
        >
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
                  errors.company ? "border-red-300" : "border-gray-300"
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
                  errors.position ? "border-red-300" : "border-gray-300"
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
                onChange={(e) => setStatus(e.target.value as PostulationStatus)}
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
                  errors.date ? "border-red-300" : "border-gray-300"
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
                  errors.url ? "border-red-300" : "border-gray-300"
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
                rows={5}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Añade cualquier información relevante sobre esta postulación"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="recruiterContact"
                className="block text-sm font-medium text-gray-700"
              >
                Contacto del reclutador o empresa
              </label>
              <input
                type="text"
                id="recruiterContact"
                value={recruiterContact}
                onChange={(e) => setRecruiterContact(e.target.value)}
                placeholder="Ejemplo: email@empresa.com o +54 9 11 1234 5678"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm  px-3 py-2"
              />
              <p className="mt-1 text-sm text-gray-500 p-2">
                * Fundamental para hacer el seguimiento, luego de un tiempo
                prudencial, se recomienda contactar para seguir el estado del
                proceso
              </p>
            </div>

            <div>
              <label htmlFor="sendCv" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sendCv"
                  checked={sendCv}
                  onChange={(e) => setSendCv(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Envié CV
                </span>
              </label>
            </div>

            <div>
              <label
                htmlFor="sendEmail"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="sendEmail"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Envié Email
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              {id ? "Actualizar postulación" : "Guardar postulación"}
            </button>
          </div>
        </form>
      </div>

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
              Ya existe una postulación para <strong>{position}</strong> en{" "}
              <strong>{company}</strong>. ¿Deseas continuar de todos modos?
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
