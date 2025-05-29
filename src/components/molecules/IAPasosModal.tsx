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
    titulo: '¡Bienvenido a Postulate!',
    descripcion:
      'La plataforma más avanzada para gestionar tus postulaciones laborales con inteligencia artificial y análisis predictivo que maximiza tus oportunidades de éxito',
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
    titulo: 'Paso 2',
    descripcion: 'Este es un paso de ejemplo. Aquí puedes poner información relevante para el usuario.',
    icono: null,
    extras: null
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
            className="w-40"
          >
            {step < pasos.length - 1 ? 'Siguiente' : 'Finalizar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default IAPasosModal;
