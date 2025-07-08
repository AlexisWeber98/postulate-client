import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore, useThemeStore } from './store';
import { AuthLayout } from './features/auth/AuthLayout';
import LoadingSpinner from './components/atoms/LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import { AuthRedirect } from './components/AuthRedirect';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ApplicationForm = lazy(() => import('./pages/ApplicationForm'));
const Layout = lazy(() => import('./components/templates/Layout'));
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const IAResponseGenerator = lazy(() => import('./pages/postulation/IAResponseGenerator'));

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



  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200" role="main">
      <Toaster position="top-right" />
      <Router>
        <AuthRedirect />
        <Suspense fallback={<LoadingSpinner fullScreen message="Cargando..." />}>
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
              <Route path="ia-response" element={<IAResponseGenerator />} />
            </Route>
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
          </Routes>
        </Suspense>
      </Router>
    </main>
  );
};

export default App;
