import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../../components/ui/select';
import { Link as LinkIcon, Image as ImageIcon, Sparkles, Lightbulb, Info, Zap } from 'lucide-react';

const TONOS = [
  { value: 'profesional', label: 'Profesional' },
  { value: 'entusiasta', label: 'Entusiasta' },
  { value: 'directo', label: 'Directo' },
  { value: 'formal', label: 'Formal' },
  { value: 'informal', label: 'Informal' },
  { value: 'creativo', label: 'Creativo' },
];

const TIPOS_RESPUESTA = [
  { value: 'carta', label: 'Carta de presentación' },
  { value: 'email', label: 'Email de aplicación' },
  { value: 'cv', label: 'Adaptación de CV' },
];

const PASOS = [
  'Ingresa la oferta de trabajo',
  'Elige el tipo de respuesta y tono',
  'Genera y edita tu respuesta',
];

const IAResponseGenerator: React.FC = () => {
  const [paso, setPaso] = useState(0); // 0: oferta, 1: tipo/tono, 2: generación
  const [enlace, setEnlace] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [inputTab, setInputTab] = useState<'enlace' | 'imagen'>('enlace');
  const [tipoRespuesta, setTipoRespuesta] = useState('carta');
  const [tono, setTono] = useState('profesional');
  const [respuesta, setRespuesta] = useState('');
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analizando, setAnalizando] = useState(false);

  // Barra de progreso
  const progreso = [25, 60, 100][paso];

  // Manejo de tabs
  const handleTab = (tab: 'enlace' | 'imagen') => {
    setInputTab(tab);
    setEnlace('');
    setImagen(null);
  };

  // Paso 1: Cargar oferta
  const PasoOferta = (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-lg p-6 mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">1</span>
          <span className="text-white text-xl font-bold">Paso 1: Ingresa la oferta de trabajo</span>
        </div>
        <span className="text-blue-100 text-base">Ingresa un enlace o sube una imagen de la oferta laboral</span>
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-4 mb-4 flex items-center gap-3">
        <Lightbulb className="text-yellow-400" size={28} />
        <div>
          <span className="font-semibold text-yellow-800">Tip profesional</span>
          <div className="text-yellow-700 text-sm">Para mejores resultados, asegúrate de que la oferta de trabajo contenga información detallada sobre requisitos y responsabilidades.</div>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          className={`flex-1 py-2 rounded-lg font-semibold transition-all ${inputTab === 'enlace' ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow' : 'bg-white text-blue-700 border border-blue-300'}`}
          onClick={() => handleTab('enlace')}
        >
          <LinkIcon className="inline mr-2" size={18} /> Enlace
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-semibold transition-all ${inputTab === 'imagen' ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow' : 'bg-white text-blue-700 border border-blue-300'}`}
          onClick={() => handleTab('imagen')}
        >
          <ImageIcon className="inline mr-2" size={18} /> Imagen
        </button>
      </div>
      {inputTab === 'enlace' ? (
        <div className="flex items-center gap-2 mb-2">
          <input
            type="url"
            placeholder="https://www.linkedin.com/jobs/view/..."
            value={enlace}
            onChange={e => setEnlace(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-base font-normal text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition placeholder-gray-400 font-sans outline-none"
            style={{ minWidth: 0 }}
          />
          <button
            className="rounded-xl border border-gray-200 bg-white p-3 flex items-center justify-center hover:bg-blue-50 transition"
            tabIndex={-1}
            type="button"
            disabled
          >
            <LinkIcon className="text-blue-500" size={22} />
          </button>
        </div>
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={e => setImagen(e.target.files?.[0] || null)}
          className="block w-full border rounded-lg p-2 mb-2"
        />
      )}
      <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-700 flex items-center gap-2 px-4 py-3 mb-2 text-base">
        <Info className="text-blue-600" size={20} />
        <span>Ingresa el enlace completo a la oferta de trabajo (LinkedIn, Indeed, etc.)</span>
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-blue-500 to-violet-400 shadow-lg hover:from-blue-600 hover:to-violet-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ minWidth: 220 }}
          onClick={() => {
            setAnalizando(true);
            setTimeout(() => {
              setAnalizando(false);
              setPaso(1);
            }, 1200);
          }}
          disabled={inputTab === 'enlace' ? !enlace : !imagen || analizando}
        >
          <Zap className="w-5 h-5" />
          {analizando ? 'Analizando...' : 'Analizar oferta'}
        </button>
      </div>
    </div>
  );

  // Paso 2: Tipo y tono
  const PasoTipoTono = (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-lg p-6 mb-6 flex items-center gap-3">
        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">2</span>
        <span className="text-white text-xl font-bold">Paso 2: Elige el tipo de respuesta y tono</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Tipo de respuesta</label>
          <Select value={tipoRespuesta} onValueChange={setTipoRespuesta}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIPOS_RESPUESTA.map(op => (
                <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Tono</label>
          <Select value={tono} onValueChange={setTono}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TONOS.map(op => (
                <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={() => setPaso(0)}>
          Volver
        </Button>
        <Button onClick={() => setPaso(2)}>
          Siguiente
        </Button>
      </div>
    </div>
  );

  // Paso 3: Generar y editar
  const PasoGenerar = (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-lg p-6 mb-6 flex items-center gap-3">
        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">3</span>
        <span className="text-white text-xl font-bold">Paso 3: Genera y edita tu respuesta</span>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <Button onClick={async () => {
          setLoading(true);
          setTimeout(() => {
            setRespuesta(`Respuesta generada de ejemplo para tipo: ${tipoRespuesta}, tono: ${tono}.\n\n[Texto generado aquí...]`);
            setEditando(true);
            setLoading(false);
          }, 1200);
        }} disabled={loading}>
          {loading ? 'Generando...' : 'Generar respuesta'}
        </Button>
        {respuesta && (
          <>
            <label className="block font-semibold text-gray-700 mb-1">Respuesta generada</label>
            <textarea
              className="w-full min-h-[180px] rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-sans"
              value={respuesta}
              onChange={e => setRespuesta(e.target.value)}
              disabled={!editando}
            />
            <div className="flex gap-3 mt-2">
              <Button variant="secondary" onClick={() => setEditando(true)} disabled={!respuesta}>
                Editar
              </Button>
              <Button variant="secondary" onClick={async () => {
                setLoading(true);
                setTimeout(() => {
                  setRespuesta(`Respuesta refinada para tipo: ${tipoRespuesta}, tono: ${tono}.\n\n[Texto ajustado aquí...]`);
                  setLoading(false);
                }, 1200);
              }} disabled={loading}>
                Rechequear
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={() => setPaso(1)}>
          Volver
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-violet-50 to-white py-10 px-2">
      {/* Encabezado */}
      <div className="flex flex-col items-center mb-10">
        <div className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-full p-4 mb-4 shadow-lg">
          <Sparkles className="text-white" size={40} />
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text mb-2 text-center">Generación de respuesta IA</h1>
        <p className="text-lg text-gray-700 text-center max-w-xl mb-2">Genera respuestas personalizadas para tus postulaciones laborales con el poder de la inteligencia artificial</p>
        {/* Barra de progreso */}
        <div className="w-full max-w-xl flex flex-col items-center mt-2">
          <div className="flex justify-between w-full text-xs text-gray-500 mb-1">
            <span>Progreso</span>
            <span>{progreso}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      </div>
      {/* Contenido de pasos */}
      <div className="w-full flex flex-col items-center">
        {paso === 0 && PasoOferta}
        {paso === 1 && PasoTipoTono}
        {paso === 2 && PasoGenerar}
      </div>
    </div>
  );
};

export default IAResponseGenerator;
