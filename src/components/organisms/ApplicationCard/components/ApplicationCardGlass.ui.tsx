import { ApplicationCardGlassProps } from '../../../../types/components/organisms/ApplicationCard.interface';
import { STATUS_LABELS, STATUS_COLORS, STATUS_LABELS_EN } from '../../../../types/interface/postulations/postulation';
import { useLanguageStore } from '../../../../store/language/languageStore';

export const ApplicationCardGlass = ({ application, onViewDetail, onEdit, onDelete }: ApplicationCardGlassProps) => {
  const { company, position, status, applicationDate, link, description, createdAt, updatedAt, sendCv, sendEmail } = application;
  const initials = company ? company.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'NA';
  const { lang } = useLanguageStore();
  const translate = useLanguageStore(state=>state.translate);

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl sm:rounded-3xl shadow-xl p-0 overflow-hidden backdrop-blur-md border border-blue-400/20 max-w-full sm:max-w-xs mx-auto" style={{ boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)' }}>
      {/* Avatar - más pequeño en móvil */}
      <div className="flex justify-center items-center pt-4 sm:pt-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold shadow-lg border-2 sm:border-4 border-blue-300/40">
          {initials}
        </div>
      </div>
      {/* Badge de estado destacado */}
      <div className="absolute top-3 sm:top-6 left-3 sm:left-6">
        <span className={`text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow ${STATUS_COLORS[status]}`}>
          {lang === 'en' ? STATUS_LABELS_EN[status] : STATUS_LABELS[status]}
        </span>
      </div>
      {/* Stats - más compacto en móvil */}
      <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-2 mt-3 sm:mt-6 mb-2 px-3 sm:px-4">
        <div className="bg-white/10 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-2 text-center text-sm text-white">
          <div className="font-bold text-sm sm:text-xs lg:text-xs">{new Date(applicationDate).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', { day: '2-digit', month: 'short', year: '2-digit' })}</div>
          <div className="opacity-70 text-sm">{translate('dashboard.date')}</div>
        </div>
        <div className="bg-white/10 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-2 text-center text-sm text-white">
          <div className="font-bold text-sm sm:text-xs lg:text-xs truncate">{position}</div>
          <div className="opacity-70 text-sm">{translate('dashboard.position')}</div>
        </div>
        <div className="bg-white/10 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-2 text-center text-sm text-white">
          <div className="font-bold text-sm sm:text-xs lg:text-xs truncate">{company}</div>
          <div className="opacity-70 text-sm">{translate('dashboard.company')}</div>
        </div>
      </div>
      {/* Badges de envío de CV y Email - más compacto */}
      {(sendCv || sendEmail) && (
        <div className="flex justify-center gap-1 sm:gap-2 mb-2 px-3 sm:px-4">
          {sendCv && (
            <span key={`cv-badge-${application.id}`} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-sm font-medium px-1 sm:px-2 py-1 rounded-full">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span className="hidden sm:inline">{translate('dashboard.sentCV')}</span>
            </span>
          )}
          {sendEmail && (
            <span key={`email-badge-${application.id}`} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-sm font-medium px-1 sm:px-2 py-1 rounded-full">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span className="hidden sm:inline">{translate('dashboard.sentEmail')}</span>
            </span>
          )}
        </div>
      )}
      {/* Descripción/notas - más compacto */}
      <div className="px-3 sm:px-6 py-1 sm:py-2 text-white/90 text-sm sm:text-base lg:text-xs min-h-[32px] sm:min-h-[48px]">
        {description ? (
          <div className="line-clamp-2 sm:line-clamp-3">{description}</div>
        ) : (
          <span className="italic text-blue-200 flex items-center gap-1 sm:gap-2 text-sm sm:text-base lg:text-xs">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" /></svg>
            {translate('dashboard.notes.none') || 'Sin notas aún'}
          </span>
        )}
      </div>
      {/* URL - oculto en móvil para ahorrar espacio */}
      <div className="hidden sm:block px-6 pb-2 text-blue-200 text-sm truncate">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="underline">{link}</a>
        ) : (
          <span className="italic text-blue-200/70 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" /></svg>
            {translate('dashboard.url.none') || 'Sin link'}
          </span>
        )}
      </div>
      {/* Fechas de creación y actualización - oculto en móvil */}
      <div className="hidden sm:flex px-6 pb-2 justify-between text-blue-100 text-xs">
        <span>{translate('dashboard.created')}: {new Date(createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
        <span>{translate('dashboard.updated')}: {new Date(updatedAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
      </div>
      {/* Botones de acción - más compactos en móvil */}
      <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-3 py-2 sm:py-3">
        <button
          onClick={onViewDetail}
          className="flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl shadow-2xl text-base sm:text-base lg:text-xs transition-all duration-200 group relative"
          style={{ boxShadow: '0 12px 40px 0 rgba(236, 72, 153, 0.45), 0 6px 16px 0 rgba(236, 72, 153, 0.35)' }}
          title={translate('dashboard.actions.view')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {translate('dashboard.actions.view')}
          </span>
        </button>
        <button
          onClick={onEdit}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl shadow-2xl text-base sm:text-base lg:text-xs transition-all duration-200 group relative"
          style={{ boxShadow: '0 12px 40px 0 rgba(59, 130, 246, 0.45), 0 6px 16px 0 rgba(59, 130, 246, 0.35)' }}
          title={translate('dashboard.actions.edit')}
        >
          <div className="flex items-center justify-center w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3z" /></svg>
          </div>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {translate('dashboard.actions.edit')}
          </span>
        </button>
        <button
          onClick={onDelete}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl shadow-2xl text-base sm:text-base lg:text-xs transition-all duration-200 group relative"
          style={{ boxShadow: '0 12px 40px 0 rgba(239, 68, 68, 0.45), 0 6px 16px 0 rgba(239, 68, 68, 0.35)' }}
          title={translate('dashboard.actions.delete')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {translate('dashboard.actions.delete')}
          </span>
        </button>
      </div>
    </div>
  );
};
