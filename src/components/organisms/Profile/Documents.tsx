import React from 'react';
import { Briefcase, FileText, Upload } from 'lucide-react';

const Documents: React.FC = () => {
  return (
    <>
      {/* Tip profesional Documentos */}
      <div className="flex items-center w-full max-w-2xl mb-8 p-4 rounded-xl bg-gradient-to-r from-yellow-50 via-white to-pink-100 border-l-4 border-orange-400 shadow gap-3">
        <span className="bg-orange-400 text-white rounded-full p-2 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div>
          <span className="font-bold text-orange-800">Tip profesional</span>
          <p className="text-orange-700 text-sm">Asegúrate de que tus documentos estén actualizados y en formatos estándar como PDF para mejor compatibilidad.</p>
        </div>
      </div>

      {/* Tarjetas de documentos */}
      <div className="w-full flex flex-col md:flex-row gap-12 items-stretch justify-center">
        {/* CV */}
        <div className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-xl flex flex-col items-center p-8 gap-4 min-w-[260px]">
          <div className="bg-violet-400 rounded-full p-4 mb-2">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white text-center">Currículum Vitae</h3>
          <p className="text-white/80 text-center">Sube tu CV en formato PDF, DOCX o TXT</p>
          <button className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold text-base shadow transition">
            <Upload className="w-5 h-5" /> Subir CV
          </button>
        </div>

        {/* Carta de Presentación */}
        <div className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-xl flex flex-col items-center p-8 gap-4 min-w-[260px]">
          <div className="bg-violet-400 rounded-full p-4 mb-2">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white text-center">Carta de Presentación</h3>
          <p className="text-white/80 text-center">Sube tu carta en formato PDF o DOCX</p>
          <button className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold text-base shadow transition">
            <Upload className="w-5 h-5" /> Subir Carta
          </button>
        </div>

        {/* Otros Documentos */}
        <div className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl shadow-xl flex flex-col items-center p-8 gap-4 min-w-[260px]">
          <div className="bg-blue-500 rounded-full p-4 mb-2">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white text-center">Otros Documentos</h3>
          <p className="text-white/80 text-center">Certificados, diplomas y más</p>
          <button className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold text-base shadow transition">
            <Upload className="w-5 h-5" /> Subir Documentos
          </button>
        </div>
      </div>
    </>
  );
};

export default Documents;
