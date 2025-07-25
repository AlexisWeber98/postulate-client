import React from 'react';
import { User, Mail } from 'lucide-react';
import { Input } from '../../ui/input';
import { useLanguageStore } from '../../../store';

interface AccountDetailsProps {
  userName: string;
  setUserName: (userName: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  userName,
  setUserName,
  email,
  setEmail,
}) => {
  const { translate } = useLanguageStore();
  return (
    <>
      {/* Tip profesional Detalles de Cuenta */}
      <div className="flex items-center w-full max-w-2xl mb-8 p-4 rounded-xl bg-gradient-to-r from-yellow-50 via-white to-pink-100 border-l-4 border-orange-400 shadow gap-3">
        <span className="bg-orange-400 text-white rounded-full p-2 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div>
          <span className="font-bold text-orange-800">{translate('profile.tips.professional.title')}</span>
          <p className="text-orange-700 text-sm">{translate('profile.tips.account.description')}</p>
        </div>
      </div>

      <form className="w-full max-w-2xl flex flex-col gap-8 items-center">
        <div className="w-full flex flex-col gap-6">
          <div>
            <label className="flex items-center gap-2 font-semibold text-white/90 mb-2" htmlFor="userName">
              <User className="w-5 h-5 text-blue-400" /> {translate('profile.fields.userName')}
            </label>
            <Input
              type="text"
              id="userName"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder={translate('profile.placeholders.userName')}
              className="bg-white"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 font-semibold text-white/90 mb-2" htmlFor="email">
              <Mail className="w-5 h-5 text-blue-400" /> {translate('profile.fields.email')}
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={translate('placeholder.email')}
              className="bg-white"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AccountDetails;
