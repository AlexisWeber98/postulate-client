import { AuthPage } from '../features/auth/AuthPage';

export default function Register() {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop")'
      }}
    >
      <AuthPage type="register" />
    </div>
  );
}
