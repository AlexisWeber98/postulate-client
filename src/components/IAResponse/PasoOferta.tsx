import React from 'react';
import { Lightbulb, Link as LinkIcon, Image as ImageIcon, Info, Upload, Zap } from 'lucide-react';
import TabsGradient from '../ui/TabsGradient';

type PasoOfertaProps = {
  translate: (...args: unknown[]) => string;
  inputTab: 'enlace' | 'imagen';
  setInputTab: (tab: 'enlace' | 'imagen') => void;
  enlace: string;
  setEnlace: (val: string) => void;
  imagen: File | null;
  setImagen: (file: File | null) => void;
  inputFileRef: React.RefObject<HTMLInputElement>;
  dragActive: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onNext: () => void;
  analizando: boolean;
};

const PasoOferta: React.FC<PasoOfertaProps> = ({
  translate, inputTab, setInputTab, enlace, setEnlace, imagen, setImagen, inputFileRef, dragActive, handleFileChange, handleDrag, handleDrop, onNext, analizando
}) => {
  const handleTab = (tab: 'enlace' | 'imagen') => {
    setInputTab(tab);
    setEnlace('');
    setImagen(null);
  };

  return (
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
              placeholder={translate('placeholder.jobUrl')}
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
          onClick={onNext}
          disabled={inputTab === 'enlace' ? !enlace : !imagen || analizando}
        >
          <Zap className="w-5 h-5" />
          {analizando ? translate('ia.analyzing') : translate('ia.analyzeBtn')}
        </button>
      </div>
    </div>
  );
};

export default PasoOferta;
