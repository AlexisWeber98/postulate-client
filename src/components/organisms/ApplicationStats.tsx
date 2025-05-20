import React, { useMemo } from 'react';
import { usePostulationsStore, useLanguageStore } from '../../store';
import { Postulation } from '../../types/interface/postulations/postulation';
import { PieChart, Activity, Users, Calendar } from 'lucide-react';

const ApplicationStats: React.FC = () => {
  const { postulations } = usePostulationsStore();
  const { t } = useLanguageStore();

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('stats.totalApplications')}</p>
            <p className="text-2xl font-semibold">{totalApplications}</p>
          </div>
          <PieChart className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('stats.activeApplications')}</p>
            <p className="text-2xl font-semibold">{activeApplications}</p>
          </div>
          <Activity className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('stats.topCompany')}</p>
            <p className="text-2xl font-semibold">{topCompany.name || '-'}</p>
          </div>
          <Users className="w-8 h-8 text-purple-500" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('stats.recentApplications')}</p>
            <p className="text-2xl font-semibold">{recentApplications}</p>
          </div>
          <Calendar className="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>
  );
};

export default ApplicationStats;
