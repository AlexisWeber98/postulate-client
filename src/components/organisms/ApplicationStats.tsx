import React, { useMemo } from 'react';
import { usePostulationsStore, useLanguageStore } from '../../store';
import { Postulation } from '../../types/interface/postulations/postulation';
import { PieChart, Activity, Users, Calendar, CheckCircle2, BarChart2, Search } from 'lucide-react';

const cardGradient = 'bg-gradient-to-br from-[#c2e9fb] to-[#a1c4fd]';

const ApplicationStats: React.FC = () => {
  const { postulations } = usePostulationsStore();
  const translate = useLanguageStore(state=>state.translate);

  // Total count
  const totalApplications = postulations.length;

  // Active applications (not rejected or accepted)
  const activeApplications = useMemo(() => {
    return postulations.filter(
      (app: Postulation) => app.status !== 'rejected' && app.status !== 'accepted'
    ).length;
  }, [postulations]);

  // Get company with most applications
  const topCompany = useMemo(() => {
    const companyCount = postulations.reduce((acc: Record<string, number>, app: Postulation) => {
      acc[app.company] = (acc[app.company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let topCompany = { name: '', count: 0 };
    (Object.entries(companyCount) as [string, number][]).forEach(([company, count]) => {
      if (count > topCompany.count) {
        topCompany = { name: company, count };
      }
    });

    return topCompany;
  }, [postulations]);

  // Applications in the last 30 days
  const recentApplications = useMemo(() => {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    return postulations.filter(
      (app: Postulation) => new Date(app.date) >= last30Days
    ).length;
  }, [postulations]);

  return (
    <div className="w-full min-h-[60vh] px-2 md:px-0">
      <div className="max-w-6xl mx-auto py-8">
        {/* Primera fila de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`${cardGradient} rounded-2xl shadow-lg p-6 flex items-center justify-between`}>
            <div>
              <p className="text-base text-gray-700 font-medium mb-1">{translate('stats.totalApplications')}</p>
              <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80">
              <PieChart className="w-7 h-7 text-blue-500" />
            </div>
          </div>
          <div className={`${cardGradient} rounded-2xl shadow-lg p-6 flex items-center justify-between`}>
            <div>
              <p className="text-base text-gray-700 font-medium mb-1">{translate('stats.activeApplications')}</p>
              <p className="text-2xl font-bold text-gray-900">{activeApplications}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80">
              <Activity className="w-7 h-7 text-green-500" />
            </div>
          </div>
          <div className={`${cardGradient} rounded-2xl shadow-lg p-6 flex items-center justify-between`}>
            <div>
              <p className="text-base text-gray-700 font-medium mb-1">{translate('stats.topCompany')}</p>
              <p className="text-2xl font-bold text-gray-900">{topCompany.name || '-'}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80">
              <Users className="w-7 h-7 text-pink-500" />
            </div>
          </div>
          <div className={`${cardGradient} rounded-2xl shadow-lg p-6 flex items-center justify-between`}>
            <div>
              <p className="text-base text-gray-700 font-medium mb-1">{translate('stats.recentApplications')}</p>
              <p className="text-2xl font-bold text-gray-900">{recentApplications}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80">
              <Calendar className="w-7 h-7 text-orange-500" />
            </div>
          </div>
        </div>
        {/* Segunda fila de cards grandes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`${cardGradient} rounded-2xl shadow-lg p-8 flex flex-col items-center text-center`}>
            <div className="w-14 h-14 flex items-center justify-center rounded-full mb-4 bg-white/80">
              <CheckCircle2 className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{translate('card1.title')}</h3>
            <p className="text-gray-700 text-base font-medium">{translate('card1.desc')}</p>
          </div>
          <div className={`${cardGradient} rounded-2xl shadow-lg p-8 flex flex-col items-center text-center`}>
            <div className="w-14 h-14 flex items-center justify-center rounded-full mb-4 bg-white/80">
              <BarChart2 className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{translate('card2.title')}</h3>
            <p className="text-gray-700 text-base font-medium">{translate('card2.desc')}</p>
          </div>
          <div className={`${cardGradient} rounded-2xl shadow-lg p-8 flex flex-col items-center text-center`}>
            <div className="w-14 h-14 flex items-center justify-center rounded-full mb-4 bg-white/80">
              <Search className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{translate('card3.title')}</h3>
            <p className="text-gray-700 text-base font-medium">{translate('card3.desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStats;
