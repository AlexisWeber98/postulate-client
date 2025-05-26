import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      navigate('/login', { replace: true });
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [navigate]);

  return null;
};
