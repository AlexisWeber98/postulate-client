import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import Layout from './components/templates/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import { useAuthStore, useThemeStore } from './store';
import { AuthLayout } from './features/auth/AuthLayout';
import LoadingSpinner from './components/atoms/LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import { AuthRedirect } from './components/AuthRedirect';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner fullScreen message="Cargando..." />;
  }

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { user, initialize } = useAuthStore();
  const { theme } = useThemeStore();


  // Inicializar el store de autenticación al cargar la app
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Aplicar tema
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Log the authentication state for debugging
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Auth state:', { user });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Toaster position="top-right" />
      <Router>
        <AuthRedirect />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
          </Route>
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="add" element={<ApplicationForm />} />
            <Route path="edit/:id" element={<ApplicationForm />} />
            <Route path="profile" element={<EditProfile />} />
          </Route>
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
