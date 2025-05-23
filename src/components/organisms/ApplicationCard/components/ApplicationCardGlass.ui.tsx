import { ApplicationCardGlassProps } from '../../../../interfaces/components/organisms/ApplicationCard.interface';
import { STATUS_LABELS, STATUS_COLORS, STATUS_LABELS_EN } from '../../../../types/interface/postulations/postulation';
import { useLanguageStore } from '../../../../store/language/languageStore';

export const ApplicationCardGlass = ({ application, onViewDetail, onEdit, onDelete }: ApplicationCardGlassProps) => {
  const { company, position, status, date, url, notes, createdAt, updatedAt, sentCV, sentEmail } = application;
  const initials = company.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const { lang } = useLanguageStore();
  const translate = useLanguageStore(state=>state.translate);

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-violet-500 rounded-3xl shadow-xl p-0 overflow-hidden backdrop-blur-md border border-blue-400/20 max-w-xs mx-auto" style={{ boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)' }}>
      {/* Avatar grande */}
      <div className="flex justify-center items-center pt-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-blue-300/40">
          {initials}
        </div>
      </div>
      {/* Badge de estado destacado */}
      <div className="absolute top-6 left-6">
        <span className={`text-xs font-bold px-3 py-1 rounded-full shadow ${STATUS_COLORS[status]}`}>
          {lang === 'en' ? STATUS_LABELS_EN[status] : STATUS_LABELS[status]}
        </span>
      </div>
      {/* Stats */}
      <div className="flex justify-center gap-2 mt-6 mb-2 px-4">
        <div className="bg-white/10 rounded-xl px-3 py-2 text-center text-xs text-white">
          <div className="font-bold">{new Date(date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', { day: '2-digit', month: 'short', year: '2-digit' })}</div>
          <div className="opacity-70">{translate('dashboard.date')}</div>
        </div>
        <div className="bg-white/10 rounded-xl px-3 py-2 text-center text-xs text-white">
          <div className="font-bold">{position}</div>
          <div className="opacity-70">{translate('dashboard.position')}</div>
        </div>
        <div className="bg-white/10 rounded-xl px-3 py-2 text-center text-xs text-white">
          <div className="font-bold">{company}</div>
          <div className="opacity-70">{translate('dashboard.company')}</div>
        </div>
      </div>
      {/* Badges de envío de CV y Email */}
      {(sentCV || sentEmail) && (
        <div className="flex justify-center gap-2 mb-2 px-4">
          {sentCV && (
            <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {translate('dashboard.sentCV')}
            </span>
          )}
          {sentEmail && (
            <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {translate('dashboard.sentEmail')}
            </span>
          )}
        </div>
      )}
      {/* Descripción/notas */}
      <div className="px-6 py-2 text-white/90 text-sm min-h-[48px]">
        {notes ? (
          notes
        ) : (
          <span className="italic text-blue-200 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" /></svg>
            {translate('dashboard.notes.none') || 'Sin notas aún'}
          </span>
        )}
      </div>
      {/* URL */}
      <div className="px-6 pb-2 text-blue-200 text-xs truncate">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline">{url}</a>
        ) : (
          <span className="italic text-blue-200/70 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" /></svg>
            {translate('dashboard.url.none') || 'Sin link'}
          </span>
        )}
      </div>
      {/* Fechas de creación y actualización */}
      <div className="px-6 pb-2 flex justify-between text-blue-100 text-[10px]">
        <span>{translate('dashboard.created')}: {new Date(createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
        <span>{translate('dashboard.updated')}: {new Date(updatedAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
      </div>
      {/* Botones de acción */}
      <div className="flex justify-center items-center gap-3 py-3">
        <button
          onClick={onViewDetail}
          className="flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-xl shadow-2xl text-base transition-all duration-200 group relative"
          style={{ boxShadow: '0 12px 40px 0 rgba(236, 72, 153, 0.45), 0 6px 16px 0 rgba(236, 72, 153, 0.35)' }}
          title={translate('dashboard.actions.view')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {translate('dashboard.actions.view')}
          </span>
        </button>
        <button
          onClick={onEdit}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl shadow-2xl text-base transition-all duration-200 group relative"
          style={{ boxShadow: '0 12px 40px 0 rgba(59, 130, 246, 0.45), 0 6px 16px 0 rgba(59, 130, 246, 0.35)' }}
          title={translate('dashboard.actions.edit')}
        >
          <div className="flex items-center justify-center w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3z" /></svg>
          </div>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {translate('dashboard.actions.edit')}
          </span>
        </button>
        <button
          onClick={onDelete}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl shadow-2xl text-base transition-all duration-200 group relative"
          style={{ boxShadow: '0 12px 40px 0 rgba(239, 68, 68, 0.45), 0 6px 16px 0 rgba(239, 68, 68, 0.35)' }}
          title={translate('dashboard.actions.delete')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {translate('dashboard.actions.delete')}
          </span>
        </button>
      </div>
    </div>
  );
};
