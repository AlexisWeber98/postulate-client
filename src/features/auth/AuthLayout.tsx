import { AuthBackgroundImage } from './components/AuthBackgroundImage.ui';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-full">
      <AuthBackgroundImage />
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};
