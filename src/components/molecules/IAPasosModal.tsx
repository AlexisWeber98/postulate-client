import React, { useState } from 'react';
import Modal from './Modal';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { PasswordToggle } from '../ui/PasswordToggle';
import { useNavigate } from 'react-router-dom';

interface IAPasosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const pasos = [
  {
    titulo: '¡Gracias por elegir Postulate!',
    descripcion:
      'La plataforma más avanzada para gestionar tus postulaciones laborales con inteligencia artificial y análisis predictivo que maximiza tus oportunidades de éxito. Ahora te invitamos a conocer nuestras funcionalidades premium.',
    icono: (
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 shadow-lg">
        <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="white"><rect x="6" y="7" width="12" height="10" rx="2" strokeWidth="2"/><path d="M9 7V5a3 3 0 0 1 6 0v2" strokeWidth="2"/></svg>
      </div>
    ),
    extras: (
      <div className="flex flex-wrap gap-3 justify-center mt-4 mb-2">
        <Badge colorClass="bg-blue-100 text-blue-700">100% Seguro</Badge>
        <Badge colorClass="bg-purple-100 text-purple-700">IA Avanzada</Badge>
        <Badge colorClass="bg-pink-100 text-pink-700">Resultados Garantizados</Badge>
      </div>
    )
  },
  {
    titulo: (
      <span className="inline-flex items-center gap-2 text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2"><path d="M4 10l6 6 6-12 6 12 6-6" stroke="#FBBF24" strokeWidth="2" fill="none"/><rect x="7" y="22" width="18" height="4" rx="2" fill="#FBBF24"/></svg>
        Funcionalidades Premium
      </span>
    ),
    descripcion: 'Herramientas de inteligencia artificial que te dan ventaja competitiva en el mercado laboral',
    icono: null,
    extras: (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-pink-50 border border-pink-200 transition-all hover:shadow-xl hover:border-pink-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge colorClass="text-white bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 px-3 py-1 text-xs">IA</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-pink-200 text-pink-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 0v4m0 8v4m4-4h4m-8 0H4" stroke="#a21caf" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Algoritmos avanzados que analizan y optimizan tu CV para cada postulación específica</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-blue-50 border border-blue-200 transition-all hover:shadow-xl hover:border-blue-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge colorClass="text-white bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 px-3 py-1 text-xs">Analytics</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-blue-200 text-blue-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 17v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" stroke="#2563eb" strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke="#2563eb" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Predicciones sobre probabilidad de éxito basadas en datos históricos y tendencias del mercado</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-green-50 border border-green-200 transition-all hover:shadow-xl hover:border-green-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge colorClass="text-white bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 px-3 py-1 text-xs">Premium</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-green-200 text-green-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M8 12h8m-8 4h5m-5-8h8" stroke="#16a34a" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Simulacros de entrevistas personalizados con feedback inteligente y mejoras sugeridas</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-orange-50 border border-orange-200 transition-all hover:shadow-xl hover:border-orange-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge colorClass="text-white bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 px-3 py-1 text-xs">Smart</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-orange-200 text-orange-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 8v4l3 3" stroke="#ea580c" strokeWidth="2"/><circle cx="12" cy="12" r="10" stroke="#ea580c" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Notificaciones automáticas sobre nuevas oportunidades que coinciden con tu perfil</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-violet-50 border border-violet-200 transition-all hover:shadow-xl hover:border-violet-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge colorClass="text-white bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 px-3 py-1 text-xs">Auto</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-violet-200 text-violet-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M6 8h12M6 12h8m-8 4h12" stroke="#7c3aed" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Generación automática de cartas personalizadas para cada empresa y posición</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-cyan-50 border border-cyan-200 transition-all hover:shadow-xl hover:border-cyan-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge colorClass="text-white bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 px-3 py-1 text-xs">Network</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-cyan-200 text-cyan-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 6v6l4 2" stroke="#0891b2" strokeWidth="2"/><circle cx="12" cy="12" r="10" stroke="#0891b2" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Mapeo inteligente de tu red profesional para identificar conexiones estratégicas</div>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-left flex flex-col items-center">
          <div className="font-extrabold text-lg mb-1 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"><path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.77 7.82 20 9 12.91l-5-3.64 5.91-.01z" fill="currentColor"/></svg>
            Oferta de Lanzamiento
          </div>
          <div className="text-base text-gray-700"><span className="font-bold">50% de descuento</span> en tu primera suscripción Premium. Accede a todas las funcionalidades de IA por tiempo limitado.</div>
        </div>
      </>
    )
  },
  {
    titulo: 'Paso 3',
    descripcion: 'Otro paso de ejemplo. Puedes personalizar el contenido como desees.',
    icono: null,
    extras: null
  },
  {
    titulo: '¡Listo!',
    descripcion: 'Has completado el proceso. ¡Gracias por usar Postulate!',
    icono: null,
    extras: null
  }
];

const IAPasosModal: React.FC<IAPasosModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 0) {
      if (password !== 'backend') {
        setError('Contraseña incorrecta');
        return;
      }
      setError('');
    }
    if (step === pasos.length - 1) {
      onClose();
      setTimeout(() => {
        navigate('/dashboard/ia-response');
      }, 300);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
    setError('');
  };

  const handleClose = () => {
    setStep(0);
    setPassword('');
    setError('');
    onClose();
  };

  const paso = pasos[step];
  const progress = ((step + 1) / pasos.length) * 100;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl w-full mx-auto text-center relative px-2 sm:px-10">
        {/* Barra de progreso */}
        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500 text-base font-medium">Paso {step + 1} de 4</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-black to-gray-300 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {paso.icono}
        <h2 className="text-3xl font-extrabold text-violet-700 mb-4">{paso.titulo}</h2>
        <p className="text-gray-700 mb-6 text-lg">{paso.descripcion}</p>
        {paso.extras}
        {step === 0 && (
          <div className="mt-8 flex flex-col items-center gap-2 max-w-xs mx-auto">
            <PasswordToggle
              value={password}
              onChange={setPassword}
              placeholder="Contraseña"
              error={error}
              inputClassName="text-center"
            />
          </div>
        )}
        <div className="flex justify-between mt-10 gap-4 flex-wrap">
          <Button
            variant="secondary"
            onClick={step === 0 ? handleClose : handlePrev}
            className="w-40"
          >
            {step === 0 ? 'Cerrar' : 'Anterior'}
          </Button>
          <Button
            onClick={handleNext}
            disabled={step === 0 && password !== 'backend'}
            className="w-40 font-bold text-white bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            {step < pasos.length - 1 ? 'Siguiente' : 'Finalizar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default IAPasosModal;
