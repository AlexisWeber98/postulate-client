import { AuthPage } from '../features/auth/AuthPage';
import AuthBackground from '../features/auth/components/AuthBackground';

export default function Register() {
  const imagePath = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop";
  return (
    <AuthBackground imagePath={imagePath}>
      <AuthPage type="register" />
    </AuthBackground>
  );
}
