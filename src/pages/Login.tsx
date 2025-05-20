
import { AuthPage } from '../features/auth/AuthPage';

export default function Login() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <AuthPage type="login" />
    </div>
  );
}
