
import { AuthPage } from '../features/auth/AuthPage';

export default function Register() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <AuthPage type="register" />
    </div>
  );
}
