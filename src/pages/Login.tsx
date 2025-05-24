import { AuthPage } from '../features/auth/AuthPage';
import { AUTH_IMAGES } from '../constants/images';
import { AuthBackground } from '../components/AuthBackground';

export default function Login() {
  return (
    <div className="w-full min-h-screen">
      <AuthBackground imagePath={AUTH_IMAGES.LOGIN}>
        <AuthPage type="login" />
      </AuthBackground>
    </div>
  );
}
