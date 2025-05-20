import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import Layout from './components/templates/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import { useAuthStore } from './store';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthLayout } from './features/auth/AuthLayout';
import LoadingSpinner from './components/atoms/LoadingSpinner';

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

  // Inicializar el store de autenticación al cargar la app
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Log the authentication state for debugging
  useEffect(() => {
    console.log('Auth state:', { user });
  }, [user]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Router>
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
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
