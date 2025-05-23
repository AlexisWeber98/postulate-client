import { AuthPage } from '../features/auth/AuthPage';
import { AuthBackground } from '../components/AuthBackground';
import { AUTH_IMAGES } from '../constants/images';

export default function Register() {
  return (
    <AuthBackground imagePath={AUTH_IMAGES.REGISTER}>
      <AuthPage type="register" />
    </AuthBackground>
  );
}
