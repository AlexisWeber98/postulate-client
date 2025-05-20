import { AuthBackgroundImage } from './components/AuthBackgroundImage.ui';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-full flex">
      <AuthBackgroundImage />
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
