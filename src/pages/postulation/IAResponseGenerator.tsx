import React, { useState, useRef } from 'react';

import { Link as LinkIcon, Image as ImageIcon, Sparkles, Lightbulb, Info, Zap, Upload } from 'lucide-react';
import Footer from '../../components/organisms/Footer';
import { useLanguageStore } from '../../store/language/languageStore';
import TabsGradient from '../../components/ui/TabsGradient';




// Respuesta de ejemplo para mostrar
const respuestaEjemplo = `PERFIL PROFESIONAL\nDesarrollador Frontend con más de 4 años de experiencia especializado en React, TypeScript y Next.js. Experto en la creación de interfaces de usuario intuitivas y componentes reutilizables. Sólidos conocimientos en sistemas de diseño y optimización de rendimiento web.\n\nHABILIDADES DESTACADAS\n• Desarrollo avanzado con React y TypeScript\n• Experiencia comprobada con Next.js\n• Implementación de sistemas de diseño\n• Optimización de interfaces de usuario\n• Control de versiones con Git\n• Metodologías ágiles`;

const IAResponseGenerator: React.FC = () => {
  const [paso, setPaso] = useState(0); // 0: oferta, 1: tipo/tono, 2: generación
  const [enlace, setEnlace] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [inputTab, setInputTab] = useState<'enlace' | 'imagen'>('enlace');
  const [tipoRespuesta, setTipoRespuesta] = useState('carta');
  const [tono, setTono] = useState('profesional');
  const [respuesta, setRespuesta] = useState('');
  const [/* loading */, setLoading] = useState(false);
  const [analizando, setAnalizando] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Traducción y tema
  const { translate } = useLanguageStore();


  // Barra de progreso
  const progreso = [25, 60, 100][paso];

  // Manejo de tabs
  const handleTab = (tab: 'enlace' | 'imagen') => {
    setInputTab(tab);
    setEnlace('');
    setImagen(null);
  };

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImagen(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  // Paso 1: Cargar oferta
  const PasoOferta = (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-lg p-6 mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">1</span>
          <span className="text-white text-xl font-bold">{translate('ia.step1.title')}</span>
        </div>
        <span className="text-blue-100 text-base">{translate('ia.step1.subtitle')}</span>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 rounded-xl p-4 mb-4 flex items-center gap-3">
        <Lightbulb className="text-yellow-400" size={28} />
        <div>
          <span className="font-semibold text-yellow-800 dark:text-yellow-200">{translate('ia.tip.title')}</span>
          <div className="text-yellow-700 dark:text-yellow-100 text-sm">{translate('ia.tip.text')}</div>
        </div>
      </div>
      <div className="mb-6">
        <TabsGradient
          tabs={[
            { label: translate('ia.tab.link'), value: 'enlace', icon: <LinkIcon className="w-5 h-5" /> },
            { label: translate('ia.tab.image'), value: 'imagen', icon: <ImageIcon className="w-5 h-5" /> },
          ]}
          activeTab={inputTab}
          onTabChange={handleTab}
        />
      </div>
      {inputTab === 'enlace' ? (
        <>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="url"
              placeholder="https://www.linkedin.com/jobs/view/..."
              value={enlace}
              onChange={e => setEnlace(e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-base font-normal text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition placeholder-gray-400 font-sans outline-none"
              style={{ minWidth: 0 }}
            />
            <button
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              tabIndex={-1}
              type="button"
              disabled
            >
              <LinkIcon className="text-blue-500" size={22} />
            </button>
          </div>
          <div className="rounded-xl border border-blue-200 dark:border-blue-400 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-200 flex items-center gap-2 px-4 py-3 mb-2 text-base">
            <Info className="text-blue-600 dark:text-blue-300" size={20} />
            <span>{translate('ia.link.help')}</span>
          </div>
        </>
      ) : (
        <div
          className={`w-full min-h-[220px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-200 mb-2 ${dragActive ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputFileRef.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-full p-5 mb-3 shadow-lg">
              <Upload className="text-white" size={36} />
            </div>
            <span className="text-blue-600 dark:text-blue-300 font-semibold text-lg mb-1">{translate('ia.image.drop')}</span>
            <span className="text-gray-500 dark:text-gray-300 text-sm">PNG, JPG o PDF (máx. 10MB)</span>
            <input
              ref={inputFileRef}
              type="file"
              accept="image/png,image/jpeg,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {imagen && (
            <div className="mt-4 text-blue-700 dark:text-blue-200 font-medium text-base">{imagen.name}</div>
          )}
        </div>
      )}
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
          {analizando ? translate('ia.analyzing') : translate('ia.analyzeBtn')}
        </button>
      </div>
    </div>
  );

  // Paso 2: Análisis y selección de respuesta
  const PasoTipoTono = (
    <>
      {/* Encabezado de paso 2 */}
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-2xl p-6 mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-1">
          <span className="bg-blue-400 bg-opacity-30 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">2</span>
          <span className="text-white text-2xl font-extrabold">{translate('ia.step2.title')}</span>
        </div>
        <span className="text-blue-100 text-lg ml-16">{translate('ia.step2.subtitle')}</span>
      </div>
      {/* Tarjeta de análisis de la oferta */}
      <div className="w-full max-w-3xl mx-auto bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span className="text-green-900 dark:text-green-200 font-bold text-lg">{translate('ia.analysis.title')}</span>
          <span className="ml-2 bg-green-500 text-white text-xs font-semibold rounded-full px-3 py-1">{translate('ia.analysis.completed')}</span>
        </div>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
            <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">{translate('ia.analysis.position')}</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">Desarrollador Frontend React</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
            <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">{translate('ia.analysis.company')}</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">TechSolutions S.A.</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
            <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">{translate('ia.analysis.requirements')}</div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full px-3 py-1 text-sm font-medium">3+ años de experiencia con React</span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full px-3 py-1 text-sm font-medium">Conocimiento de TypeScript</span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full px-3 py-1 text-sm font-medium">Experiencia con Next.js</span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full px-3 py-1 text-sm font-medium">Familiaridad con sistemas de diseño</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
            <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">{translate('ia.analysis.skills')}</div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full px-3 py-1 text-sm font-medium">React</span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full px-3 py-1 text-sm font-medium">TypeScript</span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full px-3 py-1 text-sm font-medium">Next.js</span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full px-3 py-1 text-sm font-medium">CSS</span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full px-3 py-1 text-sm font-medium">UI/UX</span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full px-3 py-1 text-sm font-medium">Git</span>
            </div>
          </div>
        </div>
      </div>
      {/* Selección de tipo de respuesta y tono */}
      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          <div className="font-semibold text-gray-800 dark:text-gray-100 mb-4">{translate('ia.responseType')}</div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border dark:border-gray-700 transition hover:bg-gray-50 dark:hover:bg-gray-800">
              <input type="radio" name="tipoRespuesta" value="carta" checked={tipoRespuesta === 'carta'} onChange={() => setTipoRespuesta('carta')} className="accent-blue-500 w-5 h-5" />
              <span className="text-gray-800 dark:text-gray-100 font-medium flex items-center gap-2"><span role="img" aria-label="carta">📄</span> {translate('ia.type.letter')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border dark:border-gray-700 transition hover:bg-gray-50 dark:hover:bg-gray-800">
              <input type="radio" name="tipoRespuesta" value="email" checked={tipoRespuesta === 'email'} onChange={() => setTipoRespuesta('email')} className="accent-blue-500 w-5 h-5" />
              <span className="text-gray-800 dark:text-gray-100 font-medium flex items-center gap-2"><span role="img" aria-label="email">✉️</span> {translate('ia.type.email')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border dark:border-gray-700 transition hover:bg-gray-50 dark:hover:bg-gray-800">
              <input type="radio" name="tipoRespuesta" value="cv" checked={tipoRespuesta === 'cv'} onChange={() => setTipoRespuesta('cv')} className="accent-blue-500 w-5 h-5" />
              <span className="text-gray-800 dark:text-gray-100 font-medium flex items-center gap-2"><span role="img" aria-label="cv">📝</span> {translate('ia.type.cv')}</span>
            </label>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          <div className="font-semibold text-gray-800 dark:text-gray-100 mb-4">{translate('ia.tone')}</div>
          <div className="relative">
            <select value={tono} onChange={e => setTono(e.target.value)} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-base font-normal text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition font-sans bg-white dark:bg-gray-900">
              <option value="profesional">{translate('ia.tone.profesional')}</option>
              <option value="entusiasta">{translate('ia.tone.entusiasta')}</option>
              <option value="directo">{translate('ia.tone.directo')}</option>
              <option value="formal">{translate('ia.tone.formal')}</option>
              <option value="informal">{translate('ia.tone.informal')}</option>
              <option value="creativo">{translate('ia.tone.creativo')}</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row justify-between gap-4">
        <button
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-blue-500 to-violet-400 shadow-lg hover:from-blue-600 hover:to-violet-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ minWidth: 180 }}
          onClick={() => setPaso(0)}
        >
          ← {translate('ia.back')}
        </button>
        <button
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-green-500 to-green-600 shadow-lg hover:from-green-600 hover:to-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ minWidth: 220 }}
          onClick={() => setPaso(2)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          {translate('ia.generateBtn')}
        </button>
      </div>
    </>
  );

  // Paso 3: Respuesta generada
  const PasoGenerar = (
    <>
      {/* Encabezado de paso 3 */}
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-2xl p-6 mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-1">
          <span className="bg-blue-400 bg-opacity-30 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">3</span>
          <span className="text-white text-2xl font-extrabold">{translate('ia.step3.title')}</span>
        </div>
        <span className="text-blue-100 text-lg ml-16">{translate('ia.step3.subtitle')}</span>
      </div>
      {/* Encabezado de respuesta generada */}
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-full p-3 text-white">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M8 12h8M8 16h8M8 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{translate('ia.generated')}</span>
          <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full px-3 py-1">{translate('ia.status.ready')}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            onClick={() => {
              navigator.clipboard.writeText(respuesta || respuestaEjemplo);
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
            {translate('ia.copy')}
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            onClick={() => {
              const blob = new Blob([respuesta || respuestaEjemplo], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'respuesta.txt';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {translate('ia.download')}
          </button>
        </div>
      </div>
      {/* Tarjeta de respuesta generada */}
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <pre className="whitespace-pre-wrap break-words text-gray-900 dark:text-white text-base font-sans" style={{ background: 'none', border: 'none', margin: 0, padding: 0 }}>
{respuesta || respuestaEjemplo}
        </pre>
      </div>
      {/* Botones inferiores */}
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-4">
        <button
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-gray-800 dark:text-gray-100 text-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          style={{ minWidth: 180 }}
          onClick={() => setPaso(0)}
        >
          ← {translate('ia.home')}
        </button>
        <button
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg hover:from-orange-600 hover:to-pink-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ minWidth: 180 }}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setRespuesta(respuestaEjemplo + '\n(Rechequeado)');
              setLoading(false);
            }, 1200);
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {translate('ia.recheck')}
        </button>
      </div>
    </>
  );

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
        {paso === 0 && PasoOferta}
        {paso === 1 && PasoTipoTono}
        {paso === 2 && PasoGenerar}
      </div>
      {/* Footer siempre al final */}
      <Footer />
    </div>
  );
};

export default IAResponseGenerator;
