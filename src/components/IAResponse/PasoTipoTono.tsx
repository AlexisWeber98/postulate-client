import React from 'react';

type PasoTipoTonoProps = {
  translate: (...args: unknown[]) => string;
  tipoRespuesta: string;
  setTipoRespuesta: (val: string) => void;
  tono: string;
  setTono: (val: string) => void;
  onBack: () => void;
  onNext: () => void;
};
const PasoTipoTono: React.FC<PasoTipoTonoProps> = ({ translate, tipoRespuesta, setTipoRespuesta, tono, setTono, onBack, onNext }) => (
  <>
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-2xl p-6 mb-8 flex flex-col gap-2">
      <div className="flex items-center gap-3 mb-1">
        <span className="bg-blue-400 bg-opacity-30 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">2</span>
        <span className="text-white text-2xl font-extrabold">{translate('ia.step2.title')}</span>
      </div>
      <span className="text-blue-100 text-lg ml-16">{translate('ia.step2.subtitle')}</span>
    </div>
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
        onClick={onBack}
      >
        ← {translate('ia.back')}
      </button>
      <button
        className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-green-500 to-green-600 shadow-lg hover:from-green-600 hover:to-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ minWidth: 220 }}
        onClick={onNext}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        {translate('ia.generateBtn')}
      </button>
    </div>
  </>
);
export default PasoTipoTono;
