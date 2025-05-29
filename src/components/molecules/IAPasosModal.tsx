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
        <Badge className="text-white font-bold px-4 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">100% Seguro</Badge>
        <Badge className="text-white font-bold px-4 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">IA Avanzada</Badge>
        <Badge className="text-white font-bold px-4 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">Resultados Garantizados</Badge>
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
              <Badge className="text-white font-bold px-4 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">IA</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-pink-200 text-pink-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 0v4m0 8v4m4-4h4m-8 0H4" stroke="#a21caf" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Algoritmos avanzados que analizan y optimizan tu CV para cada postulación específica</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-blue-50 border border-blue-200 transition-all hover:shadow-xl hover:border-blue-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge className="text-white font-bold px-4 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">Analytics</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-blue-200 text-blue-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 17v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" stroke="#2563eb" strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke="#2563eb" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Predicciones sobre probabilidad de éxito basadas en datos históricos y tendencias del mercado</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-green-50 border border-green-200 transition-all hover:shadow-xl hover:border-green-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge className="text-white font-bold px-4 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">Premium</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-green-200 text-green-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M8 12h8m-8 4h5m-5-8h8" stroke="#16a34a" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Simulacros de entrevistas personalizados con feedback inteligente y mejoras sugeridas</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-orange-50 border border-orange-200 transition-all hover:shadow-xl hover:border-orange-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge className="text-white font-bold px-4 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">Smart</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-orange-200 text-orange-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 8v4l3 3" stroke="#ea580c" strokeWidth="2"/><circle cx="12" cy="12" r="10" stroke="#ea580c" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Notificaciones automáticas sobre nuevas oportunidades que coinciden con tu perfil</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-violet-50 border border-violet-200 transition-all hover:shadow-xl hover:border-violet-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge className="text-white font-bold px-4 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">Auto</Badge>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 bg-violet-200 text-violet-700 rounded-full p-2"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M6 8h12M6 12h8m-8 4h12" stroke="#7c3aed" strokeWidth="2"/></svg></span>
              <div className="text-gray-800">Generación automática de cartas personalizadas para cada empresa y posición</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-cyan-50 border border-cyan-200 transition-all hover:shadow-xl hover:border-cyan-400 cursor-pointer relative">
            <div className="flex justify-end w-full mb-1">
              <Badge className="text-white font-bold px-4 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">Network</Badge>
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
    titulo: (
      <span className="text-3xl font-extrabold text-gray-900">Tour de la Plataforma</span>
    ),
    descripcion: 'Explora las áreas principales diseñadas para maximizar tu éxito',
    icono: null,
    extras: (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="relative flex items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
            <div className="flex-shrink-0 bg-gradient-to-br from-violet-500 to-pink-500 text-white rounded-xl p-3">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M3 3v18h18" stroke="white" strokeWidth="2"/><path d="M7 15l3-4 2 3 3-5 2 3" stroke="white" strokeWidth="2"/></svg>
            </div>
            <div className="text-gray-900 font-normal">Vista panorámica con métricas avanzadas y recomendaciones personalizadas</div>
            <span className="absolute top-3 right-4"><span className="text-white font-bold px-3 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">1</span></span>
          </div>
          <div className="relative flex items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
            <div className="flex-shrink-0 bg-gradient-to-br from-violet-500 to-pink-500 text-white rounded-xl p-3">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="10" rx="2" stroke="white" strokeWidth="2"/><path d="M8 7V5a4 4 0 1 1 8 0v2" stroke="white" strokeWidth="2"/></svg>
            </div>
            <div className="text-gray-900 font-normal">Pipeline visual con seguimiento automático y recordatorios inteligentes</div>
            <span className="absolute top-3 right-4"><span className="text-white font-bold px-3 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">2</span></span>
          </div>
          <div className="relative flex items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
            <div className="flex-shrink-0 bg-gradient-to-br from-violet-500 to-pink-500 text-white rounded-xl p-3">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 20v-2m0-2V4m0 0a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" stroke="white" strokeWidth="2"/></svg>
            </div>
            <div className="text-gray-900 font-normal">Herramientas de inteligencia artificial para optimizar tu búsqueda laboral</div>
            <span className="absolute top-3 right-4"><span className="text-white font-bold px-3 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">3</span></span>
          </div>
          <div className="relative flex items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
            <div className="flex-shrink-0 bg-gradient-to-br from-violet-500 to-pink-500 text-white rounded-xl p-3">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" stroke="white" strokeWidth="2"/><path d="M8 13l4-4 4 4" stroke="white" strokeWidth="2"/></svg>
            </div>
            <div className="text-gray-900 font-normal">Reportes detallados con insights accionables sobre tu rendimiento</div>
            <span className="absolute top-3 right-4"><span className="text-white font-bold px-3 py-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400">4</span></span>
          </div>
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 text-left flex flex-col items-start">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-blue-600 bg-blue-100 rounded-full p-1"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7Z" fill="currentColor"/></svg></span>
            <span className="font-bold text-blue-700">Navegación Inteligente</span>
          </div>
          <div className="text-base text-blue-700">
            Usa <span className="bg-white border border-blue-200 rounded px-2 py-0.5 font-mono text-blue-700">Ctrl + K</span> para acceso rápido a cualquier función. La IA aprende tus patrones de uso para sugerir acciones relevantes.
          </div>
        </div>
      </>
    )
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
        {/* Botón de cerrar (X) */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none z-20"
          aria-label="Cerrar"
        >
          ×
        </button>
        {/* Barra de progreso */}
        <div className="w-full mb-8">
          <div className="flex justify-center items-center mb-2">
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
            className="w-40 font-bold text-white bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 border-0 shadow-lg rounded-lg py-3 text-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            {step === 0 ? 'Cerrar' : 'Anterior'}
          </Button>
          <Button
            onClick={handleNext}
            disabled={step === 0 && password !== 'backend'}
            className="w-40 font-bold text-white bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 border-0 shadow-lg rounded-lg py-3 text-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            {step < pasos.length - 1 ? 'Siguiente' : 'Finalizar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default IAPasosModal;
