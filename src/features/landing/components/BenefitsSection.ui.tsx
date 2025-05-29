
import { BarChart2, Calendar, Search, FileText, XCircle, Bell, User } from 'lucide-react';

const beneficiosCon = [
  {
    icon: <BarChart2 className="w-6 h-6 text-indigo-500" />, // Seguimiento
    title: 'Seguimiento detallado del estado de cada postulación',
    subtitle: 'Efectividad: 95%',
    percent: 95,
  },
  {
    icon: <Calendar className="w-6 h-6 text-indigo-500" />, // Organización
    title: 'Organización cronológica de entrevistas y fechas importantes',
    subtitle: 'Efectividad: 90%',
    percent: 90,
  },
  {
    icon: <Search className="w-6 h-6 text-indigo-500" />, // Búsqueda
    title: 'Búsqueda centralizada de toda la información relevante',
    subtitle: 'Efectividad: 88%',
    percent: 88,
  },
];

const problemasSin = [
  {
    icon: <FileText className="w-6 h-6 text-rose-400" />,
    title: 'Información dispersa en múltiples plataformas y documentos',
    subtitle: 'Nivel de caos: 85%',
    percent: 85,
  },
  {
    icon: <Bell className="w-6 h-6 text-rose-400" />,
    title: 'Recordatorios perdidos y fechas límite olvidadas',
    subtitle: 'Nivel de caos: 90%',
    percent: 90,
  },
  {
    icon: <User className="w-6 h-6 text-rose-400" />,
    title: 'Contactos y seguimientos desorganizados',
    subtitle: 'Nivel de caos: 80%',
    percent: 80,
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 justify-center items-center">
        {/* Card Con Postulate */}
        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md flex flex-col gap-6 border border-blue-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-indigo-500 text-white rounded-xl p-3 flex items-center justify-center shadow-lg">
              <BarChart2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">Con Postulate</h3>
              <span className="text-indigo-600 font-semibold text-base leading-tight">Organización profesional</span>
            </div>
          </div>
          <ul className="flex flex-col gap-5 mt-2">
            {beneficiosCon.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="bg-indigo-100 rounded-lg p-2 mt-1">{item.icon}</div>
                <div>
                  <div className="font-medium text-gray-900 text-base leading-tight">{item.title}</div>
                  <div className="text-indigo-500 text-sm font-semibold mt-1">{item.subtitle}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-indigo-700 font-semibold text-sm flex items-center gap-1">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01" /></svg>
                Nivel de Efectividad
              </span>
              <span className="text-indigo-700 font-bold text-lg">95%</span>
            </div>
            <div className="w-full h-3 bg-indigo-100 rounded-full overflow-hidden">
              <div className="h-3 bg-indigo-500 rounded-full transition-all duration-500" style={{ width: '95%' }} />
            </div>
          </div>
        </div>
        {/* Card Sin Postulate */}
        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md flex flex-col gap-6 border border-rose-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-rose-500 text-white rounded-xl p-3 flex items-center justify-center shadow-lg">
              <XCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">Sin Postulate</h3>
              <span className="text-rose-500 font-semibold text-base leading-tight">Zona problemática</span>
            </div>
          </div>
          <ul className="flex flex-col gap-5 mt-2">
            {problemasSin.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="bg-rose-100 rounded-lg p-2 mt-1">{item.icon}</div>
                <div>
                  <div className="font-medium text-gray-900 text-base leading-tight">{item.title}</div>
                  <div className="text-rose-500 text-sm font-semibold mt-1">{item.subtitle}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-rose-600 font-semibold text-sm flex items-center gap-1">
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01" /></svg>
                Nivel de Desorden
              </span>
              <span className="text-rose-600 font-bold text-lg">30%</span>
            </div>
            <div className="w-full h-3 bg-rose-100 rounded-full overflow-hidden">
              <div className="h-3 bg-rose-500 rounded-full transition-all duration-500" style={{ width: '30%' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
