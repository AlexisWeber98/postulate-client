import React from 'react';
import { BarChart2, Calendar, Search, FileText, XCircle, Bell, User } from 'lucide-react';
import { TranslationKey } from '../../../i18n/types';

interface BenefitsSectionProps {
  translate: (key: TranslationKey) => string;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ translate }) => {
  const beneficiosCon = [
    {
      icon: <BarChart2 className="w-6 h-6 text-indigo-500" />, // Seguimiento
      title: translate('landing.benefits.withPostulate.title1'),
      subtitle: translate('landing.benefits.withPostulate.subtitle1'),
      percent: 95,
    },
    {
      icon: <Calendar className="w-6 h-6 text-indigo-500" />, // Organización
      title: translate('landing.benefits.withPostulate.title2'),
      subtitle: translate('landing.benefits.withPostulate.subtitle2'),
      percent: 90,
    },
    {
      icon: <Search className="w-6 h-6 text-indigo-500" />, // Búsqueda
      title: translate('landing.benefits.withPostulate.title3'),
      subtitle: translate('landing.benefits.withPostulate.subtitle3'),
      percent: 88,
    },
  ];

  const problemasSin = [
    {
      icon: <FileText className="w-6 h-6 text-rose-400" />,
      title: translate('landing.benefits.withoutPostulate.title1'),
      subtitle: translate('landing.benefits.withoutPostulate.subtitle1'),
      percent: 85,
    },
    {
      icon: <Bell className="w-6 h-6 text-rose-400" />,
      title: translate('landing.benefits.withoutPostulate.title2'),
      subtitle: translate('landing.benefits.withoutPostulate.subtitle2'),
      percent: 90,
    },
    {
      icon: <User className="w-6 h-6 text-rose-400" />,
      title: translate('landing.benefits.withoutPostulate.title3'),
      subtitle: translate('landing.benefits.withoutPostulate.subtitle3'),
      percent: 80,
    },
  ];

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
              <h3 className="text-2xl font-extrabold text-gray-900">{translate('landing.benefits.withPostulate.title')}</h3>
              <span className="text-indigo-600 font-semibold text-base leading-tight">{translate('landing.benefits.withPostulate.subtitle')}</span>
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
                {translate('landing.benefits.withPostulate.effectiveness')}
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
              <h3 className="text-2xl font-extrabold text-gray-900">{translate('landing.benefits.withoutPostulate.title')}</h3>
              <span className="text-rose-500 font-semibold text-base leading-tight">{translate('landing.benefits.withoutPostulate.subtitle')}</span>
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
                {translate('landing.benefits.withoutPostulate.disorder')}
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
