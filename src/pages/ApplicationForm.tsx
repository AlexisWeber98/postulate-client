import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { usePostulationsStore } from "../store";
import { PostulationStatus, STATUS_LABELS } from "../types/index";
import Modal from "../components/molecules/Modal";
import { Save, AlertCircle, ArrowLeft } from "lucide-react";
import { ValidationHelpers, DateHelpers } from "../lib/helpers";
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/atoms/Button/Button.ui';


const ApplicationForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPostulation, updatePostulation, getPostulation, checkDuplicate } =
    usePostulationsStore();
  const { t } = useLanguage();

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
      });
    } else {
      addPostulation({
        company,
        position,
        status,
        date,
        url,
        notes,
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
        <div className="mb-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 font-medium transition mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('dashboard.backToDashboard')}
          </Link>
        </div>
        <h1 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow">
          {id ? t('dashboard.editApplication') : t('dashboard.newApplication')}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="relative bg-gradient-to-br from-blue-900/80 to-blue-800/60 border border-blue-400/20 rounded-3xl shadow-2xl p-8 mb-8"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="company" className="block text-base font-semibold text-white mb-1 drop-shadow">
                {t('dashboard.company')} *
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={`w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none ${errors.company ? 'ring-2 ring-red-400' : ''}`}
                placeholder={t('dashboard.companyPlaceholder')}
                required
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-400">{errors.company}</p>
              )}
            </div>
            <div>
              <label htmlFor="position" className="block text-base font-semibold text-white mb-1 drop-shadow">
                {t('dashboard.position')} *
              </label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={`w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none ${errors.position ? 'ring-2 ring-red-400' : ''}`}
                placeholder={t('dashboard.positionPlaceholder')}
                required
              />
              {errors.position && (
                <p className="mt-1 text-xs text-red-400">{errors.position}</p>
              )}
            </div>
            <div>
              <label htmlFor="status" className="block text-base font-semibold text-white mb-1 drop-shadow">
                {t('dashboard.status')} *
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as PostulationStatus)}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none"
                required
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value} className="text-black bg-white">
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-base font-semibold text-white mb-1 drop-shadow">
                {t('dashboard.date')} *
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 shadow-inner appearance-none ${errors.date ? 'ring-2 ring-red-400' : ''}`}
                required
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-400">{errors.date}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="url" className="block text-base font-semibold text-white mb-1 drop-shadow">
                {t('dashboard.referenceUrl')}
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none ${errors.url ? 'ring-2 ring-red-400' : ''}`}
                placeholder={t('dashboard.referenceUrlPlaceholder')}
              />
              {errors.url && (
                <p className="mt-1 text-xs text-red-400">{errors.url}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-base font-semibold text-white mb-1 drop-shadow">
                {t('dashboard.notes')}
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
                placeholder={t('dashboard.notesPlaceholder')}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="recruiterContact" className="block text-base font-semibold text-white mb-1 drop-shadow">
                {t('dashboard.recruiterContact')}
              </label>
              <input
                type="text"
                id="recruiterContact"
                value={recruiterContact}
                onChange={(e) => setRecruiterContact(e.target.value)}
                placeholder={t('dashboard.recruiterContactPlaceholder')}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-100/60 shadow-inner appearance-none"
              />
              <p className="mt-1 text-xs text-blue-200 p-2">
                * {t('dashboard.recruiterContactHelper')}
              </p>
            </div>
            <div>
              <label htmlFor="sendCv" className="flex items-center gap-2 text-white/90 text-base">
                <input
                  type="checkbox"
                  id="sendCv"
                  checked={sendCv}
                  onChange={(e) => setSendCv(e.target.checked)}
                  className="accent-blue-500 w-5 h-5"
                />
                {t('dashboard.sentCV')}
              </label>
            </div>
            <div>
              <label htmlFor="sendEmail" className="flex items-center gap-2 text-white/90 text-base">
                <input
                  type="checkbox"
                  id="sendEmail"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="accent-blue-500 w-5 h-5"
                />
                {t('dashboard.sentEmail')}
              </label>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              icon={<Save className="h-5 w-5" />}
            >
              {id ? t('dashboard.editApplication') : t('hero.cta.button')}
            </Button>
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
