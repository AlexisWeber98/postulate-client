import { AuthPage } from '../features/auth/AuthPage';

export default function Login() {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2029&auto=format&fit=crop")'
      }}
    >
      <AuthPage type="login" />
    </div>
  );
}
