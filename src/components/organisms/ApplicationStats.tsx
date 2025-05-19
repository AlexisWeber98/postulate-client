import React, { useMemo } from 'react';
import { usePostulationsStore } from '../../store';
import { Postulation, PostulationStatus, STATUS_LABELS, STATUS_LABELS_EN } from '../../types/interface/postulations/postulation';
import { PieChart, Activity, Users, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ApplicationStats: React.FC = () => {
  const { postulations } = usePostulationsStore();
  const { t, lang } = useLanguage();

  // Count by status
  const statusCounts = useMemo(() => {
    return postulations.reduce((acc: Record<PostulationStatus, number>, app: Postulation) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<PostulationStatus, number>);
  }, [postulations]);

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

  const stats = [
    {
      name: t('dashboard.stats.total'),
      value: totalApplications,
      icon: <PieChart className="h-6 w-6 text-blue-600" />
    },
    {
      name: t('dashboard.stats.active'),
      value: activeApplications,
      icon: <Activity className="h-6 w-6 text-purple-600" />
    },
    {
      name: t('dashboard.stats.recent'),
      value: recentApplications,
      icon: <Calendar className="h-6 w-6 text-orange-600" />
    },
    {
      name: t('dashboard.stats.topCompany'),
      value: topCompany.name ? `${topCompany.name} (${topCompany.count})` : t('dashboard.stats.none'),
      icon: <Users className="h-6 w-6 text-green-600" />
    }
  ];

  // Si no hay aplicaciones, mostrar un mensaje simplificado
  if (postulations.length === 0) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.summary')}</h2>
        <div className="bg-white overflow-hidden shadow rounded-lg p-6">
          <p className="text-gray-600">{t('dashboard.stats.noStats')}</p>
        </div>
      </div>
    );
  }

  const statusLabels = lang === 'en' ? STATUS_LABELS_EN : STATUS_LABELS;

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">{stat.icon}</div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('dashboard.stats.statusDistribution')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(statusLabels).map(([status, label]) => (
            <div key={status} className="text-center">
              <div
                className={`inline-block w-16 h-3 rounded-full ${status === 'applied' ? 'bg-blue-500' :
                  status === 'interview' ? 'bg-purple-500' :
                  status === 'technical' ? 'bg-orange-500' :
                  status === 'offer' ? 'bg-teal-500' :
                  status === 'rejected' ? 'bg-red-500' :
                  'bg-green-500'}`}
              />
              <p className="mt-2 text-sm font-medium text-gray-600">{label}</p>
              <p className="text-xl font-semibold text-gray-900">{statusCounts[status as PostulationStatus] || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStats;
