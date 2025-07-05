import React from 'react';
import { useLanguageStore } from '../../store/language/languageStore';
import { Sparkles } from 'lucide-react';
import PasoOferta from '../../components/IAResponse/PasoOferta';
import PasoTipoTono from '../../components/IAResponse/PasoTipoTono';
import PasoGenerar from '../../components/IAResponse/PasoGenerar';
import { useIAResponseGenerator } from '../../hooks/useIAResponseGenerator';

const respuestaEjemplo = `PERFIL PROFESIONAL\nDesarrollador Frontend con más de 4 años de experiencia especializado en React, TypeScript y Next.js. Experto en la creación de interfaces de usuario intuitivas y componentes reutilizables. Sólidos conocimientos en sistemas de diseño y optimización de rendimiento web.\n\nHABILIDADES DESTACADAS\n• Desarrollo avanzado con React y TypeScript\n• Experiencia comprobada con Next.js\n• Implementación de sistemas de diseño\n• Optimización de interfaces de usuario\n• Control de versiones con Git\n• Metodologías ágiles`;

const IAResponseGenerator: React.FC = () => {
  const { translate } = useLanguageStore();
  const {
    paso,
    setPaso,
    enlace,
    setEnlace,
    imagen,
    setImagen,
    inputTab,
    setInputTab,
    tipoRespuesta,
    setTipoRespuesta,
    tono,
    setTono,
    respuesta,
    setRespuesta,
    setLoading,
    analizando,
    setAnalizando,
    dragActive,
    inputFileRef,
    handleDrag,
    handleDrop,
    handleFileChange,
  } = useIAResponseGenerator();

  const progreso = [25, 60, 100][paso];

  return (
    <div className={`min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 via-violet-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900`}>
      {/* Contenido principal flexible */}
      <div className="flex-1 flex flex-col items-center justify-start w-full py-10 px-2">
        <div className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-full p-4 mb-4 shadow-lg">
          <Sparkles className="text-white" size={40} />
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text mb-2 text-center">{'Generación de respuesta IA'}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 text-center max-w-xl mb-2">{'Genera respuestas personalizadas para tus postulaciones laborales con el poder de la inteligencia artificial'}</p>
        {/* Barra de progreso */}
        <div className="w-full max-w-xl flex flex-col items-center mt-2">
          <div className="flex justify-between w-full text-xs text-gray-500 dark:text-gray-300 mb-1">
            <span>{'Progreso'}</span>
            <span>{progreso}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      </div>
      {/* Contenido de pasos */}
      <div className="w-full flex flex-col items-center">
        {paso === 0 && (
          <PasoOferta
            translate={translate as unknown as (...args: unknown[]) => string}
            inputTab={inputTab}
            setInputTab={setInputTab}
            enlace={enlace}
            setEnlace={setEnlace}
            imagen={imagen}
            setImagen={setImagen}
            inputFileRef={inputFileRef}
            dragActive={dragActive}
            analizando={analizando}
            handleFileChange={handleFileChange}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            onNext={() => {
              setAnalizando(true);
              setTimeout(() => {
                setAnalizando(false);
                setPaso(1);
              }, 1200);
            }}
          />
        )}
        {paso === 1 && (
          <PasoTipoTono
            translate={translate as unknown as (...args: unknown[]) => string}
            tipoRespuesta={tipoRespuesta}
            setTipoRespuesta={setTipoRespuesta}
            tono={tono}
            setTono={setTono}
            onBack={() => setPaso(0)}
            onNext={() => setPaso(2)}
          />
        )}
        {paso === 2 && (
          <PasoGenerar
            translate={translate as unknown as (...args: unknown[]) => string}
            respuesta={respuesta}
            respuestaEjemplo={respuestaEjemplo}
            setRespuesta={setRespuesta}
            setLoading={setLoading}
            onBack={() => setPaso(0)}
          />
        )}
      </div>
    </div>
  );
};

export default IAResponseGenerator;
