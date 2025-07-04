import React, { useMemo, useEffect } from 'react';
import { usePostulationsStore, useLanguageStore } from '../../store';
import { Postulation } from '../../types/interface/postulations/postulation';
import {
  PieChart,
  Activity,
  Users,
  Calendar,
  //CheckCircle2,
  //BarChart2,
  //Search,
  //Clock,
  //XCircle,
  //CheckCircle,
  //FileText,
  //Briefcase,
} from 'lucide-react';

const cardGradient = 'bg-gradient-to-r from-blue-500 to-violet-500';

const ApplicationStats: React.FC = () => {
  const { postulations = [] } = usePostulationsStore();
  const translate = useLanguageStore(state => state.translate);

  // Log para verificar los datos recibidos
  useEffect(() => {

  }, [postulations]);

  // Total count
  const totalApplications = useMemo(() => {
    if (!Array.isArray(postulations)) {
      console.warn('⚠️ ApplicationStats: postulations no es un array:', postulations);
      return 0;
    }
    return postulations.length;
  }, [postulations]);

  // Active applications (not rejected or accepted)
  const activeApplications = useMemo(() => {
    if (!Array.isArray(postulations)) {
      console.warn('⚠️ ApplicationStats: postulations no es un array:', postulations);
      return 0;
    }
    return postulations.filter(
      (app: Postulation) =>
        app && app.status && app.status !== 'rejected' && app.status !== 'accepted'
    ).length;
  }, [postulations]);

  // Get company with most applications
  const topCompany = useMemo(() => {
    if (!Array.isArray(postulations)) {
      console.warn('⚠️ ApplicationStats: postulations no es un array:', postulations);
      return { name: '', count: 0 };
    }

    const companyCount = postulations
      .filter((app: Postulation) => app && app.company)
      .reduce(
        (acc: Record<string, number>, app: Postulation) => {
          acc[app.company] = (acc[app.company] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

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
    if (!Array.isArray(postulations)) {
      console.warn('⚠️ ApplicationStats: postulations no es un array:', postulations);
      return 0;
    }

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    return postulations.filter(
      (app: Postulation) =>
        app && app.applicationDate && new Date(app.applicationDate) >= last30Days
    ).length;
  }, [postulations]);

  // Applications by status
  const applicationsByStatus = useMemo(() => {
    if (!Array.isArray(postulations)) {
      console.warn('⚠️ ApplicationStats: postulations no es un array:', postulations);
      return {
        applied: 0,
        interview: 0,
        technical: 0,
        offer: 0,
        rejected: 0,
        accepted: 0,
      };
    }

    const statusCount = postulations
      .filter((app: Postulation) => app && app.status)
      .reduce(
        (acc: Record<string, number>, app: Postulation) => {
          acc[app.status] = (acc[app.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

    return {
      applied: statusCount['applied'] || 0,
      interview: statusCount['interview'] || 0,
      technical: statusCount['technical'] || 0,
      offer: statusCount['offer'] || 0,
      rejected: statusCount['rejected'] || 0,
      accepted: statusCount['accepted'] || 0,
    };
  }, [postulations]);

  const statusColors = {
    applied: 'bg-blue-700',
    interview: 'bg-purple-500',
    technical: 'bg-yellow-500',
    offer: 'bg-green-500',
    rejected: 'bg-red-500',
    accepted: 'bg-emerald-500',
  };

  // Log para verificar los cálculos
  useEffect(() => {

  }, [totalApplications, activeApplications, topCompany, recentApplications, applicationsByStatus]);

  return (
    <div className="w-full ">
      <h2
        className={`text-2xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 ${cardGradient} bg-clip-text text-transparent`}
      >
        {translate('dashboard.summary')}
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Primera fila de cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div
            className={`${cardGradient} rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 flex items-center justify-between`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-xs lg:text-base text-white font-medium mb-1">
                {translate('stats.totalApplications')}
              </p>
              <p className="text-lg sm:text-lg lg:text-2xl font-bold text-white">{totalApplications}</p>
            </div>
            <div className="flex-shrink-0 w-8 h-8 sm:w-8 sm:h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-white/80 ml-2">
              <PieChart className="w-4 h-4 sm:w-4 sm:h-4 lg:w-7 lg:h-7 text-blue-500" />
            </div>
          </div>
          <div
            className={`${cardGradient} rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 flex items-center justify-between`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-xs lg:text-base text-white font-medium mb-1">
                {translate('stats.activeApplications')}
              </p>
              <p className="text-lg sm:text-lg lg:text-2xl font-bold text-white">{activeApplications}</p>
            </div>
            <div className="flex-shrink-0 w-8 h-8 sm:w-8 sm:h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-white/80 ml-2">
              <Activity className="w-4 h-4 sm:w-4 sm:h-4 lg:w-7 lg:h-7 text-green-500" />
            </div>
          </div>
          <div
            className={`${cardGradient} rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 flex items-center justify-between`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-xs lg:text-base text-white font-medium mb-1">
                {translate('stats.topCompany')}
              </p>
              <p className="text-lg sm:text-lg lg:text-2xl font-bold text-white truncate">{topCompany.name || '-'}</p>
            </div>
            <div className="flex-shrink-0 w-8 h-8 sm:w-8 sm:h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-white/80 ml-2">
              <Users className="w-4 h-4 sm:w-4 sm:h-4 lg:w-7 lg:h-7 text-pink-500" />
            </div>
          </div>
          <div
            className={`${cardGradient} rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 flex items-center justify-between`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-xs lg:text-base text-white font-medium mb-1">
                {translate('stats.recentApplications')}
              </p>
              <p className="text-lg sm:text-lg lg:text-2xl font-bold text-white">{recentApplications}</p>
            </div>
            <div className="flex-shrink-0 w-8 h-8 sm:w-8 sm:h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-white/80 ml-2">
              <Calendar className="w-4 h-4 sm:w-4 sm:h-4 lg:w-7 lg:h-7 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Segunda fila - Postulaciones por estado */}
        <h3
          className={`text-2xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 ${cardGradient} bg-clip-text text-transparent`}
        >
          {translate('stats.statusBreakdown')}
        </h3>
        <div className={`${cardGradient} rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6`}>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center">
              <div className="w-20 sm:w-32 lg:w-40 text-xs sm:text-xs lg:text-sm font-medium text-white">
                {translate('dashboard.stats.status.applied')}
              </div>
              <div className="flex-1 h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${statusColors.applied} shadow-lg`}
                  style={{ width: `${(applicationsByStatus.applied / totalApplications) * 100}%` }}
                />
              </div>
              <div className="w-8 sm:w-12 lg:w-16 text-right text-xs sm:text-xs lg:text-sm font-medium text-white">
                {applicationsByStatus.applied}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-20 sm:w-32 lg:w-40 text-xs sm:text-xs lg:text-sm font-medium text-white">
                {translate('dashboard.stats.status.interview')}
              </div>
              <div className="flex-1 h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${statusColors.interview} shadow-lg`}
                  style={{
                    width: `${(applicationsByStatus.interview / totalApplications) * 100}%`,
                  }}
                />
              </div>
              <div className="w-8 sm:w-12 lg:w-16 text-right text-xs sm:text-xs lg:text-sm font-medium text-white">
                {applicationsByStatus.interview}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-20 sm:w-32 lg:w-40 text-xs sm:text-xs lg:text-sm font-medium text-white">
                {translate('dashboard.stats.status.technical')}
              </div>
              <div className="flex-1 h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${statusColors.technical} shadow-lg`}
                  style={{
                    width: `${(applicationsByStatus.technical / totalApplications) * 100}%`,
                  }}
                />
              </div>
              <div className="w-8 sm:w-12 lg:w-16 text-right text-xs sm:text-xs lg:text-sm font-medium text-white">
                {applicationsByStatus.technical}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-20 sm:w-32 lg:w-40 text-xs sm:text-xs lg:text-sm font-medium text-white">
                {translate('dashboard.stats.status.offer')}
              </div>
              <div className="flex-1 h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${statusColors.offer} shadow-lg`}
                  style={{ width: `${(applicationsByStatus.offer / totalApplications) * 100}%` }}
                />
              </div>
              <div className="w-8 sm:w-12 lg:w-16 text-right text-xs sm:text-xs lg:text-sm font-medium text-white">
                {applicationsByStatus.offer}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-20 sm:w-32 lg:w-40 text-xs sm:text-xs lg:text-sm font-medium text-white">
                {translate('dashboard.stats.status.rejected')}
              </div>
              <div className="flex-1 h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${statusColors.rejected} shadow-lg`}
                  style={{ width: `${(applicationsByStatus.rejected / totalApplications) * 100}%` }}
                />
              </div>
              <div className="w-8 sm:w-12 lg:w-16 text-right text-xs sm:text-xs lg:text-sm font-medium text-white">
                {applicationsByStatus.rejected}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-20 sm:w-32 lg:w-40 text-xs sm:text-xs lg:text-sm font-medium text-white">
                {translate('dashboard.stats.status.accepted')}
              </div>
              <div className="flex-1 h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${statusColors.accepted} shadow-lg`}
                  style={{ width: `${(applicationsByStatus.accepted / totalApplications) * 100}%` }}
                />
              </div>
              <div className="w-8 sm:w-12 lg:w-16 text-right text-xs sm:text-xs lg:text-sm font-medium text-white">
                {applicationsByStatus.accepted}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStats;
