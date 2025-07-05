import React from 'react';

type PasoGenerarProps = {
  translate: (...args: unknown[]) => string;
  respuesta: string;
  respuestaEjemplo: string;
  setRespuesta: (val: string) => void;
  setLoading: (val: boolean) => void;
  onBack: () => void;
};
const PasoGenerar: React.FC<PasoGenerarProps> = ({ translate, respuesta, respuestaEjemplo, setRespuesta, setLoading, onBack }) => (
  <>
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-2xl p-6 mb-8 flex flex-col gap-2">
      <div className="flex items-center gap-3 mb-1">
        <span className="bg-blue-400 bg-opacity-30 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">3</span>
        <span className="text-white text-2xl font-extrabold">{translate('ia.step3.title')}</span>
      </div>
      <span className="text-blue-100 text-lg ml-16">{translate('ia.step3.subtitle')}</span>
    </div>
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
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-8">
      <pre className="whitespace-pre-wrap break-words text-gray-900 dark:text-white text-base font-sans" style={{ background: 'none', border: 'none', margin: 0, padding: 0 }}>
{respuesta || respuestaEjemplo}
      </pre>
    </div>
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-4">
      <button
        className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-gray-800 dark:text-gray-100 text-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        style={{ minWidth: 180 }}
        onClick={onBack}
      >
        ← {translate('ia.home')}
      </button>
      <button
        className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg hover:from-orange-600 hover:to-pink-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ minWidth: 180 }}
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setRespuesta((respuesta || respuestaEjemplo) + '\n(Rechequeado)');
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
export default PasoGenerar;
